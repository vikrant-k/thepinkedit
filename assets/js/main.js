function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Show selected page
    document.getElementById(pageId).classList.add('active');

    // Update nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    document.querySelector(`[data-page="${pageId}"]`).classList.add('active');

    // Scroll to top
    window.scrollTo(0, 0);
}

// Initialize
showPage('home');

// Hero slideshow: show each image for 2 seconds, then loop
(function () {
    const show = document.querySelector('.hero-slideshow');
    if (!show) return;
    const slides = show.querySelectorAll('.hero-slide');
    if (slides.length < 2) return;
    const interval = Number(show.dataset.interval) || 2000;
    let current = 0;
    setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }, interval);
})();

// Offset pages by the real height of the fixed navigation bar,
// so the hero animation starts just below it (nav is taller on mobile).
(function () {
    const nav = document.querySelector('nav');
    if (!nav) return;
    const setNavHeight = () => {
        document.documentElement.style.setProperty('--nav-height', nav.offsetHeight + 'px');
    };
    setNavHeight();
    window.addEventListener('resize', setNavHeight);
    window.addEventListener('load', setNavHeight);
})();
