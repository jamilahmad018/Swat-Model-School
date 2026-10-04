/* =========================================================
   SWAT MODEL SCHOOL
   COMPLETE WEBSITE JAVASCRIPT
========================================================= */


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    initPreloader();

    initMobileMenu();

    initNavigation();

    initScrollReveal();

    initAdmissionForm();

    initKeyboardControls();

    initWelcomePopup();

});


/* =========================================================
   PRELOADER
========================================================= */

function initPreloader() {

    const preloader =
        document.getElementById("preloader");

    if (!preloader) return;


    window.addEventListener("load", function () {

        setTimeout(function () {

            preloader.classList.add("hide");

        }, 400);

    });


    /*
       Emergency fallback.
       This prevents the website from remaining
       stuck on the loading screen.
    */

    setTimeout(function () {

        preloader.classList.add("hide");

    }, 2200);

}


/* =========================================================
   WELCOME POPUP
========================================================= */

function initWelcomePopup() {

    const welcomeModal =
        document.getElementById("welcomeModal");

    if (!welcomeModal) return;


    /*
       Show welcome popup only once per browser session.
    */

    const alreadyShown =
        sessionStorage.getItem(
            "smsWelcomeShown"
        );


    if (!alreadyShown) {

        setTimeout(function () {

            openModal("welcomeModal");

            sessionStorage.setItem(
                "smsWelcomeShown",
                "true"
            );

        }, 2500);

    }

}


/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {

    const nav =
        document.getElementById("mainNav");

    const menuButton =
        document.querySelector(".mobile-menu");


    if (!nav || !menuButton) return;


    menuButton.addEventListener(
        "click",
        function () {

            nav.classList.toggle("show");


            const icon =
                menuButton.querySelector("i");


            if (!icon) return;


            if (nav.classList.contains("show")) {

                icon.classList.remove(
                    "fa-bars"
                );

                icon.classList.add(
                    "fa-xmark"
                );

            } else {

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );

            }

        }
    );


    /*
       Close menu when clicking navigation link.
    */

    const links =
        nav.querySelectorAll(
            ".nav-link"
        );


    links.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                closeMobileMenu();

            }
        );

    });

}


/* =========================================================
   CLOSE MOBILE MENU
========================================================= */

function closeMobileMenu() {

    const nav =
        document.getElementById("mainNav");

    const menuButton =
        document.querySelector(".mobile-menu");


    if (!nav) return;


    nav.classList.remove("show");


    if (menuButton) {

        const icon =
            menuButton.querySelector("i");


        if (icon) {

            icon.classList.remove(
                "fa-xmark"
            );

            icon.classList.add(
                "fa-bars"
            );

        }

    }

}


/* =========================================================
   TOGGLE MENU
   Used directly by HTML onclick
========================================================= */

function toggleMenu() {

    const nav =
        document.getElementById("mainNav");

    const menuButton =
        document.querySelector(".mobile-menu");


    if (!nav) return;


    nav.classList.toggle("show");


    if (menuButton) {

        const icon =
            menuButton.querySelector("i");


        if (icon) {

            if (
                nav.classList.contains(
                    "show"
                )
            ) {

                icon.classList.remove(
                    "fa-bars"
                );

                icon.classList.add(
                    "fa-xmark"
                );

            } else {

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );

            }

        }

    }

}


/* =========================================================
   NAVIGATION
========================================================= */

