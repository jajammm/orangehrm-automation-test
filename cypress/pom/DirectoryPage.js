class DirectoryPage {
  orangeUrl =
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";

  // Login selectors
  usernameSelector = 'input[name="username"]';
  passwordSelector = 'input[name="password"]';
  submitButtonSelector = 'button[type="submit"]';

  // Directory page selectors
  directoryMenuSelector =
    "body > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > aside:nth-child(1) > nav:nth-child(1) > div:nth-child(2) > ul:nth-child(2) > li:nth-child(9) > a:nth-child(1)";
  searchButtonSelector = ".oxd-button--secondary";
  employeeNameInputSelector = 'input[placeholder="Type for hints..."]';
  jobTitleDropdownSelector = "div.oxd-select-text";
  locationDropdownSelector = "div.oxd-select-text";
  autocompleteDropdownSelector = ".oxd-autocomplete-dropdown > *";
  selectDropdownSelector = ".oxd-select-dropdown > *";
  dropdownContainerSelector = ".oxd-select-dropdown";
  dropdownOptionSelector = ".oxd-select-dropdown .oxd-select-option";
  emptyDropdownMessageSelector = ".oxd-select-dropdown--empty";
  employeeGridSelector = ".orangehrm-container .oxd-grid-item";
  noRecordsTextSelector = ".orangehrm-horizontal-padding > .oxd-text";
  noRecordsInputMessageSelector = ".oxd-input-group__message"; // Pesan "No Records Found" di bawah input Employee Name
  toastMessageSelector = ".oxd-text--toast-message";
  breadcrumbSelector = ".oxd-topbar-header-breadcrumb > .oxd-text";
  resetButtonSelector = ".oxd-button--ghost";
  employeeCardSelector = ".orangehrm-directory-card";
  employeeNameInCardSelector = ".orangehrm-directory-card-header";
  employeeJobTitleInCardSelector = ".orangehrm-directory-card-subtitle";
  totalEmployeesTextSelector = ".orangehrm-horizontal-padding .oxd-text--span";

  accessToDirectory(username, password) {
    cy.visit(this.orangeUrl);
    cy.get(this.usernameSelector).type(username);
    cy.get(this.passwordSelector).type(password);
    cy.get(this.submitButtonSelector).click();
    cy.url().should("include", "/dashboard");
    cy.contains("Dashboard").should("be.visible");

    cy.get(this.directoryMenuSelector).click();
    cy.url().should("include", "/directory/viewDirectory");
    cy.get(this.breadcrumbSelector).should("have.text", "Directory");
  }

  clickSearchButton() {
    cy.get(this.searchButtonSelector).click();
  }

  typeEmployeeName(name) {
    cy.get(this.employeeNameInputSelector).type(name);
  }

  selectFirstAutocompleteOption() {
    cy.get(this.autocompleteDropdownSelector).first().click();
  }

  selectJobTitle(index) {
    cy.get(this.jobTitleDropdownSelector).eq(0).click();
    cy.get(this.selectDropdownSelector).eq(index).click();
  }

  selectLocation(index) {
    cy.get(this.locationDropdownSelector).eq(1).click();
    cy.get(this.selectDropdownSelector).eq(index).click();
  }

  selectLocationDropdownOnly() {
    // Klik dropdown lokasi untuk membuka opsi
    cy.get(this.locationDropdownSelector).eq(1).click();
    // Tidak memilih apapun karena dropdown kosong/No Records Found
  }

  verifyEmployeesFound() {
    cy.get(this.employeeGridSelector).should("have.length.greaterThan", 0);
  }

  verifyNoRecordsFound() {
    cy.get(this.noRecordsTextSelector).should("have.text", "No Records Found");
    cy.get(this.toastMessageSelector).should("have.text", "No Records Found");
  }

  verifyToastNoRecordsFound() {
    cy.get(this.toastMessageSelector).should("have.text", "No Records Found");
  }

  verifyNoRecordsFoundMessage() {
    // Verifikasi pesan "No Records Found" yang muncul di bawah input Employee Name
    cy.get(this.noRecordsInputMessageSelector).should("be.visible");
    cy.get(this.noRecordsInputMessageSelector).should(
      "contain.text",
      "No Records Found"
    );
  }

  verifyNoRecordsFoundInLocationDropdown() {
    // Verifikasi dropdown lokasi terbuka
    cy.get(this.dropdownContainerSelector).should("be.visible");

    // Verifikasi pesan "No Records Found" di dalam dropdown
    cy.get(this.dropdownContainerSelector).then(($dropdown) => {
      if ($dropdown.find(".oxd-select-option").length > 0) {
        // Jika ada opsi, cek apakah berisi "No Records Found"
        cy.get(this.dropdownOptionSelector).should(
          "contain.text",
          "No Records Found"
        );
      } else {
        // Jika tidak ada opsi sama sekali, cek container dropdown
        cy.get(this.dropdownContainerSelector).should(
          "contain.text",
          "No Records Found"
        );
      }
    });
  }

  clickResetButton() {
    cy.get(this.resetButtonSelector).click();
  }

  clearEmployeeNameInput() {
    cy.get(this.employeeNameInputSelector).clear();
  }

  verifyEmployeeNameInResults(expectedName) {
    cy.get(this.employeeNameInCardSelector).should(
      "contain.text",
      expectedName
    );
  }

  verifyJobTitleInResults(expectedJobTitle) {
    cy.get(this.employeeJobTitleInCardSelector).should(
      "contain.text",
      expectedJobTitle
    );
  }

  verifySpecificNumberOfEmployees(count) {
    cy.get(this.employeeGridSelector).should("have.length", count);
  }

  getEmployeeCount() {
    return cy
      .get(this.employeeGridSelector)
      .then(($elements) => $elements.length);
  }

  verifyDirectoryPageElements() {
    cy.get(this.employeeNameInputSelector).should("be.visible");
    cy.get(this.jobTitleDropdownSelector).eq(0).should("be.visible");
    cy.get(this.locationDropdownSelector).eq(1).should("be.visible");
    cy.get(this.searchButtonSelector).should("be.visible");
    cy.get(this.resetButtonSelector).should("be.visible");
  }

  selectSpecificAutocompleteOption(index) {
    cy.get(this.autocompleteDropdownSelector).eq(index).click();
  }

  selectSpecificAutocompleteOption(index) {
    cy.get(this.autocompleteDropdownSelector).eq(index).click();
  }

  verifyAutocompleteDropdownVisible() {
    cy.get(this.autocompleteDropdownSelector).should("be.visible");
  }

  typePartialEmployeeName(partialName) {
    cy.get(this.employeeNameInputSelector).type(partialName);
    cy.wait(2000); // Wait for autocomplete to appear
  }

  verifyEmployeeCardVisible() {
    cy.get(this.employeeCardSelector).should("be.visible");
  }

  verifySearchFormIsEmpty() {
    cy.get(this.employeeNameInputSelector).should("have.value", "");
  }

  verifyBreadcrumbText() {
    cy.get(this.breadcrumbSelector).should("have.text", "Directory");
  }

  selectJobTitleByText(jobTitle) {
    cy.get(this.jobTitleDropdownSelector).eq(0).click();
    cy.get(this.selectDropdownSelector).contains(jobTitle).click();
  }

  selectLocationByText(location) {
    cy.get(this.locationDropdownSelector).eq(1).click();
    cy.get(this.selectDropdownSelector).contains(location).click();
  }

  verifyNoAutocompleteDropdown() {
    cy.get(this.autocompleteDropdownSelector).should("not.exist");
  }

  waitForAutocomplete() {
    cy.wait(3000);
  }

  verifyPageTitle() {
    cy.title().should("contain", "OrangeHRM");
  }
}

export default DirectoryPage;
