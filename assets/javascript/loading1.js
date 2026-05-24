function startLoading1() {
  const bar = document.getElementById('progressBar1');
  const pct = document.getElementById('progressPctNumber1');
  const txt = document.getElementById('loadingText1');

  const quotes = [
    "Ini bukan website biasa.",
    "Ini adalah bukti.",
    "Bahwa dua orang yang tepat...",
    "...akan selalu menemukan jalannya.",
  ];

  let progress = 0;
  // Naik ke 99% dalam 4 detik
  const interval = setInterval(() => {
    progress += 2.5;
    if (progress >= 99) {
      progress = 99;
      clearInterval(interval);

      bar.style.width = '99%';
      pct.textContent = '99%';
      txt.textContent = 'Memuat kenangan... 99%';

      // Tampilkan quotes satu per satu
      let i = 0;
      const showQuote = () => {
        if (i >= quotes.length) {
          bar.style.width = '100%';
          pct.textContent = '100%';
          setTimeout(() => showScreen('screen2', 'screen3'), 800);
          return;
        }
        txt.style.opacity = '0';
        setTimeout(() => {
          txt.textContent = quotes[i];
          txt.style.opacity = '1';
          i++;
          setTimeout(showQuote, 800);
        }, 400);
      };
      setTimeout(showQuote, 500);
      return;
    }
    bar.style.width = progress + '%';
    pct.textContent = Math.floor(progress) + '%';
    txt.textContent = 'lagi nyiapin kenangan... ' + Math.floor(progress) + '%';
  }, 100);
}
