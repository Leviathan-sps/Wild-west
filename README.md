# Wild West

Two ways to drag your browser back to the frontier. Use one, or both.

- **`theme/`** — a real Chrome theme. It recolors the actual browser: weathered leather frame, parchment toolbar, sepia tab text. No code, just paint.
- **`skin/`** — a small extension. It gives you a wild-west new-tab page and lays a dusty sepia wash over every site you visit, with a toggle so you can wipe it off when you need a clean look.

They don't depend on each other. The theme handles the browser chrome that an extension can't touch; the skin handles the pages and the new tab.

## What the skin does

- **New tab** — a parchment page with a big clock, a branded search box, and a row of "trail" shortcuts. Type a real address and it rides straight there; type anything else and it searches.
- **Page wash** — a `pointer-events: none` overlay in a closed shadow DOM. It sepia-tints the page with `backdrop-filter`, drops in a little paper grain, and darkens the edges. Clicks pass right through and the page's own layout is never touched.
- **Popup** — flip the dust on or off, set how heavy it is, and turn the grain off if you'd rather keep it smooth.

## Loading it

Both folders load the same way:

1. Open `chrome://extensions`
2. Turn on Developer mode (top right)
3. Load unpacked, then pick `theme/` or `skin/` (do it twice to get both)

The theme applies right away. The skin adds the new tab and starts washing pages; open the toolbar popup to tune it.

## Poking around

| File | What it's doing |
|------|-----------------|
| `theme/manifest.json` | the whole theme — colors, tints, a couple properties |
| `skin/manifest.json` | MV3 wiring for the extension |
| `skin/background.js` | seeds the default dust settings on install |
| `skin/overlay/style.js` | the overlay's CSS, kept out of the logic |
| `skin/overlay/overlay.js` | builds the shadow-DOM wash and reacts to settings |
| `skin/popup/*` | the on/off + strength controls |
| `skin/newtab/*` | the frontier new-tab page |

## A note on the look

No web fonts, so it leans on slab serifs already on your machine (Rockwell, Georgia) to get that stamped, wanted-poster feel. Add real icons under each folder and point the manifests at them if you want it polished for the store.
