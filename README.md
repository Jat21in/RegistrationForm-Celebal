# ✨ Advanced Animated Registration Form in React

> A modern, interactive, and fully validated user registration form built with React.js, featuring real-time validation, animated UI, and smooth user experience inspired by top-tier tech standards.

---

## 🚀 Features

### 🔐 Secure & User-Friendly Inputs
- Real-time validation with contextual error messages.
- All fields marked as *required* with appropriate messages on invalid input.
- Creative animated password toggle effect (Show/Hide).

### 🌎 Dynamic Location Selection
- Country-City cascading dropdown.
- Cities update based on selected country.

### 🎨 Modern UI/UX
- Animated SVG background.
- Smooth input field transitions and interactive layout.
- CSS-powered glowing form wrapper and buttons.

### ⚙️ Tech Stack
- **React.js** with Hooks (`useState`, `useEffect`)
- **React Router** for navigation
- **CSS Modules** & animations
- **Regex-based validations** for email, phone, PAN, and Aadhaar

---

## 📸 Screenshots

| Form Input View | Password Toggle | Country-City Dropdown |
|------------------|------------------|------------------------|
| *Insert image here* | *Insert image here* | *Insert image here* |

---

## 🧠 Smart Validations

| Field       | Validation Rule                          | Example           |
|-------------|-------------------------------------------|-------------------|
| First Name  | Required                                  | —                 |
| Last Name   | Required                                  | —                 |
| Username    | Required                                  | johndoe           |
| Email       | Must match email format                   | abc@mail.com      |
| Password    | Minimum 6 characters                      | abc123            |
| Phone       | Format: +<code>CountryCode</code> Number | +91 9876543210    |
| PAN         | 5 letters + 4 digits + 1 letter           | ABCDE1234F        |
| Aadhaar     | 12 digits only                            | 123412341234      |

---

## 📁 Project Folder Structure

```
/src
├── components/
│   └── Form.jsx         # Main animated registration form with validation
├── pages/
│   └── Summary.jsx      # Summary page to display submitted form data
├── styles/
│   └── Form.css         # Custom CSS for modern, animated, glowing UI
├── App.js               # Main application file handling routes
└── index.js             # React DOM rendering entry point
```

---

## 💻 How to Run

```bash
# Clone the repository
git clone https://github.com/your-username/react-advanced-form.git

# Navigate into the project folder
cd react-advanced-form

# Install dependencies
npm install

# Run the development server
npm start

## 🙌 Author

Developed by [Your Name]  
GitHub: [https://github.com/your-username](https://github.com/your-username)
