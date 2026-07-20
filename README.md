# Foodie Express Frontend

## Run it

1. Open this folder in VS Code.
2. Open a terminal (`` Ctrl+` ``) and run:
   ```
   npm install
   npm run dev
   ```
3. Open the local URL Vite prints (usually http://localhost:5173).

## What was fixed in App.jsx

- Cart-count badge used invalid Tailwind classes `w-4.5 h-4.5` (Tailwind's
  default spacing scale has no `.5` step between 4 and 5, so the classes
  did nothing). Changed to `w-[18px] h-[18px]`.
- Removed a dead `text-ink` class on the newsletter input — not a real
  Tailwind utility, and the color was already set via inline style.
- Removed the unused `Leaf` icon import from `lucide-react`.

No logic bugs were found — cart math, login-gate flow, and form
validation all check out. Login/signup/checkout are demo-only (no real
backend), by design.