function initNavigation() {

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    if (!sections.length || !navLinks.length) {
        return;
    }


    function updateActiveNavigation() {

        const scrollPosition =
            window.scrollY + 160;


        let currentSection =
            "home";


        sections.forEach(
            function (section) {

                const top =
                    section.offsetTop;

                const height =
                    section.offsetHeight;

                const id =
                    section.getAttribute(
                        "id"
                    );


                if (
                    scrollPosition >= top &&
                    scrollPosition <
                        top + height
                ) {

                    currentSection = id;

                }

            }
        );


        navLinks.forEach(
            function (link) {

                link.classList.remove(
                    "active"
                );


                const href =
                    link.getAttribute(
                        "href"
                    );


                if (
                    href ===
                    "#" + currentSection
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );


    updateActiveNavigation();

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initScrollReveal() {

    const elements =
        document.querySelectorAll(
            ".scroll-reveal"
        );


    if (!elements.length) return;


    /*
       Use IntersectionObserver where supported.
    */

    if (
        "IntersectionObserver"
        in window
    ) {

        const observer =
            new IntersectionObserver(
                function (
                    entries,
                    observer
                ) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        elements.forEach(
            function (element) {

                observer.observe(
                    element
                );

            }
        );


    } else {

        /*
           Fallback for older browsers.
        */

        elements.forEach(
            function (element) {

                element.classList.add(
                    "visible"
                );

            }
        );

    }

}


/* =========================================================
   OPEN MODAL
========================================================= */

function openModal(modalId) {

    const modal =
        document.getElementById(
            modalId
        );


    if (!modal) return;


    modal.classList.add("show");


    document.body.classList.add(
        "modal-open"
    );


    /*
       Move focus to close button
       for accessibility.
    */

    const closeButton =
        modal.querySelector(
            ".modal-close"
        );


    if (closeButton) {

        setTimeout(
            function () {

                closeButton.focus();

            },
            100
        );

    }

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeModal(modalId) {

    const modal =
        document.getElementById(
            modalId
        );


    if (!modal) return;


    modal.classList.remove(
        "show"
    );


    /*
       Check whether another modal
       is still open.
    */

    const remainingModal =
        document.querySelector(
            ".modal.show"
        );


    if (!remainingModal) {

        document.body.classList.remove(
            "modal-open"
        );

    }

}


/* =========================================================
   MODAL BACKDROP CLICK
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        if (
            event.target.classList.contains(
                "modal"
            )
        ) {

            const modal =
                event.target;


            modal.classList.remove(
                "show"
            );


            const remaining =
                document.querySelector(
                    ".modal.show"
                );


            if (!remaining) {

                document.body.classList.remove(
                    "modal-open"
                );

            }

        }

    }
);


/* =========================================================
   TEACHER PROFILE
========================================================= */

function openTeacher(
    name,
    role,
    description,
    icon
) {

    const nameElement =
        document.getElementById(
            "teacherModalName"
        );

    const roleElement =
        document.getElementById(
            "teacherModalRole"
        );

    const descriptionElement =
        document.getElementById(
            "teacherModalDescription"
        );

    const iconElement =
        document.getElementById(
            "teacherModalIcon"
        );

    const departmentElement =
        document.getElementById(
            "teacherModalDepartment"
        );


    if (nameElement) {

        nameElement.textContent =
            name;

    }


    if (roleElement) {

        roleElement.textContent =
            role;

    }


    if (descriptionElement) {

        descriptionElement.textContent =
            description;

    }


    if (departmentElement) {

        departmentElement.textContent =
            role;

    }


    if (iconElement) {

        iconElement.className =
            "fa-solid " + icon;

    }


    openModal(
        "teacherModal"
    );

}


/* =========================================================
   STUDENT PROFILE
========================================================= */

function openStudent(
    image,
    name,
    achievement,
    description
) {

    const imageElement =
        document.getElementById(
            "studentModalImage"
        );

    const nameElement =
        document.getElementById(
            "studentModalName"
        );

    const achievementElement =
        document.getElementById(
            "studentModalAchievement"
        );

    const descriptionElement =
        document.getElementById(
            "studentModalDescription"
        );


    if (imageElement) {

        imageElement.src =
            image;

    }


    if (nameElement) {

        nameElement.textContent =
            name;

    }


    if (achievementElement) {

        achievementElement.textContent =
            achievement;

    }


    if (descriptionElement) {

        descriptionElement.textContent =
            description;

    }


    openModal(
        "studentModal"
    );

}


/* =========================================================
   GALLERY LIGHTBOX
========================================================= */

function openLightbox(
    imageSource
) {

    const lightbox =
        document.getElementById(
            "lightbox"
        );

    const image =
        document.getElementById(
            "lightboxImage"
        );


    if (!lightbox || !image) {
        return;
    }


    image.src =
        imageSource;


    lightbox.classList.add(
        "show"
    );


    document.body.classList.add(
        "modal-open"
    );

}


/* =========================================================
   CLOSE LIGHTBOX
========================================================= */

function closeLightbox(event) {

    /*
       Prevent the close button event
       from behaving unexpectedly.
    */

    if (
        event &&
        typeof event.stopPropagation ===
        "function"
    ) {

        event.stopPropagation();

    }


    const lightbox =
        document.getElementById(
            "lightbox"
        );


    if (!lightbox) return;


    lightbox.classList.remove(
        "show"
    );


    /*
       Only unlock body if no normal
       modal is currently open.
    */

    const normalModal =
        document.querySelector(
            ".modal.show"
        );


    if (!normalModal) {

        document.body.classList.remove(
            "modal-open"
        );

    }

}


/* =========================================================
   KEYBOARD CONTROLS
========================================================= */

function initKeyboardControls() {

    document.addEventListener(
        "keydown",
        function (event) {

            /*
               ESC closes modal/lightbox.
            */

            if (
                event.key ===
                "Escape"
            ) {

                const openModalElement =
                    document.querySelector(
                        ".modal.show"
                    );


                if (openModalElement) {

                    openModalElement.classList.remove(
                        "show"
                    );

                }


                const lightbox =
                    document.getElementById(
                        "lightbox"
                    );


                if (lightbox) {

                    lightbox.classList.remove(
                        "show"
                    );

                }


                document.body.classList.remove(
                    "modal-open"
                );


                closeMobileMenu();

            }

        }
    );

}


/* =========================================================
   ONLINE ADMISSION FORM
   WEB3FORMS
========================================================= */

function initAdmissionForm() {

    const admissionForm =
        document.getElementById(
            "admissionForm"
        );


    const admissionResult =
        document.getElementById(
            "admissionResult"
        );


    const admissionSubmit =
        document.getElementById(
            "admissionSubmit"
        );


    if (
        !admissionForm ||
        !admissionResult ||
        !admissionSubmit
    ) {

        return;

    }


    admissionForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            /*
               Clear old result.
            */

            admissionResult.className =
                "admission-result";

            admissionResult.textContent =
                "";


            /*
               Disable button.
            */

            admissionSubmit.disabled =
                true;


            const submitText =
                admissionSubmit.querySelector(
                    ".submit-text"
                );


            const submitLoading =
                admissionSubmit.querySelector(
                    ".submit-loading"
                );


            if (submitText) {

                submitText.style.display =
                    "none";

            }


            if (submitLoading) {

                submitLoading.style.display =
                    "inline";

            }


            try {

                /*
                   Collect form data.
                */

                const formData =
                    new FormData(
                        admissionForm
                    );


                /*
                   Convert FormData to object.
                */

                const object =
                    Object.fromEntries(
                        formData.entries()
                    );


                /*
                   Convert to JSON.
                */

                const json =
                    JSON.stringify(
                        object
                    );


                /*
                   Send to Web3Forms.
                */

                const response =
                    await fetch(
                        "https://api.web3forms.com/submit",
                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json",

                                "Accept":
                                    "application/json"

                            },

                            body: json

                        }
                    );


                /*
                   Read response.
                */

                const result =
                    await response.json();


                /*
                   SUCCESS
                */

                if (
                    response.ok &&
                    result.success
                ) {

                    admissionResult.className =
                        "admission-result success";


                    admissionResult.innerHTML =

                        "✓ <strong>" +
                        "Application Submitted Successfully!" +
                        "</strong><br>" +

                        "Thank you for applying to " +
                        "Swat Model School. " +

                        "Our administration will " +
                        "contact you soon.";


                    /*
                       Reset form.
                    */

                    admissionForm.reset();


                    /*
                       Keep success message
                       visible for a few seconds.
                    */

                    setTimeout(
                        function () {

                            closeModal(
                                "admissionModal"
                            );


                            admissionResult.className =
                                "admission-result";


                            admissionResult.textContent =
                                "";


                        },
                        6000
                    );


                } else {

                    /*
                       ERROR FROM WEB3FORMS
                    */

                    admissionResult.className =
                        "admission-result error";


                    admissionResult.textContent =
                        result.message ||
                        "Something went wrong. " +
                        "Please try again.";

                }


            } catch (error) {

                /*
                   NETWORK / INTERNET ERROR
                */

                console.error(
                    "Admission Form Error:",
                    error
                );


                admissionResult.className =
                    "admission-result error";


                admissionResult.textContent =
                    "Unable to submit the application. " +
                    "Please check your internet connection " +
                    "and try again.";

            }


            /*
               Enable submit button again.
            */

            admissionSubmit.disabled =
                false;


            if (submitText) {

                submitText.style.display =
                    "inline";

            }


            if (submitLoading) {

                submitLoading.style.display =
                    "none";

            }

        }
    );

}


/* =========================================================
   PHONE NUMBER HELP
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const target =
            event.target.closest(
                'a[href^="tel:"]'
            );


        if (!target) return;


        /*
           Allow normal telephone behavior.
           This section exists mainly for future
           analytics or tracking.
        */

    }
);


