import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";

let localPrisma: PrismaClient | null = null;
let cachedD1Prisma: PrismaClient | null = null;

export async function getPrisma(): Promise<PrismaClient> {
  try {
    const ctx = await getCloudflareContext({ async: true });
    const env = ctx?.env as { DB?: any } | undefined;
    if (env?.DB) {
      if (!cachedD1Prisma) {
        const adapter = new PrismaD1(env.DB);
        cachedD1Prisma = new PrismaClient({ adapter });
      }
      return cachedD1Prisma;
    }
  } catch {
    // Fallback to local mock during build/dev scripts
  }

  if (!localPrisma) {
    const mockD1 = {
      prepare: () => ({
        bind: () => ({
          all: async () => ({ results: [], success: true }),
          first: async () => null,
          run: async () => ({ success: true, meta: { changes: 0 } }),
        }),
      }),
      batch: async () => [],
      exec: async () => ({ count: 0, duration: 0 }),
    };
    const adapter = new PrismaD1(mockD1 as any);
    localPrisma = new PrismaClient({ adapter });
  }
  return localPrisma;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, modelName: string) {
    if (modelName === "$transaction") {
      return async (arg: any, options?: any) => {
        const client = await getPrisma();
        return (client as any).$transaction(arg, options);
      };
    }
    if (modelName === "$disconnect" || modelName === "$connect") {
      return async () => {
        const client = await getPrisma();
        return (client as any)[modelName]();
      };
    }
    return new Proxy({}, {
      get(_modelTarget, operation: string) {
        return async (...args: any[]) => {
          const client = await getPrisma();
          const model = (client as any)[modelName];
          if (!model || typeof model[operation] !== "function") {
            throw new Error(`Prisma model '${modelName}' does not have method '${operation}'`);
          }
          return model[operation](...args);
        };
      },
    });
  },
});
