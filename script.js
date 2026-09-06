/* =============================================
   NetraX – Interactive Prototype Script
   ============================================= */

// ---- Animated Number Counters ----
function animateCounters() {
  document.querySelectorAll('.stat-number').forEach(el => {
    const target = parseFloat(el.dataset.target);
    const isDecimal = target % 1 !== 0;
    const duration = 2000;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = eased * target;
      el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

// ---- Hero Particles ----
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (4 + Math.random() * 6) + 's';
    p.style.animationDelay = Math.random() * 5 + 's';
    p.style.width = p.style.height = (2 + Math.random() * 3) + 'px';
    container.appendChild(p);
  }
}

// ---- Scroll Reveal ----
function setupScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(
    '.feature-card, .dash-card, .impact-card, .economics-strip, .tech-grid, .timeline-strip'
  ).forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}

// ---- Sticky Navbar ----
function setupNavbar() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 50
      ? 'rgba(6, 11, 24, 0.95)'
      : 'rgba(6, 11, 24, 0.85)';
  });

  // Smooth scroll for nav links
  document.querySelectorAll('.nav-links a, .hero-actions a').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ---- Demo Modal System ----
const demoData = {
  landslide: {
    icon: '🏔️',
    title: 'Landslide Prediction — Tawang District',
    body: `
      <p>Running CNN + LSTM ensemble model on latest sensor data…</p>
      <div class="prediction-box">
        <div class="pred-row"><span class="pred-label">District</span><span class="pred-value">Tawang, Arunachal Pradesh</span></div>
        <div class="pred-row"><span class="pred-label">Soil Moisture</span><span class="pred-value danger">87% saturated</span></div>
        <div class="pred-row"><span class="pred-label">Rainfall (72h)</span><span class="pred-value warn">142 mm expected</span></div>
        <div class="pred-row"><span class="pred-label">Slope Stability</span><span class="pred-value danger">Critical</span></div>
        <div class="pred-row"><span class="pred-label">Risk Level</span><span class="pred-value danger">HIGH — 94.2%</span></div>
        <div class="pred-row"><span class="pred-label">Prediction Window</span><span class="pred-value">Next 18 hours</span></div>
        <div class="pred-row"><span class="pred-label">Confidence</span><span class="pred-value ok">99.7%</span></div>
      </div>
      <p>⚠️ <strong>Recommended Action:</strong> Activate evacuation protocol for villages along NH-13 corridor. Reroute deliveries via Bomdila.</p>
    `
  },
  flood: {
    icon: '🌊',
    title: 'Flood Risk Assessment — Brahmaputra Basin',
    body: `
      <p>Analyzing hydrological model with real-time river gauge data…</p>
      <div class="prediction-box">
        <div class="pred-row"><span class="pred-label">Basin</span><span class="pred-value">Brahmaputra (Dibrugarh sector)</span></div>
        <div class="pred-row"><span class="pred-label">Water Level</span><span class="pred-value warn">+2.3m above normal</span></div>
        <div class="pred-row"><span class="pred-label">Upstream Rainfall</span><span class="pred-value warn">Heavy — 98 mm/24h</span></div>
        <div class="pred-row"><span class="pred-label">Embankment Stress</span><span class="pred-value warn">Moderate</span></div>
        <div class="pred-row"><span class="pred-label">Flood Risk</span><span class="pred-value warn">MODERATE — 67%</span></div>
        <div class="pred-row"><span class="pred-label">Forecast Window</span><span class="pred-value">Next 48 hours</span></div>
        <div class="pred-row"><span class="pred-label">Precision</span><span class="pred-value ok">84%</span></div>
      </div>
      <p>🔔 <strong>Recommended Action:</strong> Preposition relief supplies. Alert downstream communities. Prepare alternate ferry routes.</p>
    `
  },
  traffic: {
    icon: '🚦',
    title: 'Traffic Forecast — NH-37 Corridor',
    body: `
      <p>Graph Neural Network processing road network topology…</p>
      <div class="prediction-box">
        <div class="pred-row"><span class="pred-label">Highway</span><span class="pred-value">NH-37 (Jorhat – Nagaon)</span></div>
        <div class="pred-row"><span class="pred-label">Current Speed</span><span class="pred-value ok">55 km/h</span></div>
        <div class="pred-row"><span class="pred-label">Predicted (4h)</span><span class="pred-value danger">12 km/h — Heavy congestion</span></div>
        <div class="pred-row"><span class="pred-label">Cause</span><span class="pred-value">Market day + construction</span></div>
        <div class="pred-row"><span class="pred-label">Duration</span><span class="pred-value warn">~3 hours</span></div>
        <div class="pred-row"><span class="pred-label">Alt Route</span><span class="pred-value ok">SH-1 via Golaghat (+22 min)</span></div>
      </div>
      <p>🛣️ <strong>Recommended Action:</strong> Reroute medical deliveries via SH-1. ETA impact: +22 minutes but avoids 3-hour delay.</p>
    `
  },
  route: {
    icon: '🛣️',
    title: 'Route Optimization — Guwahati → Imphal',
    body: `
      <p>Running modified Dijkstra + RL optimization engine…</p>
      <div class="prediction-box">
        <div class="pred-row"><span class="pred-label">Origin</span><span class="pred-value">Guwahati Medical Hub</span></div>
        <div class="pred-row"><span class="pred-label">Destination</span><span class="pred-value">Imphal District Hospital</span></div>
        <div class="pred-row"><span class="pred-label">Standard Route</span><span class="pred-value">NH-37 → NH-2 (14.2 hours)</span></div>
        <div class="pred-row"><span class="pred-label">Optimized Route</span><span class="pred-value ok">NH-36 → SH-1 → NH-2 (9.8 hours)</span></div>
        <div class="pred-row"><span class="pred-label">Time Saved</span><span class="pred-value ok">4.4 hours (31%)</span></div>
        <div class="pred-row"><span class="pred-label">Fuel Saved</span><span class="pred-value ok">18 litres</span></div>
        <div class="pred-row"><span class="pred-label">Computation Time</span><span class="pred-value ok">0.47 seconds</span></div>
        <div class="pred-row"><span class="pred-label">Efficiency Score</span><span class="pred-value ok">91%</span></div>
      </div>
      <p>✅ <strong>Route dispatched to driver app.</strong> Real-time re-routing enabled if conditions change.</p>
    `
  },
  coldchain: {
    icon: '💊',
    title: 'Cold-Chain Monitoring — Vaccine Shipment',
    body: `
      <p>IoT sensor array reporting from cold-box units…</p>
      <div class="prediction-box">
        <div class="pred-row"><span class="pred-label">Shipment</span><span class="pred-value">MED-2026-0847 (COVID + MMR vaccines)</span></div>
        <div class="pred-row"><span class="pred-label">Box A Temp</span><span class="pred-value ok">2.4°C ✅</span></div>
        <div class="pred-row"><span class="pred-label">Box B Temp</span><span class="pred-value warn">6.1°C ⚠️ Above threshold</span></div>
        <div class="pred-row"><span class="pred-label">Required Range</span><span class="pred-value">2–8°C (WHO standard)</span></div>
        <div class="pred-row"><span class="pred-label">Battery</span><span class="pred-value ok">78% remaining</span></div>
        <div class="pred-row"><span class="pred-label">GPS Location</span><span class="pred-value">26.1°N, 91.7°E (Near Tezpur)</span></div>
        <div class="pred-row"><span class="pred-label">ETA</span><span class="pred-value ok">2.5 hours</span></div>
      </div>
      <p>⚠️ <strong>Alert:</strong> Box B approaching upper limit. Driver notified to check ice pack. Compliance log updated.</p>
    `
  },
  offline: {
    icon: '📡',
    title: 'Edge AI — Offline Mode Test',
    body: `
      <p>Simulating connectivity loss in remote region…</p>
      <div class="prediction-box">
        <div class="pred-row"><span class="pred-label">Connection</span><span class="pred-value danger">OFFLINE — No signal</span></div>
        <div class="pred-row"><span class="pred-label">Edge Device</span><span class="pred-value ok">Raspberry Pi 4 — Active</span></div>
        <div class="pred-row"><span class="pred-label">TF Lite Model</span><span class="pred-value ok">Loaded (landslide v2.1)</span></div>
        <div class="pred-row"><span class="pred-label">Local Inference</span><span class="pred-value ok">Running — 120ms latency</span></div>
        <div class="pred-row"><span class="pred-label">Cached Data</span><span class="pred-value ok">48 hours of sensor readings</span></div>
        <div class="pred-row"><span class="pred-label">Queue</span><span class="pred-value warn">12 results pending sync</span></div>
        <div class="pred-row"><span class="pred-label">Uptime</span><span class="pred-value ok">100% — Zero downtime</span></div>
      </div>
      <p>✅ <strong>Edge AI fully operational.</strong> Predictions continue without internet. Data will sync when connectivity resumes.</p>
    `
  }
};

