(function () {
  var y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  window.addEventListener("load", function () {
    var video = document.getElementById("intro-video");
    if (!video) return;
    var videoShell = video.closest(".top-video-fade");

    var src = video.getAttribute("data-src");
    if (!src) return;

    video.setAttribute("src", src);
    video.load();
    video.addEventListener(
      "loadedmetadata",
      function () {
        if (!videoShell || !video.videoWidth || !video.videoHeight) return;
        videoShell.style.setProperty("--video-ratio", video.videoWidth + " / " + video.videoHeight);
      },
      { once: true }
    );
    video.addEventListener(
      "loadeddata",
      function () {
        video.classList.add("is-ready");
      },
      { once: true }
    );

    var playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(function () {
        /* autoplay may be blocked by browser policies */
      });
    }
  });
})();
