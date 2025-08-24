document.addEventListener('DOMContentLoaded', () => {
    const carouselTrack = document.querySelector('.carousel-track');
    if (!carouselTrack) return; // Exit if no carousel on page

    const images = carouselTrack.querySelectorAll('img');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const carouselDotsContainer = document.querySelector('.carousel-dots');

    let currentIndex = 0;
    const totalImages = images.length;

    // Create dots dynamically
    for (let i = 0; i < totalImages; i++) {
        const dot = document.createElement('span');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        carouselDotsContainer.appendChild(dot);
    }
    const dots = document.querySelectorAll('.carousel-dot');

    function updateCarousel() {
        const imageWidth = images[0].clientWidth; // Get the width of one image
        carouselTrack.style.transform = `translateX(-${currentIndex * imageWidth}px)`;

        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        if (currentIndex < 0) {
            currentIndex = totalImages - 1;
        } else if (currentIndex >= totalImages) {
            currentIndex = 0;
        }
        updateCarousel();
    }

    prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });

    // Optional: Auto-play carousel
    let autoSlideInterval;
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000); // Change image every 5 seconds
    };

    const stopAutoSlide = () => {
        clearInterval(autoSlideInterval);
    };

    // Start auto-play when page loads
    startAutoSlide();

    // Pause auto-play on hover
    carouselTrack.parentElement.addEventListener('mouseenter', stopAutoSlide);
    carouselTrack.parentElement.addEventListener('mouseleave', startAutoSlide);

    // Update carousel on window resize to ensure correct positioning
    window.addEventListener('resize', updateCarousel);

    // Initial setup
    updateCarousel();
});