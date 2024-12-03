export class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInputField = page.locator('input[id="username"]');
        this.passwordInputField = page.locator('input[id="password"]');
        this.signInButton = page.locator('button[type="submit"]');
        this.logOutButton = page.getByText('Logout');
    }

    async fillUsername(username) {
        const usernameInputField = this.usernameInputField;
        await usernameInputField.fill(username);
    }

    async fillPassword(password) {
        const passwordInputField = this.passwordInputField;
        await passwordInputField.fill(password);
    }

    async enterUser(username) {
        await this.fillUsername(username);
    }

    async enterPassword(password) {
        await this.fillPassword(password);
    }

    async clickSignInButton() {
        const signInButton = this.signInButton;
        await signInButton.click();
    }

}