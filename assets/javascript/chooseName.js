let selectedName = null;

function chooseName(name) {
  selectedName = name;
  showScreen('screen3', 'screen4');
  setTimeout(() => startLoading2(name), 800);
}

function startMission() {
  Swal.fire({
    title: 'Misi Dimulai!',
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
    // Setelah popup ditutup → pindah ke Caesar Cipher
    showScreen('screen5', 'screen6');
    setTimeout(() => buildCipherScreen(selectedName), 800);
  });
}