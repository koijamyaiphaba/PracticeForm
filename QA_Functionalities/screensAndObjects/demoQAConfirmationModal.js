import { expect, test } from '@playwright/test';

export default class demoQAConfirmationModal {
    constructor(page) {
        this.page = page;
        this.modalTitle = page.locator('//div[@class="modal-content"]//div[@class="modal-title h4"]');
        this.name = page.locator('//div[@class="modal-body"]//tbody/tr[1]/td[2]');
        this.email = page.locator('//div[@class="modal-body"]//tbody/tr[2]/td[2]');
        this.mobile = page.locator('//div[@class="modal-body"]//tbody/tr[4]/td[2]');
        this.birthDate = page.locator('//div[@class="modal-body"]//tbody/tr[5]/td[2]');
        this.subjects = page.locator('//div[@class="modal-body"]//tbody/tr[6]/td[2]');
        this.hobbies = page.locator('//div[@class="modal-body"]//tbody/tr[7]/td[2]');
        this.uploadedFile = page.locator('//div[@class="modal-body"]//tbody/tr[8]/td[2]');
        this.currentAddress = page.locator('//div[@class="modal-body"]//tbody/tr[9]/td[2]');
        this.stateCity = page.locator('//div[@class="modal-body"]//tbody/tr[10]/td[2]');
        this.closeModalButton = page.locator('//button[@id="closeLargeModal"]');
    }

    /*************************************************************************
    * Author: Owner
    * Created: 04/08/2025
    * Description: Validate the title, name email and mobile values on modal
    ************************************************************************/
    async validateModalValues(header, firstName, lastName, email, mobile) {
        await this.page.waitForSelector('//div[@class="modal-content"]//div[@class="modal-title h4"]');
        expect(this.modalTitle).toHaveText(header);
        expect(this.name).toHaveText(firstName + " " + lastName);
        expect(this.email).toHaveText(email);
        expect(this.mobile).toHaveText(mobile);
    }

    /*************************************************************************
    * Author: Owner
    * Created: 04/08/2025
    * Description: Validate date of birth on modal
    ************************************************************************/
    async validateModalDOB(name) {
        let date = await this.birthDate.textContent();
        let dates = date.replace(",", " ");
        expect(dates).toMatch(name);
    }

    /*************************************************************************
    * Author: Owner
    * Created: 04/08/2025
    * Description: Validate subject and hobbies on modal
    ************************************************************************/
    async validateModalSubjectHobby(subject, hobby) {
        let sub = await this.subjects.textContent();
        expect(sub.toLowerCase()).toMatch(subject);
        let displayedHobbies = [];
        let option_texts = await this.hobbies.textContent();
        let option_textsValues = option_texts.split(", ");
        for (let i = 0; i < option_textsValues.length; i++) {
            displayedHobbies.push(option_textsValues[i]);
        }
        expect(displayedHobbies).toEqual(hobby);
    }

    /*************************************************************************
    * Author: Owner
    * Created: 04/08/2025
    * Description: Validate state and city on modal
    ************************************************************************/
    async validateModalFileAddressStateCity(file, address, state, city) {
        let output = file.split("/");
        let displayed = await this.uploadedFile.textContent();
        let state_city = await this.stateCity.textContent();
        expect(displayed).toMatch(output[3]);
        expect(this.currentAddress).toHaveText(address);
        expect(state_city).toMatch(state + " " + city);
    }

    /*************************************************************************
    * Author: Owner
    * Created: 04/08/2025
    * Description: Validate state and city on modal
    ************************************************************************/
    async displayModalValues() {
        let rowCount = await this.page.locator('//div[@class="modal-body"]//tbody/tr').count();
        for (let i = 1; i <= rowCount; i++) {
            let label = this.page.locator('//div[@class="modal-body"]//tbody/tr[' + i + ']/td[1]');
            let values = this.page.locator('//div[@class="modal-body"]//tbody/tr[' + i + ']/td[2]');
            console.log("Output (" + i + "). " + await label.textContent() + " - " + await values.textContent());
        }
    }

    /*************************************************************************
    * Author: Owner
    * Created: 04/08/2025
    * Description: Close the modal
    ************************************************************************/
    async closeModal() {
        await this.closeModalButton.scrollIntoViewIfNeeded();
        await this.page.waitForSelector('//button[@id="closeLargeModal"]');
        await this.closeModalButton.click();
    }

    /*************************************************************************
    * Author: Owner
    * Created: 04/08/2025
    * Description: Close the browser
    ************************************************************************/
    async closeBrowser() {
        await this.page.waitForSelector('//button[@id="submit"]', { state: 'visible' });
        await this.page.close();
    }

}