# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# Usage
Clone the application from git, then "npm install" This will install all the dependencies listed in your package.json file.

# running
npm run dev to run the application

# React
A JavaScript library for building user interfaces, particularly single-page applications. It's used for its efficient and flexible way of rendering components and managing state in web applications.

# Vite
A modern front-end build tool that provides a fast development environment by leveraging native ES modules. It's used for its simplicity, speed, and ease of setup, making the development process more efficient.

# Typescript
A superset of JavaScript that adds static types to the language. It's used for improving code quality, catching errors early, and making code easier to read and maintain.

# cypress
An end-to-end testing framework designed for modern web applications. It's used for writing and running tests in a real browser environment, ensuring that the application behaves as expected for the end-user.

# Jest
A JavaScript testing framework that focuses on simplicity. It's used for writing unit and integration tests for JavaScript and React applications, providing features like mocking, snapshot testing, and test coverage.

# Tailwindcss
A utility-first CSS framework for creating custom designs without having to write a lot of custom CSS. It's used for its speed in styling components and its flexibility in creating responsive designs.

# Boostrap
A popular front-end framework that provides ready-to-use components and styles for building responsive web applications. It's used for its ease of use, consistency in design, and extensive documentation. I used it for mainly grid