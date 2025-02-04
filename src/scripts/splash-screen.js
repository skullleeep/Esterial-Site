const btnSplash = document.getElementById('splashScreen')
btnSplash.addEventListener("click", () => {
    btnSplash.style.opacity = '0';
    setTimeout(() => {
        btnSplash.style.display = 'none';
    }, 1000);
})