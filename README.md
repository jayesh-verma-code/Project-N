# Project-N

Welcome to **Project-N**! This project is designed to be a comprehensive platform that leverages the power of modern web technologies to provide seamless user experiences and interactive features.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Contributing](#contributing)


## Project Overview

**Project-N** is a modern web application aimed at delivering a rich and interactive user experience. It features multiple sections, including a team page, a chatbot service, and various feature sections, each with dynamic content and responsive design.

This project is built with **Next.js** for the frontend, providing a seamless React-based user experience. It also utilizes **TailwindCSS** for styling and **TypeScript** for type safety.

## Technologies Used

### Frontend

- **Next.js**: A React-based framework for building static and dynamic web applications with server-side rendering and static site generation.
- **React**: JavaScript library for building user interfaces.
- **TailwindCSS**: Utility-first CSS framework for creating custom designs quickly.
- **TypeScript**: A statically typed superset of JavaScript for enhanced developer productivity and type safety.
- **PostCSS**: CSS tool for transforming styles with JavaScript plugins.
- **ESLint**: A static code analysis tool for identifying and fixing problems in JavaScript code.

### Backend

The backend for this project is planned for future development and will include services like user authentication, API integrations, and database management.

## Project Structure

The directory structure of **Project-N** is organized to keep code modular, clean, and maintainable. Below is an overview of the project structure:

```bash
├── app
│   ├── team
│   │   ├── favicon.ico           # Favicon for the app
│   │   ├── globals.css           # Global CSS styles for the app
│   │   ├── layout.tsx            # Layout component to define the structure of team-related pages
│   │   └── page.tsx              # Page component for the team-related content
│
├── components
│   ├── About                     # Folder for the About section components
│   ├── ChatBotServices           # Folder for chatbot services related components
│   ├── Features                  # Folder for the Features section components
│   ├── Footer                    # Folder for the Footer section components
│   ├── Hero                      # Folder for the Hero section components
│   ├── NavBar                    # Folder for the NavBar section components
│   ├── Team                      # Folder for Team-related components
│   ├── shared                    # Shared components used across the app
│   ├── ui                        # UI components like buttons, forms, etc.
│   ├── TeamClient.tsx            # Client-side component for Team
│   ├── auth-section.tsx          # Component for the authentication section
│   ├── marquee-text.tsx          # Component for marquee-style text display
│   ├── pioneer.tsx               # Component for the pioneer section
│   ├── signup-form.tsx           # Component for user signup form
│   └── theme-toggle.tsx          # Component for toggling the theme (light/dark)
│
├── contents
│   ├── chatbot-services.ts       # Content related to chatbot services
│   ├── faq-section.ts            # Content for the FAQ section
│   ├── features-section.ts       # Content for the Features section
│   ├── pioneer-section.ts        # Content for the pioneer section
│   └── team-section.ts           # Content for the Team section
│
├── hooks
│   ├── use-media-query.ts        # Custom hook to handle media queries for responsive design
│
├── lib
│   ├── animation.ts              # Animation helper functions
│   ├── utils.ts                  # Utility functions for various app operations
│
├── public
│   ├── file.svg                  # SVG image file
│   ├── globe.svg                 # SVG image for globe
│   ├── next.svg                  # SVG image for Next.js logo
│   ├── vercel.svg                # SVG image for Vercel logo
│   └── window.svg                # SVG image for window graphic
│
├── sections
│   ├── ChatBotServices           # Folder for the chatbot services section
│   ├── FAQs                      # Folder for FAQ section
│   ├── Features                  # Folder for Features section
│   ├── Hero                      # Folder for Hero section
│   └── marginals                 # Folder for marginal sections
│
├── .env.example                  # Example environment file with default environment variables
├── .gitignore                    # Git ignore rules for version control
├── README.md                     # Project documentation
├── components.json               # Metadata about components used in the project
├── eslint.config.mjs             # ESLint configuration file for linting rules
├── middleware.ts                 # Middleware file for handling custom server-side logic
├── next.config.ts                # Next.js configuration for custom settings
├── package-lock.json             # Dependency lock file to ensure consistent installs
├── package.json                  # Project dependencies, scripts, and metadata
├── postcss.config.mjs            # PostCSS configuration for CSS processing
├── tailwind.config.ts            # TailwindCSS configuration for design system
├── tsconfig.json                 # TypeScript configuration file
```
## Installation

Follow these steps to set up **Project-N** locally.

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **Yarn** (optional)

### Steps to Set Up

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Cybrite/Project-N.git
   cd Project-N
   ```
   
2. **Install the dependencies:**
   Using npm:
   ```bash
    npm install
   ```
   Or using Yarn:
    ```bash
   yarn install
    ```
3.**Set up environment variables:**   
    Create a .env file based on .env.example and set your required environment variables.

4. Run the development server: Using npm:
    ```bash
    npm run dev
    ```
    Or using Yarn:
     ```bash
     yarn dev
      ```
 5. Open the application in your browser at http://localhost:3000.

## Contributing

We love contributions from the community! If you'd like to contribute to Project-N, follow these steps:

1. **Fork the repository on GitHub and clone it to your local machine.**
2. **Create a new branch:**
    ```bash
    git checkout -b your-branch-name
    ```
3. **Make your changes and write tests where applicable.**
4. **Commit your changes:**
    ```bash
    git add .
    git commit -m "Your commit message"
    ```
5. **Push to your fork:**
    ```bash
    git push origin your-branch-name
    ```
6. **Create a pull request from your fork to the main branch of the repository.**

## Coding Guidelines

- **Follow the ESLint rules for code formatting.**
- **Use TypeScript for type safety and consistency.**
- **Add or update tests if necessary.**
- **Write clear and concise commit messages.**


     
