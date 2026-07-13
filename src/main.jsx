import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./styles/global.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/pages.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <App />
      <Analytics />
      <SpeedInsights />
    </HelmetProvider>
  </StrictMode>
);
