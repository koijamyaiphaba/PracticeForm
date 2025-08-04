import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';

export default class demoQAPracticeFormPage {
    constructor(page) {
        this.page = page;
        this.firstName = page.locator('//input[@id="firstName"]');
        this.lastName = page.locator('//input[@id="lastName"]');
        this.emailID = page.locator('//input[@id="userEmail"]');
        this.radioB = page.locator('//div[@id="genterWrapper"]/div/div');
        this.mobile = page.getByRole('textbox', { name: 'Mobile Number' });
        this.dobTextbox = page.locator('#dateOfBirthInput');
        this.dobSelected = page.locator('#dateOfBirth');
        this.subject = page.locator('.subjects-auto-complete__value-container');
        this.subjectTextbox = page.locator('#subjectsInput');
        this.hobbies = page.locator('//div[@id="hobbiesWrapper"]/div[2]/div');
        this.hobbiesDescription = page.locator('//div[@id="hobbiesWrapper"]/div[2]/div/label');
        this.fileUpload = page.locator('//input[@id="uploadPicture"]');
        this.currentAddress = page.locator('//*[@id="currentAddress"]');
        this.state = page.locator('//div[contains(text(),"Select State")]');
        this.city = page.locator('//div[contains(text(),"Select City")]');
        this.submitButton = page.locator('//button[@id="submit"]');
        this.closeModalButton = page.locator('//button[@id="closeLargeModal"]');
    }

    /*************************************************************************
     * Author: Owner
     * Created: 31/07/2025
     * Description: Navigate to a web page
     ************************************************************************/
    async openWebpage(name) {
        await this.page.goto(name, { waitUntil: 'domcontentloaded' });
    }

    /*************************************************************************
     * Author: Owner
     * Created: 30/07/2025
     * Description: Remove footers and ad banners on a web page
     ************************************************************************/
    async removeFootersAndBanners() {
        const blockedResources = ['googlesyndication.com', 'adservice.google.com', 'doubleclick.net', 'adsystem.com', 'amazon-adsystem.com'];
        await this.page.route('**/*', (route) => {
            const url = route.request().url();
            if (blockedResources.some(resource => url.includes(resource))) {
                return route.abort();
            }
            route.continue();
        });
    }

    /*************************************************************************
     * Author: Owner
     * Created: 30/07/2025
     * Description: Enter first name
     ************************************************************************/
    async enterFirstName(name) {
        await this.page.waitForSelector('//div[@class="practice-form-wrapper"]/h5', { state: 'visible' });
        await this.firstName.click();
        await this.firstName.fill(name);
    }

    /*************************************************************************
     * Author: Owner
     * Created: 30/07/2025
     * Description: Enter last name
     ************************************************************************/
    async enterLastName(name) {
        await this.lastName.click();
        await this.lastName.fill(name);
    }

    /*************************************************************************
     * Author: Owner
     * Created: 30/07/2025
     * Description: Enter email id
     ************************************************************************/
    async enterEmailID(name) {
        await this.emailID.click();
        await this.emailID.fill(name);
    }

    /*************************************************************************
     * Author: Owner
     * Created: 30/07/2025
     * Description: select gender at random
     ************************************************************************/
    async selectGenderAtRandom() {
        const radioCount = await this.radioB.count();
        if (radioCount > 0) {
            const randomIndex = Math.floor(Math.random() * radioCount);
            await this.radioB.nth(randomIndex).click();
        }
        else {
            this.page.continue();
        }
    }

    /*************************************************************************
     * Author: Owner
     * Created: 30/07/2025
     * Description: Enter mobile number
     ************************************************************************/
    async enterMobileNumber(number) {
        await this.mobile.fill(number);
    }

    /*************************************************************************
    * Author: Owner
    * Created: 30/07/2025
    * Description: Enter and select date of birth
    ************************************************************************/
    async selectDOB(date) {
        await this.dobTextbox.click();
        await this.dobTextbox.fill(date);
        await this.dobTextbox.press('Tab');
        await this.dobTextbox.click();
        await this.page.waitForSelector('#dateOfBirth', { state: 'visible' });
        await this.dobSelected.click();
    }

    /*************************************************************************
    * Author: Owner
    * Created: 31/07/2025
    * Description: Enter and select subject
    ************************************************************************/
    async selectSubject(name) {
        await this.subject.click();
        await this.subjectTextbox.fill(name);
        await this.page.locator('//div[contains(@id,"react-select")]').click();
    }

    /*************************************************************************
    * Author: Owner
    * Created: 01/08/2025
    * Description: Select hobbies
    ************************************************************************/
    async selectHobbies(name) {
        let oCount = name.length;
        let hCount = await this.hobbies.count();
        for (let i = 0; i <= oCount - 1; i++) {
            for (let j = 1; j <= hCount; j++) {
                let hobbiesText = this.page.locator('(//div[@id="hobbiesWrapper"]/div[2]/div/label)[' + j + ']');
                let hobbiesTextValue = await hobbiesText.textContent();
                let hobbiesCB = this.page.locator('(//div[@id="hobbiesWrapper"]/div[2]/div)[' + j + ']');
                if (name[i] == hobbiesTextValue) {
                    await hobbiesCB.click();
                    await this.page.continue;
                }
            }
        }
    }

    /*************************************************************************
    * Author: Owner
    * Created: 04/08/2025
    * Description: Upload file
    ************************************************************************/
    async uploadFile(name) {
        await this.fileUpload.setInputFiles(name);
    }

    /*************************************************************************
    * Author: Owner
    * Created: 04/08/2025
    * Description: Enter current address
    ************************************************************************/
    async enterCurrentAddress(name) {
        await this.currentAddress.click();
        await this.currentAddress.fill(name);
    }

    /*************************************************************************
    * Author: Owner
    * Created: 04/08/2025
    * Description: Select state
    ************************************************************************/
    async selectState(name) {
        await this.state.click();
        let stateOptions = await this.page.$$('//div[starts-with(@id,"react-select-3-option")]');
        for (let i = 0; i < stateOptions.length; i++) {
            if (await stateOptions[i].textContent() == name) {
                await stateOptions[i].click();
            }
        }
    }

    /*************************************************************************
    * Author: Owner
    * Created: 04/08/2025
    * Description: Select city
    ************************************************************************/
    async selectCity(name) {
        await this.city.click();
        let cityOptions = await this.page.$$('//div[starts-with(@id,"react-select-4-option")]');
        for (let i = 0; i < cityOptions.length; i++) {
            if (await cityOptions[i].textContent() == name) {
                await cityOptions[i].click();
            }
        }
    }

    /*************************************************************************
    * Author: Owner
    * Created: 04/08/2025
    * Description: Click submit button
    ************************************************************************/
    async clickSubmitButton() {
        await this.page.waitForSelector('//button[@id="submit"]', {state: 'visible'});
        await this.submitButton.click();
    }

}