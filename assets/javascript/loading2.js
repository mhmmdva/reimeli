const personalTexts = {
  IER: [
    "Terima kasih udah buka website nya ya mas",
    "Sistem kami telah lama menantikan kehadiranmu.",
    "Atau lebih tepatnya...",
    "Emeng yang nungguin.",
    "asoooyyyy!, uhuy!",
  ],
  ILEM: [
    "Hi, Emeng!",    
    "Yang bikin Mas Ier ngehapus DM-nya karena ga dibales.",
    "Sudah 1000 tahun kami menunggu anda yang mulia.",
    "Dan waktunya telah tiba.",
    "Katanya bisa bikin Mas Ier bengong tiap malem...",
  ],
};

const installTexts = [
  { pct: 10,  text: "Installing: rasa sayang..." },
  { pct: 30,  text: "Downloading: kenangan indah..." },
  { pct: 50,  text: "Loading: momen-momen bucin..." },
  { pct: 70,  text: "Compiling: janji-janji manis..." },
  { pct: 90,  text: "Uploading: cinta yang ga ada expired date-nya..." },
  { pct: 100, text: "Instalasi selesai. Selamat datang! " },
];

function startLoading2(name) {
  const personalEl = document.getElementById('personalText');
  const bar        = document.getElementById('progressBar2');
  const pct        = document.getElementById('progressPctNumber2');
  const txt        = document.getElementById('loadingText2');

  const texts = personalTexts[name];
  personalEl.textContent = '';
  personalEl.style.opacity = '1';

  // ── FASE 1: Teks personal (paralel) ──
  // Setiap teks muncul setiap 2 detik (total ~12 detik untuk 6 teks)
  texts.forEach((line, i) => {
    setTimeout(() => {
      const lineEl = document.createElement('span');
      lineEl.textContent = line;
      lineEl.style.display = 'block';
      lineEl.style.opacity = '0';
      lineEl.style.transition = 'opacity 500ms ease';

      personalEl.appendChild(lineEl);

      requestAnimationFrame(() => {
        lineEl.style.opacity = '1';
      });
    }, i * 2000);
  });

  // ── FASE 2: Progress instalasi (paralel) ──
  // Total 13 detik, setiap step = 13000 / 6 ≈ 2166ms
  const stepDuration = 2166;

  installTexts.forEach((step, i) => {
    setTimeout(() => {
      // Update progress bar
      bar.style.width = step.pct + '%';
      pct.textContent = step.pct + '%';

      // Update teks instalasi
      txt.style.opacity = '0';
      setTimeout(() => {
        txt.textContent = step.text;
        txt.style.opacity = '1';
      }, 300);

      // Setelah 100% → pindah ke information
      if (step.pct === 100) {
        setTimeout(() => showScreen('screen4', 'screen5'), 1000);
      }
    }, i * stepDuration);
  });
}
