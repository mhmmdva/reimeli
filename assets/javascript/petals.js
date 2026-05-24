function makePetals() {
  const container = document.getElementById('petals');
  if (!container || container.children.length > 0) return;

  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    const duration = 4 + Math.random() * 6;

    p.style.cssText = `
      position: absolute;
      width: 8px;
      height: 12px;
      background: rgba(255,182,193,0.35);
      border-radius: 50% 0 50% 0;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: fall ${duration}s linear -${Math.random() * duration}s infinite;
      transform: scale(${0.5 + Math.random()});
    `;
    container.appendChild(p);
  }
}
