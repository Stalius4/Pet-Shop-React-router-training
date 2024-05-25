1. [Installing React Router](#Installig)
2. [React Router Refactoring Options](#Refactoring_Options)
3. [React_Root_Component_Setup](#2.React_Root_Component_Setup)
4. [Dynamic_Routes](#3._Dynamic_Routes)
5. [useParams](#3.1_useParams)
6. [NavLink_Component_isActive](#3.2_NavLink_Component_isActive)
7. [createSearchParams()](#4._createSearchParams())
8. [useSearchParams()](#5._useSearchParams())
9. [Navigate()](#6._Navigate())

# Installing

**1.  Install React Router DOM package.**

  `npm install react-router-dom`
  
* * *
  <br>

**2. Importing Required Modules**

```jsx

import {
  RouterProvider,
	createBrowserRouter,
	createRoutesFromElements, Route} from "react-router-dom";



```
* * *

<br>

**3. Defining Routes**

The **createBrowserRouter** and **createRoutesFromElements** functions are used to define the application's routes:

```jsx
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />}/>
      <Route path="about" element={<About />} />
    </Route>
  )
);
```

- **Root Route**: The base route (/) renders the Root component.
	- 	**Nested Routes**:
	- 	**Index Route**: Renders the `Home` component when the user visits the base URL (/).
	- 	**About Route**: Renders the `About` component when the user visits /about.
	
* * *
<br>

**4.  Integrating the Router with the Application**

The **RouterProvider** component is used to integrate the router into the main application component (`App`):

```jsx
function App() {
  return <RouterProvider router={router} />;
}
```

- **RouterProvider**: This component takes the `router` configuration and makes it available throughout the app, enabling the defined routes to be rendered based on the current URL.

* * *

# Refactoring_Options

### 1. Using JSX directly:
```jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
      </Routes>
    </Router>
  );
}

export default App;
```
<br>

### 2. Using RouterProvider:

```jsx
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

const appRouter = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Root />} />
));

function App() {
  return (
    <RouterProvider router={appRouter}>
      <Root />
    </RouterProvider>
  );
}

export default App;
```
<br>

### 3. Using a custom Router component:
```jsx
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Fragment } from "react";

const appRouter = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Root />} />
));

function CustomRouter({ children }) {
  return (
    <RouterProvider router={appRouter}>
      {children}
    </RouterProvider>
  );
}

function App() {
  return (
    <CustomRouter>
      <Root />
    </CustomRouter>
  );
}

export default App;
```

# 2.React_Root_Component_Setup

### Imports
```jsx
import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import "../styles.css";
import Footer from "../components/Footer";
```
- **Outlet** is imported from `react-router-dom` to render child routes.
<br>
* * *
### Root Component

```jsx
export default function Root() {
  return (
    <>
      <div className="app-container">
        <Navbar />
        <main>
          <Outlet /> //
        </main>
        <Footer />
      </div>
    </>
  );
}
```

### Usage in React Router

- This `Root` component can be used as a layout component in `react-router-dom`.
- It provides a consistent structure with **navigation and footer across different pages**.
- The `Outlet` component dynamically renders different child routes, keeping the layout consistent.


# 3._Dynamic_Routes

### Overview of `products/:title` and Dynamic Routing

Dynamic routing in React Router allows you to create routes that can match patterns with variable segments. This is particularly useful for rendering specific content based on parameters like product IDs, user IDs, slugs, etc.
* * *
**Code Explanation**
`Products.js`
The Products component lists products and provides links to their detailed views using NavLink from react-router-dom. Each link points to a dynamic route based on the product's slug.

```jsx
import React from 'react';
import "../styles/products.css";
import { NavLink } from 'react-router-dom';

const products = [
  { id: 1, name: "Safety Shoes", slug: "safety", ... },
  { id: 2, name: "Boots", slug: "boots", ... },
  { id: 3, name: "Trainers", slug: "trainers", ... }
];

const Products = () => (
  <div className="product-container">
    <h2>Our Products</h2>
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} className="product-image" />
          <NavLink to={product.slug}><h3>{product.name}</h3></NavLink>
          <p>{product.description}</p>
          <p className="product-price">{product.price}</p>
        </div>
      ))}
    </div>
  </div>
);

export default Products;
```

**Things to remember:**
- I am using product.slug in 
```jsx
<NavLink to={product.slug}><h3>{product.name}</h3></NavLink>
```
* * *
<br>

`ProductDetail.js`

The ProductDetail component fetches and displays the details of a specific product based on the dynamic segment of the URL. It uses the **useParams** hook to access the `title` parameter and find the corresponding product.
```jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/productDetail.css';

const products = [
  { id: 1, name: "Safety Shoes", slug: "safety", ... },
  { id: 2, name: "Boots", slug: "boots", ... },
  { id: 3, name: "Trainers", slug: "trainers", ... }
];

const ProductDetail = () => {
  const { title } = useParams();
//match title url and product.slug
  const product = products.find(p => p.slug === title);

  return (
    <div className="product-detail-container">
      <img src={product.image} alt={product.name} className="product-detail-image" />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p className="product-detail-price">{product.price}</p>
      <button className="buy-button">Buy Now</button>
    </div>
  );
};

export default ProductDetail;
```
<br>

* * *
### Routing setup
 The **products/:title** route captures the dynamic segment for product details.

```jsx
      <Route path="products" element={<Products />} />
      <Route path="products/:title" element={<ProductDetail />} />
```

# 3.1_useParams

When you define a route with a dynamic segment, such as `products/:title`, React Router makes the value of this segment available as a parameter. The` useParams` hook is used to access these parameters.

Here's why they need to match:
1. **Route Definition**: The dynamic segment is defined in the route with a specific name.

```jsx
Copy code
<Route path="products/:title" element={<ProductDetail />} />
```
In this case, the dynamic segment is named title.

2. **Accessing Parameters**: The useParams hook returns an object containing all the dynamic segments as keys.

```jsx
const { title } = useParams();
console.log(title)//boots
```
The key title in the destructured object corresponds to the **:title** segment in the route definition.

In this case 

http://localhost:3000/products/boots



# 3.2_NavLink_Component_isActive 

```jsx
  <NavLink to={`/path`}
    className= {({isActive})=> isActive ?'nav-link nav-link-active' : 'nav-link'}>
  </NavLink>{' '}
```


### Why Use Destructuring with isActive
The NavLink component passes an object to the function you provide for the className. This object contains some properties related to the navigation link, one of which is isActive.

When you write `({isActive})`, you are telling the function to:

- Take the first argument as an object.
- Look inside that object.
- Find a property named isActive.
- Extract that property's value and let you use it directly as a variable named isActive inside the function.
- This is simpler and cleaner than taking the whole object and then using dot notation to access the property, like this:


```jsx
className= {(navData) => navData.isActive ? 'nav-link nav-link-active' : 'nav-link'}
```
Instead, you use destructuring to directly access isActive:
```jsx
className= {({isActive}) => isActive ? 'nav-link nav-link-active' : 'nav-link'}
```


# 4._createSearchParams()

`createSearchParams` takes an object and turns it into a query string for a URL. A query string is the part of a URL that comes after the `?` and contains key-value pairs of data.

### Example:

1. **HTML Form:**
   - Imagine you have a form where you type a name and hit search.

```jsx
<form onSubmit={onSearchHandler} className="search-form">
  <input type="text" className="search" ref={searchInputRef} />
  <button type="submit" className="search-button">
    🔎
  </button>
</form>
```

2. **JavaScript Object:**
   - When you type "John" in the input field and submit the form, `searchQuery` will be created like this:

```jsx
const searchQuery = {
  name: "John"
};
```

3. **Creating the Query String:**
   - `createSearchParams(searchQuery)` will convert this object into a query string.

```jsx
const query = createSearchParams(searchQuery);
// This will result in: "name=John"
```

4. **Putting It All Together:**
   - When you submit the form, the `onSearchHandler` function creates this query string from the input value.

Here's the complete simplified example with explanations:

```jsx
import React, { useRef } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();
  const searchInputRef = useRef();

  const onSearchHandler = (e) => {
    e.preventDefault();

    // Get the value from the input field
    const searchQuery = {
      name: searchInputRef.current.value
    };

    // Convert the object to a query string
    const query = createSearchParams(searchQuery);

    // Navigate to a new URL with the query string
    navigate(`/search?${query}`);
  };

  return (
    <form onSubmit={onSearchHandler} className="search-form">
      <input type="text" className="search" ref={searchInputRef} />
      <button type="submit" className="search-button">
        🔎
      </button>
    </form>
  );
};

export default Search;
```

### Summary:
- **Input:** User types "John" in the search box.
- **Object:** `{ name: "John" }`
- **Query String:** `"name=John"`
- **Resulting URL:** `/search?name=John`

This way, you can use `createSearchParams` to easily turn an object into a URL query string for navigation or other purposes.








# 5._useSearchParams() 

The `useSearchParams()` is a React hook from the `react-router-dom` package, which provides a convenient way to manage the URL query parameters in web applications built with React. This hook is crucial for reading and modifying the search parameters of the URL, facilitating the synchronization of state with the URL in React Router-based projects.

## How to Use useSearchParams()

### 1. Importing the Hook

First, ensure that you have imported `useSearchParams` from `react-router-dom`.

```javascript
import { useSearchParams } from 'react-router-dom';
```

### 2. Reading Search Parameters

You can use the hook to access the current search parameters. It returns a `URLSearchParams` object which you can use to retrieve the value of specific search parameters.

### 3. Setting Search Parameters

The hook also provides a function to modify the search parameters. Using this setter function allows you to update the search parameters, which in turn updates the URL automatically.

## Example: Search Component

Here is an example of a component that uses `useSearchParams` to manage a search query:

```javascript
function SearchComponent() {
    // useSearchParams returns a pair: the current search parameters and a function to update them
    const [searchParams, setSearchParams] = useSearchParams();

    // Reading a parameter named 'name'
    const name = searchParams.get('name');

    // Function to handle changes, for example, triggered by an input field
    const handleNameChange = (event) => {
        // Set new search parameters
        // This updates the URL and can trigger re-renders if other components depend on the search parameters
        setSearchParams({ name: event.target.value });
    };

    return (
        <div>
            <input type="text" value={name || ''} onChange={handleNameChange} />
            <p>Searching for: {name}</p>
        </div>
    );
}
```

In the `SearchComponent`, an input field updates the 'name' search parameter in the URL when its value changes. The `setSearchParams` function is called, which updates the URL without a page reload, demonstrating a practical use of `useSearchParams` for features like live search filters or settings.




# 6._Navigate()

```jsx
import { useNavigate } from 'react-router-dom';
const PetDetailsNotFound = () => {

  // get the navigate function from useNavigate
  const navigate = useNavigate();

  const goHome = () => {
    // Go home!
navigate("/")
  }
  ```
  
  or
  
  ```jsx
import { useNavigate ,createSearchParams} from 'react-router-dom';




const Search = () => {

  // get navigate function
  const navigate = useNavigate();

  //Creates a reference to the search input field using the `useRef` hook. This reference allows direct access to the input field in the DOM.
  const searchInputRef = useRef();

  const onSearchHandler = (e) => {
    e.preventDefault();

    //It extracts the value entered by the user in the input field and constructs a search query object containing the name property.
    const searchQuery = {
      name: searchInputRef.current.value
    }

    // function to convert the search query object into a URL search string.
    const query = createSearchParams(searchQuery);

    // imperatively redirect with useNavigate() returned function
    navigate({
      pathname: '/search',
      search:`?${query}`
  })};
	```