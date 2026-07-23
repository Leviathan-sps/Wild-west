// reads and writes the dust settings; the overlay reacts through storage
const $ = (id) => document.getElementById(id);
const defaults = { enabled: true, intensity: 1.0, grain: true };

function load() {
  chrome.storage.local.get("ww", (o) => {
    const s = { ...defaults, ...(o.ww || {}) };
    $("enabled").checked = s.enabled;
    $("intensity").value = s.intensity;
    $("intensityVal").textContent = Math.round(s.intensity * 100) + "%";
    $("grain").checked = s.grain;
  });
}

function save() {
  const s = {
    enabled: $("enabled").checked,
    intensity: Number($("intensity").value),
    grain: $("grain").checked,
  };
  chrome.storage.local.set({ ww: s });
}

$("enabled").addEventListener("change", save);
$("grain").addEventListener("change", save);
$("intensity").addEventListener("input", () => {
  $("intensityVal").textContent = Math.round(Number($("intensity").value) * 100) + "%";
});
$("intensity").addEventListener("change", save);

load();
