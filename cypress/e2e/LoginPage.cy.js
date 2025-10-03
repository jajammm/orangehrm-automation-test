import LoginPage from "../pom/LoginPage";

describe("Login Feature - OrangeHRM", () => {
  const login = new LoginPage();

  beforeEach(() => {
    login.setupIntercepts();
    login.visitLoginPage();
  });

  it("TC001 - Login dengan kredensial yang valid", () => {
    login.fillUsername("Admin");
    login.fillPassword("admin123");
    login.submit();

    cy.wait("@validLogin");
    login.successfulLogin();
  });

  it("TC002 - Login dengan username yang tidak valid", () => {
    login.fillUsername("invaliduser");
    login.fillPassword("admin123");
    login.submit();

    cy.wait("@invalidLogin");
    login.invalidCredentialsMessage();
  });

  it("TC003 - Login dengan password yang tidak valid", () => {
    login.fillUsername("Admin");
    login.fillPassword("wrongpass");
    login.submit();

    cy.wait("@invalidLogin");
    login.invalidCredentialsMessage();
  });

  it("TC004 - Login dengan username dan password yang keduanya tidak valid", () => {
    login.fillUsername("invaliduser"); // username tidak valid
    login.fillPassword("wrongpassword"); // password tidak valid
    login.submit();

    cy.wait("@invalidLogin");
    login.invalidCredentialsMessage();
  });

  it("TC005 - Login dengan username yang kosong", () => {
    login.fillPassword("admin123");
    login.submit();

    login.requiredFieldMessage();
  });

  it("TC006 - Login dengan password yang kosong", () => {
    login.fillUsername("Admin");
    login.submit();

    login.requiredFieldMessage();
  });

  it("TC007 - Login dengan username dan password yang kosong", () => {
    login.submit();

    login.requiredFieldMessage();
  });

  it("TC008 - Login dengan username huruf kecil - UNEXPECTED: berhasil login", () => {
    login.fillUsername("admin"); // huruf kecil
    login.fillPassword("admin123"); // password tetap benar
    login.submit();

    cy.wait("@validLogin");
    // EXPECTED: Seharusnya gagal, tapi ternyata berhasil (bug!)
    login.successfulLogin();
  });

  it("TC009 - Login dengan password case berbeda - seharusnya gagal", () => {
    login.fillUsername("Admin");
    login.fillPassword("Admin123"); // huruf besar di awal
    login.submit();

    cy.wait("@invalidLogin");
    login.invalidCredentialsMessage();
  });

  it("TC010 - Login dengan username yang mengandung spasi", () => {
    login.fillUsername(" Admin ");
    login.fillPassword("admin123");
    login.submit();

    cy.wait("@invalidLogin");
    login.invalidCredentialsMessage();
  });
});
