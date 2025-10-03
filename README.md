# 🚀 OrangeHRM Automation Testing Project

Final Project untuk Automation Testing menggunakan Cypress pada website OrangeHRM Demo.

## 📋 Deskripsi Project

Project ini merupakan implementasi automation testing untuk website [OrangeHRM Demo](https://opensource-demo.orangehrmlive.com/) menggunakan framework **Cypress** dengan pattern **Page Object Model (POM)**. Testing difokuskan pada fitur-fitur utama sistem HRM seperti Login, Directory, dan Forgot Password.

## 🏗️ Struktur Project

```
final-project/
├── cypress/
│   ├── e2e/
│   │   ├── DirectoryPage.cy.js      # Test cases untuk fitur Directory
│   │   ├── LoginPage.cy.js          # Test cases untuk fitur Login
│   │   └── ForgotPasswordPage.cy.js # Test cases untuk fitur Forgot Password
│   ├── pom/
│   │   ├── DirectoryPage.js         # Page Object untuk Directory
│   │   ├── LoginPage.js             # Page Object untuk Login
│   │   └── ForgotPassword.js        # Page Object untuk Forgot Password
│   ├── fixtures/
│   │   └── example.json
│   ├── support/
│   │   ├── commands.js
│   │   └── e2e.js
│   └── downloads/
├── cypress.config.js
├── package.json
└── README.md
```

## 🚀 Instalasi & Setup

### Prerequisites

- Node.js v18 atau lebih tinggi
- npm atau yarn

### Langkah Instalasi

1. **Clone repository**

   ```bash
   git clone https://github.com/jajammm/orangehrm-automation-test.git
   cd orangehrm-automation-test
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Verifikasi instalasi Cypress**
   ```bash
   npx cypress verify
   ```

## 🎯 Menjalankan Test

### Mode Interactive (GUI)

```bash
npx cypress open
```

### Mode Headless

```bash
# Menjalankan semua test
npx cypress run

# Menjalankan test spesifik
npx cypress run --spec "cypress/e2e/DirectoryPage.cy.js"
```

### Mode Browser Spesifik

```bash
# Chrome
npx cypress run --browser chrome

# Firefox
npx cypress run --browser firefox

# Edge
npx cypress run --browser edge
```

## 📖 Test Coverage

### 🔐 Login Features

- **Total Test Cases**: 10
- **Coverage**:
  - ✅ Valid login scenarios
  - ✅ Invalid credentials testing
  - ✅ Empty field validation
  - ✅ Case sensitivity testing
  - ✅ Special characters handling

### 📁 Directory Features

- **Total Test Cases**: 13
- **Coverage**:
  - ✅ Employee search functionality
  - ✅ Filter by Job Title
  - ✅ Filter by Location
  - ✅ Autocomplete search
  - ✅ Combination filters
  - ✅ Reset filter functionality
  - ✅ No records scenarios
  - ✅ Special characters validation
  - ✅ UI elements verification

### 🔄 Forgot Password Features

- **Total Test Cases**: 3
- **Coverage**:
  - ✅ Valid username scenarios
  - ✅ Empty field validation
  - ✅ Success message verification

## 🏛️ Page Object Model (POM) Implementation

### Struktur POM

Setiap page memiliki:

- **Selectors**: Element locators yang terorganisir
- **Actions**: Method untuk interaksi dengan UI
- **Verifications**: Method untuk validasi hasil

### Contoh Implementation

```javascript
class DirectoryPage {
  // Selectors
  searchButtonSelector = ".oxd-button--secondary";
  employeeNameInputSelector = 'input[placeholder="Type for hints..."]';

  // Actions
  clickSearchButton() {
    cy.get(this.searchButtonSelector).click();
  }

  typeEmployeeName(name) {
    cy.get(this.employeeNameInputSelector).type(name);
  }

  // Verifications
  verifyEmployeesFound() {
    cy.get(this.employeeGridSelector).should("have.length.greaterThan", 0);
  }
}
```

## 📋 Test Cases Detail

### Directory Page Test Cases

| Test Case | Description                                                 | Type        |
| --------- | ----------------------------------------------------------- | ----------- |
| TC001     | Mencari karyawan dengan langsung klik tombol search         | Positive    |
| TC002     | Mencari nama karyawan dengan mengisi kolom pencarian        | Positive    |
| TC003     | Mencari karyawan berdasarkan job title (Ada Karyawan)       | Positive    |
| TC004     | Mencari karyawan berdasarkan job title (Tidak Ada Karyawan) | Negative    |
| TC005     | Mencari karyawan berdasarkan lokasi (Ada Karyawan)          | Positive    |
| TC006     | Mencari karyawan berdasarkan lokasi (Tidak Ada Karyawan)    | Negative    |
| TC007     | Filter lokasi not record found                              | Edge Case   |
| TC008     | Reset filter setelah melakukan pencarian                    | Functional  |
| TC009     | Kombinasi pencarian nama dan job title                      | Integration |
| TC010     | Mencari dengan nama yang tidak ada                          | Negative    |
| TC011     | Verifikasi elemen-elemen di halaman directory               | UI Testing  |
| TC012     | Mencari dengan nama parsial dan autocomplete                | Functional  |
| TC013     | Mencari dengan karakter spesial                             | Boundary    |
| TC014     | Kombinasi semua filter                                      | Integration |
| TC015     | Clear input dan search kembali                              | Functional  |

## 🎯 Best Practices

### Code Quality

- ✅ Menggunakan Page Object Model pattern
- ✅ Descriptive test case names
- ✅ Modular dan reusable code
- ✅ Proper wait strategies
- ✅ Clear assertions

### Test Data Management

- ✅ Hardcoded test data untuk demo environment
- ✅ Dynamic selectors handling
- ✅ Multiple test scenarios coverage

### Error Handling

- ✅ Graceful failure handling
- ✅ Screenshot on failure (Cypress default)
- ✅ Detailed error messages

## 🔧 Configuration

### Cypress Configuration (cypress.config.js)

```javascript
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://opensource-demo.orangehrmlive.com",
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
```

## 📊 Reporting

Cypress secara default menyediakan:

- **Interactive reporting** saat menjalankan test
- **Video recording** untuk headless mode
- **Screenshots** pada test failure
- **Test results** di terminal

## 🐛 Troubleshooting

### Common Issues

1. **Element not found**

   ```
   Solution: Tambahkan explicit wait atau update selector
   ```

2. **Timeout errors**

   ```
   Solution: Increase timeout di cypress.config.js atau gunakan cy.wait()
   ```

3. **Flaky tests**
   ```
   Solution: Implementasi proper wait strategies dan stable selectors
   ```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Test Credentials

**Default Test Account:**

- Username: `Admin`
- Password: `admin123`

> ⚠️ **Note**: Credentials ini untuk OrangeHRM demo environment dan dapat berubah sewaktu-waktu.

## 📚 Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [OrangeHRM Demo](https://opensource-demo.orangehrmlive.com/)
- [Page Object Model Pattern](https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/)

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Final Project - Sanber Bootcamp**

- Repository: [orangehrm-automation-test](https://github.com/jajammm/orangehrm-automation-test)
- Branch: main

---

### 🎉 Happy Testing!

Jika ada pertanyaan atau issues, silakan buat issue di repository ini atau hubungi maintainer.
