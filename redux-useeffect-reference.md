# Redux Toolkit + useEffect — Quick Reference

## Redux: Provider & Store

- **One store per `<Provider>`**, but you *can* nest multiple Providers (each with its own store). Uncommon — standard is one store, many slices. For real multi-store needs, use a custom `context` instead of nesting.
- **Next.js App Router store setup** must create a *fresh store per request* (avoid cross-user state bleed). Pattern:

```jsx
"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../redux/store";

export default function StoreProvider({ children }) {
  const storeRef = useRef();
  if (!storeRef.current) {       // runs ONCE, on first render
    storeRef.current = makeStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
```

- `makeStore` is a **factory** (`export const makeStore = () => configureStore(...)`), not a singleton.
- The `if (!storeRef.current)` guard → store built **once**, not per render. `useRef(makeStore())` would call `makeStore()` every render (wasteful).
- Ref persists across re-renders without triggering them. Same instance handed to `Provider` every render.

## Redux: Slices

```js
const userSlice = createSlice({
  name: "user",          // becomes the action-type prefix
  initialState,
  reducers: {
    userLoggedInDetails: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;   // mutation OK — Immer handles immutability
    },
  },
});
```

- **`action`** = dispatched object: `{ type, payload }`.
  - `type` is auto-generated as `name/reducerName` (e.g. `"user/userLoggedInDetails"`).
  - `payload` = whatever you passed to the action creator: `dispatch(userLoggedInDetails(userObj))`.
- **`name` IS used** — it prefixes every action type. Purpose:
  - Uniqueness across slices (prevents `reset` in two slices from colliding).
  - Readable DevTools logs.
  - Lets other slices listen via `extraReducers` on the string type.
- **Give each slice a unique `name`**, ideally matching its store key (`user` ↔ `state.user`). RTK won't enforce it — discipline is on you.
- Direct mutation works because RTK uses **Immer** under the hood.

## useEffect

```js
useEffect(() => {
  // side effect (fetch, subscribe, timer, DOM)
  return () => { /* cleanup: runs before next effect & on unmount */ };
}, [deps]);
```

**Purpose:** side effects — anything outside React's pure render (fetching, subscriptions, timers, DOM, localStorage).

**Timing:** runs **after render AND after the browser paints**. (`useLayoutEffect` runs before paint — for DOM measure/mutate to avoid flicker.)

**Dependency array:**
- `[]` → once on mount (+ cleanup on unmount).
- `[a, b]` → on mount + whenever `a` or `b` **changes**.
- *(omitted)* → every render (rarely wanted).

**Key mental separations:**
- The dep array controls **when the effect re-runs**, NOT whether the component re-renders.
- Re-renders are caused by **state/store/prop changes** (`setState`, new `useSelector` value), independent of the dep array.
- Rule for deps: **list every reactive value the effect's code reads** — not "states that cause re-renders."
  - In deps + changed → effect re-runs.
  - In deps + same → skipped.
  - Used but missing from deps → **stale-closure bug**.

**`[dispatch]`:**
- `dispatch` from `useDispatch()` is **stable** (never changes), so `[dispatch]` behaves like `[]` → runs once.
- Included only to satisfy the `react-hooks/exhaustive-deps` lint rule and stay future-proof. Same applies to `useState` setters and Next's `router`.

## The loading/user pattern (and its common bug)

```js
const [loading, setLoading] = useState(true);   // ← MUST start true
const user = useSelector(s => s.user.user);
const dispatch = useDispatch();

useEffect(() => {
  let ignore = false;
  fetchUser()
    .then(u => { if (!ignore) dispatch(userLoggedInDetails(u)); })
    .catch(() => { /* handle / treat as logged-out */ })
    .finally(() => { if (!ignore) setLoading(false); });
  return () => { ignore = true; };
}, [dispatch]);

if (loading) return <Spinner />;
if (!user)   return <LoginPrompt />;
return <Dashboard user={user} />;
```

- **The bug to avoid:** `useState(false)`. If loading starts `false` and is only ever set `false`, the `if (loading)` spinner is **dead code** — user sees `<LoginPrompt />` flash during the fetch. Start it `true`.
- The `if (loading)` / `if (!user)` guards are **render-time checks**, re-evaluated every render — they are NOT tied to the effect re-running.
- Flow: render 1 (`loading=true` → spinner) → paint → effect fires once → fetch resolves → `dispatch` + `setLoading(false)` → re-render → dashboard.
- `.catch` distinguishes "fetch failed" from "not logged in". `ignore` flag avoids setting state after unmount.
