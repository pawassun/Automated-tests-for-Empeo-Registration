import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 1920, height: 1080 } });

test.describe('Empeo Registration - Form Validation', () => {

  test('TC-01: Register with valid data', async ({ page }) => {
    await page.goto('https://portal.uat.gofive.co.th/Register/empeo');
    
    await page.getByTestId('input_textfield_input_registration_tax_id').fill('Pawat Smart Pig Farm');

    // 2. เลือกประเภทธุรกิจ: ใช้วิธีพิมพ์แล้ว Enter
    await page.getByText('ประเภทธุรกิจ*').click();
    await page.keyboard.type('เทคโนโลยี');
    await page.keyboard.press('Enter');

    // 3. เลือกจำนวนผู้ใช้งาน: ใช้วิธีพิมพ์แล้ว Enter
    await page.getByText('ผู้ใช้งาน*').click();
    await page.keyboard.type('21-50');
    await page.keyboard.press('Enter');

    // 4. ข้อมูลส่วนตัว
    await page.getByTestId('input_textfield_input_registration_email').fill('test@example.com');
    await page.getByTestId('input_textfield_input_register_first_name').fill('John');
    await page.getByTestId('input_textfield_input_register_last_name').fill('Doe');
    await page.getByPlaceholder('เบอร์มือถือ*').fill('0967690708');

    // 5. Checkbox และ Submit
    await page.getByTestId('input_checkbox_registration_checkbox').check();
    await page.getByTestId('button_submit_registration_try_for_free').click();

    await expect(page).toHaveURL(/.*register/i); 
  });

  test('TC-02: Submit empty form', async ({ page }) => {
    await page.goto('https://portal.uat.gofive.co.th/Register/empeo');
    await page.getByTestId('button_submit_registration_try_for_free').click();
    await expect(page.getByText('กรุณากรอกประเภทธุรกิจ')).toBeVisible();
  });
});