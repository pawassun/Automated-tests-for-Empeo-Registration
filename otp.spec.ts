import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 1920, height: 1080 } });

async function fillRegistration(page) {
  await page.goto('https://portal.uat.gofive.co.th/Register/empeo');
  await page.getByTestId('input_textfield_input_registration_tax_id').fill('Pawat Smart Pig Farm');
  
  await page.getByText('ประเภทธุรกิจ*').click();
  await page.keyboard.type('เทคโนโลยี');
  await page.keyboard.press('Enter');
  
  await page.getByText('ผู้ใช้งาน*').click();
  await page.keyboard.type('21-50');
  await page.keyboard.press('Enter');
  
  await page.getByTestId('input_textfield_input_registration_email').fill('test@example.com');
  await page.getByTestId('input_textfield_input_register_first_name').fill('John');
  await page.getByTestId('input_textfield_input_register_last_name').fill('Doe');
  await page.getByPlaceholder('เบอร์มือถือ*').fill('0967690708');
  await page.getByTestId('input_checkbox_registration_checkbox').check();
  await page.getByTestId('button_submit_registration_try_for_free').click();
}

test('TC-06: Verify with incorrect OTP', async ({ page }) => {
  await fillRegistration(page);
  
  await page.waitForLoadState('networkidle');
  
  const otpInput = page.locator('input[type="tel"], input[maxlength="6"], .ant-input').first();
  await otpInput.waitFor({ state: 'visible', timeout: 45000 });
  
  // กรอกเลขเสร็จแล้วกด Enter ทันที (เลี่ยงการหาปุ่มยืนยันที่หาไม่เจอ)
  await otpInput.fill('000000');
  await page.keyboard.press('Enter');
  
  // เช็คว่ามีข้อความแจ้งเตือน Error เกิดขึ้น (รอสูงสุด 10 วินาที)
  const errorMsg = page.locator('text=/ไม่ถูกต้อง|ผิด|Invalid|incorrect/i').first();
  await expect(errorMsg).toBeVisible({ timeout: 10000 });
});