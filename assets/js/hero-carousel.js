// Homepage hero slideshow: show each image for 2 seconds, in numbered order.
(() => {
    const carousel = document.querySelector('#home .hero-carousel');
    if (!carousel) return;
    const slides = Array.from(carousel.querySelectorAll('.hero-carousel__slide'));
    if (slides.length < 2) return;

    let current = 0;
    const showNext = () => {
        slides[current].classList.remove('is-active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('is-active');
    };

    // Respect users who request reduced motion: the first image stays visible.
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.setInterval(showNext, 2000);
    }
})();
