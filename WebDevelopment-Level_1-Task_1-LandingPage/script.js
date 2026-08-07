/* PlantPal Interactive Features & Web App Logic */

document.addEventListener('DOMContentLoaded', () => {
  initToastSystem();
  initMockupInteractivity();
  initDemoPlayground();
  initFeatureFilters();
  initModal();
  initClickableBadges();
  initPlantRoomAnimation();
  initScrollSpy();
});

/* ==========================================================================
   1. Toast Notification System
   ========================================================================== */
function initToastSystem() {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  window.showToast = function(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = '🌿';
    if (type === 'water') icon = '💧';
    if (type === 'scan') icon = '📷';
    if (type === 'success') icon = '🎉';
    if (type === 'reminder') icon = '⏰';

    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span class="toast-text">${message}</span>
      <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
    `;

    container.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  };
}

/* ==========================================================================
   2. Smartphone Mockup Interactivity (Hero Section)
   ========================================================================== */
function initMockupInteractivity() {
  const waterBtn = document.getElementById('waterBtn');
  const waterPercent = document.getElementById('waterPercent');
  const waterBarFill = document.getElementById('waterBarFill');
  const mainHealthStatus = document.getElementById('mainHealthStatus');
  const mockupScanTrigger = document.getElementById('mockupScanTrigger');
  const scanLaser = document.getElementById('scanLaser');

  // Interactive Water Button inside phone mockup
  if (waterBtn && waterBarFill) {
    let watered = false;
    waterBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!watered) {
        waterBarFill.style.width = '100%';
        waterBarFill.style.background = 'linear-gradient(90deg, #4caf50, #2e7d32)';
        waterPercent.textContent = '100%';
        waterBtn.textContent = '✅ Watered';
        waterBtn.style.background = '#2e7d32';
        waterBtn.style.color = '#fff';
        if (mainHealthStatus) mainHealthStatus.textContent = 'Optimal 100%';
        watered = true;
        showToast('Monstera Deliciosa watered! Moisture level set to 100%.', 'water');
      } else {
        waterBarFill.style.width = '74%';
        waterBarFill.style.background = 'linear-gradient(90deg, var(--primary-light), var(--primary))';
        waterPercent.textContent = '74%';
        waterBtn.textContent = '💧 Water';
        waterBtn.style.background = 'rgba(76, 175, 80, 0.12)';
        waterBtn.style.color = 'var(--primary-dark)';
        if (mainHealthStatus) mainHealthStatus.textContent = 'All plants thriving';
        watered = false;
        showToast('Reset moisture level simulation.', 'info');
      }
    });
  }

  // Interactive AI Scan inside phone mockup
  const scannedPlants = [
    { name: 'Calathea Orbifolia', desc: 'Low-light friendly. Needs humid conditions and weekly care reminders.', title: 'AI Plant Scan' },
    { name: 'Fiddle-Leaf Fig', desc: 'Loves bright indirect light. Requires consistent moisture balance.', title: 'AI Scan Result' },
    { name: 'Snake Plant (Sansevieria)', desc: 'Air-purifying & drought resistant. Low water maintenance.', title: 'AI Scan Result' },
    { name: 'Peace Lily (Spathiphyllum)', desc: 'Tells you when it needs water. Air filtering powerhouse.', title: 'AI Scan Result' }
  ];
  let scanIndex = 0;

  if (mockupScanTrigger && scanLaser) {
    mockupScanTrigger.addEventListener('click', () => {
      scanLaser.classList.add('scanning');
      const scanPlantName = document.getElementById('scanPlantName');
      const scanPlantDesc = document.getElementById('scanPlantDesc');

      showToast('Scanning plant image with neural vision...', 'scan');

      setTimeout(() => {
        scanLaser.classList.remove('scanning');
        scanIndex = (scanIndex + 1) % scannedPlants.length;
        const plant = scannedPlants[scanIndex];

        if (scanPlantName) scanPlantName.textContent = plant.name;
        if (scanPlantDesc) scanPlantDesc.textContent = plant.desc;

        showToast(`Matched: ${plant.name}! Care guide loaded.`, 'success');
      }, 1200);
    });
  }
}

/* ==========================================================================
   3. Interactive AI Demo Playground Section
   ========================================================================== */
const plantData = {
  monstera: {
    title: "Monstera Deliciosa (Swiss Cheese Plant)",
    emoji: "🌿",
    match: "99.4%",
    status: "Optimal Health",
    desc: "Famous for its dramatic natural leaf splits. Thrives in bright indirect light with moderate soil moisture.",
    moisture: 78,
    moistureText: "78% (Ideal)",
    light: 88,
    lightText: "Bright Indirect",
    tip: "Rotate plant 90° clockwise every 2 weeks to ensure even leaf growth towards sunlight."
  },
  calathea: {
    title: "Calathea Orbifolia (Peacock Plant)",
    emoji: "🍃",
    match: "98.9%",
    status: "Needs Humidity",
    desc: "Stunning oversized striped foliage. Sensitive to tap water mineral salts and dry indoor air.",
    moisture: 62,
    moistureText: "62% (Needs Mist)",
    light: 65,
    lightText: "Medium Shade",
    tip: "Use distilled or rainwater and mist foliage every morning to prevent edge browning."
  },
  fiddle: {
    title: "Fiddle-Leaf Fig (Ficus Lyrata)",
    emoji: "🪴",
    match: "99.1%",
    status: "Thriving",
    desc: "Bold violin-shaped leaves that make a dramatic statement in bright, sunny living rooms.",
    moisture: 70,
    moistureText: "70% (Balanced)",
    light: 95,
    lightText: "High Indirect",
    tip: "Wipe large leaves with a damp cloth monthly to clear dust and boost photosynthesis."
  },
  snake: {
    title: "Snake Plant (Sansevieria Trifasciata)",
    emoji: "🌵",
    match: "99.8%",
    status: "Super Hardy",
    desc: "Extremely resilient architectural plant. Tolerates low light and infrequent watering cycles.",
    moisture: 40,
    moistureText: "40% (Low Water Needed)",
    light: 50,
    lightText: "Tolerates Low Light",
    tip: "Allow soil to completely dry out between waterings to prevent root rot."
  },
  peace: {
    title: "Peace Lily (Spathiphyllum Wallisi)",
    emoji: "🌸",
    match: "97.8%",
    status: "Blooms Active",
    desc: "Lush green foliage with elegant white spathes. Excellent natural indoor air purifier.",
    moisture: 82,
    moistureText: "82% (Moist)",
    light: 70,
    lightText: "Filtered Light",
    tip: "Keep soil consistently moist. If leaves droop slightly, water thoroughly."
  }
};

function initDemoPlayground() {
  const selectorBtns = document.querySelectorAll('.plant-select-btn');
  const demoEmoji = document.getElementById('demoPlantEmoji');
  const demoBadge = document.getElementById('demoScanBadge');
  const demoTitle = document.getElementById('demoPlantTitle');
  const demoStatus = document.getElementById('demoHealthTag');
  const demoDesc = document.getElementById('demoPlantDesc');
  const demoMoistureBar = document.getElementById('demoMoistureBar');
  const demoMoistureVal = document.getElementById('demoMoistureVal');
  const demoLightBar = document.getElementById('demoLightBar');
  const demoLightVal = document.getElementById('demoLightVal');
  const demoAiTip = document.getElementById('demoAiTip');
  const runDemoScanBtn = document.getElementById('runDemoScanBtn');
  const demoScannerFrame = document.getElementById('demoScannerFrame');

  let currentKey = 'monstera';

  function updateDisplay(key) {
    const data = plantData[key];
    if (!data) return;

    currentKey = key;

    // Active button toggle
    selectorBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.plant === key);
    });

    if (demoEmoji) demoEmoji.textContent = data.emoji;
    if (demoBadge) demoBadge.textContent = `AI Match: ${data.match}`;
    if (demoTitle) demoTitle.textContent = data.title;
    if (demoStatus) demoStatus.textContent = data.status;
    if (demoDesc) demoDesc.textContent = data.desc;
    if (demoMoistureBar) demoMoistureBar.style.width = `${data.moisture}%`;
    if (demoMoistureVal) demoMoistureVal.textContent = data.moistureText;
    if (demoLightBar) demoLightBar.style.width = `${data.light}%`;
    if (demoLightVal) demoLightVal.textContent = data.lightText;
    if (demoAiTip) demoAiTip.textContent = data.tip;
  }

  selectorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.plant;
      updateDisplay(key);
      showToast(`Selected ${plantData[key].title.split(' ')[0]} model.`, 'info');
    });
  });

  // Scan Button Action
  if (runDemoScanBtn && demoScannerFrame) {
    runDemoScanBtn.addEventListener('click', () => {
      demoScannerFrame.classList.add('active-scan');
      runDemoScanBtn.disabled = true;
      runDemoScanBtn.innerHTML = '🔍 Analyzing Plant...';

      showToast(`Running AI vision analysis on ${currentKey.toUpperCase()}...`, 'scan');

      setTimeout(() => {
        demoScannerFrame.classList.remove('active-scan');
        runDemoScanBtn.disabled = false;
        runDemoScanBtn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
          Scan Selected Plant Now
        `;
        showToast(`Scan complete! ${plantData[currentKey].title} diagnosed as ${plantData[currentKey].status}.`, 'success');
      }, 1400);
    });
  }

  // Interactive Demo Action Buttons
  const demoWaterAction = document.getElementById('demoWaterAction');
  const demoRemindAction = document.getElementById('demoRemindAction');

  if (demoWaterAction) {
    demoWaterAction.addEventListener('click', () => {
      if (demoMoistureBar && demoMoistureVal) {
        demoMoistureBar.style.width = '95%';
        demoMoistureVal.textContent = '95% (Watered)';
        showToast(`Watering logged for ${plantData[currentKey].title.split(' ')[0]}!`, 'water');
      }
    });
  }

  if (demoRemindAction) {
    demoRemindAction.addEventListener('click', () => {
      showToast(`Watering reminder set for ${plantData[currentKey].title.split(' ')[0]} every 7 days.`, 'reminder');
    });
  }
}

