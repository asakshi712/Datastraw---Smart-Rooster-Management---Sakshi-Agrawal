# Rosterly — Smart Roster Management System

A browser-based roster planning and validation application prepared for the DataStraw Tech Internship assessment. It models a multi-brand operations team, process-specific operating calendars, resource assignments, employee availability and monthly coverage.

## Features

- Maintain employee records, pod membership, pod leads, weekly-off patterns and active/inactive status.
- Maintain brands, their operational pods, process assignments, operating calendars and minimum staffing levels.
- Manage employee-to-brand/process assignments, including shared processes and multi-process responsibilities.
- Record planned leave, comp-offs, approval status and public holidays.
- Generate monthly rosters for a selected month and inspect company, pod, brand, process or individual employee views.
- Make date-specific manual availability changes and immediately recalculate coverage.
- Detect insufficient process staffing, approved-leave gaps and cross-brand allocation conflicts.
- Export monthly rosters to CSV and export/import a complete JSON data backup.
- Persist demo edits in browser `localStorage` so a reviewer can use the app without a backend setup.

## Sample dataset

- 32 fictional employees across 5 operational pods, each with a named pod lead.
- 25 fictional brands: 20 brands (80%) have one dedicated resource; the remaining 5 brands have teams of 2–3 people.
- Four processes: Customer Support (CS), Abandoned Cart Conversions (ACC), Retention (RET), and NDR Management (NDR).
- Multi-resource examples include separate process ownership, cross-trained backup assignments and a process with a minimum staffing requirement of two.
- Seeded approved/pending leave, comp-off and public holiday records create realistic validation scenarios.

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal (normally `http://localhost:5173`).

## Test and build

```bash
npm test
npm run build
npm run preview
```

`npm test` runs deterministic checks against the scheduling engine, including the 32-person/25-brand data shape, the 80% single-resource distribution, multi-resource brand sizing, 365-day coverage and a leave/override change-impact scenario.

## Applicant profile

- LinkedIn: https://www.linkedin.com/in/asakshi712/

Include this profile URL in the final assessment submission email and verify that the profile is publicly viewable before submitting.

## Public deployment (GitHub + Vercel)

1. Create a GitHub repository named `smart-roster-management-system`.
2. Push this project to the repository (see `DEPLOYMENT.md`).
3. Import the repository into Vercel.
4. Select the Vite preset, build command `npm run build`, and output directory `dist`.
5. Deploy and open the resulting HTTPS URL in a private/incognito browser window to verify public access.

A public URL is not included in this source package: deployment requires the project owner's GitHub and Vercel authorization.

## Persistence and security boundary

This assessment build is intentionally a zero-setup frontend demo. It stores data in the current browser's `localStorage`; it is not a shared central database, and edits made by one reviewer are not visible to another device. It has no login or role-based access. Do not enter real employee or client data. A production multi-user rollout should add a shared database (for example PostgreSQL/Supabase), authenticated API, role-based access, audit history, roster versioning, server-side validation and backups.

## Scheduling approach

For each date, the deterministic engine:

1. Determines each employee's availability from active status, date-specific manual override, approved leave/comp-off and their individual weekly-off day.
2. Determines which brand/process combinations must operate using the process-specific calendar and public holiday list.
3. Selects eligible assigned employees, allowing one person to cover multiple processes within the same brand while preventing simultaneous allocation across different brands.
4. Compares selected resources with each process's minimum staffing requirement.
5. Emits critical coverage gaps and warning-level cross-brand allocation conflicts instead of silently marking an invalid slot as covered.

Calendar values: `365` means every day including Sundays and public holidays; `no_holidays` means every day except public holidays; `weekdays` means every day except Sundays and public holidays (Monday–Saturday). These are process calendars, separate from each employee's weekly-off and leave calendar.

## Assessment questions — design answers

### 1. How are employees, brands, processes, pods and relationships modelled?
Employees belong to pods; each pod has a lead. Brands belong to operational pods and contain one or more process rules. An assignment joins one employee, one brand and one process. This many-to-many join supports dedicated brand owners, cross-trained staff and several employees sharing one process. Leave and overrides belong to employees; holidays are date-based.

### 2. How does the system generate a roster and validate constraints?
The engine evaluates every date in the selected month, builds each employee's status, finds operating processes, selects assigned and available resources, and compares them with minimum staffing. It checks the entire month rather than assuming a single common workweek. Unmet coverage is a critical finding; cross-brand simultaneous allocations are warnings.

### 3. How are single-resource and multi-employee brands handled?
The seed contains exactly 20 single-resource brands out of 25 (80%). Each dedicated resource is assigned across that brand's processes. Five other brands have two or three resources, including different process owners and cross-trained backups. A 365-day process has multiple assigned resources so weekly offs can be staggered.

### 4. What happens if the only employee for a brand is unavailable?
The employee's status changes to leave/off, and every required process relying on that employee is marked as a coverage gap. The manager can add a qualified backup assignment or change the approved availability record; the engine recalculates all affected dates. The app does not fabricate a substitute.

### 5. How are conflicting requirements or insufficient staffing handled?
Mandatory minimum coverage is treated as a hard constraint. If no eligible assigned employee is available, the engine reports the exact date, brand, process and staffing shortfall. Cross-brand allocation is not double-counted. The manager must resolve unresolved conflicts before treating the roster as publishable.

### 6. What is automated and what remains under human control?
Roster calculation, operating-calendar evaluation, availability evaluation, coverage validation, conflict reporting and CSV export are automated. Managers control assignments, leave approvals, weekly-off policies, operating requirements and manual overrides because those decisions require business context.

### 7. What would change if team and brand counts doubled?
Move persistence and scheduling to a shared relational database and API, index assignments by employee/brand/process/date, run generation as a server-side job, add role-based permissions and audit/version history, and introduce a constraint solver for larger multi-shift schedules. Add load tests and observability.

### 8. What would be improved with one additional week?
First, implement a shared database/authentication layer and persistent roster publishing/version history. Next, improve scheduling optimisation for fair weekly offs, shift capacity, employee preferences and backup recommendations, with expanded integration and edge-case tests.

## Known assumptions and limitations

- All people, brands, holidays and leave records are fictional.
- One employee is treated as one daily resource allocation; they may cover several processes for one brand, but cannot serve two brands simultaneously.
- A roster can contain critical gaps by design: the app exposes these so the operations manager can resolve them rather than hiding invalid coverage.
- This is an assessment demo, not a payroll, time-attendance or production workforce platform.
