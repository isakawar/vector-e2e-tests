# Pull Request

## 🔗 Jira / Task

Link to Jira issue or task (if applicable):

---

## 🧾 What was done

Short description of the change.

Examples:

- Added new Page Object
- Added UI/API tests
- Refactored project structure
- Fixed flaky tests
- Updated fixtures or test utilities

---

## 🧪 Type of change

- [ ] New test
- [ ] Test refactor
- [ ] Framework improvement
- [ ] Bug fix
- [ ] CI / configuration change
- [ ] Documentation update

---

## 📸 Screenshots / Report (optional)

If this PR affects UI tests, attach screenshots or the Playwright report
if relevant.

---

# PR Review Checklist

Please verify before requesting review.

## Test quality

- [ ] Tests use **Page Objects** instead of raw locators
- [ ] No UI locators are placed directly inside test files
- [ ] Tests use **user‑facing locators** (`getByRole`, `getByText`,
      `getByLabel`) where possible
- [ ] Selectors do not match multiple elements
- [ ] Assertions use **web‑first assertions** (`toBeVisible`,
      `toHaveText`, etc.)

## Framework conventions

- [ ] Components are placed in `src/components`
- [ ] Page objects are placed in `src/pageObjects`
- [ ] API logic is implemented in `src/controllers`
- [ ] Shared logic is placed in `src/utils`
- [ ] Test data is stored in `src/test-data`
- [ ] Tests contain **only test logic**, not UI implementation

## Stability

- [ ] Tests do not use `page.waitForTimeout`
- [ ] Tests are independent and can run in parallel
- [ ] No `console.log`, `debugger`, or `page.pause()` left in the code
- [ ] Data created during tests is properly cleaned up (if applicable)

## Local verification

- [ ] Tests were run locally
- [ ] No flaky tests observed
- [ ] Linting and formatting checks pass

---

## 🚀 Additional notes

Anything reviewers should know:

- special setup
- new environment variables
- changes in fixtures
- CI changes
