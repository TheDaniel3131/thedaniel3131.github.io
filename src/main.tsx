import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import ActualMe from "./components/ActualMe.tsx";
import NotFound from "./components/NotFound.tsx";
import Space from "./components/Space.tsx";
import SubpagesWithLoader from "./components/SubpagesWithLoader.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import CustomCursor from "./components/CustomCursor.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
        <CustomCursor />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/actualme" element={<SubpagesWithLoader><ActualMe /></SubpagesWithLoader>} />
          <Route path="/space" element={<SubpagesWithLoader><Space /></SubpagesWithLoader>} />
          <Route path="*" element={<SubpagesWithLoader><NotFound /></SubpagesWithLoader>} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);