let selectedName = null;

function chooseName(name) {
  selectedName = name;
  showScreen('screen3', 'screen4');
  setTimeout(() => startLoading2(name), 800);
}

function startMission() {
  Swal.fire({
    title: 'Misi Dimulai! ',
    text: 'Bersiaplah untuk memecahkan kode...',
    icon: 'success',
    confirmButtonText: '시작 Sijak!',
    confirmButtonColor: '#8b3a52',
    customClass: {
      popup: 'swal-custom-popup',
      title: 'swal-custom-title',
      htmlContainer: 'swal-custom-text',
      confirmButton: 'swal-custom-button',
    },
    allowOutsideClick: false,
  }).then(() => {
    showScreen('screen5', 'screen6');
    setTimeout(() => buildCipherScreen(selectedName), 800);
  });
}

// Konfirmasi sebelum kembali
function confirmGoBack() {
  Swal.fire({
    title: 'Kembali ke pilih nama? ',
    text: 'Progress game kamu akan direset.',
    icon: 'warning',
    showCancelButton: true,
    buttonsStyling: false,
    confirmButtonText: 'Ya, kembali',
    cancelButtonText: 'Mau main',

    customClass: {
      popup: 'swal-custom-popup',
      title: 'swal-custom-title',
      htmlContainer: 'swal-custom-text',
      actions: 'swal-confirm-actions',
      confirmButton: 'swal-custom-button swal-btn-ilem',
      cancelButton: 'swal-custom-button swal-btn-ier',
    },
  }).then((result) => {
    if (result.isConfirmed) {
      goBackToNameSelection();
    }
  });
}

// Kembali ke screen3 & reset semua state
function goBackToNameSelection() {
  // Reset semua state game
  selectedName = null;
  cipherAttempts = 0;
  currentCoordIndex = 0;

  // Sembunyikan semua screen game
  const gameScreens = ['screen4', 'screen5', 'screen6', 'screen7', 'screen8'];
  gameScreens.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.style.transition = 'opacity 0.5s ease';
      el.style.opacity = '0';
      el.style.pointerEvents = 'none';
    }
  });

  // Sembunyikan back button
  const backBtn = document.getElementById('backBtn');
  if (backBtn) {
    backBtn.style.opacity = '0';
    backBtn.style.pointerEvents = 'none';
  }

  // Tampilkan screen3
  setTimeout(() => {
    const screen3 = document.getElementById('screen3');
    screen3.style.transition = 'opacity 0.7s ease';
    screen3.style.opacity = '1';
    screen3.style.pointerEvents = 'all';
  }, 500);
}
