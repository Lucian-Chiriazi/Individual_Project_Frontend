
# PC Builder Frontend

This is the React-based frontend for the **PC Builder Recommendation System**, which allows users to input a budget and purpose, and optionally include peripherals or an operating system. It communicates with a backend API to fetch a compatible PC build.

**Live Demo**: [https://lucian-chiriazi.github.io/Individual_Project_Frontend/](https://lucian-chiriazi.github.io/Individual_Project_Frontend/)

## Features

- Budget and purpose input fields
- Peripherals and OS selection via checkboxes
- Validates user input and disables submission if invalid
- Displays component-wise recommendations and a generated build description
- Fully tested with `@testing-library/react`

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/lucian-chiriazi/Individual_Project_Frontend.git
cd Individual_Project_Frontend
npm install
```

### Running Locally

```bash
npm start
```
Change const response = await fetch("https://pc-builder-app-531x.onrender.com/recommend", {
With const response = await fetch("http://localhost:8000/recommend", {

The app will be available at `http://localhost:3000`.

### Running Tests

```bash
npm test
```

Tests are written using React Testing Library and cover:
- Input validation
- Purpose selection
- Checkbox state updates
- Button behavior

## File Structure

- `PCBuilder.js`: Main component handling user input and rendering the recommendation.
- `PCBuilder.test.js`: Unit tests for the `PCBuilder` component.
