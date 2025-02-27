# Test Website for QA Agent Evaluation

This is a multi-page website designed to test and evaluate autonomous QA agents. The site incorporates a variety of components and structures commonly found in modern websites, providing a robust testbed for evaluating functionality, usability, responsiveness, and error handling.

## Website Structure

The website consists of five main pages:

- **Homepage**: Features navigation and introductory content.
- **About Page**: Displays static information with profiles.
- **Gallery Page**: Showcases images with interactive modals.
- **Blog Page**: Lists articles with links to full posts.
- **Contact Page**: Includes a form with validation and submission handling.

Additionally, there is a custom 404 page for handling navigation errors.

## Technology Stack

### Frontend
- HTML5: Semantic tags for structure and accessibility.
- CSS3 with Bootstrap 5: Provides styling and responsiveness.
- JavaScript (ES6+): Handles interactivity (e.g., form submissions, modals).

### Backend
- Node.js with Express: A lightweight server to handle form submissions.

## Features for Testing

The website includes various features designed to test different aspects of QA agent capabilities:

- **Navigation Menu**: A responsive navbar across all pages.
- **Forms**: A contact form with various input types and client-side validation.
- **Interactive Elements**: Buttons, clickable images, and modals.
- **Images and Multimedia**: A gallery with alt texts for accessibility.
- **Responsive Design**: Bootstrap ensures the site adapts to different screen sizes.
- **Dynamic Content**: JavaScript-driven features like form submissions and modal displays.
- **Error Handling**: A 404 page and a broken image link.
- **Accessibility**: Semantic HTML, ARIA labels, and alt texts.

## Running the Website

1. Install dependencies:
   ```
   pnpm install
   ```

2. Start the server:
   ```
   pnpm start
   ```

3. Access the website:
   Open your browser and navigate to `http://localhost:3000`

For development with auto-reload:
```
pnpm run dev
```
