// Preloader counter
document.addEventListener("DOMContentLoaded", function () {

    const counter = document.getElementById("counter");
    const preloader = document.getElementById("preloader");

    let count = 0;
    const duration = 1600; // 2 seconds
    const interval = 20;
    const increment = 200 / (duration / interval);

    const timer = setInterval(function () {

        count += increment;

        if (count >= 100) {
            count = 100;
            clearInterval(timer);

            counter.textContent = 100;

            // Hide after reaching 100%
            setTimeout(function () {
                preloader.classList.add("hide");
            }, 600);
        } else {
            counter.textContent = Math.floor(count);
        }

    }, interval);

});

// refresh on width resize
let previousWidth = window.innerWidth;

window.addEventListener("resize", function () {
    const currentWidth = window.innerWidth;

    if (currentWidth !== previousWidth) {
        previousWidth = currentWidth;
        // Your code here
        window.location.reload();
    }
});

// menu


// -------------------------------------------------------------------------
// Register scroll event listener on the global window
window.addEventListener("scroll", () => {
    // Capture current pixels scrolled from top
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    // Calculate total scrollable window height minus client viewport height
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    // Prevent division by zero if page is not scrollable
    const scrolledPercentage = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    // Dynamically update progress bar width using DOM style manipulation
    document.getElementById("myProgressBar").style.width = `${scrolledPercentage}%`;
});


// AOS
AOS.init();

// all a tags
const aTags = document.querySelectorAll('a');
aTags.forEach(aTagsP => {
    aTagsP.setAttribute('target', '_blank');
    aTagsP.setAttribute('rel', 'noopener noreferrer');
})

// img
const allImg = document.querySelectorAll('img');
allImg.forEach(allImgP => {
    allImgP.setAttribute('alt', 'Sonnet Smiles Clinic');
})

// Top Bottom Button
const topB = document.querySelector("#top");
const bottomB = document.querySelector("#bottom");

topB.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

bottomB.addEventListener("click", function () {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
    });
});

// ---------------------------------------
// faq
const faqItems = document.querySelectorAll(".q-a-div");

const isTouchDevice = window.matchMedia("(hover: none)").matches;

faqItems.forEach(item => {

    // Hover Open (Desktop only)
    if (!isTouchDevice) {

        item.addEventListener("mouseenter", () => {
            faqItems.forEach(el => {
                if (el !== item) {
                    el.classList.remove("active");
                }
            });

            item.classList.add("active");
        });


        item.addEventListener("mouseleave", () => {
            item.classList.remove("active");
        });

    }


    // Click Toggle (Desktop + Mobile)
    item.addEventListener("click", () => {

        const isActive = item.classList.contains("active");

        faqItems.forEach(el => {
            el.classList.remove("active");
        });

        if (!isActive) {
            item.classList.add("active");
        }

    });

});
