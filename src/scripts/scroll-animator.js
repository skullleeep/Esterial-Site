document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".animate-on-scroll");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let animType = entry.target.dataset.animation || "fade-in"; // Default animation
                entry.target.classList.add(animType);
                observer.unobserve(entry.target); // Ensures animation only runs once
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
});
