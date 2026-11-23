# Public deployment checklist

## 1. Run and verify locally

Install Node.js 20+ and run from this project folder:

```bash
npm install
npm test
npm run build
npm run dev
```

Open the Vite URL printed in the terminal. Test the roster, employee and brand editors, assignment changes, leave approval, date overrides, validation and CSV export. `npm run build` must complete and create `dist/` before publishing.

## 2. Push to GitHub

Create an empty repository named `smart-roster-management-system`, then run:

```bash
git init
git add .
git commit -m "Complete Smart Roster Management System assessment"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/smart-roster-management-system.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username. Do not commit `.env` files, secrets or real personal data.

## 3. Deploy on Vercel

1. Sign in to Vercel using your GitHub account.
2. Select **Add New → Project** and import `smart-roster-management-system`.
3. Framework preset: **Vite**.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Deploy and copy the HTTPS URL.
7. Open that URL in an incognito/private window and test the main workflows without starting localhost.

## 4. Submission assets

- Public application URL from Vercel.
- GitHub repository URL.
- 3–5 minute screen-recorded walkthrough (script in `DEMO_SCRIPT.md`).
- `APPROACH.md`.
- LinkedIn profile: https://www.linkedin.com/in/asakshi712/

## Important access boundary

A GitHub repository and Vercel deployment cannot be created from this project folder without the owner's authenticated account authorization. This package is prepared for that process but has not been pushed or published. The demo stores changes in each visitor's browser, not in a shared database.
