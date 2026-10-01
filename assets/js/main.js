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
