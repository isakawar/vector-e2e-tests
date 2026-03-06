# Vector E2E Tests

Playwright end-to-end tests for the Vector platform.
Built with Playwright + TypeScript, covering UI flows for both anonymous and authenticated users.

---

## Stack

- Playwright — test runner and browser automation
- TypeScript — strict typing
- Page Object Model — test architecture
- Qase — test case management
- ESLint / Prettier / Husky — code quality

---

## Getting started

```bash
npm install
npx playwright install --with-deps
```

Copy the env template and fill in your values:

```bash
cp envs/.env.dev.example envs/.env.dev
```

Run tests against dev:

```bash
npm test
```

Other environments:

```bash
npm run test:stage
npm run test:prod
```

Open the HTML report after a run:

```bash
npx playwright show-report
```

---

## Project structure

```
vector-e2e-tests/
├── components/          # UI component locators (Header, Footer, CookieBanner)
├── pages/               # Page objects composed from components
├── fixtures/            # Custom test fixtures — imported instead of @playwright/test
├── helpers/             # Reusable logic: auth flows, API wrappers
├── test-data/           # Constants: navigation labels, page titles, URLs
├── tests/
│   ├── auth.setup.ts    # Runs once before authenticated tests
│   ├── ui/              # Non-authenticated UI specs
│   ├── ui-auth/         # Authenticated UI specs
│   └── api/             # API specs (in progress)
├── utils/               # Data generators, API client
└── envs/                # Per-environment config (.env.dev, .env.stage, .env.prod)
```

### Architecture overview

Components contain UI locators and small interaction helpers.  
Pages compose components into page-level actions.  
Fixtures provide ready-to-use pages for tests.  
Test data lives in `test-data/` and is never hardcoded in specs or components.

```
components/ → pages/ → fixtures/ → tests/
                                ↑
                           test-data/
```

---

## Authentication

Auth is handled via a dedicated setup project that logs in once using the Django CSRF flow and saves the session to `playwright/.auth/user.json`. Authenticated tests reuse this session — no repeated logins.

The setup runs automatically before any test in `tests/ui-auth/`. You don't need to trigger it manually.

Required env vars:

```
BASE_URL=
TEST_EMAIL=
TEST_PASSWORD=
```

---

## Environments

| Script               | Environment |
| -------------------- | ----------- |
| `npm test`           | dev         |
| `npm run test:stage` | stage       |
| `npm run test:prod`  | prod        |

Each environment reads from `envs/.env.<name>`. Variables set in the shell take precedence over the file.

---

## Qase integration

To push results to Qase, use the `*:qase` variants:

```bash
npm run test:qase
npm run test:stage:qase
```

Requires `QASE_TESTOPS_API_TOKEN` and `QASE_TESTOPS_PROJECT` to be set in your env file.

---

## CI

Tests run on every push and pull request via GitHub Actions.

---

## Contributing

Before opening a PR, check the pull request template checklist — it covers the key things like locator quality, test isolation, and POM compliance.

Local pre-commit hooks handle formatting and linting automatically via Husky.
