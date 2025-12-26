# Planning of this web application

**Tech to be used:**

- Node.js 
- Angular (v20+) with `standalone` components and `signals` + `http-resource` and more modern features instead of `ngModules` or old school `ngModules`
- No Rxjs, no `ngrx` or any other state management library, just `signals`
- TailwindCSS v4.x+ with tailwind-variants for custom styles

## Our Objective

We want to make a sample web application for a demo of our product. It is an accounting to inventory management ERP application. we need commons features that is associated with these and must adopt modern angular tuning / features to have better DX.

## Strategies

- Mock an API client using `http-resource` for demo API calls.
- Use `signals` for state management.
- Use `standalone` components for better DX and tree-shakability.
- Use `tailwind-variants` for custom styles.
- No material or ngrx etc. old school libraries.
- Proper components and views with all necessary elements like buttons, inputs, tables, etc.
- For now, we only need SPA (Single Page Application) with no server-side rendering.
- We will use `angular-cli` for project setup and development.

## Components and Views

- Login Page
- Dashboard
- Inventory Management
- Accounting
- Sales and Purchases
- Reports


### Login Page

- User authentication using `http-resource` mock API.
- Simple login form with username and password fields.
- Error handling for invalid credentials.

### Dashboard

- Overview of key metrics and recent activities.
- Navigation to other sections of the application.

### Inventory Management

- Display a list of inventory items with details like name, quantity, price, etc.
- Add, edit, and delete inventory items.
- Search and filter inventory items.

### Accounting

- Display a list of financial transactions with details like date, description, amount, etc.
- Add, edit, and delete financial transactions.
- Search and filter financial transactions.

### Sales and Purchases

- Display a list of sales and purchases with details like date, customer/provider, items, total amount, etc.
- Add, edit, and delete sales and purchases.
- Search and filter sales and purchases.

### Reports 

- Generate reports like sales summary, inventory status, etc.
- Display reports with filters and options for export.

