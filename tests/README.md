# Contact Form Test Suite

This directory contains automated tests for the contact form functionality using Playwright.

## Test Overview

The tests verify that:
1. The contact form can be filled out with user information
2. The form can be submitted successfully
3. The success modal appears with the correct message

## Running Tests Locally

To run the tests locally:

```bash
# Install dependencies (if not already installed)
npm install

# Run all tests
npm test

# Run tests with UI mode
npm run test:ui

# Run tests in debug mode
npm run test:debug

# Run tests in headed mode (visible browser)
npm run test:headed
```

## GitHub Actions Integration

These tests are configured to run automatically on GitHub Actions when:
- Code is pushed to the main/master branch
- A pull request is created against the main/master branch

The GitHub Actions workflow:
1. Sets up Node.js
2. Installs dependencies
3. Installs Playwright browsers
4. Runs the tests
5. Uploads test reports as artifacts

## Test Files

- `contact-form.spec.js` - Tests the contact form submission and success modal
