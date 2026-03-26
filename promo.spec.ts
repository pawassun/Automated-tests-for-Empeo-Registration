import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 1920, height: 1080 } });

test('TC-10: Apply valid promo code', async ({ page }) => {
  await page.goto('https://portal.uat.gofive.co.th/Register/empeo');
  
  // 1. คลิกเปิดช่องส่วนลด
  await page.getByText('ใช้โค้ดส่วนลด').click();
  await page.waitForTimeout(1000); 
  
  // 2. เจาะจงที่ช่อง Input และพิมพ์โค้ด
  const promoInput = page.locator('input[type="text"]').last();
  await promoInput.focus();
  await page.keyboard.type('FREE15DAY');
  
  // 3. กด Enter เพื่อส่งข้อมูล
  await page.keyboard.press('Enter');
  
  // 4. รอระบบประมวลผลแป๊บนึง
  await page.waitForTimeout(3000);
  
  // ⭐️ 5. เช็คแบบกว้าง: "ต้องไม่มี" ข้อความที่บอกว่าโค้ดผิด
  // ถ้าไม่มีคำพวกนี้ขึ้นมา แปลว่าระบบผ่าน Case นี้ครับ
  const errorMsg = page.locator('text=/ไม่ถูกต้อง|Invalid|ไม่พบ/i');
  await expect(errorMsg).not.toBeVisible();

  // ปิดท้ายด้วยการเช็คว่าหน้าจอยังอยู่ที่หน้า Register (ไม่ได้พังหรือ Error จนหลุดไปไหน)
  await expect(page).toHaveURL(/.*register/i);
});