// -------------------------------------------------------------------------
// Initialize Lenis
const lenis = new Lenis({
    duration: 4, // Speed of the animation in seconds (higher = slower/smoother)
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Linear deceleration curve
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
});
// Connect Lenis to the browser requestAnimationFrame loop
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// -------------------------------------------------------------------------
// menu bar
const hamClose = document.querySelector(".navbar-clickable");
const menuShow = document.querySelector(".responsive-lap-mobile");

hamClose.addEventListener("click", function () {
    menuShow.classList.toggle("active");
    hamClose.classList.toggle("active");
});

// -------------------------------------------------------------------------
// AOS
AOS.init();

// -------------------------------------------------------------------------
// Top Bottom Button
const topB = document.querySelector("#top");
const bottomB = document.querySelector("#bottom");

topB.addEventListener("click", function () {
    // audioCommon.play();
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

bottomB.addEventListener("click", function () {
    // audioCommon.play();
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
    });
});

// -------------------------------------------------------------------------
setInterval(function () {
    const preloader = document.querySelector('#preloader');
    preloader.classList.add('hide');
}, 1000);

// -------------------------------------------------------------------------
/* Call appointment show after 200px scroll */
const scrollCtas = document.querySelector('#call-appointment');

if (scrollCtas) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            scrollCtas.classList.add('show');
        } else {
            scrollCtas.classList.remove('show');
        }
    });
}

// -------------------------------------------------------------------------
const items = document.querySelectorAll(".right-item");

let currentIndex = 0;
let autoPlay;

function activateTab(index) {
    clearTimeout(autoPlay);

    items.forEach(item => {
        item.classList.remove("active");
    });

    currentIndex = index;
    items[currentIndex].classList.add("active");

    autoPlay = setTimeout(() => {
        const nextIndex = (currentIndex + 1) % items.length;
        activateTab(nextIndex);
    }, 8000);
}

// Manual tab click
items.forEach((item, index) => {
    item.addEventListener("click", () => {
        activateTab(index);
    });
});

// Start autoplay
activateTab(0);

// -------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const audioToggle = document.getElementById("audioToggle");
    const myAudio1 = document.getElementById("myAudio");
    myAudio1.volume = .1;

    audioToggle.addEventListener("click", () => {
        if (myAudio1.paused) {
            myAudio1.play()
                .then(() => {
                    audioToggle.classList.add("active");
                })
                .catch(error => {
                    console.log("Audio playback failed:", error);
                });
        } else {
            myAudio1.pause();
            audioToggle.classList.remove("active");
        }
    });

    myAudio1.addEventListener("play", () => {
        audioToggle.classList.add("active");
        // console.log(myAudio1.volume);
    });

    myAudio1.addEventListener("pause", () => {
        audioToggle.classList.remove("active");
        // console.log(myAudio1.volume);
    });
})