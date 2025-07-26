# Project-N

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

Welcome to **Project-N**! This comprehensive platform leverages modern web technologies to provide seamless user experiences with a focus on healthcare services, team collaboration, and interactive features.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Interactive Games](#interactive-games)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Project Overview

**Project-N** is a modern healthcare platform aimed at delivering rich and interactive user experiences. It features multiple services including chatbot assistance, healthcare consultations, team management, video calling capabilities, and interactive wellness games. The project showcases professional design with responsive UI across all devices.

Built with **Next.js** for the frontend and **MongoDB** for data management, the platform provides a seamless React-based user experience, utilizing **TailwindCSS** for styling and **TypeScript** for type safety.

## Features

- **Healthcare Services**
  - Video consultation with healthcare professionals
  - AI-powered chatbot assistance
  - Specialized health services (MindEase, GoldenCare, PetAI, etc.)
- **Team Management**

  - Team member profiles and expertise showcase
  - Role-based team organization
  - Admin upload interface for team management

- **Communication Tools**
  - Video and audio calling interface
  - End-to-end encrypted messaging
  - Screen sharing capabilities
- **Interactive UI Components**
  - Fully responsive design across all devices
  - Dark/Light mode toggle for user preference
  - Animated sections and transitions
- **Interactive Wellness Games**
  - Bubble Pop - Reflexes and focus enhancement
  - Bloom Buds - Cognitive response training

## Technologies Used

### Frontend

- **Next.js 14**: React-based framework for server-side rendering and static site generation
- **React**: JavaScript library for building user interfaces
- **TailwindCSS**: Utility-first CSS framework for responsive design
- **TypeScript**: Statically typed JavaScript for enhanced developer productivity
- **Shadcn/UI**: Component library for consistent design patterns
- **Framer Motion**: Animation library for smooth transitions

### Backend

- **MongoDB**: NoSQL database for storing team and user information
- **Next.js API Routes**: Backend API functionality
- **Cloudinary**: Cloud storage for image assets and uploads

### Development Tools

- **PostCSS**: CSS tool for transforming styles
- **ESLint**: Static code analysis for identifying problems
- **Custom Hooks**: Specialized React hooks for media queries and screen sizes

## Project Structure

The directory structure is organized to maintain modularity and clean code:

```bash
├── app/                          # Next.js app router pages
│   ├── api/                      # API routes for backend functionality
│   ├── bubble/                   # Bubble Pop game
│   ├── bloom-buds/               # Bloom Buds game
│   ├── callscreen/               # Video/audio call interface
│   ├── team/                     # Team showcase pages
│   ├── goldencare/               # Elderly care service
│   ├── mindease/                 # Mental wellness service
│   ├── pet-ai/                   # Pet healthcare service
│   └── UploadTeam/               # Admin interface for team management
├── components/                   # Reusable UI components
│   ├── ui/                       # Base UI components (buttons, cards, etc.)
│   ├── Team/                     # Team-related components
│   ├── Hero/                     # Hero section components
│   ├── Features/                 # Features section components
│   ├── Footer/                   # Footer components
│   ├── NavBar/                   # Navigation components
│   ├── ChatBotServices/          # Chatbot-related components
│   ├── shared/                   # Shared utilities (cursor, animations)
│   └── Patron/                   # Investor/patron components
├── contents/                     # Static content data
├── hooks/                        # Custom React hooks
├── lib/                          # Utility functions and helpers
├── public/                       # Static assets
└── sections/                     # Major page sections
```

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher) or Yarn
- MongoDB connection (URI provided or local setup)

### Steps to Set Up

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Cybrite/Project-N.git
   cd Project-N
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file with the following variables:

   ```
   MONGODB_URI=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Run the development server**:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open the application** in your browser at [http://localhost:3000](http://localhost:3000)

## Usage

After installation, you can:

- Explore the healthcare services on the homepage
- Navigate to specialized services like MindEase or GoldenCare
- Try the interactive games (Bubble Pop or Bloom Buds)
- View the team page with member profiles
- Test the video call interface in the callscreen section
- Upload new team members through the admin interface

## API Endpoints

The project includes the following API endpoints:

- **GET/POST /api/team** - Manage team members data
- **GET /api/connection** - Test MongoDB connection
- **POST /api/updateStatus** - Update document status in MongoDB

## Interactive Games

### Bubble Pop

Located at `/bubble`, this game helps improve reflexes and focus by challenging players to pop red bubbles before they float away. Features include:

- Score tracking and high score saving
- Reaction time measurement
- Dynamic difficulty progression

### Bloom Buds

Located at `/bloom-buds`, this cognitive training game challenges players to tap on active buds before they wither. Features include:

- Performance history tracking
- Reaction time analytics
- Visual feedback system

## Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) guide for:

1. Forking the repository
2. Creating a feature branch
3. Making your changes
4. Submitting a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- **GitHub Repository**: [https://github.com/Cybrite/Project-N](https://github.com/Cybrite/Project-N)
- **Issues and Feature Requests**: [GitHub Issues](https://github.com/Cybrite/Project-N/issues)

---

Built with ❤️ by the NirveonX team

- View the team page and other features

## Contributing

We love contributions from the community! Please refer to our detailed [CONTRIBUTING.md](CONTRIBUTING.md) guide for steps on how to contribute to this project.

The contribution process involves:

1. Forking the repository
2. Creating a feature branch
3. Making your changes
4. Submitting a pull request

For more detailed instructions, please see the [CONTRIBUTING.md](CONTRIBUTING.md) document.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- **GitHub Repository**: [https://github.com/Cybrite/Project-N](https://github.com/Cybrite/Project-N)
- **Issues and Feature Requests**: [GitHub Issues](https://github.com/Cybrite/Project-N/issues)

---

Built with ❤️ by the NirveonX team
