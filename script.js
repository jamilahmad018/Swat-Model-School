document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       PRELOADER
    ========================= */
    const preloader = document.getElementById("preloader");

    setTimeout(function () {
        if (preloader) {
            preloader.classList.add("hide");
        }
    }, 900);


    /* =========================
       CURRENT YEAR
    ========================= */
    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =========================
       HEADER SCROLL EFFECT
    ========================= */
    const header = document.querySelector(".main-header");

    function handleHeaderScroll() {
        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleHeaderScroll);
    handleHeaderScroll();


    /* =========================
       MOBILE MENU
    ========================= */
    const nav = document.getElementById("mainNav");
    const menuButton = document.querySelector(".mobile-menu");

    if (menuButton) {
        menuButton.addEventListener("click", function () {
            toggleMenu();
        });
    }


    /* =========================
       NAVIGATION LINKS
    ========================= */
    document.querySelectorAll(".nav-link").forEach(function (link) {

        link.addEventListener("click", function () {

            if (nav) {
                nav.classList.remove("open");
            }

            if (menuButton) {
                menuButton.classList.remove("active");
            }

        });

    });


    /* =========================
       MODAL OVERLAY CLOSE
    ========================= */
    document.querySelectorAll(".modal").forEach(function (modal) {

        modal.addEventListener("click", function (event) {

            if (event.target === modal) {
                closeModal(modal.id);
            }

        });

    });


    /* =========================
       ESCAPE KEY
    ========================= */
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            document.querySelectorAll(".modal.show").forEach(function (modal) {
                modal.classList.remove("show");
            });

            closeGallery();

            document.body.classList.remove("modal-open");
        }

    });


    /* =========================
       WELCOME POPUP
    ========================= */
    setTimeout(function () {

        if (!sessionStorage.getItem("smsWelcomeShown")) {

            openModal("welcomeModal");

            sessionStorage.setItem("smsWelcomeShown", "1");

        }

    }, 1400);


    /* =========================
       SCROLL REVEAL
    ========================= */
    const revealElements = document.querySelectorAll(
        ".section-intro, .about-layout, .academic-card, .director-layout, " +
        ".faculty-card, .why-item, .achievement-card, .gallery-modern, " +
        ".admission-banner, .fee-layout, .contact-modern"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(function (element) {
            element.classList.add("scroll-reveal");
            observer.observe(element);
        });

    }


    /* =========================
       ACTIVE NAVIGATION
    ========================= */
    const sections = document.querySelectorAll("section[id]");

    function updateActiveNav() {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop = section.offsetTop - 180;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        document.querySelectorAll(".nav-link").forEach(function (link) {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === "#" + currentSection) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener("scroll", updateActiveNav);
    updateActiveNav();

});


/* =========================
   MOBILE MENU FUNCTION
========================= */

function toggleMenu() {

    const nav = document.getElementById("mainNav");
    const menuButton = document.querySelector(".mobile-menu");

    if (!nav) return;

    nav.classList.toggle("open");

    if (menuButton) {
        menuButton.classList.toggle("active");
    }

}


/* =========================
   OPEN MODAL
========================= */

function openModal(id) {

    const modal = document.getElementById(id);

    if (!modal) return;

    modal.classList.add("show");

    document.body.classList.add("modal-open");

}


/* =========================
   CLOSE MODAL
========================= */

function closeModal(id) {

    const modal = document.getElementById(id);

    if (!modal) return;

    modal.classList.remove("show");

    const remainingModals = document.querySelectorAll(".modal.show");

    if (remainingModals.length === 0) {
        document.body.classList.remove("modal-open");
    }

}


/* =========================
   GALLERY LIGHTBOX
========================= */

function openGallery(src) {

    const lightbox = document.getElementById("lightbox");
    const image = document.getElementById("lightboxImage");

    if (!lightbox || !image) return;

    image.src = src;

    lightbox.classList.add("show");

    document.body.classList.add("modal-open");

}


/* =========================
   CLOSE GALLERY
========================= */

function closeGallery() {

    const lightbox = document.getElementById("lightbox");
    const image = document.getElementById("lightboxImage");

    if (!lightbox) return;

    lightbox.classList.remove("show");

    if (image) {
        image.src = "";
    }

    const remainingModals = document.querySelectorAll(".modal.show");

    if (remainingModals.length === 0) {
        document.body.classList.remove("modal-open");
    }

}
