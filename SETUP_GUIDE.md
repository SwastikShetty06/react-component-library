# SETUP_GUIDE

## Local setup

1. Ensure Node.js (>=16) and npm are installed.
2. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

## Storybook

- Start Storybook:
  ```bash
  npm run storybook
  ```
  Storybook will run at http://localhost:6006

- Build Storybook:
  ```bash
  npm run build-storybook
  ```

## Chromatic deployment

1. Create an account at https://www.chromatic.com/ and connect your GitHub repo (optional).
2. Obtain your project token from the Chromatic project settings.
3. On your machine / CI:
   ```bash
   export CHROMATIC_PROJECT_TOKEN=your_token_here
   npm run chromatic
   ```
4. Chromatic will upload your stories and provide a public preview URL.
