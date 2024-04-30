# magicui-react-hooks

This package provides a collection of useful React hooks and utilities for building UI components.

## Table of Contents

- [Hooks](#hooks)
  - [useBreakpoints](useBreakpoints)
  - [useControlledForm](useControlledForm)
  - [useDebounce](useDebounce)
  - [useDebounceEffect](useDebounceEffect)
  - [useLocalStorage](useLocalStorage)
  - [useMediaQuery](useMediaQuery)
  - [useEffectOnce](useEffectOnce)
  - [useViewport](useViewport)
  - [useIntersection](useIntersection)
  - [useFormValidation](useFormValidation)
  - [useOnClickOutSide](useOnClickOutSide)

## Hooks

## Examples of all available hooks

### useMediaQuery

By destructuring `isMobile`, `isTablet`, and `isDesktop` from the `useMediaQuery hook`, you have more flexibility in rendering different content or applying different styles based on the specific breakpoint.

```javascript
import React from "react";
import { useMediaQuery } from "magicui-react-hooks";

const ResponsiveLayout: React.FC = () => {
  const { isMobile, isTablet, isDesktop } = useMediaQuery();

  return (
    <div>
      {isMobile && (
        <div className="mobile-layout">
          <h1>Mobile Layout</h1>
        </div>
      )}
      {isTablet && (
        <div className="tablet-layout">
          <h1>Tablet Layout</h1>
        </div>
      )}
      {isDesktop && (
        <div className="desktop-layout">
          <h1>Desktop Layout</h1>
        </div>
      )}
    </div>
  );
};

export default ResponsiveLayout;
```

### useViewport

By using the useViewport hook, you can easily access the current viewport dimensions and adapt your component's rendering or behavior based on the viewport size. This is particularly useful for creating responsive layouts or making decisions based on the available screen space.

```javascript
import React from "react";
import { useViewport } from "magicui-react-hooks";

const ResponsiveComponent: React.FC = () => {
  const { width, height } = useViewport();

  return (
    <div>
      <h1>Viewport Dimensions</h1>
      <p>Width: {width}px</p>
      <p>Height: {height}px</p>
      {/* Render content based on viewport dimensions */}
      {width < 600 && (
        <div>
          <h2>Mobile Content</h2>
          {/* Mobile-specific content */}
        </div>
      )}
      {width >= 600 && width < 1200 && (
        <div>
          <h2>Tablet Content</h2>
          {/* Tablet-specific content */}
        </div>
      )}
      {width >= 1200 && (
        <div>
          <h2>Desktop Content</h2>
          {/* Desktop-specific content */}
        </div>
      )}
    </div>
  );
};

export default ResponsiveComponent;
```

### useControlledForm

The useControlledForm hook provides a simple and reusable way to manage form state and handle form submissions. It abstracts away the repetitive form management logic and allows you to focus on the form's specific requirements.

```javascript
import React from "react";
import { useControlledForm } from "magicui-react-hooks";

const LoginForm: React.FC = () => {
  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    useControlledForm(
      {
        email: "",
        password: "",
      },
      (values) => {
        console.log(values);
      }
    );

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && <span>{errors.password}</span>}
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
};

export default LoginForm;
```

### useDebounce

The useDebounce hook, we ensure that the search is triggered only after the user has stopped typing for 500 milliseconds. This helps optimize performance by avoiding excessive searches while the user is still typing.

```typescript
import React, { useState } from "react";
import { useDebounce } from "magicui-react-hooks";

const SearchInput: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Use the debounced search term to trigger the search
  useEffect(() => {
    // Perform the search with the debounced search term
    console.log("Searching for:", debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchInput;
```

### useDebounceEffect

The useDebounceEffect hook is extremely useful in scenarios where you want to delay the execution of an effect based on rapidly changing values, such as search inputs, filtering, or auto-saving of form data. It helps optimize performance by reducing the number of unnecessary effect executions.

```javascript
import React, { useState } from "react";
import { useDebounceEffect } from "magicui-react-hooks";

const SearchInput: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  useDebounceEffect(
    () => {
      // Perform the search with the debounced search term
      console.log("Searching for:", searchTerm);
    },
    [searchTerm],
    500
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchInput;
```

### useEffectOnce

The `useEffectOnce hook`, we ensure that the API request to fetch user data is made only once when the component mounts. This prevents unnecessary re-fetching of data on subsequent re-renders of the component.

```javascript
import React, { useState } from "react";
import { useEffectOnce } from "magicui-react-hooks";

interface User {
  id: number;
  name: string;
  email: string;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = (useState < User) | (null > null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = (useState < string) | (null > null);

  useEffectOnce(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("https://api.example.com/user");
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const data: User = await response.json();
        setUser(data);
        setLoading(false);
      } catch (error) {
        setError("An error occurred while fetching user data");
        setLoading(false);
      }
    };

    fetchUser();
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfile;
```

### useLocalStorage

The useLocalStorage hook, you can easily persist data across sessions and restore it when the user revisits your application. This is particularly useful for storing user preferences, settings, or any other data that needs to be remembered between visits.

```javascript
import React from "react";
import { useLocalStorage } from "magicui-react-hooks";

const Settings: React.FC = () => {
  const [theme, setTheme] = useLocalStorage < string > ("theme", "light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div>
      <h1>Settings</h1>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

export default Settings;
```

### useOnClickOutSide

1. The `useOnClickOutside` hook takes two arguments: ref (a reference to the element you want to detect clicks outside of) and handler (the callback function to be executed when a click outside the element is detected).
2. Inside the hook, we use the useEffect hook to add event listeners for `mousedown` and `touchstart` events on the document.
3. The event listener function listener checks if the clicked target is outside the specified element by comparing it with ref.current. If the clicked target is inside the element or if ref.current is null, the listener returns early without executing the handler.
4. If the clicked target is outside the element, the handler function is called with the event object.
   The effect returns a cleanup function that removes the event listeners when the component unmounts or when the dependencies (ref or handler) change.

```javascript
import React, { useRef, useState } from "react";
import { useOnClickOutside } from "magicui-react-hooks";

const Modal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef < HTMLDivElement > null;

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useOnClickOutside(modalRef, closeModal);

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      {isOpen && (
        <div ref={modalRef} className="modal">
          <div className="modal-content">
            <h2>Modal Title</h2>
            <p>Modal content goes here...</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
```

### useBreakpoints

````javascript
import React from 'react';
import {useBreakpoints} from 'magicui-react-hooks';

const ResponsiveLayout: React.FC = () => {
  const breakpoints = useBreakpoints();

  return (
    <div>
      {breakpoints.xs && (
        <div>
          <h1>Extra Small Screen</h1>
          {/* Content for extra small screens */}
        </div>
      )}
      {breakpoints.sm && (
        <div>
          <h1>Small Screen</h1>
          {/* Content for small screens */}
        </div>
      )}
      {breakpoints.md && (
        <div>
          <h1>Medium Screen</h1>
          {/* Content for medium screens */}
        </div>
      )}
      {breakpoints.lg && (
        <div>
          <h1>Large Screen</h1>
          {/* Content for large screens */}
        </div>
      )}
      {breakpoints.xl && (
        <div>
          <h1>Extra Large Screen</h1>
          {/* Content for extra large screens */}
        </div>
      )}
    </div>
  );
};

export default ResponsiveLayout;```
````

### useIntersectionObserver

The `useIntersectionObserver` hook, you can efficiently load images or other content only when they are in view, improving performance and user experience. This hook is particularly useful for implementing lazy loading, infinite scrolling, or triggering animations when elements become visible.

```javascript
import React, { useRef, useState } from "react";
import useIntersectionObserver from "magicui-react-hooks";

function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const navbarRef = useRef(null);
  const sentinelRef = useRef(null);

  const [sentinelIntersecting] = useIntersectionObserver({
    root: null,
    threshold: 0,
    rootMarginTop: "-100px",
  });

  const handleSentinelIntersection = () => {
    setIsSticky(!sentinelIntersecting);
  };

  return (
    <>
      <div ref={sentinelRef} onMouseEnter={handleSentinelIntersection} />
      <nav
        ref={navbarRef}
        className={`navbar ${isSticky ? "navbar-sticky" : ""}`}
      >
        <div className="navbar-logo">Logo</div>
        <ul className="navbar-menu">
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Contact</li>
        </ul>
      </nav>
      {/* Rest of the page content */}
    </>
  );
}

export default Navbar;
```

### useFormValidation

The `useFormValidation` hook provides a powerful and flexible way to handle form validation in React. It abstracts away the validation logic and provides a clean and reusable interface for managing form fields and their validation states.

```javascript
import React from "react";
import { useFormValidation } from "magicui-react-hooks";

const SignupForm: React.FC = () => {
  const { formFields, getFieldProps, isFormValid } = useFormValidation(
    {
      name: "",
      email: "",
      password: "",
    },
    {
      name: { required: true, minLength: 2 },
      email: { required: true, pattern: /^\S+@\S+$/i },
      password: { required: true, minLength: 6 },
    }
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isFormValid()) {
      // Submit the form data
      console.log(formFields);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" {...getFieldProps("name")} />
        {formFields.name.error && <span>{formFields.name.error}</span>}
      </div>
      <div>
        <label>Email:</label>
        <input type="email" {...getFieldProps("email")} />
        {formFields.email.error && <span>{formFields.email.error}</span>}
      </div>
      <div>
        <label>Password:</label>
        <input type="password" {...getFieldProps("password")} />
        {formFields.password.error && <span>{formFields.password.error}</span>}
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
```
