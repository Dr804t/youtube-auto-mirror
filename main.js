document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const videoId = params.get("v");
  const startTime = params.get("t");

  const iframe = document.getElementById("player");
  const errorBox = document.getElementById("error");
  const watchLink = document.getElementById("watch-link");

  if (!videoId) {
    errorBox.hidden = false;
    errorBox.querySelector("p").textContent = "No video ID provided.";
    return;
  }

  const embedUrl = new URL(
    "https://www.youtube-nocookie.com/embed/" + videoId
  );

  embedUrl.searchParams.set("autoplay", "1");
  embedUrl.searchParams.set("rel", "0");
  embedUrl.searchParams.set("modestbranding", "1");

  if (startTime) {
    embedUrl.searchParams.set("start", startTime);
  }

  iframe.src = embedUrl.toString();

  // Fallback if blocked
  iframe.onerror = () => {
    iframe.style.display = "none";
    errorBox.hidden = false;
    watchLink.href = "https://www.youtube.com/watch?v=" + videoId;
  };
});