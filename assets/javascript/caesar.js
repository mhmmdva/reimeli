const cipherData = {
    IER: {
        code: 'KDSSB',
        answer: 'HAPPY',
        clue: 'Ini perasaan yang selalu ada saat kalian bersama <i class="ri-emotion-happy-line"></i>',
        successTitle: 'Tepat sekali, Mas Ier.',
        successText: 'Karena itulah yang selalu Ci Ilem rasakan bersamamu.',
    },
    ILEM: {
        code: 'ZHGGLQJ',
        answer: 'WEDDING',
        clue: 'Ini yang sudah kalian lakukan <i class="ri-vip-diamond-fill"></i>',
        successTitle: 'AAHHHH ITU DIA! ',
        successText: 'Karena kalian yang paling tidak sabar menunggu hari itu.',
    },
};

const caesarSwalClass = {
    popup: 'swal-custom-popup',
    title: 'swal-custom-title',
    htmlContainer: 'swal-custom-text',
    confirmButton: 'swal-custom-button',
};

let cipherAttempts = 0;
const maxAttempts = 2;

// Bangun kotak kode & jawaban
function buildCipherScreen(name) {
    const data = cipherData[name];
    const code = data.code;
    const answer = data.answer;

    // Kotak kode (tidak bisa diedit)
    const cipherBoxes = document.getElementById('cipherBoxes');
    cipherBoxes.innerHTML = '';
    code.split('').forEach(letter => {
        const box = document.createElement('div');
        box.className = 'cipher-box';
        box.textContent = letter;
        cipherBoxes.appendChild(box);
    });

    // Kotak jawaban (bisa diedit, per huruf)
    const answerBoxes = document.getElementById('answerBoxes');
    answerBoxes.innerHTML = '';
    answer.split('').forEach((_, i) => {
        const input = document.createElement('input');
        input.type = 'text';
        input.maxLength = 1;
        input.className = 'answer-box';
        input.id = `ans-${i}`;
        input.setAttribute('autocomplete', 'off');

        // Auto focus ke kotak berikutnya
        input.addEventListener('input', (e) => {
            const val = e.target.value.toUpperCase();
            e.target.value = val;
            if (val && i < answer.length - 1) {
                document.getElementById(`ans-${i + 1}`).focus();
            }
        });

        // Backspace kembali ke kotak sebelumnya
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && i > 0) {
                document.getElementById(`ans-${i - 1}`).focus();
            }
            // Enter = submit
            if (e.key === 'Enter') submitCipher();
        });

        answerBoxes.appendChild(input);
    });

    // Reset percobaan
    cipherAttempts = 0;
    updateAttemptsDisplay();

    // Focus ke kotak pertama
    setTimeout(() => document.getElementById('ans-0').focus(), 300);
}

// Update tampilan sisa percobaan
function updateAttemptsDisplay() {
    const el = document.getElementById('attemptsNum');
    if (cipherAttempts === 0) {
        el.textContent = '∞';
    } else {
        const sisa = maxAttempts - cipherAttempts;
        el.textContent = sisa > 0 ? sisa : '0 — clue aktif!';
    }
}

// Submit jawaban
function submitCipher() {
    const name = selectedName;
    const data = cipherData[name];
    const answer = data.answer;

    // Ambil jawaban user
    let userAnswer = '';
    for (let i = 0; i < answer.length; i++) {
        const box = document.getElementById(`ans-${i}`);
        userAnswer += box ? box.value : '';
    }

    // Cek apakah semua kotak terisi
    if (userAnswer.length < answer.length) {
        Swal.fire({
            title: 'Eh, isi dulu ya! 👀',
            text: 'Isi semua kotak dulu ya sebelum submit!',
            icon: 'warning',
            buttonsStyling: false,
            confirmButtonText: 'OK !',
            customClass: caesarSwalClass,
        });
        return;
    }

    // Cek jawaban (case sensitive)
    if (userAnswer === answer) {
        // BENAR
        handleCipherSuccess(name, data);
    } else {
        // SALAH
        handleCipherFail(data, answer);
    }
}

