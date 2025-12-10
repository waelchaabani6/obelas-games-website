// ======== Loading Screen ========
const loadingScreen = document.getElementById('loading-screen');
const progressBar = document.getElementById('loading-progress');
const loadingText = document.getElementById('loading-text');

// List all assets used in the unit map (images + audio if any)
const preloadAssets = [
  'garden-background-transparent.png'
  // Add music file here if you have one
  // 'garden-music.mp3'
];

let loaded = 0;

function updateLoadingProgress() {
  loaded++;
  const percent = preloadAssets.length > 0 ? Math.round((loaded / preloadAssets.length) * 100) : 100;
  progressBar.style.width = percent + '%';
  loadingText.textContent = `Planting flowers... ${percent}%`;

  if (loaded >= preloadAssets.length || preloadAssets.length === 0) {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      const container = document.querySelector('.container');
      if (container) container.classList.remove('hidden');
    }, 600);
  }
}


function startPreloading() {
  if (preloadAssets.length === 0) {
    // No assets to preload, just show progress complete
    progressBar.style.width = '100%';
    loadingText.textContent = 'Planting flowers... 100%';
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      const container = document.querySelector('.container');
      if (container) container.classList.remove('hidden');
    }, 600);
    return;
  }

  preloadAssets.forEach(asset => {
    if (asset.endsWith('.webp') || asset.endsWith('.png') || asset.endsWith('.jpg')) {
      const img = new Image();
      img.onload = updateLoadingProgress;
      img.onerror = updateLoadingProgress;
      img.src = asset;
    } else {
      const audio = new Audio();
      audio.addEventListener('canplaythrough', updateLoadingProgress, { once: true });
      audio.addEventListener('error', updateLoadingProgress, { once: true });
      audio.src = asset;
    }
  });
}

window.addEventListener('load', startPreloading);

// ELA-G1-UnitMap.js — Garden Theme with 5 units
(function () {
  
  // Set which units are available (1-5 for G1)
  const ALLOWED_UNITS = new Set([1,2]); // Currently only Unit 1 is active
  
  const ui = {
    map: document.querySelector('.map-container'),
    tooltip: document.getElementById('tooltip'),
    tipTitle: document.querySelector('#tooltip .tooltip-title'),
    tipDesc: document.querySelector('#tooltip .tooltip-description'),
    soundToggle: document.getElementById('sound-toggle'),
  };

  // Simple sound toggle
  let soundOn = true;
  let audioCtx;
  
  function dingBase() {
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = 'sine'; 
      o.frequency.value = 660;
      g.gain.value = 0.0001; 
      o.connect(g); 
      g.connect(audioCtx.destination);
      o.start();
      const t = audioCtx.currentTime;
      g.gain.exponentialRampToValueAtTime(0.2, t + 0.04);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
      o.stop(t + 0.4);
    } catch (_) {}
  }
  
  function ding() { 
    if (soundOn) dingBase(); 
  }
  
  if (ui.soundToggle) {
    const label = ui.soundToggle.querySelector('.label');
    const render = () => { 
      if (label) label.textContent = soundOn ? 'Sound On' : 'Sound Off'; 
    };
    render();
    ui.soundToggle.addEventListener('click', () => { 
      soundOn = !soundOn; 
      render(); 
    });
  }

  // Tooltip helpers
  function showTooltipFor(el, title, desc) {
    if (!ui.tooltip) { 
      alert(desc || title || 'This unit is under development.'); 
      return; 
    }
    ui.tipTitle.textContent = title || 'Coming soon';
    ui.tipDesc.textContent = desc || 'This unit is still under development. Please check back soon!';

    const r = el.getBoundingClientRect();
    const mr = (ui.map || document.body).getBoundingClientRect();
    ui.tooltip.style.display = 'block';

    const tr = ui.tooltip.getBoundingClientRect();
    let top = r.top - mr.top - tr.height - 12;
    let left = r.left - mr.left + r.width / 2 - tr.width / 2;
    left = Math.max(8, Math.min(left, mr.width - tr.width - 8));
    top = Math.max(8, top);
    ui.tooltip.style.transform = `translate(${left}px, ${top}px)`;

    clearTimeout(ui._tipTimer);
    ui._tipTimer = setTimeout(() => ui.tooltip.style.display = 'none', 1800);
  }
  
  document.addEventListener('click', (e) => {
    if (ui.tooltip && !ui.tooltip.contains(e.target)) {
      ui.tooltip.style.display = 'none';
    }
  });

  // Wire hotspots for 5 flowers
  for (let i = 1; i <= 5; i++) {
    const btn = document.getElementById(`hotspot-${i}`);
    if (!btn) continue;

    // Lock visually + semantically if not allowed
    if (!ALLOWED_UNITS.has(i)) {
      btn.setAttribute('data-locked', 'true');
      btn.setAttribute('aria-disabled', 'true');
      btn.title = 'Under development';
      btn.classList.add('is-locked');
    }

    // Click handler
    btn.addEventListener('click', (evt) => {
      if (!ALLOWED_UNITS.has(i)) {
        evt.preventDefault();
        btn.classList.remove('shake'); 
        void btn.offsetWidth; 
        btn.classList.add('shake');
        showTooltipFor(btn, 'Under development', 'This garden is still under development.');
        return;
      }
      // Allowed: navigate
      ding();
      const url = btn.dataset.route;
      if (url) window.location.assign(url);
    });

    // Keyboard support
    btn.tabIndex = 0;
    btn.addEventListener('keydown', (evt) => {
      if (evt.key === 'Enter' || evt.key === ' ') {
        evt.preventDefault();
        btn.click();
      }
    });
  }
})();

/* ======== Background Music ======== */
let musicPlaying = false;
const bgMusic = document.getElementById('background-music');
const musicBtn = document.getElementById('music-toggle');

// Try to autoplay music when page loads
window.addEventListener('DOMContentLoaded', () => {
  tryAutoplayMusic();
});

function tryAutoplayMusic() {
  if (!bgMusic) {
    // No music element, hide the button
    if (musicBtn) musicBtn.style.display = 'none';
    return;
  }
  
  bgMusic.volume = 0.5;
  bgMusic.play()
    .then(() => {
      musicPlaying = true;
      if (musicBtn) musicBtn.textContent = '🔊';
      console.log('Background music started automatically.');
    })
    .catch(err => {
      console.warn('Autoplay was blocked by the browser.', err);
      if (musicBtn) musicBtn.textContent = '🔇';
      musicPlaying = false;
    });
}

function toggleMusic() {
  if (!bgMusic) return;
  
  if (musicPlaying) {
    bgMusic.pause();
    if (musicBtn) musicBtn.textContent = '🔇';
    musicPlaying = false;
  } else {
    bgMusic.play()
      .then(() => {
        if (musicBtn) musicBtn.textContent = '🔊';
        musicPlaying = true;
      })
      .catch(err => {
        console.log('Music play failed:', err);
        alert('Unable to play music. Please check your browser settings.');
      });
  }
}

// Attach toggle function to button
if (musicBtn) {
  musicBtn.addEventListener('click', toggleMusic);
}
