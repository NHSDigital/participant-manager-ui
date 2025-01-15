import { test, expect } from "@playwright/test";

test("navigate to the Index page", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page).toHaveTitle(/Hello world/);
});
