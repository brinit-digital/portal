fetch('navbar.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById('navbar').innerHTML = data;

        // Now elements exist, so add event listeners
        const menuBtn = document.getElementById("menuBtn");
        const mobileMenu = document.getElementById("mobileMenu");
        const blurOverlay = document.getElementById("blurOverlay");

        if (menuBtn && mobileMenu && blurOverlay) {
            menuBtn.addEventListener("click", () => {
                menuBtn.classList.toggle("active");
                mobileMenu.classList.toggle("active");
                blurOverlay.classList.toggle("active");
            });

            blurOverlay.addEventListener("click", () => {
                menuBtn.classList.remove("active");
                mobileMenu.classList.remove("active");
                blurOverlay.classList.remove("active");
            });
        }
    });

fetch('footer.html')
    .then(res => res.text())
    .then(data => document.getElementById('footer').innerHTML = data);