function setupModals() {
  const overlay = document.getElementById('modal');
  const modalIcon = document.getElementById('modalIcon');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');
  const modalAction = document.getElementById('modalAction');
  const launchBtn = document.getElementById('launchBtn');

  function openModal(key) {
    const data = demoData[key];
    if (!data) return;
    modalIcon.textContent = data.icon;
    modalTitle.textContent = data.title;
    modalBody.innerHTML = data.body;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Demo buttons
  document.querySelectorAll('.demo-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.demo;
      openModal(key);
    });
  });

  // Launch Demo button -> scroll to features then open first demo
  if (launchBtn) {
    launchBtn.addEventListener('click', () => {
      const features = document.getElementById('features');
      if (features) {
        features.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => openModal('landslide'), 800);
      }
    });
  }

  modalClose.addEventListener('click', closeModal);
  modalAction.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}

// ---- Live Clock in Alerts ----
function updateAlertTimes() {
  const times = document.querySelectorAll('.alert-time');
  setInterval(() => {
    times.forEach(t => {
      const text = t.textContent;
      const match = text.match(/(\d+)(m|h|s)/);
      if (match) {
        let val = parseInt(match[1]);
        const unit = match[2];
        if (unit === 'm') val += 1;
        t.textContent = val + unit + ' ago';
      }
    });
  }, 60000);
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  animateCounters();
  setupScrollReveal();
  setupNavbar();
  setupModals();
  updateAlertTimes();
});
