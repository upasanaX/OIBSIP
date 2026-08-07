// Task 3: Temperature Converter Pro Script
/**
 * ThermoShift Pro - Temperature Converter Application Script
 * Features: Pure HTML5/CSS3/ES6+, History, Copy API, Light/Dark Theme,
 * Status Indicator, Tooltip Accessibility, Random Temperature Facts
 */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. DOM Element Selections
  // ------------------------------------------------------------------------
  const tempInput = document.getElementById('tempInput');
  const unitSelect = document.getElementById('unitSelect');
  const convertBtn = document.getElementById('convertBtn');
  const resetBtn = document.getElementById('resetBtn');
  const clearInputBtn = document.getElementById('clearInputBtn');
  const errorMessage = document.getElementById('errorMessage');
  const errorText = document.getElementById('errorText');

  const btnText = document.getElementById('btnText');
  const btnIcon = document.getElementById('btnIcon');
  const btnSpinner = document.getElementById('btnSpinner');

  const resultsSection = document.getElementById('resultsSection');
  const resultsBadge = document.getElementById('resultsBadge');
  const copyResultsBtn = document.getElementById('copyResultsBtn');

  const celsiusVal = document.getElementById('celsiusVal');
  const fahrenheitVal = document.getElementById('fahrenheitVal');
  const kelvinVal = document.getElementById('kelvinVal');

  const celsiusCard = document.getElementById('celsiusCard');
  const fahrenheitCard = document.getElementById('fahrenheitCard');
  const kelvinCard = document.getElementById('kelvinCard');

  const celsiusStatus = document.getElementById('celsiusStatus');
  const fahrenheitStatus = document.getElementById('fahrenheitStatus');
  const kelvinStatus = document.getElementById('kelvinStatus');

  // Status Indicator Card
  const statusCard = document.getElementById('statusCard');
  const statusEmoji = document.getElementById('statusEmoji');
  const statusTitle = document.getElementById('statusTitle');
  const statusDesc = document.getElementById('statusDesc');

  // Thermal Gauge
  const gaugeIndicator = document.getElementById('gaugeIndicator');
  const gaugeTooltip = document.getElementById('gaugeTooltip');
  const gaugeStatusText = document.getElementById('gaugeStatusText');

  // Theme Toggle
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');

  // Facts Card
  const factText = document.getElementById('factText');
  const newFactBtn = document.getElementById('newFactBtn');

  // History Card
  const historyList = document.getElementById('historyList');
  const emptyHistoryMsg = document.getElementById('emptyHistoryMsg');
  const clearHistoryBtn = document.getElementById('clearHistoryBtn');

  const toastContainer = document.getElementById('toastContainer');
  const yearSpan = document.getElementById('yearSpan');
  const presetBtns = document.querySelectorAll('.preset-btn');

  // ------------------------------------------------------------------------
  // 2. Constants & Data Collections
  // ------------------------------------------------------------------------
  const ABSOLUTE_ZERO = {
    C: -273.15,
    F: -459.67,
    K: 0
  };

  const STORAGE_HISTORY_KEY = 'thermoshift_history';
  const STORAGE_THEME_KEY = 'thermoshift_theme';

  // Feature 6: 12 Temperature Facts Array
  const TEMPERATURE_FACTS = [
    "Absolute zero is 0 Kelvin (-273.15°C), the theoretical temperature where all molecular kinetic motion ceases.",
    "The hottest temperature ever recorded on Earth was 56.7°C (134°F) in Death Valley, California in 1913.",
    "Water freezes at 0°C (32°F) and boils at 100°C (212°F) under standard sea-level atmospheric pressure.",
    "The average human body temperature is approximately 37°C (98.6°F), though normal range varies between 36.1°C and 37.2°C.",
    "Kelvin is an absolute thermodynamic temperature scale and never uses the degree (°) symbol.",
    "Volcanic molten lava can reach staggering temperatures exceeding 1,200°C (2,192°F).",
    "Antarctica holds the record for Earth's coldest surface temperature, plummeting to −89.2°C (−128.6°F) at Vostok Station.",
    "The surface temperature of the Sun is approximately 5,500°C (9,932°F), while its core reaches over 15 million °C!",
    "Liquid nitrogen boils at −196°C (−320°F) and is widely used for instant freezing and cryopreservation.",
    "Standard indoor room temperature is typically maintained around 20°C to 25°C (68°F to 77°F).",
    "Temperature directly impacts chemical reaction rates; higher heat accelerates molecular velocity and collisions.",
    "A single bolt of lightning can heat the surrounding air to 30,000°C (54,000°F)—five times hotter than the surface of the Sun!"
  ];

  let lastFactIndex = -1;

  // Dynamic Year Setup
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ------------------------------------------------------------------------
  // 3. Feature 3: Theme Management (Dark / Light Mode)
  // ------------------------------------------------------------------------
  const initTheme = () => {
    const savedTheme = localStorage.getItem(STORAGE_THEME_KEY);
    
    // Check system preference if no saved theme
    if (!savedTheme) {
      const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      applyTheme(prefersLight ? 'light' : 'dark');
    } else {
      applyTheme(savedTheme);
    }
  };

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_THEME_KEY, theme);

    if (theme === 'light') {
      themeIcon.className = 'fa-solid fa-sun theme-icon';
      themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
    } else {
      themeIcon.className = 'fa-solid fa-moon theme-icon';
      themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
    }
  };

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    showToast(`Switched to ${newTheme === 'light' ? 'Light' : 'Dark'} Mode`, 'info');
  };

  // ------------------------------------------------------------------------
  // 4. Validation & Physics Limits
  // ------------------------------------------------------------------------
  const validateInput = (rawInput) => {
    const trimmed = rawInput.trim();

    if (trimmed === '') {
      return { isValid: false, errorMsg: 'Input cannot be empty. Please enter a temperature value.', value: null };
    }

    const numericRegex = /^[-+]?\d*\.?\d+$/;
    if (!numericRegex.test(trimmed)) {
      return { isValid: false, errorMsg: 'Invalid input. Only numeric values, decimals, and leading negative signs are allowed.', value: null };
    }

    const numValue = Number(trimmed);

    if (isNaN(numValue) || !isFinite(numValue)) {
      return { isValid: false, errorMsg: 'Please enter a valid numeric temperature value.', value: null };
    }

    return { isValid: true, errorMsg: '', value: numValue };
  };

  const checkAbsoluteZero = (value, unit) => {
    const minAllowed = ABSOLUTE_ZERO[unit];

    if (value < minAllowed) {
      const formattedLimit = unit === 'K' ? '0 K' : `${minAllowed} °${unit}`;
      return {
        isValid: false,
        errorMsg: `Temperature cannot be below absolute zero (${formattedLimit}).`
      };
    }

    return { isValid: true, errorMsg: '' };
  };

  // ------------------------------------------------------------------------
  // 5. Conversion Math
  // ------------------------------------------------------------------------
  const roundTo = (val, decimals = 2) => {
    return Number(Math.round(Number(val + 'e' + decimals)) + 'e-' + decimals);
  };

  const convertTemperature = (val, fromUnit) => {
    let c, f, k;

    switch (fromUnit) {
      case 'C':
        c = val;
        f = (val * 9 / 5) + 32;
        k = val + 273.15;
        break;
      case 'F':
        c = (val - 32) * 5 / 9;
        f = val;
        k = ((val - 32) * 5 / 9) + 273.15;
        break;
      case 'K':
        c = val - 273.15;
        f = ((val - 273.15) * 9 / 5) + 32;
        k = val;
        break;
      default:
        c = val; f = val; k = val;
    }

    return {
      celsius: roundTo(c, 2),
      fahrenheit: roundTo(f, 2),
      kelvin: roundTo(k, 2)
    };
  };

  // ------------------------------------------------------------------------
  // 6. Feature 4: Temperature Status Indicator Resolver
  // ------------------------------------------------------------------------
  const updateStatusIndicator = (celsiusVal) => {
    let emoji, title, desc, category;

    if (celsiusVal < 0) {
      emoji = '❄️';
      title = 'Freezing';
      desc = 'Temperatures are below freezing point. Ice formation is expected.';
      category = 'freezing';
    } else if (celsiusVal >= 0 && celsiusVal <= 15) {
      emoji = '🧥';
      title = 'Cold';
      desc = 'Chilly weather. Crisp conditions requiring warm clothing.';
      category = 'cold';
    } else if (celsiusVal >= 16 && celsiusVal <= 25) {
      emoji = '🌤';
      title = 'Pleasant';
      desc = 'The temperature is comfortable for most outdoor activities.';
      category = 'pleasant';
    } else if (celsiusVal >= 26 && celsiusVal <= 35) {
      emoji = '☀️';
      title = 'Warm';
      desc = 'Warm and sunny conditions. Stay hydrated!';
      category = 'warm';
    } else if (celsiusVal >= 36 && celsiusVal <= 45) {
      emoji = '🔥';
      title = 'Hot';
      desc = 'High temperatures. Avoid prolonged direct sun exposure.';
      category = 'hot';
    } else {
      emoji = '🥵';
      title = 'Extremely Hot';
      desc = 'Extreme heat wave conditions. Exercise extreme caution.';
      category = 'extreme';
    }

    statusEmoji.textContent = emoji;
    statusTitle.textContent = title;
    statusDesc.textContent = desc;
    statusCard.setAttribute('data-category', category);

    // Trigger smooth fade animation
    statusCard.style.animation = 'none';
    statusCard.offsetHeight; // trigger reflow
    statusCard.style.animation = 'fadeIn 0.5s ease';
  };

  // ------------------------------------------------------------------------
  // 7. Feature 2: Copy Results Clipboard API
  // ------------------------------------------------------------------------
  const copyResultsToClipboard = () => {
    const c = celsiusVal.textContent;
    const f = fahrenheitVal.textContent;
    const k = kelvinVal.textContent;

    if (c === '--' || f === '--' || k === '--') {
      showToast('No results to copy yet. Perform a conversion first!', 'error');
      return;
    }

    // Format: 25°C = 77°F = 298.15 K
    const formattedText = `${c}°C = ${f}°F = ${k} K`;

    navigator.clipboard.writeText(formattedText).then(() => {
      showToast('Results copied successfully!', 'success');
    }).catch(err => {
      console.error('Failed to copy to clipboard:', err);
      showToast('Could not copy results to clipboard.', 'error');
    });
  };

  // ------------------------------------------------------------------------
  // 8. Feature 1: Conversion History Management (localStorage)
  // ------------------------------------------------------------------------
  const getHistory = () => {
    try {
      const data = localStorage.getItem(STORAGE_HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading history:', e);
      return [];
    }
  };

  const saveToHistory = (val, unit, conversions) => {
    let history = getHistory();

    const timestamp = new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    const unitSymbol = unit === 'K' ? 'K' : `°${unit}`;

    const newEntry = {
      id: Date.now(),
      inputStr: `${val} ${unitSymbol}`,
      celsius: `${conversions.celsius} °C`,
      fahrenheit: `${conversions.fahrenheit} °F`,
      kelvin: `${conversions.kelvin} K`,
      timestamp
    };

    // Prepend new entry
    history.unshift(newEntry);

    // Keep max 10 records
    if (history.length > 10) {
      history = history.slice(0, 10);
    }

    try {
      localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(history));
    } catch (e) {
      console.error('Error saving history:', e);
    }

    renderHistory();
  };

  const renderHistory = () => {
    const history = getHistory();

    if (history.length === 0) {
      emptyHistoryMsg.classList.remove('hidden');
      historyList.classList.add('hidden');
      return;
    }

    emptyHistoryMsg.classList.add('hidden');
    historyList.classList.remove('hidden');
    historyList.innerHTML = '';

    history.forEach(item => {
      const li = document.createElement('li');
      li.className = 'history-item';
      li.innerHTML = `
        <div class="history-left">
          <span class="history-input"><i class="fa-solid fa-arrow-right"></i> ${item.inputStr}</span>
          <span class="history-time"><i class="fa-regular fa-clock"></i> ${item.timestamp}</span>
        </div>
        <div class="history-right">
          <span class="history-val-tag">${item.celsius}</span>
          <span class="history-val-tag">${item.fahrenheit}</span>
          <span class="history-val-tag">${item.kelvin}</span>
        </div>
      `;
      historyList.appendChild(li);
    });
  };

  const clearHistory = () => {
    localStorage.removeItem(STORAGE_HISTORY_KEY);
    renderHistory();
    showToast('Conversion history cleared.', 'info');
  };

  // ------------------------------------------------------------------------
  // 9. Feature 6: Random Temperature Facts Generator
  // ------------------------------------------------------------------------
  const renderRandomFact = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * TEMPERATURE_FACTS.length);
    } while (newIndex === lastFactIndex && TEMPERATURE_FACTS.length > 1);

    lastFactIndex = newIndex;

    // Fade out text transition
    factText.classList.add('fade-fact');

    setTimeout(() => {
      factText.textContent = TEMPERATURE_FACTS[newIndex];
      factText.classList.remove('fade-fact');
    }, 200);
  };

  // ------------------------------------------------------------------------
  // 10. UI Helpers & Results Rendering
  // ------------------------------------------------------------------------
  const displayError = (msg) => {
    errorText.textContent = msg;
    errorMessage.classList.remove('hidden');
    tempInput.classList.add('input-error');
    tempInput.setAttribute('aria-invalid', 'true');
    showToast(msg, 'error');
  };

  const clearError = () => {
    errorMessage.classList.add('hidden');
    errorText.textContent = '';
    tempInput.classList.remove('input-error');
    tempInput.removeAttribute('aria-invalid');
  };

  const displayResults = (results, inputUnit) => {
    const unitNames = { C: 'Celsius', F: 'Fahrenheit', K: 'Kelvin' };
    resultsBadge.textContent = `Input: ${unitNames[inputUnit]}`;

    celsiusVal.textContent = results.celsius.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
    fahrenheitVal.textContent = results.fahrenheit.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
    kelvinVal.textContent = results.kelvin.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });

    celsiusCard.classList.remove('active-input-card');
    fahrenheitCard.classList.remove('active-input-card');
    kelvinCard.classList.remove('active-input-card');

    celsiusStatus.textContent = 'Converted Unit';
    fahrenheitStatus.textContent = 'Converted Unit';
    kelvinStatus.textContent = 'Absolute Scale';

    if (inputUnit === 'C') {
      celsiusCard.classList.add('active-input-card');
      celsiusStatus.textContent = 'Base Input Unit';
    } else if (inputUnit === 'F') {
      fahrenheitCard.classList.add('active-input-card');
      fahrenheitStatus.textContent = 'Base Input Unit';
    } else if (inputUnit === 'K') {
      kelvinCard.classList.add('active-input-card');
      kelvinStatus.textContent = 'Base Input Unit';
    }

    // Update Temperature Status Indicator (Feature 4)
    updateStatusIndicator(results.celsius);

    // Update Thermal Visual Gauge
    updateGauge(results.celsius);

    resultsSection.classList.remove('hidden');

    if (window.innerWidth < 640) {
      resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const updateGauge = (celsiusVal) => {
    const minScale = -50;
    const maxScale = 150;

    let percentage = ((celsiusVal - minScale) / (maxScale - minScale)) * 100;
    percentage = Math.max(0, Math.min(100, percentage));

    gaugeIndicator.style.left = `${percentage}%`;
    gaugeTooltip.textContent = `${celsiusVal} °C`;

    let status = 'Moderate';
    if (celsiusVal <= -200) status = 'Cryogenic Freezing';
    else if (celsiusVal < 0) status = 'Freezing Sub-Zero';
    else if (celsiusVal === 0) status = 'Freezing Point';
    else if (celsiusVal > 0 && celsiusVal <= 25) status = 'Cool & Comfortable';
    else if (celsiusVal > 25 && celsiusVal <= 37) status = 'Warm / Body Temp';
    else if (celsiusVal > 37 && celsiusVal < 100) status = 'Hot Environment';
    else if (celsiusVal === 100) status = 'Boiling Point';
    else if (celsiusVal > 100) status = 'Extreme High Heat';

    gaugeStatusText.textContent = status;
  };

  const showToast = (message, type = 'info') => {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconClass = 'fa-circle-info';
    if (type === 'success') iconClass = 'fa-circle-check';
    if (type === 'error') iconClass = 'fa-circle-xmark';

    toast.innerHTML = `
      <i class="fa-solid ${iconClass} toast-icon"></i>
      <span class="toast-message">${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toastOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';
      setTimeout(() => {
        if (toastContainer.contains(toast)) {
          toastContainer.removeChild(toast);
        }
      }, 300);
    }, 3000);
  };

  const clearAll = () => {
    tempInput.value = '';
    unitSelect.value = 'C';
    clearError();
    resultsSection.classList.add('hidden');
    clearInputBtn.classList.add('hidden');
    tempInput.focus();
    showToast('Converter reset to default state.', 'info');
  };

  // ------------------------------------------------------------------------
  // 11. Main Workflow Execution
  // ------------------------------------------------------------------------
  const executeConversion = () => {
    clearError();
    const rawVal = tempInput.value;
    const unit = unitSelect.value;

    const validation = validateInput(rawVal);
    if (!validation.isValid) {
      displayError(validation.errorMsg);
      return;
    }

    const absZeroCheck = checkAbsoluteZero(validation.value, unit);
    if (!absZeroCheck.isValid) {
      displayError(absZeroCheck.errorMsg);
      return;
    }

    btnSpinner.classList.remove('hidden');
    btnIcon.classList.add('hidden');
    btnText.textContent = 'Converting...';
    convertBtn.disabled = true;

    setTimeout(() => {
      const conversions = convertTemperature(validation.value, unit);

      // Render Results
      displayResults(conversions, unit);

      // Save to History (Feature 1)
      saveToHistory(validation.value, unit, conversions);

      btnSpinner.classList.add('hidden');
      btnIcon.classList.remove('hidden');
      btnText.textContent = 'Convert Now';
      convertBtn.disabled = false;

      const unitSymbol = unit === 'K' ? 'K' : `°${unit}`;
      showToast(`Successfully converted ${validation.value}${unitSymbol}!`, 'success');
    }, 250);
  };

  // ------------------------------------------------------------------------
  // 12. Initialization & Event Listeners
  // ------------------------------------------------------------------------
  
  // Feature 3: Init Theme
  initTheme();
  themeToggleBtn.addEventListener('click', toggleTheme);

  // Feature 1: Init History
  renderHistory();
  clearHistoryBtn.addEventListener('click', clearHistory);

  // Feature 2: Init Copy Button
  copyResultsBtn.addEventListener('click', copyResultsToClipboard);

  // Feature 6: Init Random Facts
  renderRandomFact();
  newFactBtn.addEventListener('click', renderRandomFact);

  // Form Action Listeners
  convertBtn.addEventListener('click', executeConversion);
  resetBtn.addEventListener('click', clearAll);

  tempInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeConversion();
    }
  });

  tempInput.addEventListener('input', () => {
    if (tempInput.value.trim() !== '') {
      clearInputBtn.classList.remove('hidden');
      clearError();
    } else {
      clearInputBtn.classList.add('hidden');
    }
  });

  clearInputBtn.addEventListener('click', () => {
    tempInput.value = '';
    clearInputBtn.classList.add('hidden');
    clearError();
    tempInput.focus();
  });

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const temp = btn.getAttribute('data-temp');
      const unit = btn.getAttribute('data-unit');

      tempInput.value = temp;
      unitSelect.value = unit;
      clearInputBtn.classList.remove('hidden');
      executeConversion();
    });
  });
});
