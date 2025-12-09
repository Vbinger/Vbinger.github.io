(function () {
  // Store rotation state per image
  const rotations = new WeakMap();

  function initImage(img) {
    if (!rotations.has(img)) {
      rotations.set(img, 0);
      img.style.transition = "transform 0.9s linear";
      img.style.transformOrigin = "50% 50%";
    }
  }

  function rotateImages() {
    const imgs = document.querySelectorAll("img");

    imgs.forEach(img => {
      initImage(img);

      const current = rotations.get(img) || 0;
      const direction = Math.random() < 0.5 ? -1 : 1;
      const next = current + direction * 1; // 1 degree step

      rotations.set(img, next);
      img.style.transform = `rotate(${next}deg)`;
    });
  }

  // Run every second
  setInterval(rotateImages, 1000);

  // Also initialize any new images that appear later
  const observer = new MutationObserver(mutations => {
    for (const m of mutations) {
      m.addedNodes.forEach(node => {
        if (node.tagName === "IMG") {
          initImage(node);
        } else if (node.querySelectorAll) {
          node.querySelectorAll("img").forEach(initImage);
        }
      });
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();

