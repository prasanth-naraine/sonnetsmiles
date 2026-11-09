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
