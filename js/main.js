document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scrolling for Navigation
    document.querySelectorAll('#navbar a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Stop default jump behavior

            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth' // Enable smooth scrolling
            });
        });
    });

    // 2. Section Slide-in Animations using Intersection Observer
    const sections = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null, // viewport as the root
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the item is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add 'is-visible' class to trigger CSS animation
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once animated to save resources
                // observer.unobserve(entry.target);
            }
            // If you want elements to animate *every time* they come into view,
            // you can remove the unobserve line and handle 'else' to remove 'is-visible'
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Optional: Add an immediate animation for the first section on load
    const firstSection = document.querySelector('#overview');
    if (firstSection) {
        firstSection.classList.add('is-visible');
    }
});