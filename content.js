// ===== YouTube Embed Button (Stable Injection) =====

const EMBED_SITE = "https://www.youtube.com/embed/";

function getVideoId(url) {
  try {
    const u = new URL(url, location.origin);
    return u.searchParams.get("v");
  } catch {
    return null;
  }
}

function createEmbedButton(videoId) {
  const btn = document.createElement("button");
  btn.textContent = "▶ Embed";
  btn.style.marginLeft = "8px";
  btn.style.padding = "4px 8px";
  btn.style.fontSize = "12px";
  btn.style.cursor = "pointer";
  btn.style.borderRadius = "16px";
  btn.style.border = "1px solid #aaa";
  btn.style.background = "#222";
  btn.style.color = "#fff";

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    window.open(`${EMBED_SITE}${videoId}`, "_blank");
  });

  return btn;
}

function injectButtons() {
  const items = document.querySelectorAll("ytd-rich-item-renderer, ytd-video-renderer, ytd-compact-video-renderer");

  items.forEach(item => {
    if (item.dataset.embedAdded) return;

    const link = item.querySelector("a#thumbnail");
    if (!link) return;

    const videoId = getVideoId(link.href);
    if (!videoId) return;

    const menu = item.querySelector("#menu");
    if (!menu) return;

    if (menu.querySelector(".yt-embed-btn")) return;

    const btn = createEmbedButton(videoId);
    btn.classList.add("yt-embed-btn");

    menu.appendChild(btn);
    item.dataset.embedAdded = "true";
  });
}

// Observe dynamic changes
const observer = new MutationObserver(() => {
  injectButtons();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// SPA navigation support
document.addEventListener("yt-navigate-finish", () => {
  setTimeout(injectButtons, 800);
});

// Initial run
window.addEventListener("load", () => {
  setTimeout(injectButtons, 1000);
});