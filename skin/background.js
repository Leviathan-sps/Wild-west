// seed defaults so the first page already looks aged
const defaults = { enabled: true, intensity: 1.0, grain: true };

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get("ww", (o) => {
    if (!o.ww) chrome.storage.local.set({ ww: defaults });
  });
});
