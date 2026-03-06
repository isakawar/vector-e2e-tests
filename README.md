# Vector E2E Tests

Автотести для платформи **Vector**.\
Тести написані на **Playwright + TypeScript** і покривають:

- UI для анонімних користувачів
- UI для авторизованих користувачів
- API-ендпоінти

Проєкт побудований так, щоб тести було легко читати, розширювати і
підтримувати.

---

# Стек

У проєкті використовується:

- **Playwright** --- автоматизація браузера і тест-ранер\
- **TypeScript** --- strict режим і сучасна конфігурація модулів\
- **Page Object Model** --- для організації UI тестів\
- **Controller pattern** --- для API тестів\
- **Qase** --- управління тест-кейсами\
- **ESLint + Prettier + Husky** --- автоматична перевірка коду перед
  комітом

---

# Перший запуск

Встанови залежності:

```bash
npm install
```

Встанови браузер:

```bash
npx playwright install chromium
```

Скопіюй env файл і заповни свої значення:

```bash
cp env/.env.example env/.env.dev
```

Запуск тестів:

```bash
npm test
```

Запуск з відкритим браузером (зручно для дебагу):

```bash
npm run test:headed
```

Відкрити HTML звіт:

```bash
npx playwright show-report
```

---

# Структура проєкту

```text
vector-e2e-tests/
│
├── src/
│   ├── client/
│   │   └── ApiClient.ts
│   │
│   ├── controllers/
│   │   ├── BaseController.ts
│   │   └── AuthController.ts
│   │
│   ├── pageObjects/
│   │   ├── BasePage.ts
│   │   └── MainPage.ts
│   │
│   ├── components/
│   │   ├── Header.ts
│   │   ├── Footer.ts
│   │   └── CookieBanner.ts
│   │
│   ├── fixtures/
│   │   └── base.fixture.ts
│   │
│   ├── utils/
│   │   └── dataGenerator.ts
│   │
│   └── test-data/
│       ├── urls.ts
│       ├── navigation.ts
│       └── pageTitles.ts
│
├── tests/
│   ├── setup/
│   │   └── auth.setup.ts
│   │
│   ├── ui/
│   ├── ui-auth/
│   └── api/
│
├── env/
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

---

# Як пов'язані частини фреймворку

```text
components
   ↓
pageObjects
   ↓
fixtures
   ↓
tests
```

### UI частина

- **components** --- невеликі UI блоки (header, footer, cookie banner)
- **pageObjects** --- сторінки, що складаються з компонентів
- **fixtures** --- створюють сторінки для тестів
- **tests** --- містять тільки тестову логіку

---

### API частина

```text
controllers
   ↓
ApiClient
   ↓
tests/api
```

- **controllers** --- окремі API домени
- **ApiClient** --- об'єднує всі контролери
- **tests/api** --- API тести

---

# Авторизація

Авторизація виконується **через API**, без відкриття браузера.

Використовується стандартний **Django CSRF flow**.

Сесія зберігається у:

    state/.auth/user.json

UI-тести з папки `tests/ui-auth/` використовують цей файл і запускаються
вже з авторизованою сесією.

Setup файл:

    tests/setup/auth.setup.ts

Він запускається автоматично перед тестами.

---

# Необхідні змінні середовища

```dotenv
BASE_URL=
TEST_EMAIL=
TEST_PASSWORD=
```

---

# Середовища

Команда Середовище

---

`npm test` dev
`npm run test:headed` dev
`npm run test:stage` stage
`npm run test:prod` prod

Конфігурація читається з:

    env/.env.<environment>

Змінні з CI мають пріоритет над файлами.

---

# Qase інтеграція

Запуск тестів з відправкою результатів у Qase:

```bash
npm run test:qase
npm run test:stage:qase
npm run test:prod:qase
```

Потрібні змінні:

    QASE_TESTOPS_API_TOKEN
    QASE_TESTOPS_PROJECT

---

# CI

Тести запускаються автоматично через **GitHub Actions** при:

- push
- pull request

Workflow:

    .github/workflows/playwright.yml

---

# Як додати нову сторінку

### 1. Створи компонент

```ts
// src/components/Sidebar.ts
export class Sidebar {
  constructor(private page: Page) {}

  navItem(text: string) {
    return this.page.getByText(text);
  }
}
```

### 2. Створи Page Object

```ts
export class DashboardPage extends BasePage {
  readonly sidebar = new Sidebar(this.page);
}
```

### 3. Додай фікстуру

```ts
dashboardPage: async ({ page }, use) => {
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.goto('/uk/dashboard/home-screen/');
  await use(dashboardPage);
},
```

### 4. Напиши тест

```ts
test("User sees sidebar on dashboard", async ({ dashboardPage }) => {
  await expect(dashboardPage.sidebar.root).toBeVisible();
});
```

---

# Як додати новий API контролер

```ts
export class UserController extends BaseController {
  async getCurrent() {
    return this.request.get("/uk/api/users/current/");
  }
}
```

Додай його в `ApiClient`, після цього можна писати API тести.

---

# Тестові дані

Не хардкодь дані у тестах.

Усі:

- URL
- тексти
- навігаційні лейбли

зберігаються у:

    src/test-data/

---

# Швидка підказка

Що це Куди класти

---

UI блок `src/components/`
Page Object `src/pageObjects/`
API контролер `src/controllers/`
Константи `src/test-data/`
Утіліти `src/utils/`
UI тест `tests/ui/`
UI тест з логіном `tests/ui-auth/`
API тест `tests/api/`

---

# Contributing

Перед створенням PR перевір чек-лист у:

    .github/pull_request_template.md

Husky при коміті автоматично запускає:

- Prettier
- ESLint

Якщо перевірка впала --- виправ помилки і закоміть зміни ще раз.
