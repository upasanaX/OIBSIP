# 🌡️ ThermoShift Pro - Temperature Converter

> A modern, responsive, production-quality Temperature Converter web application built with **HTML5**, **CSS3 (Dual Light/Dark Glassmorphism design)**, and **Vanilla JavaScript (ES6+)**. Developed as a high-performance web development project.

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Build](https://img.shields.io/badge/Build-Passing-emerald.svg)
![Technologies](https://img.shields.io/badge/Tech-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-orange.svg)

---

## 📌 Project Overview

**ThermoShift Pro** is a high-precision temperature conversion application that allows users to instantly convert numerical temperature values across **Celsius (°C)**, **Fahrenheit (°F)**, and **Kelvin (K)** scales. It features strict physics validation (Absolute Zero limits), conversion history persistence, one-click clipboard copying, dynamic temperature status indicators, responsive light/dark themes, unit info tooltips, and interactive temperature facts.

---

## ✨ Features

- ⚡ **Simultaneous Multi-Unit Conversion**: Convert any input unit and immediately view all three temperature scales (°C, °F, K) side-by-side.
- 🕒 **Conversion History (Feature 1)**: Stores up to 10 recent conversions in `localStorage` with formatted timestamps and a "Clear History" button.
- 📋 **Copy Results API (Feature 2)**: One-click copy button copying formatted conversions (`25°C = 77°F = 298.15 K`) to clipboard with smooth toast alerts.
- 🌓 **Dark / Light Theme Toggle (Feature 3)**: Automatic system theme detection (`prefers-color-scheme`), smooth CSS color transitions, Sun/Moon toggle button, and persistent setting.
- 🌡️ **Temperature Status Indicator (Feature 4)**: Dynamic status card categorizing converted values:
  - ❄️ Freezing (< 0°C)
  - 🧥 Cold (0–15°C)
  - 🌤 Pleasant (16–25°C)
  - ☀️ Warm (26–35°C)
  - 🔥 Hot (36–45°C)
  - 🥵 Extremely Hot (> 45°C)
- ℹ️ **Unit Information Tooltips (Feature 5)**: Interactive hover/tap info icons (ℹ️) beside unit headers detailing scientific backgrounds.
- 💡 **"Did You Know?" Temperature Facts (Feature 6)**: Interactive facts card displaying 12+ temperature science facts with a "New Fact" button and non-consecutive duplicate prevention.
- 🛡️ **Physics-Grade Validation**: Enforces theoretical absolute zero boundaries:
  - Celsius: `-273.15 °C`
  - Fahrenheit: `-459.67 °F`
  - Kelvin: `0 K`
- ⚡ **Quick Temperature Presets**: One-click preset chips for Absolute Zero, Freezing, Room Temp, Body Temp, and Boiling.
- ♿ **Accessibility & Keyboard Friendly**: Full `Enter` key support, high-contrast visual focus states, and ARIA labels.

---

## 🛠️ Technologies Used

- **HTML5**: Semantic layout, accessible form controls, tooltip markup.
- **CSS3**: Dual theme CSS variables, Glassmorphism backdrop-filters, keyframe animations, responsive grid/flexbox.
- **Vanilla JavaScript (ES6+)**: `localStorage` persistence, Clipboard API, modular functions, toast notifications.
- **Google Fonts**: *Plus Jakarta Sans* & *JetBrains Mono*.
- **Font Awesome 6**: Vector icons for UI indicators.

---

## 📂 Project Structure

```text
temperature-converter/
│── index.html          # Main HTML structure & semantic elements
│── style.css           # Glassmorphism design tokens, light/dark themes & animations
│── script.js           # Modular ES6+ JavaScript conversion & feature handlers
│── README.md           # Technical documentation
└── assets/
    ├── icons/          # Icon assets placeholder
    └── images/         # Image assets & preview screenshots
```

---

## 🚀 How to Run

1. Open `index.html` directly in any modern web browser (Chrome, Edge, Firefox, Safari).
2. Or serve locally using Node.js:
   ```bash
   npx serve .
   ```

---

## 📐 Conversion Formulas

| From Unit | To Target Unit | Formula |
| :--- | :--- | :--- |
| **Celsius (°C)** | Fahrenheit (°F) | `°F = (°C × 9/5) + 32` |
| **Celsius (°C)** | Kelvin (K) | `K = °C + 273.15` |
| **Fahrenheit (°F)** | Celsius (°C) | `°C = (°F − 32) × 5/9` |
| **Fahrenheit (°F)** | Kelvin (K) | `K = ((°F − 32) × 5/9) + 273.15` |
| **Kelvin (K)** | Celsius (°C) | `°C = K − 273.15` |
| **Kelvin (K)** | Fahrenheit (°F) | `°F = ((K − 273.15) × 9/5) + 32` |

---

## 👤 Author

- **Developer**: Upasana
- **Task**: Web Development Internship - Task 3 (OIBSIP)

---

## 📄 License

This project is open-source under the **MIT License**.
