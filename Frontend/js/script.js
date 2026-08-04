// ----------------------------
// Smooth Scrolling Navigation
// ----------------------------

const navLinks = document.querySelectorAll("nav a"); 

navLinks.forEach(link => {
	
    link.addEventListener("click", function (e) {

        const target = this.getAttribute("href");

        if (target.startsWith("#")) {

            e.preventDefault();

            document.querySelector(target).scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

// Hero Button Animation

const button = document.querySelector(".btn");

if (button) {

    button.addEventListener("mouseenter", function () {

        this.style.transform = "scale(1.05)";

    });

    button.addEventListener("mouseleave", function () {

        this.style.transform = "scale(1)";

    });

}