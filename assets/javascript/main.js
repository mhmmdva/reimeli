document.addEventListener('DOMContentLoaded', function () {
    makePetals();

    // Animasi fade up screen 1
    const elements = [
        { id: 's1-main', delay: 400 },
        { id: 's1-names', delay: 1000 },        
    ];

    elements.forEach(({ id, delay }) => {
        const el = document.getElementById(id);
        if (el) fadeUp(el, delay);
    });

    // Screen 1 → Screen 2 (loading 1) setelah 1,8 detik
    showScreen('screen1', 'screen2', 1800);

    // Mulai loading 1 setelah screen 2 muncul
    setTimeout(startLoading1, 2500);
});
