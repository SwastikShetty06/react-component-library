# React Component Library — Polished by Swastik Shetty

Hi — I'm **Swastik Shetty**. This repository contains a small React component library I built as part of a front-end assignment. It includes two main components implemented with **React + TypeScript + TailwindCSS**, documented in **Storybook**, and prepared for deployment to **Chromatic**.

## Components & features

### InputField
- Label, placeholder, helper text, error message
- States: disabled, invalid, loading
- Variants: `filled`, `outlined`, `ghost`
- Sizes: `sm`, `md`, `lg`
- Optional: clear button, password toggle
- Accessible (aria labels)

### DataTable
- Tabular data rendering
- Column sorting
- Row selection (single/multi)
- Loading & empty states
- Accessible markup

---

## Quick start

```bash
npm install
npm run storybook    # Storybook on localhost:6006
npm run test         # run tests
npm run build-storybook
