let currentSlide = 0;
const totalSlides = 2;
let touchStartX = 0;
let touchEndX = 0;
let isSwiping = false;
let carouselInitialized = false;

function isInteractiveCarouselTarget(target) {
  return target.closest('video, button, a');
}

// Init carousel & swipe events
function initCarousel() {
  const container = document.getElementById('carouselContainer');
  if (!container) return;
  if (carouselInitialized) {
    updateCarousel();
    return;
  }

  carouselInitialized = true;

  // Touch start
  container.addEventListener('touchstart', (e) => {
    if (isInteractiveCarouselTarget(e.target)) {
      isSwiping = false;
      return;
    }

    touchStartX = e.touches[0].clientX;
    isSwiping = true;
  }, { passive: true });

  // Touch move (block scroll saat swipe horizontal)
  container.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;
    const diff = touchStartX - e.touches[0].clientX;
    if (Math.abs(diff) > 10) e.preventDefault();
  }, { passive: false });

  // Touch end → hitung arah swipe
  container.addEventListener('touchend', (e) => {
    if (!isSwiping) return;
    if (isInteractiveCarouselTarget(e.target)) {
      isSwiping = false;
      return;
    }

    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
    isSwiping = false;
  }, { passive: true });

  // Update tampilan awal
  updateCarousel();
}

// Logika swipe
function handleSwipe() {
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) < 50) return; // Terlalu kecil, abaikan

  if (diff > 0) {
    carouselNext(); // Swipe kiri → next
  } else {
    carouselPrev(); // Swipe kanan → prev
  }
}

// Pindah ke slide tertentu
function goToSlide(index) {
  pauseVideo();
  currentSlide = index;
  updateCarousel();
}

// Next slide
function carouselNext() {
  if (currentSlide < totalSlides - 1) {
    goToSlide(currentSlide + 1);
  }
}

// Prev slide
function carouselPrev() {
  if (currentSlide > 0) {
    goToSlide(currentSlide - 1);
  }
}

// Pause video saat berpindah slide
function pauseVideo() {
  const video = document.getElementById('carouselVideo');
  if (video && !video.paused) video.pause();
}

// Update semua elemen carousel
function updateCarousel() {
  // Geser track
  const track = document.getElementById('carouselTrack');
  if (track) {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  // Update dots
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.getElementById(`dot-${i}`);
    if (dot) {
      dot.classList.toggle('active', i === currentSlide);
    }
  }

  // Update arrow kiri
  const prevBtn = document.getElementById('carouselPrev');
  if (prevBtn) {
    const isFirst = currentSlide === 0;
    prevBtn.style.opacity = isFirst ? '0' : '0.25';
    prevBtn.style.pointerEvents = isFirst ? 'none' : 'all';
  }

  // Update arrow kanan
  const nextBtn = document.getElementById('carouselNext');
  if (nextBtn) {
    const isLast = currentSlide === totalSlides - 1;
    nextBtn.style.opacity = isLast ? '0' : '0.25';
    nextBtn.style.pointerEvents = isLast ? 'none' : 'all';
  }
}
