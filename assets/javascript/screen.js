function fadeUp(el, delay = 0) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    setTimeout(() => {
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        el.style.transform = 'translateY(0)';
        el.style.opacity = '1';
    }, delay);
}

function showScreen(hideId, showId, delay = 0) {
    setTimeout(() => {
        const hide = document.getElementById(hideId);
        const show = document.getElementById(showId);
        if (!hide || !show) return;
        hide.style.transition = 'opacity 0.7s ease';
        hide.style.opacity = '0';
        hide.style.pointerEvents = 'none';
        setTimeout(() => {
            show.style.transition = 'opacity 0.7s ease';
            show.style.opacity = '1';
            show.style.pointerEvents = 'all';
        }, 700);
    }, delay);
}