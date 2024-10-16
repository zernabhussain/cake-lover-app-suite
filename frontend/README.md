# 🍰 Cake Lovers App (Frontend)

This is the frontend part of the **Cake Lovers** app, a simple web application where users can view, add, and update their favorite cakes. The application is built using **React**, **TypeScript**, and **Material-UI** to provide a responsive and interactive user interface. Users can view a list of cakes, add new cakes with details like name, comment, image, and yum factor, and also update or delete existing cakes.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Testing](#testing)


## Features

- Add new cakes with name, comment, image URL, and yum factor.
- View a list of cakes displayed in a horizontal scrollable grid.
- Update and delete existing cake entries.
- Offline support with service workers for a Progressive Web App (PWA) experience.
- Optimistic UI updates for seamless interactions.

## Technologies Used

- **Frontend**: React, TypeScript, Material-UI
- **Build Tools**: Webpack, Babel, Workbox
- **Version Control**: Git

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

1. **Node.js** (v20.x or higher) - [Download and install Node.js](https://nodejs.org/en/download/)
2. **npm** - Comes bundled with Node.js (version 10.x or higher).
3. A backend server running (refer to the [backend repository](../backend/README.md) for setting up the API).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/zernabhussain/cake-lover-app-suite
   cd cake-lover-app-suite/frontend
   ```
2. Install the dependencies:

   ```bash
   npm install
   ```

3. If you're using a backend API, ensure it's running on `http://localhost:YOUR_BACKEND_PORT`.

## Usage

To start the application in development mode, run:

```bash
npm start
```

This will open the application in your default web browser at `http://localhost:3000`.

## Development

During development, you can make changes to the code, and the application will automatically reload in the browser. You can also check for linting issues using:

```bash
npm run lint
```

## Building for Production

To create an optimized production build, run:

```bash
npm run build
```

This will generate a `build` directory with the production-ready files.

## Testing

To run tests, you can use:

```bash
npm test
```
