// ======== Loading Screen ========
const loadingScreen = document.getElementById('loading-screen');
const progressBar = document.getElementById('loading-progress');
const loadingText = document.getElementById('loading-text');

// List all assets used in the unit map (images + audio)
const preloadAssets = [
  '../../../images/space-planets-transparent-final.webp',
  '../../../audio/kids-game-gaming-background-music-295075.mp3'
];

let loaded = 0;

function updateLoadingProgress() {
  loaded++;
  const percent = Math.round((loaded / preloadAssets.length) * 100);
  progressBar.style.width = percent + '%';
  loadingText.textContent = `Preparing planets... ${percent}%`;

  if (loaded >= preloadAssets.length) {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      document.getElementById('container').classList.remove('hidden');
    }, 600);
  }
}


function startPreloading() {
  preloadAssets.forEach(asset => {
    if (asset.endsWith('.webp') || asset.endsWith('.png') || asset.endsWith('.jpg')) {
      const img = new Image();
      img.onload = updateLoadingProgress;
      img.onerror = updateLoadingProgress;
      img.src = asset;
    } else {
      const audio = new Audio();
      audio.addEventListener('canplaythrough', updateLoadingProgress, { once: true });
      audio.src = asset;
    }
  });
}

window.addEventListener('load', startPreloading);

// ELA-K2-UnitMap.js — Space Theme with 8 units
(function () {
  
  // Set which units are available (1-8 for K2)
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
      o.type = 'triangle'; 
      o.frequency.value = 880;
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

  // Wire hotspots for 8 planets
  for (let i = 1; i <= 8; i++) {
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
        showTooltipFor(btn, 'Under development', 'This unit is still under development.');
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

// ======== GLOBAL BACKGROUND MUSIC ========
const backgroundMusic = document.getElementById('background-music');
const musicToggle = document.getElementById('music-toggle');
let isMusicMuted = false;

// Try autoplay
window.addEventListener('load', () => {
  backgroundMusic.volume = 0.3;
  backgroundMusic.play().then(() => {
    musicToggle.textContent = '🔊';
  }).catch(() => {
    console.warn('Autoplay blocked — will start after user interaction.');
  });
});

// Toggle mute/unmute
musicToggle.addEventListener('click', () => {
  if (isMusicMuted) {
    backgroundMusic.play().catch(() => {});
    musicToggle.textContent = '🔊';
  } else {
    backgroundMusic.pause();
    musicToggle.textContent = '🔇';
  }
  isMusicMuted = !isMusicMuted;
});

// ======== AUTOPLAY BACKGROUND MUSIC ON PAGE LOAD ========

window.addEventListener('load', () => {
    const audio = document.getElementById('background-music');
    if (!audio) return;

    audio.volume = 0.4; // gentle volume
    const playPromise = audio.play();

    // Handle autoplay restrictions gracefully
    if (playPromise !== undefined) {
        playPromise.catch(() => {
            // Autoplay blocked — wait for user interaction
            console.log("Autoplay blocked. Waiting for user interaction...");
            const startAudio = () => {
                audio.play().catch(() => {});
                document.removeEventListener('click', startAudio);
                document.removeEventListener('touchstart', startAudio);
            };
            document.addEventListener('click', startAudio);
            document.addEventListener('touchstart', startAudio);
        });
    }
});
