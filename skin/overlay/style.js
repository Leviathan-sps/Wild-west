// overlay styling kept here so the logic file stays short
(() => {
  const ns = (window.__ww = window.__ww || {});

  // paper grain, inline so a strict page csp can't block it
  const grain =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

  ns.css = `
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
})();
