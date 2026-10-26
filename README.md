# ALKAN Health Science, Business & Technology College
### Student Information Management System (SIMS) & Institutional Web Portal

[![Cloudflare Workers](https://img.shields.io/badge/Deployed%20on-Cloudflare%20Workers-F38020?logo=cloudflare&logoColor=white)](https://alkan-sims.bahreabfeleke.workers.dev)
[![Next.js](https://img.shields.io/badge/Framework-Next.js%2016%20(React%2019)-black?logo=next.js)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS%20v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![Prisma ORM](https://img.shields.io/badge/ORM-Prisma%20Client-2D3748?logo=prisma)](https://prisma.io)
[![Cloudflare D1](https://img.shields.io/badge/Database-Cloudflare%20D1%20SQLite-F38020?logo=cloudflare)](https://developers.cloudflare.com/d1/)

> **Institutional Memorial:** Founded in December 2002 by ALKAN Plc as a perpetual living memorial to **Hakim Workineh Eshete (Dr. Charles Martin)** (1865–1952), Ethiopia's pioneer of modern medicine and distinguished diplomat. With over 14,000 graduates across 22+ years of excellence, ALKAN operates 3 regional campuses in **Addis Ababa** (Head Office in front of Ras Desta Hospital), **Bahir Dar**, and **Dessie**.

---

## 🌐 Live Production Deployment

* **Live URL:** [https://alkan-sims.bahreabfeleke.workers.dev](https://alkan-sims.bahreabfeleke.workers.dev)
* **Single Sign-On Portal:** [https://alkan-sims.bahreabfeleke.workers.dev/portal/login](https://alkan-sims.bahreabfeleke.workers.dev/portal/login)
* **Online Admission Wizard:** [https://alkan-sims.bahreabfeleke.workers.dev/admissions](https://alkan-sims.bahreabfeleke.workers.dev/admissions)
* **Application Tracker:** [https://alkan-sims.bahreabfeleke.workers.dev/admissions/status](https://alkan-sims.bahreabfeleke.workers.dev/admissions/status)

---

## 🏛️ System Architecture & Highlights

The platform integrates a public institutional website with a role-gated Academic Management System modeled after the governance and structural hierarchy of university portals (e.g., Addis Ababa University / AAU SIMS).

```
alkan-college/
├── src/
│   ├── app/
│   │   ├── (public)/          # Public website routes
│   │   │   ├── page.tsx       # Institutional Homepage with Hero & Faculties
│   │   │   ├── about/         # History, Memorial, Vision 2030, Campuses
│   │   │   ├── programs/      # Degree & TVET Level IV Program Matrix
│   │   │   ├── services/      # Registrar, Library, Counseling, Cafeteria
│   │   │   ├── announcements/ # Official Bulletins & Academic Circulars
│   │   │   ├── contact/       # Campus Directory, Phones, Verification Info
│   │   │   ├── admissions/    # 4-Step Student Application Wizard
│   │   │   └── admissions/status/ # Live Reference # Tracker
│   │   ├── portal/            # Role-Based Access Control (RBAC) SIMS
│   │   │   ├── login/         # Single Sign-On Gateway with 1-Click Demo
│   │   │   ├── student/       # Registration, Clearances, Official Transcript
│   │   │   ├── teacher/       # Continuous Assessment & Exam Matrix (50/50)
│   │   │   ├── registrar/     # Admissions, Clearances, Grade Publishing
│   │   │   └── admin/         # Curriculum, User Management, Audit Trails
│   ├── actions/               # Server Actions with RBAC & Input Validation
│   ├── components/            # Responsive Header, Footer, Sidebar, Badges
│   └── lib/                   # Prisma D1 adapter & Auth session utilities
├── prisma/                    # Relational Schema & Migration Seed Scripts
├── public/                    # Cleaned College Logo Badge, Favicon, Assets
└── wrangler.jsonc             # Cloudflare Workers & D1 configuration
```

---

## 🎓 Academic Faculties & Programs

Fully accredited by the Higher Education Relevance and Quality Agency (**HERQA / ETA**) and Regional TVET Agencies:

1. **Community Health Faculty:**
   * BSc in Nursing (4 Years, 148 Credits)
   * BSc in Public Health (Health Officer) (4 Years, 146 Credits)
   * Comprehensive Nursing (TVET Level IV)
   * Midwifery (TVET Level IV)
2. **Medical Science Faculty:**
   * BSc in Pharmacy (Clinical) (5 Years, 164 Credits)
   * BSc in Medical Laboratory Science (4 Years, 144 Credits)
   * Pharmacy Technician (TVET Level IV)
   * Medical Laboratory Technician (TVET Level IV)
3. **Business & Social Science Faculty:**
   * BA in Accounting and Finance (3–4 Years, 135 Credits)
   * BA in Management (3–4 Years, 132 Credits)
   * BA in Marketing Management (3–4 Years, 132 Credits)
   * Accounting & Budget Service (TVET Level IV)
4. **Technology Faculty:**
   * BSc in Information Technology (4 Years, 140 Credits)
   * Database Administration (TVET Level IV)
   * Surveying Technology (TVET Level IV)

---

## 🔒 Role-Based Access Control (RBAC) & Portals

### 1. Student Portal (`/portal/student`)
* **Live Academic Status Bar:** Student ID, Degree Program, Level/Semester, and Matriculation Status.
* **GPA & CGPA Calculations:** Weighted credit point summaries.
* **Semester Course Registration:** Curriculum course pre-matching with 12–22 credit hour boundary validation.
* **Academic Transcript (`My Grades`):** Strict double-blind security (only published grades visible to students), complete with a 1-click **"Print Official Transcript"** stylesheet.

### 2. Teacher Portal (`/portal/teacher`)
* **Matrix Grade Sheet:** Course sections with two-part grading: Continuous Assessment (max 50) + Final Exam (max 50).
* **Live Real-time Computation:** Dynamic Total, Letter Grade (A, B+, B, C, etc.), Grade Points, and Pass/Fail status.
* **Workflow Locks:** Save as DRAFT (editable) or SUBMIT TO REGISTRAR (locks inputs and queues for clearance).
* **Grade Correction Request Engine:** Audit-trailed change requests for previously locked or published grades.

### 3. Registrar Portal (`/portal/registrar`)
* **Admissions Queue:** Review incoming applications, view certificates, and 1-click approve (auto-generates Student ID and student profile).
* **Registration Clearances:** Academic batch inspection and clearance approval.
* **Grade Governance:** Grade distribution analytics (mean, standard deviation, distribution graphs) and 1-click **"Approve & Publish"**.
* **Grade-Change Audit Review:** Review and approve faculty correction requests with tamper-evident audit logs.

### 4. Administrator Portal (`/portal/admin`)
* **System Metrics:** Live student, faculty, department, and course counts.
* **Curriculum Management:** CRUD controls for Departments, Degree Programs, and Courses.
* **User Management:** Role allocation, account activation/suspension, and password resets.
* **Immutable Security Audit Trail:** Full logging of sensitive grade mutations, approvals, and IP records.

---

## 🧪 Demo Credentials & Quick Testing

Access the live portal at `/portal/login` with 1-click test buttons, or sign in manually:

| Role | Email | Password | Primary Functions |
| :--- | :--- | :--- | :--- |
| **System Admin** | `admin@healthcollege.edu` | `AdminPass2026!` | Full system metrics, curriculum, users, audit logs |
| **Registrar** | `registrar@healthcollege.edu` | `RegistrarPass2026!` | Approve admissions, clear registrations, publish grades |
| **Faculty (Dr. Alemu)** | `dr.alemu@healthcollege.edu` | `FacultyPass2026!` | Nursing assessment & exam grading engine |
| **Faculty (Dr. Senait)** | `dr.senait@healthcollege.edu` | `FacultyPass2026!` | Public Health grading & correction requests |
| **Student (Abebe)** | `student1@healthcollege.edu` | `StudentPass2026!` | BSc Nursing Year 2, Semester Registration & Transcript |
| **Student (Tigist)** | `student2@healthcollege.edu` | `StudentPass2026!` | BSc Public Health Year 2, Registration & Results |

---

## 🛠️ Local Development & Deployment

### 1. Prerequisites
* Node.js v20+ or v22+
* npm or pnpm
* Cloudflare Wrangler CLI

### 2. Installation
```bash
git clone <repository-url>
cd alkan-college
npm install
```

### 3. Database Migration & Seed
```bash
# Generate Prisma Client for workerd / D1
npx prisma generate

# Execute D1 migrations locally or remotely
npx wrangler d1 execute alkan-db --local --file=prisma/schema.sql
npx wrangler d1 execute alkan-db --local --file=prisma/seed.sql
```

### 4. Local Development
```bash
npm run dev
```

### 5. Production Cloudflare Workers Build & Deploy
```bash
# Build with OpenNext Cloudflare Adapter
npx opennextjs-cloudflare build

# Deploy to Cloudflare Workers
node ./node_modules/wrangler/bin/wrangler.js deploy
```

---

## 📍 Campus Directory

* **Addis Ababa Campus (Head Office):** In front of Ras Desta Memorial Hospital, Arada Sub-City • Tel: `+251-111-555-701` / `+251-111-574-535` • Email: `alkanaa@ethionet.et` • P.O. Box 59102
* **Bahir Dar Campus:** Felege Hiwot Hospital Road • Tel: `+251-582-266-382` / `+251-582-266-383` • Email: `alkanbdar@ethionet.et` • P.O. Box 1471
* **Dessie Campus:** Main Highway Corridor • Tel: `+251-331-124-316` / `+251-331-124-317` • Email: `alkandese@ethionet.et` • P.O. Box 1492

*Official Document Verification:* Accepted exclusively through official institutional addresses (`alkanaa@ethionet.et`, `alkanbdar@ethionet.et`, `alkandese@ethionet.et`).

---

## ⚖️ License
© 2002–2026 ALKAN Health Science, Business & Technology College (ALKAN Plc). All rights reserved.
