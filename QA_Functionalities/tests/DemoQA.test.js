import { test, expect } from '@playwright/test';
import practiceFormPage from '../screensAndObjects/demoQAPracticeFormPage.js'
import confirmationPage from '../screensAndObjects/demoQAConfirmationModal.js'
import { faker } from '@faker-js/faker';
const testdata = JSON.parse(JSON.stringify(require('../dataStorage/demoQA_data.json')))

test.describe('Practice Form Submission', () => {
  test.beforeEach(async ({ page }) => {
    let PFP = new practiceFormPage(page);
    await PFP.removeFootersAndBanners();
    await PFP.openWebpage(testdata.demoQA.url);
  });

  test('TC01_Automating the submission of practice form', async ({ page }) => {
    // test.setTimeout(9999999);
    const randomFirstName = faker.person.firstName('male');
    const randomLastName = faker.person.lastName('male');
    const randomEmail = faker.internet.email();
    const randomMobile = faker.string.numeric(10);
    let PFP = new practiceFormPage(page);
    let PCM = new confirmationPage(page);
    await PFP.enterFirstName(randomFirstName);
    await PFP.enterLastName(randomLastName);
    await PFP.enterEmailID(randomEmail);
    await PFP.selectGenderAtRandom();
    await PFP.enterMobileNumber(randomMobile);
    await PFP.selectDOB(testdata.demoQA.DOB);
    await PFP.selectSubject(testdata.demoQA.subjects);
    await PFP.selectHobbies(testdata.demoQA.hobbies);
    await PFP.uploadFile(testdata.demoQA.fileupload);
    await PFP.enterCurrentAddress(testdata.demoQA.address);
    await PFP.selectState(testdata.demoQA.state);
    await PFP.selectCity(testdata.demoQA.city);
    await PFP.clickSubmitButton();
    //Validation
    await PCM.validateModalValues(testdata.demoQA.modalHeader, randomFirstName, randomLastName, randomEmail, randomMobile.toString());
    await PCM.validateModalDOB(testdata.demoQA.DOB);
    await PCM.validateModalSubjectHobby(testdata.demoQA.subjects, testdata.demoQA.hobbies);
    await PCM.validateModalFileAddressStateCity(testdata.demoQA.fileupload, testdata.demoQA.address, testdata.demoQA.state, testdata.demoQA.city);
    await PCM.displayModalValues();
    await PCM.closeModal();
    await PCM.closeBrowser();
  });

});



