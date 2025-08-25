function playAnimations() {
    const elements = document.querySelectorAll(".animate-on-scroll");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let animType = entry.target.dataset.animation || "fade-in"; // Default animation
                let delay = entry.target.dataset.delay || "0s"; // Default delay

                setTimeout(() => {
                    entry.target.classList.add(animType);
                }, parseFloat(delay) * 1000); // Convert delay to milliseconds

                observer.unobserve(entry.target); // Ensures animation only runs once
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", function () {
    playAnimations();
});
