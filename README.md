//โปรเจกต์นี้สร้างขึ้นเพื่อวัตถุประสงค์ในการทดสอบทักษะ Automation Testing เท่านั้นไม่ได้มีส่วนเกี่ยวข้องหรือได้รับการสนับสนุนจากเจ้าของแพลตฟอร์มอย่างเป็นทางการ

--> HRM SaaS Platform Registration Test (UAT)
  โปรเจกต์ทดสอบระบบสมัครสมาชิก (เวอร์ชัน UAT) โดยใช้ Playwright และ TypeScript เพื่อตรวจสอบความถูกต้องของ Flow การใช้งานหลัก (Critical Path) ตั้งแต่การกรอกข้อมูล จนถึงการยืนยันรหัส OTP

--> Project Overview
  เป้าหมายของโปรเจกต์นี้คือการสร้างระบบทดสอบอัตโนมัติที่เสถียร (Robust) บนหน้าเว็บที่มีความซับซ้อนของ UI (Dynamic Elements) และรองรับภาษาไทย 100%

--> Test Scope & Scenarios
  ในการทดสอบครั้งนี้ได้มีการออกแบบ Test Cases ทั้งหมด 15 Scenarios ครอบคลุมทั้ง Happy Path, Negative Case และ Edge Case โดยในส่วนของ Automation ได้คัดเลือกข้อหลักมา Implement ดังนี้:
  Test IDScenario DescriptionExpected ResultStatus
    TC-01 สมัครสมาชิกด้วยข้อมูลที่ถูกต้อง (Happy Path)ระบบพาไปหน้าถัดไป✅ Passed
    TC-02 กดปุ่มโดยไม่กรอกข้อมูล (Field Validation)แสดงข้อความ Error ภาษาไทยครบทุกฟิลด์✅ Passed 
    TC-06 ทดสอบการกรอกรหัส OTP ที่ไม่ถูกต้องระบบแสดงแจ้งเตือน "รหัส OTP ไม่ถูกต้อง"✅ Passed
    TC-10 ทดสอบการใช้ Promo Code FREE15DAY ระบบยอมรับโค้ดและไม่แสดง Error✅ Passed
Note: สามารถดูรายละเอียด Test Case ทั้ง 15 ข้อได้ในไฟล์ [📥 Download Full Test Case (Excel)](TestCase.xlsx)

--> Tech Stack & Tools
  Framework: Playwright
  Language: TypeScript
  Test Runner: Playwright Test Runner
  Reporting: Playwright HTML Report

--> Key Challenges & Solutions
  Dynamic Dropdowns: เว็บใช้ Ant Design ซึ่ง Element ไม่ได้อยู่ใน DOM ปกติ แก้ไขด้วยการใช้ keyboard.type และ keyboard.press('Enter') เพื่อความแม่นยำสูงสุด
  Custom Data Attributes: ใช้การระบุตัวตนผ่าน data-testid เพื่อให้ Script มีความเสถียรต่อการเปลี่ยนแปลงของ UI ในอนาคต
  Localization Support: รองรับการตรวจเช็คข้อความภาษาไทย (Thai Language Validation) อย่างสมบูรณ์
  
--> How to Run the Test
  1. Clone project: 
    git clone [<link-your-repo>](https://github.com/pawassun/Automated-tests-for-Empeo-Registration)
  2. Install dependencies:
    npm install
  3. Run all tests:
    npx playwright test 
//or ui need
    npx playwright test --ui
  4. View report:
    npx playwright show-report
