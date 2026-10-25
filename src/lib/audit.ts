import { prisma } from "./prisma";

export interface LogAuditParams {
  userId?: string | null;
  action: string;
  resource: string;
  resourceId: string;
  diffPayload?: Record<string, unknown> | string | null;
  ipAddress?: string;
}

export async function logAuditTrail({
  userId,
  action,
  resource,
  resourceId,
  diffPayload,
  ipAddress = "127.0.0.1",
}: LogAuditParams) {
  try {
    const payloadStr =
      typeof diffPayload === "object" && diffPayload !== null
        ? JSON.stringify(diffPayload)
        : (diffPayload as string) || null;

    return await prisma.auditTrail.create({
      data: {
        userId: userId || null,
        action,
        resource,
        resourceId,
        diffPayload: payloadStr,
        ipAddress,
      },
    });
  } catch (error) {
    console.error("Failed to write audit trail:", error);
    // Audit logging should not crash the primary operational flow if not fatal, but logs errors
    return null;
  }
}
