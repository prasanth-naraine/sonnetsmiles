const audioCommon = new Audio("./sounds/mouse.mp3");

// -------------------------------------------------------------------------
// menu bar
const hamClose = document.querySelector(".navbar-clickable");
const menuShow = document.querySelector(".responsive-lap-mobile");

hamClose.addEventListener("click", function () {
    menuShow.classList.toggle("active");
    hamClose.classList.toggle("active");

    audioCommon.play();
});

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

// -------------------------------------------------------------------------
// Preloader counter
document.addEventListener("DOMContentLoaded", function () {

    const counter = document.getElementById("counter");
    const preloader = document.getElementById("preloader");

    let count = 0;
    const duration = 1000; // 2 seconds
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

// -------------------------------------------------------------------------
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

// -------------------------------------------------------------------------
// img
const allImg = document.querySelectorAll('img');
allImg.forEach(allImgP => {
    allImgP.setAttribute('alt', 'Sonnet Smiles Clinic');
})

// -------------------------------------------------------------------------
// Top Bottom Button
const topB = document.querySelector("#top");
const bottomB = document.querySelector("#bottom");

topB.addEventListener("click", function () {
    audioCommon.play();
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

bottomB.addEventListener("click", function () {
    audioCommon.play();
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
    });
});

// -------------------------------------------------------------------------
// AOS
AOS.init();

// -------------------------------------------------------------------------
// marquee
const track = document.querySelector(".marquee-track");

if (track) {
    const items = Array.from(track.children);

    // 1. Double the items inline for the infinite loop illusion
    items.forEach(item => {
        const clone = item.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        track.appendChild(clone);
    });

    // 2. Measure the exact width of a single iteration (half of the full doubled track)
    // Using a micro-timeout ensures the browser has rendered the layout dimensions
    setTimeout(() => {
        const trackWidth = track.scrollWidth;
        const singleGroupWidth = trackWidth / 4;

        // 3. Generate a unique dynamic keyframe tailored strictly to your text length
        const styleId = "universal-marquee-style";
        let styleElement = document.getElementById(styleId);
        if (!styleElement) {
            styleElement = document.createElement("style");
            styleElement.id = styleId;
            document.head.appendChild(styleElement);
        }

        // We translate exactly the distance of one full group width to make the snap invisible
        styleElement.innerHTML = `
        @keyframes scrollUniversal {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${singleGroupWidth}px); }
        }
      `;

        // 4. Force apply the exact 20s linear infinite animation directly to the track
        track.style.animation = "scrollUniversal 60s linear infinite";
    }, 50);
}

// -------------------------------------------------------------------------
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

