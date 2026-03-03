# Vector E2E Tests

End-to-end automation project for the **Vector** platform built with Playwright.

This repository contains UI tests designed to validate core user flows and ensure platform stability.

---

## 🚀 Project Setup

This project was initialized using  
[`create-playwright-seed`](https://www.npmjs.com/package/create-playwright-seed).

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Install Playwright browsers (if needed)

```bash
npx playwright install
```

### 3️⃣ Run tests

```bash
npx playwright test
```

### 4️⃣ Run tests in headed mode

```bash
npx playwright test --headed
```

### 5️⃣ Open HTML report

```bash
npx playwright show-report
```

---

## 🧱 Tech Stack

- **Playwright**
- **TypeScript**
- **Page Object Model (POM)**
- **AI-assisted test generation (Claude Playwright Skill)**

---

## 📁 Project Structure

```
vector-e2e-tests/
 ├── tests/                # Test specs
 ├── pages/                # Page Object classes
 ├── fixtures/             # Custom fixtures (if any)
 ├── utils/                # Helper utilities
 ├── playwright.config.ts  # Playwright configuration
 └── README.md
```

---

## ⚙️ Configuration

Base URL can be configured in:

```
playwright.config.ts
```

Example:

```ts
use: {
  baseURL: process.env.BASE_URL || 'https://your-vector-url.com',
}
```

---

## 🧪 Test Strategy

- End-to-end coverage of critical user flows
- Smoke tests for core functionality
- Scalable architecture using Page Object Model
- Designed for future CI/CD integration

---

## 📌 Future Improvements

- GitHub Actions CI integration
- Cross-browser execution
- Test data management layer
- API + UI hybrid testing

---

## 👨‍💻 Author

Automation project maintained as part of QA engine