/* ==========================================================================
   4. Feature Category Filter Tabs
   ========================================================================== */
function initFeatureFilters() {
  const tabs = document.querySelectorAll('.tab-btn');
  const cards = document.querySelectorAll('#featureGrid .feature-card');

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;

      cards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   5. Interactive Modal Dialog
   ========================================================================== */
function initModal() {
  const modal = document.getElementById('appModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const openBtns = document.querySelectorAll('.trigger-modal');
  const form = document.getElementById('getStartedForm');

  if (!modal) return;

  function openModal() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('userNameInput').value || 'Plant Lover';
      closeModal();
      showToast(`Welcome ${name}! Your PlantPal 14-day free trial has been activated.`, 'success');
      form.reset();
    });
  }
}

/* ==========================================================================
   6. Clickable Badges & Process Steps
   ========================================================================== */
function initClickableBadges() {
  const clickableItems = document.querySelectorAll('.clickable-badge, .clickable-chip');
  clickableItems.forEach(item => {
    item.addEventListener('click', () => {
      const toastMsg = item.dataset.toast || 'Feature interactive!';
      showToast(toastMsg, 'info');
    });
  });

  const stepItems = document.querySelectorAll('.clickable-step');
  stepItems.forEach(step => {
    step.addEventListener('click', () => {
      const stepNum = step.dataset.step;
      if (stepNum === '1') showToast('Step 1: Open camera scanner to auto-detect plant species.', 'scan');
      if (stepNum === '2') showToast('Step 2: Customize adaptive reminders based on light and temperature.', 'reminder');
      if (stepNum === '3') showToast('Step 3: Log monthly photos and track health scores over time.', 'success');
    });
  });
}

/* ==========================================================================
   7. Plant Room Micro-Animation (About Section)
   ========================================================================== */
function initPlantRoomAnimation() {
  const room = document.getElementById('interactivePlantRoom');
  if (!room) return;

  room.addEventListener('click', () => {
    room.classList.add('plant-grow-bounce');
    showToast('🌱 Plant growth cycle simulated! Leaves expanded +12%.', 'success');

    setTimeout(() => {
      room.classList.remove('plant-grow-bounce');
    }, 1000);
  });
}

/* ==========================================================================
   8. ScrollSpy Navigation Highlighting
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], main[id]');
  const navLinks = document.querySelectorAll('.nav .menu a');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
