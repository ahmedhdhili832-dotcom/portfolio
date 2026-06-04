document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  try {
    var year = document.querySelector("#year");
    if (year) {
      year.textContent = new Date().getFullYear();
    } else {
      console.warn("Missing #year element in footer.");
    }
  } catch (err) {
    console.error("Failed to set footer year:", err);
  }

  // Graceful image error handling: hide broken images instead of
  // showing the browser's default broken-image icon.
  var images = document.querySelectorAll("img");
  images.forEach(function (img) {
    img.addEventListener("error", function handleImageError() {
      console.warn("Image failed to load: " + img.src);
      img.style.display = "none";
      img.removeEventListener("error", handleImageError);
    });

    // Re-check images that may have already failed before this
    // listener was attached (cached or very fast 404s).
    if (img.complete && img.naturalWidth === 0 && img.src) {
      console.warn("Image failed to load: " + img.src);
      img.style.display = "none";
    }
  });

  // Catch resource-loading failures (stylesheets, scripts) that
  // would otherwise be silently swallowed by the browser.
  window.addEventListener(
    "error",
    function (event) {
      if (event.target && event.target !== window) {
        var tag = event.target.tagName || "unknown";
        var src = event.target.src || event.target.href || "unknown";
        console.error("Resource failed to load [" + tag + "]: " + src);
      }
    },
    true
  );
});
