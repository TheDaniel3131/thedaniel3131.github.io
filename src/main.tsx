import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import ActualMe from "./components/Actualme.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/actualme" element={<ActualMe />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
