// ELA-K1-UnitMap.js — with asset preloading and loading screen
(function () {
  // ========================================
  // ASSET PRELOADING & LOADING SCREEN
  // ========================================
  
  const loadingScreen = document.getElementById('loading-screen');
  const progressBar = document.getElementById('progress-bar');
  const loadingText = document.getElementById('loading-text');
  
  // Define all assets that need to be preloaded
  const assetsToLoad = [
    // Background music
    { type: 'audio', src: '../../../audio/kids-game-gaming-background-music-295075.mp3' },
    
    // CSS file (already loaded via <link>, but we can check it)
    { type: 'css', src: '../../../css/ELA/K1/ELA-K1-UnitsMap.css' },
    { type: 'img', src: '../../../images/islands.webp' },
    
    // Add any background images used in CSS here
    // Example: { type: 'image', src: '../../../images/island-background.jpg' },
  ];
  
  let loadedCount = 0;
  const totalAssets = assetsToLoad.length;
  
  function updateProgress() {
    loadedCount++;
    const percentage = Math.round((loadedCount / totalAssets) * 100);
    progressBar.style.width = percentage + '%';
    loadingText.textContent = `Loading... ${percentage}%`;
    
    if (loadedCount >= totalAssets) {
      // All assets loaded
      setTimeout(() => {
        finishLoading();
      }, 500); // Small delay for better UX
    }
  }
  
  function finishLoading() {
   
    
    setTimeout(() => {
      loadingScreen.classList.add('fade-out');
      document.body.classList.remove('loading');
      document.body.classList.add('loaded');
      
      // Try to start background music after loading
      tryAutoplayMusic();
      
      // Remove loading screen from DOM after fade out
      setTimeout(() => {
        if (loadingScreen && loadingScreen.parentNode) {
          loadingScreen.parentNode.removeChild(loadingScreen);
        }
      }, 500);
    }, 300);
  }
  
  function preloadAssets() {
    if (totalAssets === 0) {
      finishLoading();
      return;
    }
    
    assetsToLoad.forEach(asset => {
      if (asset.type === 'image') {
        const img = new Image();
        img.onload = updateProgress;
        img.onerror = () => {
          console.warn('Failed to load image:', asset.src);
          updateProgress(); // Continue even if one asset fails
        };
        img.src = asset.src;
      } 
      else if (asset.type === 'audio') {
        const audio = new Audio();
        audio.addEventListener('canplaythrough', updateProgress, { once: true });
        audio.addEventListener('error', () => {
          console.warn('Failed to load audio:', asset.src);
          updateProgress();
        }, { once: true });
        audio.src = asset.src;
        audio.load();
      }
      else if (asset.type === 'css') {
        // CSS is already loaded via <link>, just mark as complete
        // In a more complex scenario, you could check if stylesheets are loaded
        setTimeout(updateProgress, 100);
      }
      else {
        // Unknown type, just mark as complete
        updateProgress();
      }
    });
  }
  
  // Start preloading when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadAssets);
  } else {
    preloadAssets();
  }
  
  // ========================================
  // MAIN APPLICATION LOGIC
  // ========================================
  
  const ALLOWED_UNITS = new Set([1,2]);

  const ui = {
    map: document.querySelector('.map-container'),
    tooltip: document.getElementById('tooltip'),
    tipTitle: document.querySelector('#tooltip .tooltip-title'),
    tipDesc: document.querySelector('#tooltip .tooltip-description'),
    soundToggle: document.getElementById('sound-toggle'),
  };

  // --- simple sound toggle (optional) ---
  let soundOn = true;
  let audioCtx;
  function dingBase() {
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = 'triangle'; o.frequency.value = 880;
      g.gain.value = 0.0001; o.connect(g); g.connect(audioCtx.destination);
      o.start();
      const t = audioCtx.currentTime;
      g.gain.exponentialRampToValueAtTime(0.2, t + 0.04);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
      o.stop(t + 0.4);
    } catch (_) {}
  }
  function ding(){ if (soundOn) dingBase(); }
  if (ui.soundToggle) {
    const label = ui.soundToggle.querySelector('.label');
    const render = () => { if (label) label.textContent = soundOn ? 'Sound On' : 'Sound Off'; };
    render();
    ui.soundToggle.addEventListener('click', () => { soundOn = !soundOn; render(); });
  }

  // --- tooltip helpers ---
  function showTooltipFor(el, title, desc) {
    if (!ui.tooltip) { alert(desc || title || 'This unit is under development.'); return; }
    ui.tipTitle.textContent = title || 'Coming soon';
    ui.tipDesc.textContent = desc || 'This unit is still under development. Please check back soon!';

    const r = el.getBoundingClientRect();
    const mr = (ui.map || document.body).getBoundingClientRect();
    ui.tooltip.style.display = 'block';

    // measure after display
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
    if (ui.tooltip && !ui.tooltip.contains(e.target)) ui.tooltip.style.display = 'none';
  });

  // --- wire hotspots ---
  for (let i = 1; i <= 8; i++) {
    const btn = document.getElementById(`hotspot-${i}`);
    if (!btn) continue;

    // lock visually + semantically if not allowed
    if (!ALLOWED_UNITS.has(i)) {
      btn.setAttribute('data-locked', 'true');
      btn.setAttribute('aria-disabled', 'true');
      btn.title = 'Under development';
      btn.classList.add('is-locked');
    }

    // click
    btn.addEventListener('click', (evt) => {
      if (!ALLOWED_UNITS.has(i)) {
        evt.preventDefault();
        btn.classList.remove('shake'); void btn.offsetWidth; btn.classList.add('shake');
        showTooltipFor(btn, 'Under development', 'This unit is still under development.');
        return;
      }
      // allowed: do a tiny feedback + navigate
      ding();
      const url = btn.dataset.route;
      if (url) window.location.assign(url);
    });

    // keyboard
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
let musicAvailable = false;
const bgMusic = document.getElementById('background-music');
const musicBtn = document.getElementById('music-control');

function tryAutoplayMusic() {
  if (!bgMusic) return;
  
  bgMusic.volume = 0.5; // optional: adjust volume
  bgMusic.play()
    .then(() => {
      musicPlaying = true;
      musicBtn.textContent = '🔊';
      console.log('Background music started automatically.');
    })
    .catch(err => {
      console.warn('Autoplay was blocked by the browser.', err);
      musicBtn.textContent = '🔇';
      musicPlaying = false;
    });
}

function toggleMusic() {
  if (!bgMusic) return;
  
  if (musicPlaying) {
    bgMusic.pause();
    musicBtn.textContent = '🔇';
    musicPlaying = false;
  } else {
    bgMusic.play()
      .then(() => {
        musicBtn.textContent = '🔊';
        musicPlaying = true;
      })
      .catch(err => {
        console.log('Music play failed:', err);
        alert('Unable to play music. Please check your browser settings.');
      });
  }
}
