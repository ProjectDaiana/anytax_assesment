import fs from "fs";
import path from "path";
import { test, expect } from "@playwright/test";

test("mock POST /api/transfer", async ({ page }) => {
  await page.route("http://localhost/api/transfer", async (route) => {
    const request = route.request();
    if (request.method() !== "POST") {
      await route.fallback();
      return;
    }
    const successResponseData = await request.postDataJSON();
    // Example: check for a required field 'amount' for success
    if (
      successResponseData &&
      successResponseData.amount &&
      successResponseData.amount > 0
    ) {
      const responseData = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), "success.json"), "utf-8"),
      );

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(responseData),
      });
      console.log("Mocked successful transfer response");
    } else {
      const errorResponseData = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), "error.json"), "utf-8"),
      );
      await route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify(errorResponseData),
      });
      console.log("Mocked error transfer response");
    }
  });

  // Example POST request to test the mock
  await page.goto("about:blank");
  const response = await page.evaluate(async () => {
    const res = await fetch("http://localhost/api/transfer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 100 }),
    });
    return res.json();
  });
  expect(response.status).toBe("success");
});
