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