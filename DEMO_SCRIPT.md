# 3–5 Minute Demo Video Script

## 0:00–0:30 — Introduce the problem
Open the deployed Rosterly URL. Explain that the tool plans monthly staffing for multiple D2C brands, processes and operational pods. Point out the 32 employees, 25 brands and five pods.

## 0:30–1:10 — Explain the sample model
Open Employees and show pod leadership and individual weekly offs. Explain that 20 of 25 brands (80%) are single-resource brands; five brands have teams of two or three, including backup process assignments. Open Brands & processes and show the different calendars and minimum coverage rules.

## 1:10–2:00 — Generate and inspect a roster
Open Monthly roster, select a month and demonstrate Company, Pod, Brand, Process and Employee views. Explain W/O/L statuses and export the month to CSV.

## 2:00–2:50 — Manage a change
Use the seeded approved leave date for a single-resource brand or manually override an employee's availability on an operating day. Show how the roster and affected process coverage are recalculated immediately. Add a backup assignment or restore the employee's availability and show the changed result.

## 2:50–3:40 — Validate conflicts
Open Issues & validation. Explain that the engine checks each brand/process/day against minimum staffing and flags uncovered slots instead of silently generating an invalid roster. Show a 365-day process with multiple resources and its staggered weekly offs.

## 3:40–4:30 — Close with architecture and trade-offs
Explain the React/Vite frontend, deterministic JavaScript scheduling engine, browser-local persistence, JSON backup and CSV export. Be transparent that a production multi-user version needs a shared database, authentication, role permissions and roster audit/versioning.
