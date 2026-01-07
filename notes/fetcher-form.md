# fetcher.Form in React Router

## What is fetcher.Form?

`fetcher.Form` is a special component from `useFetcher` that allows you to submit forms **without moving to a different page**.

---

## fetcher.Form vs. Regular <Form>

| Feature        | Regular `<Form>`                 | `fetcher.Form`                    |
| -------------- | -------------------------------- | --------------------------------- |
| **Navigation** | Changes URL / Reloads page       | **Stays on the same page**        |
| **History**    | Adds to Browser History (Back)   | Does NOT change history           |
| **Use Case**   | Creating NEW items (Place Order) | **Updating** items (Set Priority) |

---

## How to Use It

### 1. In your Component

Use it just like a regular form, but with the `fetcher` prefix.

```jsx
import { useFetcher } from "react-router-dom";

function MyComponent() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH">
      <button name="priority" value="true">
        Make Priority
      </button>
    </fetcher.Form>
  );
}
```

### 2. In your Route Action (App.jsx)

React Router will automatically find the `action` function for the current route.

```javascript
// Inside your action function
export async function action({ request, params }) {
  const formData = await request.formData();
  const isPriority = formData.get("priority") === "true";

  // Update logic here...
  return null;
}
```

---

## How to handle multiple buttons

If you have two buttons in the same form (e.g., "Delete" and "Complete"), give them the same `name` but different `value`.

```jsx
<fetcher.Form method="PATCH">
  <button name="intent" value="delete">
    Delete Item
  </button>
  <button name="intent" value="complete">
    Mark Done
  </button>
</fetcher.Form>
```

In the action:

```javascript
const intent = formData.get("intent"); // returns "delete" or "complete"
```

---

## Why we used it in this project

In the `UpdateOrder` feature, we want the user to stay on the Order Page while they click "Make Priority."

1. **User clicks button** → `fetcher.Form` triggers.
2. **Action runs** → Database updates to `priority: true`.
3. **Re-validation** → React Router automatically re-fetches the page data.
4. **UI Updates** → The "Priority" badge appears instantly without the page flickering or reloading!

---

## Expert Tip: Optimistic UI

Because `fetcher` knows its own state, you can make the button feel instant:

```jsx
const isSubmitting = fetcher.state === "submitting";

<button disabled={isSubmitting}>
  {isSubmitting ? "Updating..." : "Make Priority"}
</button>;
```
