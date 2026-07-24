// runs the frontier new tab: clock, greeting, search, and the trail links
const $ = (id) => document.getElementById(id);

// default trails — edit these to your own haunts
const trails = [
  { label: "Saloon", url: "https://www.youtube.com" },
  { label: "Telegraph", url: "https://mail.google.com" },
  { label: "Ledger", url: "https://github.com" },
  { label: "Bounties", url: "https://news.ycombinator.com" },
];

const wires = [
  "the coach leaves at high noon.",
  "keep your powder dry, partner.",
  "no wifi out on the range, only grit.",
  "a closed tab gathers no dust.",
  "trust everyone, but brand your cattle.",
];

function pad(n) { return String(n).padStart(2, "0"); }

function tick() {
  const d = new Date();
  $("clock").textContent = pad(d.getHours()) + ":" + pad(d.getMinutes());
  const h = d.getHours();
  const when = h < 6 ? "Late night" : h < 12 ? "Mornin'" : h < 18 ? "Afternoon" : "Evenin'";
  $("greeting").textContent = `${when}, partner`;
}

function drawtrails() {
  const nav = $("trails");
  for (const t of trails) {
    const a = document.createElement("a");
    a.href = t.url;
    let host = t.url;
    try { host = new URL(t.url).hostname.replace(/^www\./, ""); } catch {}
    const label = document.createElement("span");
    label.className = "label";
    label.textContent = t.label;
    const sub = document.createElement("span");
    sub.className = "host";
    sub.textContent = host;
    a.append(label, sub);
    nav.append(a);
  }
}

// treat a real url as a jump, anything else as a search
$("search").addEventListener("submit", (e) => {
  e.preventDefault();
  const q = $("q").value.trim();
  if (!q) return;
  const looksUrl = /^https?:\/\//.test(q) || /^[\w-]+\.[a-z]{2,}(\/|$)/i.test(q);
  location.href = looksUrl
    ? (q.startsWith("http") ? q : "https://" + q)
    : "https://www.google.com/search?q=" + encodeURIComponent(q);
});

$("telegram").textContent = "— " + wires[new Date().getDate() % wires.length];

drawtrails();
tick();
setInterval(tick, 15000);

// idea for later: let folks add their own trails and stash them in storage
// function addtrail(label, url){ trails.push({label, url}); ... }
