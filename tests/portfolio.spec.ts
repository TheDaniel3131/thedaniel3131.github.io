import { test, expect } from "@playwright/test";

test("homepage loads", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/DPTF/);
});

test("navbar is visible", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("DPTF")).toBeVisible();
});

test("scroll to about works", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "About" }).click();
  await expect(page.locator("#about")).toBeInViewport();
});

test("/actualme page loads", async ({ page }) => {
  await page.goto("/actualme");
  await expect(page.getByText("The actual me")).toBeVisible();
});

test("404 page shows on unknown route", async ({ page }) => {
  await page.goto("/somethingfake");
  await expect(page.getByText("Page not found")).toBeVisible();
});
