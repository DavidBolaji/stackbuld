# Stackbuld

This repository contains the frontend test project for Stackbuld, built using Next, TypeScript, Tailwind, React Testing Library.

## Table of Contents
- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Testing](#testing)

## Introduction
This project demonstrates a frontend application using modern web development technologies and best practices. It aims to provide a scalable and maintainable codebase, featuring a robust testing setup and efficient state management.

## Technologies Used
- **Next**: For building user interfaces.
- **TypeScript**: For type safety and reducing bugs.
- **Tailwind**: For enhanced and maintainable styling.
- **React Testing Library**: For testing React components.
- **Prisma**: Database ORM.

## Project Structure

```bash
Stackbuld/
├── __test__/ 
├── actions/ 
├── axios/ 
├── components/ 
├── db/
├── hooks/
│ └── usePortal.tsx 
├── libs/ 
│ └── helpers.tsx 
├── prisma/ # database orm
├── public/ # Source files
├── .env # env
├── .eslintrc.json # ESLint configuration
├── .gitignore 
├── .jest.config.ts 
├── .jest.setup.ts 
├── next-env.d.ts 
├── next.config.mjs 
├── package-lock.json # Project dependencies and scripts
├── package.json # Project dependencies and scripts
├── postcss.config.mjs 
├── README.md 
├── tailwind.config.ts
├── tsconfig.json 


```

## Getting Started
To get started with the project, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/DavidBolaji/stackbuld
   cd lendsqr-fe-test
  ```

2. **Install dependencies**:
   ```bash
   npm install
  ```

3. **Run the development server**:
   ```bash
   npm run dev
  ```

4. **Build the project**:
   ```bash
   npm run build
  ```

5. **Preview the production build**:
   ```bash
   npm run start
  ```

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the project for production.
- `npm run start`: Previews the production build.
- `npm run test`: Runs test.
- `npm run test:watch`: Runs test while watching changes.

## Testing
The project uses React Testing Library for testing. Tests are located in the __test__ directory. To run the tests, use the following command:

5. **Preview the production build**:
   ```bash
   npm run test
  ```
## Conclusion

This project setup ensures a modern, efficient, and maintainable frontend application. The combination of Next, TypeScript, Tailwind and React Testing Library.

For more details on each section of the code, refer to the inline comments and documentation within the source files.