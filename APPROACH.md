# Smart Roster Management System — Approach Note

## Solution
Rosterly is a React single-page application with a deterministic scheduling engine. It treats employee availability, brand/process operating calendars and resource assignments as separate inputs, then validates every required process/day slot.

## Architecture
- **Frontend:** React 18 + Vite.
- **Domain model:** employees, pods/pod leads, brands, processes, assignments, leave/comp-off, public holidays and date-specific roster overrides.
- **Scheduling:** pure JavaScript in `src/engine.js`; input data and selected month produce a roster plus findings.
- **Persistence:** browser `localStorage` for zero-setup reviewer access; JSON backup/import and CSV export are provided.
- **Hosting target:** Vercel static hosting; Vite emits `dist`.

## Key scheduling choices
1. Process calendars are independent: `365`, `no_holidays`, or `weekdays` (Monday–Saturday excluding public holidays).
2. Employee availability is determined independently using active status, manual date override, approved leave/comp-off and individual weekly off.
3. Employees can serve multiple processes for one brand on the same date. They are not double-counted across different brands.
4. The engine checks minimum staffing per brand, process and date. Unmet requirements are critical findings; cross-brand simultaneous allocation is a warning.
5. Managers can edit assignments, employee availability, process calendars, staffing minima, leave and holidays; every edit triggers recalculation.
6. The seed contains 32 employees, five pods, 25 brands and four processes. Exactly 20/25 brands (80%) are single-resource brands; the other five have two or three resources.

## Trade-offs and limitations
Local storage makes the demo easy to run without credentials or backend provisioning, but it is not shared between users/devices and provides no authentication. A production version needs a shared database, authenticated API, role permissions, audit trail, published roster versions and stronger optimisation for shifts, fairness and employee preferences. The deterministic engine intentionally surfaces infeasible constraints instead of silently assigning unqualified backup staff.
