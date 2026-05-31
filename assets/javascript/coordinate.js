const coordinateData = {
  IER: [
    { lat: -6.991846690574991,  lng: 110.42255836392675 },
    { lat: -2.525373664561425,  lng: 140.73771191349257 },
    { lat: -6.98239749157793,   lng: 110.40948631110334 },
  ],
  ILEM: [
    { lat: -6.168949965808904,  lng: 106.78886869868812 },
    { lat: 35.703517340905975,  lng: 139.87418221460828 },
    { lat: -6.124367014188281,  lng: 106.79802885158121 },
  ],
};

let currentCoordIndex = 0;
let totalCoords = 0;

// Mulai game koordinat
function buildCoordinateScreen(name) {
  const coords = coordinateData[name];
  totalCoords = coords.length;
  currentCoordIndex = 0;
  displayCoordinate(name);
}

// Tampilkan koordinat sesuai index
function displayCoordinate(name) {
  const coords = coordinateData[name];
  const current = coords[currentCoordIndex];

  // Update counter
  document.getElementById('coordCounter').innerHTML = `
    <i class="ri-map-pin-fill"></i>
    Koordinat ${currentCoordIndex + 1} dari ${totalCoords}
  `;

  // Format koordinat
  const latFormatted = current.lat.toFixed(6);
  const lngFormatted = current.lng.toFixed(6);
  document.getElementById('coordValue').textContent =
    `${latFormatted}, ${lngFormatted}`;

  // Update link Google Maps
  const mapsUrl = `https://www.google.com/maps?q=${current.lat},${current.lng}`;
  document.getElementById('mapsBtn').href = mapsUrl;

  // Update back button
  // Koordinat pertama → sembunyikan back button
  // Koordinat kedua dst → tampilkan back button
  const backBtn = document.getElementById('coordBackBtn');
  if (currentCoordIndex === 0) {
    backBtn.style.opacity = '0';
    backBtn.style.pointerEvents = 'none';
  } else {
    backBtn.style.transition = 'opacity 0.3s ease';
    backBtn.style.opacity = '1';
    backBtn.style.pointerEvents = 'all';
  }

  // Update next button
  // Koordinat terakhir → icon check
  // Koordinat lainnya → icon arrow right
  const nextBtn = document.getElementById('coordNextBtn');
  if (currentCoordIndex === totalCoords - 1) {
    nextBtn.innerHTML = `<i class="ri-check-line text-xl"></i>`;
  } else {
    nextBtn.innerHTML = `<i class="ri-arrow-right-line text-xl"></i>`;
  }
}

// Animasi fade koordinat berganti
function animateCoordChange(direction, name) {
  const coordEl = document.getElementById('coordValue');
  const offset = direction === 'next' ? '10px' : '-10px';

  coordEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  coordEl.style.opacity = '0';
  coordEl.style.transform = `translateY(${offset})`;

  setTimeout(() => {
    displayCoordinate(name);
    coordEl.style.opacity = '1';
    coordEl.style.transform = 'translateY(0)';
  }, 300);
}

// Next koordinat
function nextCoordinate() {
  if (currentCoordIndex < totalCoords - 1) {
    currentCoordIndex++;
    animateCoordChange('next', selectedName);
  } else {
    // Semua koordinat selesai
    Swal.fire({
      title: 'Kenangan itu nyata.',
      text: 'Setiap titik menyimpan cerita yang hanya kalian yang tahu.',
      icon: 'success',
      confirmButtonText: 'Misi Selesai!',
      confirmButtonColor: '#8b3a52',
      allowOutsideClick: false,
      customClass: caesarSwalClass,
    }).then(() => {
      showScreen('screen7', 'screen8');
    });
  }
}

// Back koordinat (kembali ke koordinat sebelumnya)
function prevCoordinate() {
  if (currentCoordIndex > 0) {
    currentCoordIndex--;
    animateCoordChange('prev', selectedName);
  }
}

// Popup info
function showCoordHint() {
  Swal.fire({
    title: 'Informasi',
    html: `
      <div style="text-align:left;font-family:'Google Sans Code',sans-serif;font-size:13px;color:#8b3a52;">
        <p style="margin-bottom:12px;font-weight:400;">
          <strong>Cara membuka koordinat:</strong>
        </p>
        <div style="background:rgba(201,120,138,0.08);border-radius:10px;padding:10px 14px;color:#8b3a52;margin-bottom:16px;line-height:1.8;">
          <p style="margin-bottom:8px;">
            <i class="ri-file-copy-fill"></i>
            <strong>Copy Paste:</strong><br>
            <span style="color:#c9788a;">
              Salin titik koordinat, lalu paste 
              langsung di kolom pencarian Google Maps.
            </span>
          </p>
          <p>
            <i class="ri-map-pin-2-fill"></i>
            <strong>Tombol Google Maps:</strong><br>
            <span style="color:#c9788a;">
              Klik tombol "Buka di Google Maps" 
              untuk langsung membuka lokasinya.
            </span>
          </p>
        </div>
        <p style="margin-bottom:12px;font-weight:400;">
          <strong>Cara melihat nama tempat:</strong>
        </p>
        <div style="background:rgba(201,120,138,0.08);border-radius:10px;padding:10px 14px;color:#c9788a;line-height:1.8;">
          Nama tempat bisa dilihat ketika 
          di <strong style="color:#8b3a52;">zoom out / zoom in</strong>, 
          atau dari 
          <strong style="color:#8b3a52;">detail informasi</strong> 
          yang muncul di bagian bawah layar Google Maps.
        </div>
      </div>
    `,
    confirmButtonText: 'OK !',
    confirmButtonColor: '#8b3a52',
    width: '360px',
    customClass: caesarSwalClass,
  });
}