// Jawaban benar
function handleCipherSuccess(name, data) {
  const answer = data.answer;
  for (let i = 0; i < answer.length; i++) {
    const box = document.getElementById(`ans-${i}`);
    if (box) {
      box.classList.remove('wrong');
      box.classList.add('correct');
    }
  }

  setTimeout(() => {
    Swal.fire({
      title: data.successTitle,
      text: data.successText,
      icon: 'success',
      buttonsStyling: false,
      confirmButtonText: 'Lanjutkan Misi!',
      customClass: caesarSwalClass,
      allowOutsideClick: false,
    }).then(() => {
      // Caesar selesai → Coordinate Code
      showScreen('screen6', 'screen7');
      setTimeout(() => buildCoordinateScreen(selectedName), 800);
    });
  }, 600);
}

// Jawaban salah
function handleCipherFail(data, answer) {
    cipherAttempts++;
    updateAttemptsDisplay();

    // Animasi kotak shake & merah
    for (let i = 0; i < answer.length; i++) {
        const box = document.getElementById(`ans-${i}`);
        if (box) {
            box.classList.add('wrong');
            setTimeout(() => box.classList.remove('wrong'), 500);
        }
    }

    if (cipherAttempts < maxAttempts) {
        // Percobaan 1: popup gagal biasa
        Swal.fire({
            title: 'Heiii, no no ya!',
            text: `Coba lagi, kamu pasti bisa! Ingat, setiap huruf mundur 3 posisi.`,
            icon: 'error',
            buttonsStyling: false,
            confirmButtonText: 'coba lagi!',
            customClass: caesarSwalClass,
        }).then(() => {
            // Kosongkan semua kotak
            for (let i = 0; i < answer.length; i++) {
                const box = document.getElementById(`ans-${i}`);
                if (box) box.value = '';
            }
            document.getElementById('ans-0').focus();
        });

    } else {
        // Percobaan 2+: popup dengan clue
        Swal.fire({
            title: 'Masih salah juga nih... awikwok banget sih kamu',
            html: `
        <p style="margin-bottom:12px;">Oke, petunjuk nih:</p>
        <div style="
          background: rgba(201,120,138,0.1);
          border: 1px solid rgba(201,120,138,0.3);
          border-radius: 12px;
          padding: 12px 16px;
          font-style: italic;
          color: #8b3a52;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(14px, 2.8vw, 17px);
        ">
        ${data.clue}
        </div>
      `,
            confirmButtonText: 'Mengerti, coba lagi!',
            icon: 'error',
            buttonsStyling: false,
            customClass: caesarSwalClass,
        }).then(() => {
            for (let i = 0; i < answer.length; i++) {
                const box = document.getElementById(`ans-${i}`);
                if (box) box.value = '';
            }
            document.getElementById('ans-0').focus();
        });
    }
}

// Popup bantuan 💡
function showCipherHint() {
    Swal.fire({
        title: 'Masa butuh bantuan',
        html: `
      <div style="text-align:left;font-family:'Google Sans Code',sans-serif;font-size:clamp(12px, 2.4vw, 14px);color:#8b3a52;">
        <p style="margin-bottom:12px;font-weight:400;">
          <strong><i class="ri-book-open-line"></i> Apa itu Caesar Cipher?</strong>
        </p>
        <p style="margin-bottom:16px;color:#c9788a;">
          Metode enkripsi dimana setiap huruf 
          digeser sejumlah posisi dalam alfabet.
        </p>

        <p style="margin-bottom:12px;font-weight:400;">
          <strong><i class="ri-key-2-line"></i> Cara memecahkan kode:</strong>
        </p>
        <p style="margin-bottom:8px;color:#c9788a;">
          Setiap huruf digeser <strong>+3 posisi ke depan.</strong><br>
          Tugasmu: kembalikan <strong>3 posisi ke belakang.</strong>
        </p>

        <p style="margin-bottom:12px;font-weight:400;">
          <strong><i class="ri-pencil-line"></i> Contoh:</strong>
        </p>
        <div style="
          background:rgba(201,120,138,0.08);
          border-radius:10px;
          padding:10px 14px;
          color:#8b3a52;
          font-family:'Gilda Display',serif;
          font-size:clamp(14px, 2.8vw, 16px);
          letter-spacing:0.05em;
        ">
          V → mundur 3 → <strong>S</strong><br>
          P → mundur 3 → <strong>M</strong><br>
          L → mundur 3 → <strong>I</strong><br>
          O → mundur 3 → <strong>L</strong><br>
          H → mundur 3 → <strong>E</strong>
        </div>
      </div>
    `,
        confirmButtonText: 'OK !',
        buttonsStyling: false,
        width: '360px',
        customClass: caesarSwalClass,
    });
}
