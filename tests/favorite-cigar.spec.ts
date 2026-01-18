// tests/favorite-cigar.spec.ts
// Playwright end-to-end test: login -> search for perdomo -> click on cigar -> submit rating.

import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL ?? "https://www.cigar-ranker.com";
const TEST_EMAIL = process.env.TEST_EMAIL ?? "pmk9000";
const TEST_PASSWORD = process.env.TEST_PASSWORD ?? "22222";

test.describe("Cigar Ranker - favorite flow", () => {
  test("login -> search for perdomo -> click on cigar -> submit rating", async ({ page }) => {
    if (!TEST_EMAIL || !TEST_PASSWORD) {
      throw new Error(
        "Missing TEST_EMAIL / TEST_PASSWORD. Set env vars before running."
      );
    }

    // 1) Go to site
    await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });

    // 2) Navigate to login (adjust if your home already shows login form)
    await page.getByTestId('nav-profile-button').click();
    await page.getByTestId('profile-signin-button').click();

    // 3) Fill login form (robust locator fallbacks)
    await page.getByTestId('email').click();
    await page.getByTestId('email').fill('pmk9000');
    await page.getByTestId('password').click();
    await page.getByTestId('password').fill('22222');
    await page.getByTestId('login-submit').click();

    // 4) Search for cigar
    await page.getByTestId('search-input').click();
    await page.getByTestId('search-input').fill('perdomo');
    await page.getByTestId('search-button').click();

    // 5) Click on Perdomo 
    await page.getByRole('heading', { name: 'Perdomo Reserve 10th Anniversary Maduro' }).click();

    // 6) Rank the cigar
    await page.getByRole('slider').click();
    await page.locator('.relative.h-2').click();
    await page.getByTestId('submit-rating-button').click()
    
    }
  );
});

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
