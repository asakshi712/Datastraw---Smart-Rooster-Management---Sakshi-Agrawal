# Assessment implementation checklist

| Assessment item | Implementation in this package | Verification / note |
|---|---|---|
| At least 30 employees | 32 fictional employees | `npm test` |
| Multiple brands and operational pods | 25 brands, 5 pods and editable pod leads | Seed dataset + Employees screen |
| Approximately 80% single-resource brands | 20 of 25 brands (80%) | `npm test` |
| Multi-resource brands and process ownership | 5 brands with 2–3 resources; cross-trained backups | Seed dataset + Assignments screen |
| Process-level operating calendars | 365 days, every day except public holidays, or Sundays/public holidays off | Brand editor + engine |
| Minimum staffing by process | Numeric configurable minimum | Brand editor + engine |
| Weekly offs, planned leave, comp-offs and holidays | Individual weekly offs; leave/comp-off approval state; holiday list | Leave & holidays screen |
| Monthly roster | Select month; company, pod, brand, process and employee filters | Monthly roster screen |
| Coverage gaps and allocation conflicts | Critical under-staffing findings and cross-brand overlap warnings | Issues & validation screen |
| Manual changes and impact | Date-specific availability overrides trigger immediate revalidation | Monthly roster screen |
| Handle employee availability / brand requirement changes | Employee, assignment, leave, holiday and process-rule editors | Data edits recalculate roster |
| CSV export | Full month employee/day export | Export roster CSV |
| Explain solution and decisions | README answers all eight assessment questions; approach note included | `README.md`, `APPROACH.md` |
| Public application URL | Not yet published | Requires owner GitHub/Vercel sign-in and authorization |
| GitHub repository | Not yet created | Requires owner GitHub account |
| Demo video | Script prepared; recording not created | `DEMO_SCRIPT.md` |
| LinkedIn profile | Provided: https://www.linkedin.com/in/asakshi712/ | Include in submission email; verify public accessibility before sending |

## Validation performed in the authoring environment

- `npm test`: passed (deterministic scheduling-engine tests).
- React JSX syntax transpilation check: passed using the installed TypeScript compiler.
- `node --check` on domain data and scheduling engine: passed.
- `npm install`: did not finish in the authoring environment before timeout, so `npm run build` and a browser-based end-to-end test could not be completed here. Run the commands in `DEPLOYMENT.md` on a machine with package-registry access before publishing.
