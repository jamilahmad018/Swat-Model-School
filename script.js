/* =========================================================
   SWAT MODEL SCHOOL
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       MOBILE MENU
    ========================= */

    const menuToggle = document.getElementById("menuToggle");
    const navigation = document.getElementById("navigation");

    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", function () {

            navigation.classList.toggle("active");

            const icon = menuToggle.querySelector("i");

            if (navigation.classList.contains("active")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        });


        // Close menu after clicking a link
        const navLinks = navigation.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navigation.classList.remove("active");

                const icon = menuToggle.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            });

        });

    }


    /* =========================
       CURRENT YEAR
    ========================= */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =========================
       ACTIVE NAVIGATION
    ========================= */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".navigation a");

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });


        navLinks.forEach(function (link) {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === "#" + currentSection) {
                link.classList.add("active");
            }

        });

    }


    window.addEventListener("scroll", updateActiveNavigation);

    updateActiveNavigation();


    /* =========================
       SCROLL REVEAL ANIMATION
    ========================= */

    const revealElements = document.querySelectorAll(
        ".class-card, .feature-card, .student-card, .gallery-item, .quick-item, .contact-item"
    );


    revealElements.forEach(function (element) {

        element.style.opacity = "0";
        element.style.transform = "translateY(25px)";
        element.style.transition =
            "opacity 0.6s ease, transform 0.6s ease";

    });


    const revealObserver = new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";

                    revealObserver.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });


    /* =========================
       HEADER SHADOW ON SCROLL
    ========================= */

    const header = document.querySelector(".header");

    function updateHeader() {

        if (window.scrollY > 30) {

            header.style.boxShadow =
                "0 8px 25px rgba(0, 0, 0, 0.08)";

        } else {

            header.style.boxShadow = "none";

        }

    }

    window.addEventListener("scroll", updateHeader);

    updateHeader();


    /* =========================
       SMOOTH SCROLL
    ========================= */

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );


    internalLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (
                targetId &&
                targetId !== "#" &&
                document.querySelector(targetId)
            ) {

                event.preventDefault();

                const target = document.querySelector(targetId);

                const headerHeight = header
                    ? header.offsetHeight
                    : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            }

        });

    });


    /* =========================
       HERO ENTRANCE ANIMATION
    ========================= */

    const heroText = document.querySelector(".hero-text");
    const heroCard = document.querySelector(".hero-card");

    if (heroText) {

        heroText.style.opacity = "0";
        heroText.style.transform = "translateY(25px)";
        heroText.style.transition =
            "opacity 0.8s ease, transform 0.8s ease";

        setTimeout(function () {

            heroText.style.opacity = "1";
            heroText.style.transform = "translateY(0)";

        }, 150);

    }


    if (heroCard) {

        heroCard.style.opacity = "0";
        heroCard.style.transform = "translateX(30px)";
        heroCard.style.transition =
            "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s";

        setTimeout(function () {

            heroCard.style.opacity = "1";
            heroCard.style.transform = "translateX(0)";

        }, 200);

    }


    /* =========================
       BUTTON RIPPLE EFFECT
    ========================= */

    const buttons = document.querySelectorAll(".btn");

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            button.style.transform = "scale(0.98)";

            setTimeout(function () {

                button.style.transform = "";

            }, 120);

        });

    });


    /* =========================
       CONSOLE MESSAGE
    ========================= */

    console.log(
        "Swat Model School website loaded successfully."
    );

});
