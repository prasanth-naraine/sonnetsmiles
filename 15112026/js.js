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
setInterval(function () {
    const preloader = document.querySelector('#preloader');
    preloader.classList.add('hide');
}, 1000);

// -------------------------------------------------------------------------
// AOS
AOS.init();