## Getting Started & Running Playwright Tests

1. **Install dependencies**

   If you haven't already, install all required packages:

   ```bash
   npm install
   ```

2. **Install Playwright browsers**

   ```bash
   npx playwright install
   ```

## How to Run and Test Each Task

1. **Navigate to the task directory:**

   ```bash
   cd Task1   # or cd Task2
   ```

2. **Run Playwright tests:**

   ```bash
   npx playwright test
   ```

4. **View the HTML test report:**
   ```bash
   npx playwright show-report
   ```

---

**_TASK 1_**
**Bad Request Response**

```
{"error:" "Insufficent funds"}
```

**Success**

```
{ "status": "success", "transactionId:" "12345"}
```

![alt text](<Screenshot 2026-01-19 at 10.51.01.png>)

**_TASK 2_**

- Write and E2E test to validate the price is a valid string "$" + a number
- Strip "add-to-cart" from the button selector since each button has a custom data-test selector

![alt text](<Screenshot 2026-01-19 at 12.01.14.png>)

---

**Notes:**

- Always run commands from inside the relevant task directory.
- Update URLs and selectors in your tests to match your app.
- Ensure environment files (like `.env.example`) are in the correct location.
