export function createThemeTransition(
    x: number,
    y: number,
    direction: 'explode' | 'implode',
    color = '#ffffff'
  ) {
    const el = document.createElement('div');
  
    // 🚀 საწყისი სტილი
    el.className = 'theme-transition';
    el.style.position = 'fixed';
    el.style.pointerEvents = 'none';
    el.style.borderRadius = '50%';
    el.style.backgroundColor = color;
    el.style.zIndex = '9999'; // 🧼 არ დაეფაროს ზედმეტი ელემენტები
    el.style.willChange = 'transform, opacity';
    el.style.transition = 'transform 1.2s ease-out, opacity 1.2s ease-out';
  
    // 📐 ზომა & პოზიცია
    const size = Math.max(window.innerWidth, window.innerHeight) * 5;
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.left = `${x - size / 2}px`;
    el.style.top = `${y - size / 2}px`;
    el.style.transformOrigin = 'center center';
  
    // ⚙️ საწყისი მდგომარეობა
    if (direction === 'explode') {
      el.style.transform = 'scale(0)';
      el.style.opacity = '1';
    } else {
      el.style.transform = 'scale(1)';
      el.style.opacity = '0';
    }
  
    // 📦 ჩასმა body-ში ან სპეციალურ root-ში
    const root = document.getElementById('theme-overlay-root') || document.body;
    root.appendChild(el);
  
    // 🌀 ანიმაციის დაწყება
    requestAnimationFrame(() => {
      if (direction === 'explode') {
        el.style.transform = 'scale(1)';
        el.style.opacity = '0';
      } else {
        el.style.transform = 'scale(0)';
        el.style.opacity = '1';
      }
    });
  
    // ⏳ ამოღება ანიმაციის შემდეგ
    setTimeout(() => {
      el.remove();
    }, 1400);
  }
  