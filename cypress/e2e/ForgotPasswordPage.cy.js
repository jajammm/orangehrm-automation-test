import ForgotPasswordPage from "../pom/ForgotPassword.js";

describe("Forgot Password Scenario - OrangeHRM", () => {
  let forgotPasswordPage;

  beforeEach(() => {
    forgotPasswordPage = new ForgotPasswordPage();

    forgotPasswordPage.setupIntercepts();
    forgotPasswordPage.visitLoginPage();
  });

  it("TC001 - Pengguna bisa mengubah password dengan username yang valid", () => {
    cy.wait("@loginPageLoad");

    forgotPasswordPage.clickForgotPasswordLink();
    cy.wait("@forgotPasswordPageLoad");

    forgotPasswordPage.enterUsername("Admin");
    forgotPasswordPage.clickSubmitButton();
    cy.wait("@resetPasswordRequestSuccess");

    forgotPasswordPage.verifySuccessMessage();
  });

  it("TC002 - Pengguna tidak memasukkan username pada kolom username", () => {
    cy.wait("@loginPageLoad");

    forgotPasswordPage.clickForgotPasswordLink();
    cy.wait("@forgotPasswordPageLoad");

    forgotPasswordPage.clickSubmitButton();

    forgotPasswordPage.verifyRequiredMessage();
  });

  it("TC003 - Pengguna klik tombol cancel", () => {
    cy.wait("@loginPageLoad");

    forgotPasswordPage.clickForgotPasswordLink();
    cy.wait("@forgotPasswordPageLoad");

    forgotPasswordPage.enterUsername("Admin");
    forgotPasswordPage.clickCancelButton();
    cy.wait("@loginPageLoad");

    forgotPasswordPage.verifyLoginPageDisplayed();
  });
});
