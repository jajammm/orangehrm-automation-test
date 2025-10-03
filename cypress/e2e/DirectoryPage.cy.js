import DirectoryPage from "../pom/DirectoryPage";

describe("Menu Directory - OrangeHRM", () => {
  const directoryPage = new DirectoryPage();

  beforeEach(() => {
    directoryPage.accessToDirectory("Admin", "admin123");
  });

  it("TC001 - Mencari karyawan dengan langsung klik tombol search", () => {
    directoryPage.clickSearchButton();
    directoryPage.verifyEmployeesFound();
  });

  it.only("TC002 - Mencari nama karyawan dengan mengisi kolom pencarian", () => {
    directoryPage.typeEmployeeName("Peter");
    cy.wait(5000);
    directoryPage.selectFirstAutocompleteOption();
    directoryPage.clickSearchButton();
    directoryPage.verifyEmployeesFound();
  });

  it("TC003 - Mencari karyawan berdasarkan job title (Ada Karyawan)", () => {
    directoryPage.selectJobTitle(1);
    directoryPage.clickSearchButton();
    directoryPage.verifyEmployeesFound();
  });

  it("TC004 - Mencari karyawan berdasarkan job title (Tidak Ada Karyawan)", () => {
    directoryPage.selectJobTitle(2);
    directoryPage.clickSearchButton();
    directoryPage.verifyNoRecordsFound();
  });

  it.skip("TC005 - Mencari karyawan berdasarkan lokasi (Ada Karyawan)", () => {
    directoryPage.selectLocation(1);
    directoryPage.clickSearchButton();
    directoryPage.verifyEmployeesFound();
  });

  it.skip("TC006 - Mencari karyawan berdasarkan lokasi (Tidak Ada Karyawan)", () => {
    directoryPage.selectLocation(2);
    directoryPage.clickSearchButton();
    directoryPage.verifyNoRecordsFound();
  });

  it("TC007 - Filter lokasi not record found", () => {
    directoryPage.selectLocationDropdownOnly();
    directoryPage.verifyNoRecordsFoundInLocationDropdown();
  });

  it("TC008 - Reset filter setelah melakukan pencarian", () => {
    directoryPage.selectJobTitle(1);
    directoryPage.clickSearchButton();
    directoryPage.verifyEmployeesFound();

    directoryPage.clickResetButton();
    cy.get('input[placeholder="Type for hints..."]').should("have.value", "");
  });

  it("TC009 - Kombinasi pencarian nama dan job title", () => {
    directoryPage.typeEmployeeName("Peter");
    cy.wait(5000);
    directoryPage.selectFirstAutocompleteOption();
    directoryPage.selectJobTitle(5);
    directoryPage.clickSearchButton();
    directoryPage.verifyEmployeesFound();
  });

  it("TC010 - Verifikasi elemen-elemen di halaman directory", () => {
    directoryPage.verifyDirectoryPageElements();
  });

  it("TC011 - Mencari dengan nama parsial dan autocomplete", () => {
    directoryPage.typePartialEmployeeName("P");
    cy.wait(3000);
    directoryPage.verifyAutocompleteDropdownVisible();
    directoryPage.selectSpecificAutocompleteOption(0);
    directoryPage.clickSearchButton();
    directoryPage.verifyEmployeesFound();
  });

  it.skip("TC012 - Kombinasi semua filter", () => {
    directoryPage.typeEmployeeName("John");
    cy.wait(5000);
    directoryPage.selectFirstAutocompleteOption();
    directoryPage.selectJobTitle(1);
    directoryPage.selectLocation(1);
    directoryPage.clickSearchButton();
    directoryPage.verifyEmployeesFound();
  });

  it("TC013 - Clear input dan search kembali", () => {
    directoryPage.typeEmployeeName("John");
    cy.wait(2000);
    directoryPage.clearEmployeeNameInput();
    directoryPage.clickSearchButton();
    directoryPage.verifyEmployeesFound();
  });
});
