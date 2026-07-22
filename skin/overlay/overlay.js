// lays a weathered wild-west wash over the page, in a closed shadow dom
if (window.top === window.self) {
  (() => {
    const defaults = { enabled: true, intensity: 1.0, grain: true };

    let host = null;
    let root = null;

    // paper grain, inline so a strict page csp can't block it
    const grain =
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

    const css = `
      :host { all: initial; }
      #root {
        position: fixed; inset: 0; z-index: 2147483647; pointer-events: none;
        opacity: 1; transition: opacity .5s ease;
      }
      #root.off { opacity: 0; }
      #root > div { position: absolute; inset: 0; }
      .aged {
        -webkit-backdrop-filter: var(--wwf, none); backdrop-filter: var(--wwf, none);
        transition: -webkit-backdrop-filter .8s ease, backdrop-filter .8s ease;
      }
      .tint {
        background: #6b4a1f; mix-blend-mode: multiply;
        opacity: var(--wwt, 0); transition: opacity .8s ease;
      }
      .grain {
        background-image: ${grain}; background-size: 140px 140px;
        mix-blend-mode: overlay; opacity: var(--wwg, 0);
      }
      .vig {
        background: radial-gradient(120% 120% at 50% 38%, transparent 55%, rgba(38,24,8,.55) 100%);
        opacity: var(--wwv, 0); transition: opacity .8s ease;
      }
    `;

    function build() {
      host = document.createElement("div");
      host.style.cssText = "position:fixed;inset:0;z-index:2147483647;pointer-events:none;";
      host.setAttribute("aria-hidden", "true");
      const shadow = host.attachShadow({ mode: "closed" });
      const style = document.createElement("style");
      style.textContent = css;
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
