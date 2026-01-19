import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

// Read credentials from env.example in Task2
const envPath = path.join(
  path.dirname(decodeURIComponent(new URL(import.meta.url).pathname)),
  "../.env.example",
);
const envContent = fs.readFileSync(envPath, "utf-8");
const username = envContent.match(/USERNAME="([^"]+)"/)?.[1] || "";
const password = envContent.match(/PASSWORD="([^"]+)"/)?.[1] || "";

test("logged-in user adds first product to cart and sees valid price", async ({
  page,
}) => {
  await page.goto("https://www.saucedemo.com/"); 

  // Log in
  await page.fill("#user-name", username);
  await page.fill("#password", password);
  await page.click("#login-button");

  // Go to products page
  await page.goto("https://www.saucedemo.com/inventory.html");

  // Add the first product to cart
  await page.click('[id^="add-to-cart"]:first-of-type'); // The first button which id starts with add-to-cart

  // Go to cart page
  await page.goto("https://www.saucedemo.com/cart.html");

  // Validate price format in cart
  const priceText = await page.textContent(
    '[data-test="inventory-item-price"]',
  );
  expect(priceText).toMatch(/^\$\d+(\.\d{2})?$/);
});
