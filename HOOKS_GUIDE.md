# 🪝 React Hooks Guide - Fast React Pizza

This guide explains all the hooks used in the **Fast React Pizza** project. They are categorized by their purpose to help you understand when and why to use them.

---

## 1. React Router Hooks (Data & Navigation)

These hooks are provided by `react-router-dom` (v6.4+). They are used to handle the flow of data and movement between pages.

### `useLoaderData`

- **Explanation:** The "Receiver" for incoming data.
- **Why use it?** To get data onto your page _before_ the component even renders.
- **Example from project (`Menu.jsx`):**

  ```javascript
  const menu = useLoaderData();
  // Now 'menu' contains the array of pizzas fetched by the loader.
  ```

### `useActionData`

- **Explanation:** The "Receiver" for form results.
- **Why use it?** To catch data returned by an `action` function (like validation errors) after a user submits a form.
- **Example from project (`CreateOrder.jsx`):**

  ```javascript
  const formErrors = useActionData();
  // If the phone was wrong, formErrors.phone will contain the error message.
  ```

### `useNavigation`

- **Explanation:** The "App Status Monitor."
- **Why use it?** To know if the app is currently loading a page or submitting a form so you can show loading spinners or disable buttons.
- **States:** `idle`, `loading`, `submitting`.
- **Example from project (`AppLayout.jsx`):**

  ```javascript
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  ```

### `useNavigate`

- **Explanation:** The "Teleporter."
- **Why use it?** To move the user to a different page programmatically (without clicking a Link), or to go back in history.
- **Example from project (`Error.jsx`):**

  ```javascript
  const navigate = useNavigate();
  <button onClick={() => navigate(-1)}>Go back</button>;
  ```

### `useParams` (Components) vs `params` (Loaders)

- **Explanation:** The "URL Variable Filter."
- **In Components:** You use the **`useParams()` hook**.

  ```javascript
  const { orderId } = useParams(); // Used inside the Order() function
  ```

- **In Loaders/Actions:** You get them via the **function argument**. You **cannot** use hooks here.

  ```javascript
  export async function loader({ params }) {
    const order = await getOrder(params.orderId);
    return order;
  }
  ```

### `useRouteError`

- **Explanation:** The "Error Detective."
- **Why use it?** To find out exactly what went wrong when a page fails to load (e.g., 404 not found).
- **Example from project (`Error.jsx`):**

  ```javascript
  const error = useRouteError();
  <p>{error.data || error.message}</p>;
  ```

---

## 2. Standard React Hooks (Component Logic)

These are built into React and handle the internal "brain" of a single component.

### `useState`

- **Explanation:** The "Short-term Memory."
- **Why use it?** To store variables that change while the user is interacting with a single page.
- **Example from project (`SearchOrder.jsx`):**

  ```javascript
  const [query, setQuery] = useState("");
  // Stores what the user is currently typing in the search box.
  ```

---

## 🚀 The "Big Two" Logic: Loader vs Action

| Logic        | Hook            | Function   | Timing                | Purpose                                  |
| :----------- | :-------------- | :--------- | :-------------------- | :--------------------------------------- |
| **Incoming** | `useLoaderData` | `loader()` | **Before** page loads | **READING** data from the server.        |
| **Outgoing** | `useActionData` | `action()` | **After** form submit | **WRITING/CHANGING** data on the server. |

---

### Pro Tip:

In modern React development, we try to move as much logic as possible into **Loaders** and **Actions**. It keeps our components clean, fast, and easy to read!
