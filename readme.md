# Node.js TypeScript Starter Template

A robust and minimal Node.js starter template using TypeScript, ESLint, Prettier, Husky, and more — ideal for building scalable backend applications with a clean and consistent codebase.

## 🚀 Features

- TypeScript with strict typing and modern ECMAScript support

- ESLint for code quality and best practices

- Prettier for consistent code formatting

- Environment variable management via .env

- Clean project structure with src/ and build/ directories

- Ready for production builds and CI/CD integration

## 📁 Project Structure

```
node-start-template/
├── src/
│   └── index.ts
├── build/
├── .env
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── .eslintignore
├── tsconfig.json
├── package.json
└── README.md
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)

- npm

### Installation

```bash
git clone https://github.com/joserafaelSH/node-start-template.git
cd node-start-template
npm install
rm -rm .git
```

### Development

```bash
npm run dev
```

This command starts the application in development mode using tsx with hot-reloading.

### Production Build

```bash
npm run build
npm start
```

## 📜 Scripts

- "dev": – Start development server with hot-reloading
- "build": – Compile TypeScript to JavaScript
- "start": – Run the compiled application
- "test": - Run the tests
- "prettier": – Format code with Prettier
