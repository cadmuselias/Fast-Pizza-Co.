# 🚀 Redux Thunk Cheat Sheet (Modern Way)

This guide shows how to handle asynchronous logic (APIs, Geolocation, etc.) using Redux Toolkit.

---

### 1. Create the "Mission" (`createAsyncThunk`)

The Thunk is a function that performs a task in the background. It takes two parts: a **name** and an **async function**.

```javascript
/* src/features/user/userSlice.js */

export const fetchData = createAsyncThunk(
  "user/fetchData", // 🟢 Step A: The Action Name.
  // Redux uses this to track the action in the DevTools.

  async function () {
    // 🟢 Step B: The Work.
    const res = await fetch("https://api.example.com/data");
    const data = await res.json();

    // 🟢 Step C: The Delivery.
    // Whatever you 'return' here becomes the 'action.payload'
    // in the 'fulfilled' case below.
    return data;
  },
);
```

### 2. Prepare the State (`initialState`)

You need specific variables to keep track of the mission's progress.

```javascript
const initialState = {
  data: [],
  status: "idle", // Can be: 'idle', 'loading', or 'error'
  error: "", // Stores the error message if the mission fails
};
```

### 3. Handle the 3 Stages (`extraReducers`)

Because Thunks are asynchronous (they take time), they don't go into the normal `reducers` section. We use `extraReducers` with a `builder` to handle the three possible outcomes.

```javascript
const yourSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Normal synchronous actions (like changing a name)
    updateName(state, action) {
      state.userName = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      // 🕒 Stage 1: PENDING (The request has started)
      // Use this to show loading spinners.
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })

      // ✅ Stage 2: FULFILLED (The request succeeded)
      // 'action.payload' contains the data you 'returned' in Step 1.
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      })

      // ❌ Stage 3: REJECTED (The request failed)
      // 'action.error.message' contains the explanation of the failure.
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      }),
});
```

---

### 4. Trigger the Mission in a Component

In React, you use `useDispatch` to tell the Thunk to start its work.

```javascript
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./userSlice";

function MyComponent() {
  const dispatch = useDispatch();

  // 1. Grab everything we need from the store
  const { status, data, error } = useSelector((state) => state.user);

  return (
    <div>
      {/* 2. Disable the button while loading so user doesn't click twice */}
      <button
        type="button" // 👈 Prevents form submissions
        disabled={status === "loading"}
        onClick={() => dispatch(fetchData())}
      >
        {status === "loading" ? "Searching..." : "Get Data"}
      </button>

      {/* 3. Show error message if things go wrong */}
      {status === "error" && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
```

---

### � Important Concepts Explained

#### What is `action.payload`?

Think of it as the **package** inside the delivery truck. When your Thunk finishes its work and `returns` a value, Redux Toolkit wraps that value in an object called `action` and puts your data inside the `payload` property.

#### What is the `builder`?

The `builder` is a special tool provided by Redux Toolkit. It allows you to "add cases" (listeners) for actions that were defined **outside** of the slice (like your Thunks).

#### Why use `status`?

Without a `status` variable, your user won't know if the app is working or frozen. By tracking `loading`, you can:

1.  Show a spinner.
2.  Disable buttons.
3.  Prevent the user from making the same request 10 times.

#### Why `type="button"`?

If your button is inside a `<form>` (like in the Fast React Pizza project), clicking it will try to reload the whole page. Adding `type="button"` tells the browser: "Just run my Javascript, don't submit the form!"
