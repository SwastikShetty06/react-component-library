# React Component Library (Polished)

This repository contains two React components built with **React + TypeScript + TailwindCSS** and documented with **Storybook**:
- `InputField` — flexible input with variants, validation states, clear button and password toggle.
- `DataTable` — sortable, selectable data table with loading and empty states.

This copy has been enhanced with human-like comments, a Storybook config, and clear scripts to deploy to **Chromatic**.

---

## Quick start

1. Install dependencies
```bash
npm install
```

2. Run Storybook locally
```bash
npm run storybook
```

3. Run tests
```bash
npm run test
```

4. Build Storybook (for static hosting)
```bash
npm run build-storybook
```

5. Deploy to Chromatic
- Create a Chromatic account and repository/project.
- Grab your **project token** from Chromatic.
- On your machine / CI, set the environment variable:
```bash
export CHROMATIC_PROJECT_TOKEN=your_token_here
```
- Run:
```bash
npm run chromatic
```

---

## What I changed (human polish)

- Added descriptive comments to core files for maintainability.
- Added `.storybook` config (works with Vite-based Storybook).
- Added `chromatic` npm script for easy deployment.
- Kept a minimal `App.tsx` demo — Storybook is the main demo surface.

---

## Notes

- This repo is ready to be pushed to GitHub. After pushing, run Chromatic locally or via CI to publish your Storybook.
- If you prefer GitHub Actions, you can add a workflow that runs `npm ci` and `npm run chromatic` with the CHROMATIC_PROJECT_TOKEN secret.

Good luck — you're ready to showcase this component library! 🎉
# react-component-library
