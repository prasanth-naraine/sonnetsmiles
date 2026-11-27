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
}, 1300);

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
document.addEventListener('DOMContentLoaded', () => {
    let lastWidth = window.innerWidth;
    let resizeTimer;

    window.addEventListener('resize', () => {
        if (window.innerWidth !== lastWidth) {
            lastWidth = window.innerWidth;
            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(() => {
                window.location.reload();
            }, 300);
        }
    });
});

// -------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const audioToggle = document.getElementById("audioToggle");
    const myAudio1 = document.getElementById("myAudio");
    myAudio1.volume = 0.2;

    let scrollTriggered = false;
    let userPaused = false;

    const tryAutoplayOnScroll = () => {
        if (scrollTriggered || userPaused || !myAudio1.paused) return;

        if (window.scrollY > 150) { // Adjust scroll threshold (in pixels) as needed
            myAudio1.play()
                .then(() => {
                    scrollTriggered = true;
                    window.removeEventListener("scroll", tryAutoplayOnScroll);
                })
                .catch(error => {
                    // Browser blocked autoplay until user clicks/taps the page
                    console.log("Scroll autoplay blocked:", error);
                });
        }
    };

    window.addEventListener("scroll", tryAutoplayOnScroll, { passive: true });

    audioToggle.addEventListener("click", () => {
        if (myAudio1.paused) {
            userPaused = false;
            myAudio1.play().catch(error => {
                console.log("Audio playback failed:", error);
            });
        } else {
            userPaused = true;
            myAudio1.pause();
        }
    });

    myAudio1.addEventListener("play", () => {
        audioToggle.classList.add("active");
    });

    myAudio1.addEventListener("pause", () => {
        audioToggle.classList.remove("active");
    });
});
