# CLAUDE.md

This file contains instructions for AI assistants (Claude Code, Cursor,
Copilot, etc.) when working with this repository.

The goal is to ensure that all generated code follows the **Playwright
testing architecture and conventions used in this project**.

---

# Project Overview

This repository contains **Playwright end-to-end tests** for the Vector
platform.

The framework uses:

- Playwright + TypeScript
- Page Object Model (POM)
- Reusable UI components
- API controllers for backend interactions
- Test tagging instead of test folders like smoke/regression

Tests should be **clean, readable, maintainable, and scalable**.

---

# Project Structure

The project follows this structure:

    src/
      components/     reusable UI blocks
      pageObjects/    page objects with UI logic
      controllers/    API controllers
      fixtures/       Playwright fixtures
      utils/          shared helpers
      test-data/      constants and test data

    tests/
      auth/
      profile/
      search/
      mpk/
      certificates/
      reviews/

    docs/
      test-strategy.md

Guidelines:

- Tests contain **only test logic**
- UI locators belong to **components or page objects**
- API requests belong to **controllers**
- Shared constants belong to **test-data**
- Utilities belong to **utils**

---

# Test Tagging Strategy

This project uses **tags instead of folders** to categorize tests.

Tags allow flexible grouping and CI execution.

### Supported Tags

    @smoke
    @regression
    @auth
    @profile
    @search
    @mpk
    @certificates
    @reviews

Tests may have **multiple tags**.

Example:

    test('@smoke @auth user can login', async ({ loginPage }) => {})

---

# Preferred Tag Usage

Use `describe` blocks to group features.

Example:

    test.describe('@auth', () => {

      test('@smoke user can login', async ({ loginPage }) => {
        // login flow
      })

      test('@regression login validation', async ({ loginPage }) => {
        // validation checks
      })

    })

---

# Running Tests by Tag

Examples:

Run smoke tests:

    npx playwright test --grep @smoke

Run regression tests:

    npx playwright test --grep @regression

Run authentication tests:

    npx playwright test --grep @auth

---

# Writing New Tests

When creating tests:

1.  Identify the feature area.
2.  Add or reuse components if needed.
3.  Implement page logic inside a Page Object.
4.  Use fixtures to create page instances.
5.  Write the test using tags.

Example workflow:

    component → pageObject → fixture → test

---

# Test Writing Rules

Always follow these rules:

- Tests must not contain raw locators
- Use Page Objects for UI interactions
- Use Components for reusable UI blocks
- Prefer Playwright **user-facing locators**
- Avoid CSS/XPath unless necessary
- Never use `page.waitForTimeout`
- Prefer Playwright auto-retrying assertions

Preferred locator examples:

    getByRole()
    getByText()
    getByLabel()
    getByPlaceholder()

---

# Test Stability Rules

Tests must:

- run independently
- support parallel execution
- avoid shared mutable state
- avoid hardcoded waits

---

# Fixtures

Fixtures are responsible for:

- creating page objects
- preparing authenticated state
- sharing setup logic

Example:

    loginPage: async ({ page }, use) => {
      const loginPage = new LoginPage(page)
      await use(loginPage)
    }

---

# API Layer

API logic must be placed inside controllers.

Example:

    class AuthController extends BaseController {

      async login(email: string, password: string) {
        return this.request.post('/api/login', {
          data: { email, password }
        })
      }

    }

Tests must not perform raw API calls directly.

---

# What AI Should NOT Do

Do NOT:

- add UI locators inside tests
- duplicate selectors across pages
- create unnecessary abstractions
- place test logic inside page objects
- introduce hardcoded waits

---

# Automation Goals

The automation suite should focus on:

- critical user journeys
- stable smoke tests
- maintainable architecture
- fast CI execution

Initial goal:

- 20--30 stable E2E tests

Future goal:

- 60+ E2E tests covering core flows

---

# If Unsure

When generating code:

- follow existing patterns in the repository
- prefer simplicity
- avoid overengineering
