# PracticeForm
Practice Form Submission
This is the automating of submitting the practice form using Playwright.

Setup:
Page-Object-Model files: 
./QA_Functionalities/screensAndObjects/demoQAPracticeFormPage.js and 
./QA_Functionalities/screensAndObjects/demoQAConfirmationModal.js
Test file: ./QA_Functionalities/tests/DemoQA.test.js
Input Data: faker.js and ./QA_Functionalities/dataStorage/demoQA_data.json
FileUpload: ./QA_Functionalities/fileUploads/pics.jpg

Execution command in terminal:
npx playwright test DemoQA.test.js --workers=2 --project=Edge --project=chromium

