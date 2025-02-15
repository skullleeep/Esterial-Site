const splashScreen = document.getElementById('splashScreen');

// Check if the splash screen has been seen before
if (localStorage.getItem("splashSeen")) {
    // Hide splash screen instantly and show homepage
    splashScreen.style.display = "none";
}

//On click remove splash screen
splashScreen.addEventListener("click", () => {
    splashScreen.style.opacity = '0';
    setTimeout(() => {
        splashScreen.style.display = 'none';

        // Store in localStorage that user has seen the splash screen
        localStorage.setItem("splashSeen", "true");
    }, 1000);
})