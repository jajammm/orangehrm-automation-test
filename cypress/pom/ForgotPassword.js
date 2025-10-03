class ForgotPasswordPage {
  orangeUrl =
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";

  forgotPasswordSelector =
    ".oxd-text.oxd-text--p.orangehrm-login-forgot-header";
  usernameInputSelector = 'input[placeholder="Username"]';
  submitButtonSelector = 'button[type="submit"]';
  cancelButtonSelector = 'button[type="button"]';

  setupIntercepts() {
    // Intercept untuk halaman login
    cy.intercept("GET", "**/web/index.php/auth/login").as("loginPageLoad");

    // Intercept untuk halaman forgot password
    cy.intercept("GET", "**/web/index.php/auth/requestPasswordResetCode").as(
      "forgotPasswordPageLoad"
    );

    // Intercept untuk submit reset password request
    cy.intercept("GET", "**/web/index.php/auth/sendPasswordReset").as(
      "resetPasswordRequestSuccess"
    );
  }

  visitLoginPage() {
    cy.visit(this.orangeUrl);
  }

  clickForgotPasswordLink() {
    cy.get(this.forgotPasswordSelector).click();
  }

  enterUsername(username) {
    cy.get(this.usernameInputSelector).type(username);
  }

  clickSubmitButton() {
    cy.get(this.submitButtonSelector).click();
  }

  clickCancelButton() {
    cy.get(this.cancelButtonSelector).click();
  }

  // Assertions
  verifySuccessMessage() {
    cy.contains("Reset Password link sent successfully").should("be.visible");
  }

  verifyRequiredMessage() {
    cy.contains("Required").should("be.visible");
  }

  verifyLoginPageDisplayed() {
    cy.contains("Login").should("be.visible");
  }
}

export default ForgotPasswordPage;
