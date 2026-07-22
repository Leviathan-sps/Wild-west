// lays a weathered wild-west wash over the page, in a closed shadow dom
if (window.top === window.self) {
  (() => {
    const ns = window.__ww || {};
    const defaults = { enabled: true, intensity: 1.0, grain: true };

    let host = null;
    let root = null;

    function build() {
      host = document.createElement("div");
      host.style.cssText = "position:fixed;inset:0;z-index:2147483647;pointer-events:none;";
      host.setAttribute("aria-hidden", "true");
      const shadow = host.attachShadow({ mode: "closed" });
      const style = document.createElement("style");
      style.textContent = ns.css;
      root = document.createElement("div");
      root.id = "root";
      const layer = (cls) => {
        const d = document.createElement("div");
        d.className = cls;
        return d;
      };
      root.append(layer("aged"), layer("tint"), layer("grain"), layer("vig"));
      shadow.append(style, root);
      (document.documentElement || document.body).appendChild(host);
    }

    // paint the dust at the chosen strength, or fade it out when off
    function apply(s) {
      if (!host) build();
      const i = Math.max(0, Math.min(1.8, s.intensity ?? 1));
      const r = root.style;
      r.setProperty(
        "--wwf",
        `sepia(${(0.5 * i).toFixed(3)}) ` +
          `saturate(${(1 - 0.25 * i).toFixed(3)}) ` +
          `contrast(${(1 - 0.05 * i).toFixed(3)}) ` +
          `brightness(${(1 - 0.05 * i).toFixed(3)})`
      );
      r.setProperty("--wwt", (0.14 * i).toFixed(3));
      r.setProperty("--wwg", s.grain ? (0.1 * i).toFixed(3) : "0");
      r.setProperty("--wwv", (0.35 * i).toFixed(3));
      root.classList.toggle("off", !s.enabled);
    }

    function refresh() {
      chrome.storage.local.get("ww", (o) => apply({ ...defaults, ...(o.ww || {}) }));
    }

    // react the moment the popup changes a setting
    chrome.storage.onChanged.addListener((ch, area) => {
      if (area === "local" && ch.ww) refresh();
    });

    refresh();

    // idea for later: a "wanted" ribbon pinned to the corner
    // function ribbon(text){ const r=document.createElement('div'); r.textContent=text; ... }
  })();
}
