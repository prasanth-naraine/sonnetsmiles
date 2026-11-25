// -------------------------------------------------------------------------
function createCounterObserver(observerName) {
    const elements = document.querySelectorAll('.value');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = +el.getAttribute('data-target');
                let count = 0;

                const increment = target / 100; // adjust speed

                // Clear any previous interval if it exists
                if (el.counterInterval) clearInterval(el.counterInterval);

                el.textContent = 0; // reset counter

                el.counterInterval = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        el.textContent = target;
                        clearInterval(el.counterInterval);
                    } else {
                        el.textContent = Math.ceil(count);
                    }
                }, 15); // adjust interval speed
            }
        });
    }, { threshold: 0.5 }); // triggers when 50% visible

    elements.forEach(el => observer.observe(el));

    return observer; // returns observer instance
}

// Unique observer instance
const metricsCounterObserver = createCounterObserver('metricsCounterObserver');

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
// comparison
document.addEventListener("DOMContentLoaded", function () {
    const containers = document.querySelectorAll(".comparison-container");

    containers.forEach((container) => {
        const beforeImage = container.querySelector(".image-before");
        const sliderLine = container.querySelector(".slider-line");
        const sliderKnob = container.querySelector(".slider-knob");

        let isDragging = false;
        let currentPosition = 50;

        function updateSlider(position) {
            position = Math.max(0, Math.min(100, position));
            currentPosition = position;
            beforeImage.style.clipPath = `inset(0 ${100 - position}% 0 0)`;
            sliderLine.style.left = `${position}%`;
            sliderKnob.style.left = `${position}%`;
            sliderKnob.setAttribute("aria-valuenow", Math.round(currentPosition));
        }

        function handleMove(clientX) {
            const rect = container.getBoundingClientRect();
            const x = clientX - rect.left;
            const percentage = (x / rect.width) * 100;
            updateSlider(percentage);
        }

        // Mouse events
        sliderKnob.addEventListener("mousedown", (e) => {
            isDragging = true;
            container.classList.add("dragging");
            e.preventDefault();
        });

        container.addEventListener("mousedown", (e) => {
            if (e.target === sliderKnob) return;
            isDragging = true;
            container.classList.add("dragging");
            handleMove(e.clientX);
        });

        document.addEventListener("mousemove", (e) => {
            if (!isDragging) return;
            handleMove(e.clientX);
        });

        document.addEventListener("mouseup", () => {
            isDragging = false;
            container.classList.remove("dragging");
        });

        // Touch events
        sliderKnob.addEventListener(
            "touchstart",
            (e) => {
                isDragging = true;
                container.classList.add("dragging");
                e.preventDefault();
            },
            { passive: false },
        );

        container.addEventListener(
            "touchstart",
            (e) => {
                if (e.target === sliderKnob) return;
                isDragging = true;
                container.classList.add("dragging");
                handleMove(e.touches[0].clientX);
            },
            { passive: false },
        );

        document.addEventListener(
            "touchmove",
            (e) => {
                if (!isDragging) return;
                handleMove(e.touches[0].clientX);
            },
            { passive: false },
        );

        document.addEventListener("touchend", () => {
            isDragging = false;
            container.classList.remove("dragging");
        });

        // Keyboard accessibility
        sliderKnob.setAttribute("tabindex", "0");
        sliderKnob.setAttribute("role", "slider");
        sliderKnob.setAttribute("aria-label", "Image comparison slider");
        sliderKnob.setAttribute("aria-valuemin", "0");
        sliderKnob.setAttribute("aria-valuemax", "100");
        sliderKnob.setAttribute("aria-valuenow", "50");

        sliderKnob.addEventListener("keydown", (e) => {
            let newPosition = currentPosition;
            switch (e.key) {
                case "ArrowLeft":
                case "ArrowDown":
                    newPosition -= 5;
                    e.preventDefault();
                    break;
                case "ArrowRight":
                case "ArrowUp":
                    newPosition += 5;
                    e.preventDefault();
                    break;
                case "Home":
                    newPosition = 0;
                    e.preventDefault();
                    break;
                case "End":
                    newPosition = 100;
                    e.preventDefault();
                    break;
            }
            updateSlider(newPosition);
        });

        updateSlider(50);
    });
});