/* =========================================================
   WHATSAPP LINK
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const whatsapp =
            event.target.closest(
                'a[href*="wa.me"]'
            );


        if (!whatsapp) return;


        /*
           WhatsApp links naturally open
           in a new tab because the HTML
           contains target="_blank".
        */

    }
);


/* =========================================================
   SMOOTH INTERNAL LINKS
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const link =
            event.target.closest(
                'a[href^="#"]'
            );


        if (!link) return;


        const targetId =
            link.getAttribute(
                "href"
            );


        if (
            !targetId ||
            targetId === "#"
        ) {

            return;

        }


        const target =
            document.querySelector(
                targetId
            );


        if (!target) return;


        /*
           Let browser handle normal
           smooth scrolling through CSS.
        */

        closeMobileMenu();

    }
);


/* =========================================================
   PREVENT FORM DOUBLE SUBMISSION
========================================================= */

window.addEventListener(
    "beforeunload",
    function () {

        /*
           Nothing required here currently.
           Reserved for future form protection.
        */

    }
);


/* =========================================================
   IMAGE ERROR HANDLING
========================================================= */

document.addEventListener(
    "error",
    function (event) {

        if (
            event.target &&
            event.target.tagName ===
            "IMG"
        ) {

            event.target.classList.add(
                "image-load-error"
            );

        }

    },
    true
);


/* =========================================================
   CONSOLE MESSAGE
========================================================= */

console.log(
    "%cSwat Model School",
    "color:#1769e0;font-size:20px;font-weight:bold;"
);

console.log(
    "Website loaded successfully."
);


/* =========================================================
   END OF SCRIPT
========================================================= */
