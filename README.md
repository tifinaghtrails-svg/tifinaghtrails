# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## SMTP mail service

This project includes a small Express SMTP API for booking and contact forms.

1. Copy `.env.example` to `.env`.
2. Add your real SMTP credentials and Mustapha's receiving email:

```env
OWNER_EMAIL=tifinaghtrails@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=tifinaghtrails@gmail.com
SMTP_PASS=your-smtp-password
SMTP_FROM="TifinaghTrails <tifinaghtrails@gmail.com>"
```

3. Start the mail API:

```bash
npm run server
```

4. In another terminal, start the React app:

```bash
npm run dev
```

During development, Vite proxies `/api` requests to `http://localhost:5174`. In production, run `npm run build` and serve the built app through `npm run server` so the frontend and mail API share the same origin.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
