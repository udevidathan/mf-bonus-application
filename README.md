# MBO - MicroFrontend - Settings App

## VS Code Plugins for seamless code readability.

- React Snippets - https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets
- QuickType - https://marketplace.visualstudio.com/items?itemName=quicktype.quicktype
- Prettier - https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode - (REQUIRED)
- Eslint - https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint (REQUIRED)
- TODO Highlight - https://marketplace.visualstudio.com/items?itemName=jgclark.vscode-todo-highlight
- Error Lens - https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens

## Nomenclature

We will be using the latest React 18.x Typescript 4.8.x React Router Dom 6.x

### Conventions

- For code standard validation we will be using eslint along with prettier. This will keep the code standard across different development.
- Before committing Husky hooks will run lint staged scripts for checking eslint and prettier errors for staged files. Commit will only happen if husky validation is a success.
- Git will be our version controller.
- We will be using the arrow function as the default expression and declaration of functions.
- The file extension for any React Component or Pages will be "tsx". E.g. App.tsx
- Every component will use arrow function with default export method Components will follow PascalCase naming convention.
- The component folder will follow PascalCase naming convention
- Call-back functions will use snakeCase with arrow functions assigned to a const.
- If the function requires types then define types within the component using interface. If the types are that large object, create types.d.ts file withing the component folder and define types.
- Function argument types can be written within the functions.
- Class names will follow snakeCase with BEM conventions. This will help in create unique class names respect to that component.
- All SCSS variables will follow kebab-case.
- All SCSS Mixins will follow PascalCase.
- For API Calls we will be using axios withing React Query. We will pass and function for Axios call to the query. If we are not using React Query use async await with try-catch block to catch errors. Do not use then catch chaining method.
- Use Context hooks for state sharing and API data sharing will be handled React Query.

## React Folder Structure

### @types

This folder will contain all data types for each API response. All types should be written using "interface" method. Types should be specified to nano-level of the data response. File name for each type should be in the following format Filename.d.ts

Instant types generation Install quick type plugin as your VS Code extension:

https://marketplace.visualstudio.com/items?itemName=quicktype.quicktype

Copy the postman JSON response. Create a file under @types folder. (filename should be meaningful to the file we are generating types) Press command + shift + p Type "paste JSON as Code" Types are auto generated. Make necessary change if required like multiple type support or optional. If any component or page requires additional types, create within main file using interface else you may create types.d.ts file within the folder.

**Note**: Do not use type "ANY" anywhere in the project unless there are no types available. This defeats the purpose of TypeScript types.

### API

API folder holds functionality to generate API URLs and methods to pass necessary headers before the API call happens. We are using AXIOS for making & generating Promises with necessary parameters.

**Index.js**

This is file will create necessary AXIOS headers and auth params and make an AXIOS PROMISE. This promise is returned and can be resolved at any given location within React Project. If project is using React Query for API calls then file should return a function to be called later.

If Project is using any other method to make API calls then file should return a PROMISE to be resolved later async await.

### Assets

This folder contain all projects like icons, images, fonts etc.

### Auth

Auth folder contains all authentication logics and necessary redirection method if required based on logged in user. A protected route component Is used for redirection handling.

### Components

All reusable components are created withing components folder. As for naming Component Folder and File name will follow PASCAL CASE except index file.

### Context

All context related methods and global shared states will be places under context folder.

### Data

This folder will contain all dummy data for the development of UI.

### Hooks

This folder will container all custom hooks. If the project is using React Query create another folder within called "APIHooks" for global sharing of data and methods.

### Pages

This folder will contain all individual pages folder along with Page component and its logic and state.

### Styles

This folder will contain all universal style related files. Variables, Typography, Spacings, Reset CSS, Mixins etc.

### Utils

This will contain all reusable helper functions.

## VS Code Extensions

### React Snippets

This help generate a react component with snippets. Code to generate default export arrow function component -- rafce

## QuickType

This will help generate types from a response and avoid human errors in types.

Copy the JSON response from POSTMAN. Create a file under @types folder. (file name should be meaningful to the file we are generating types) Press command + shift + p.

Type "paste JSON as Code". Type in the file name as the Top level type names

Types are auto generated. We don't export as we are using d.ts extension therefore you can remove all export key. Make necessary change if required like multiple type support or optional and rename type to unique type names.

### Prettier

This is extension is required for file formatting and code standardisation. This works along eslint, list-staged and husky.

### Eslint

This is extension is required for file formatting and code standardisation. This works along Prettier, list-staged and husky.

### TODO Highlight

This extension very useful if we want to mark anything for later purpose or Lead wants another developer to fix an issue, this extension will help highlight comments. Usage: If something needs to be done later, within a comment we can write TODO: this will highlight the comment in orange color. If some code needs to be fixed, then within a comment we can write FIXME: this will highlight the comment in red color.

### Error Lens

This plugin will let know user which line has error and error message more easily without searching each line and hovering to know what is the error message. This works along with code validation plugins. Prettier and Eslint.
