# 🤢 Loan Calculator App

A modern and responsive Loan EMI Calculator with real-time currency exchange rates, built using **React.js**, **Material UI**, and **Context API**, and deployed on **Vercel**.

---

## 🔗 Project Links

* **Live Demo**: [Loan Calculator App](https://loan-calculator-naga-sri-venkat-rs-projects.vercel.app/)
* **GitHub Repository**: [GitHub - Loan Calculator](https://github.com/NagaSriVenkatR/Loan-Calculator)

---

## 📁 Folder Structure

```
src/
│
├── components/
│   ├── Navbar.js             # Navigation bar with responsive menu and dark mode toggle
│   ├── emiCalculatorForm.js  # EMI form input and result display
│   └── exchangeRate.js       # Component for displaying exchange rates
│
├── context/
│   ├── AppContext.js         # Manages global dark/light mode
│   └── currencyContext.js    # Manages currency state
│
├── pages/
│   ├── home.js               # Main EMI Calculator page
│   ├── about.js              # Exchange Rates page
│   └── errorPage.js          # Custom 404 Not Found page
│
├── theme/
│   └── theme.js              # Material UI theme customization (light/dark)
│
├── utils/
│   ├── calculateEMI.js       # Function to compute EMI
│   └── fetchExchangeRates.js # Function to fetch currency data
│
├── App.css                   # General app styling
├── App.js                    # Route and layout management
├── App.test.js               # Basic test setup
├── index.css                 # Base CSS styles
└── index.js                  # Entry point with context/theme providers
```

---

## 🤩 Key Features

### 📊 EMI Calculator

* Inputs: Loan Amount, Interest Rate (%), Tenure (Years)
* Output: Monthly EMI calculated using:

  $$
  EMI = \frac{P \cdot R \cdot (1 + R)^N}{(1 + R)^N - 1}
  $$
* Real-time update on input
* Clean UI with Material UI components

### 🌍 Currency Exchange

* Uses public [ExchangeRate-API](https://www.exchangerate-api.com/)
* View conversion rates between multiple currencies
* Dynamic updates with fetch-based custom hook

### 🌙 Theme Toggle

* Dark and light mode using MUI's `ThemeProvider`
* Managed by global `AppContext`
* Toggle available in both Navbar and Drawer

### 📱 Fully Responsive Design

* Mobile: Drawer + Hamburger menu
* Tablet/Desktop: Horizontal menu with buttons
* Built using MUI breakpoints (`xs`, `sm`, `md`)

### ⚡ Error Page

* Route: `*` for any undefined paths
* Renders `ErrorPage.js` with a 404-friendly message

---

## 🧠 State Management

### Global Theme State

```js
// context/AppContext.js
export const AppContext = createContext();
```

### Currency State

```js
// context/currencyContext.js
export const CurrencyContext = createContext();
```

### Providers in index.js

```jsx
<CurrencyProvider>
  <AppProvider>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </AppProvider>
</CurrencyProvider>
```

---

## 🧪 Testing (Optional)

Basic test scaffolding is included with `App.test.js`. For more:

* Use **Jest** and **React Testing Library**
* Add unit tests for EMI calculation logic
* Mock API requests for currency rates

---

## 🚀 Deployment (Vercel)

### Steps:

1. Push project to GitHub
2. Go to [vercel.com](https://vercel.com/)
3. Connect your GitHub repo
4. Choose the `Loan-Calculator` repo
5. Click **Deploy**

---

## 📄 Future Enhancements

* 🗞 PDF download of EMI schedule
* 📊 Chart visualizations of loan amortization
* 👤 User login + history
* ⚖ Add tests for form validation and API logic

---

## 👨‍💼 Author

**Naga Sri Venkat R**

* GitHub: [NagaSriVenkatR](https://github.com/NagaSriVenkatR)
* Portfolio: [rnsvenkat-portfollio.web.app](https://rnsvenkat-portfollio.web.app)
