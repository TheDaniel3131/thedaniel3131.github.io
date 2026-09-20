import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import CustomCursor from "./components/CustomCursor.tsx";
import "./index.css";

const ActualMe = lazy(() => import("./components/ActualMe.tsx"));
const NotFound = lazy(() => import("./components/NotFound.tsx"));
const Space = lazy(() => import("./components/Space.tsx"));
const SubpagesWithLoader = lazy(
  () => import("./components/SubpagesWithLoader.tsx"),
);

const AffiliatesRedirect = () => {
  window.location.href = "http://affiliates.danielpoh.com";
  return null;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
        <CustomCursor />
        <Routes>
          <Route path="/" element={<App />} />
          <Route
            path="/actualme"
            element={
              <Suspense fallback={null}>
                <SubpagesWithLoader>
                  <ActualMe />
                </SubpagesWithLoader>
              </Suspense>
            }
          />
          <Route
            path="/space"
            element={
              <Suspense fallback={null}>
                <SubpagesWithLoader>
                  <Space />
                </SubpagesWithLoader>
              </Suspense>
            }
          />
          <Route path="/affiliates" element={<AffiliatesRedirect />} />
          <Route
            path="*"
            element={
              <Suspense fallback={null}>
                <SubpagesWithLoader>
                  <NotFound />
                </SubpagesWithLoader>
              </Suspense>
            }
          />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
