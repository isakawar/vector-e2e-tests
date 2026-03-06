# E2E Test Strategy -- Vector Platform

This document describes the **initial automation testing strategy** for
the Vector platform. It defines which areas of the system will be
covered by **Playwright E2E tests** and how tests are grouped.

The goal is to focus automation on **critical user journeys**, not every
possible test case from TestRail.

---

# Testing Scope

E2E tests focus on:

- Critical user flows
- UI functionality
- Cross‑page workflows
- High‑risk features

The following types of tests are **not primary targets for E2E**:

- API validation
- CSV imports
- Admin scripts
- Data migrations
- Backend reports
- Complex admin panel workflows

Those should be covered by **API tests, integration tests, or manual
testing**.

---

# Main User Flows to Automate

The automation will focus on the most important user journeys:

1.  User Registration
2.  User Authentication
3.  User Profile Management
4.  Search and Navigation
5.  SPK Create and edit
6.  MPK Create and edit
7.  MPK Program Interaction
8.  Certificate Generation & Viewing
9.  Reviews and Ratings

These flows represent the **core business functionality** of the
platform.

---

# Test Suites Structure

The Playwright project will organize tests into the following suites.

    tests/
      smoke/
      e2e/
        auth/
        profile/
        search/
        mpk/
        certificates/
        reviews/

---

# Smoke Tests

Smoke tests run on **every CI pipeline execution** to verify that the
platform is operational.

### Scenarios

- User can open homepage
- User can login
- User profile page loads
- MPK page opens
- Certificate page is accessible

---

# Authentication Tests

Directory:

    tests/e2e/auth

### Scenarios

User registration with valid data

Registration validation for required fields

Registration with already used email

User login with valid credentials

Login with invalid credentials

Password recovery flow

Redirect after successful login

---

# Profile Tests

Directory:

    tests/e2e/profile

### Scenarios

Upload avatar

Edit personal information

Add education information

Change password

Delete account

Switch between profile sections

---

# Search and Navigation Tests

Directory:

    tests/e2e/search

### Scenarios

Search by keyword

Search with different casing

Search using special characters

Filtering by region

Filtering by city

Pagination

Sorting results

Search for non‑existing entity

---

# MPK Interaction Tests

Directory:

    tests/e2e/mpk

### Scenarios

Open MPK program page

Register for MPK

View MPK details

Access external resources

Verify enrollment status

Verify access restrictions

---

# Certificate Tests

Directory:

    tests/e2e/certificates

### Scenarios

User receives certificate after completing MPK

Open certificate page

Download certificate

Print certificate

Verify certificate information

---

# Reviews and Ratings

Directory:

    tests/e2e/reviews

### Scenarios

User leaves a review

User edits review

User deletes review

Verify review rating display

Verify review list page

---

# Future Automation Expansion

After stabilizing the initial E2E suite, the following areas may be
automated:

- Monitoring dashboards
- Reporting features
- MPK calendar
- Certificate search endpoints
- CSV imports

---

# Automation Goals

Initial goal:

- 15--25 stable E2E tests
- Cover critical user journeys
- Fast CI execution
- Minimal flaky tests

Long term goal:

- 40--60 E2E tests
- Full coverage of core platform workflows

---

# Principles

Automation tests should follow these rules:

- Tests contain only business logic
- UI locators are located in Page Objects
- Components represent reusable UI blocks
- API calls belong to Controllers
- Tests must be independent and parallel‑safe
