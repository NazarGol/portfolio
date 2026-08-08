#!/usr/bin/env python3
"""Render briefs/*.md into styled standalone HTML pages.

Run after editing any brief:  python3 build-briefs.py
No build step is required to *serve* the site — this just keeps the
markdown source and the published page in sync.
"""
import pathlib
import re

import markdown

HERE = pathlib.Path(__file__).parent
BRIEFS = HERE / "briefs"

STYLE = """
:root{
  --bg:#0C0C0E; --panel:#131316; --ink:#EDEDEA; --ink-2:#9A9A96; --ink-3:#7C7C77;
  --rule:#232326; --rule-2:#1A1A1D; --stamp:#FF4F35; --stamp-bg:#1F0F0C; --link:#EDEDEA;
  --mono:ui-monospace,"SF Mono",SFMono-Regular,Menlo,Consolas,"Liberation Mono",monospace;
  --sans:-apple-system,BlinkMacSystemFont,"Segoe UI",Inter,Roboto,"Helvetica Neue",Arial,sans-serif;
}
@media (prefers-color-scheme:light){:root:not([data-theme="dark"]){
  --bg:#F2F1EE; --panel:#FAFAF8; --ink:#141416; --ink-2:#55554F; --ink-3:#6E6E68;
  --rule:#DBDAD5; --rule-2:#E9E8E4; --stamp:#C3341B; --stamp-bg:#F8E7E2; --link:#141416;
}}
:root[data-theme="light"]{
  --bg:#F2F1EE; --panel:#FAFAF8; --ink:#141416; --ink-2:#55554F; --ink-3:#6E6E68;
  --rule:#DBDAD5; --rule-2:#E9E8E4; --stamp:#C3341B; --stamp-bg:#F8E7E2; --link:#141416;
}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0; background:var(--bg); color:var(--ink); font-family:var(--sans);
  font-size:16.5px; line-height:1.66; font-variant-numeric:tabular-nums}
.wrap{max-width:48rem; margin:0 auto; padding:0 1.5rem 4rem}
a{color:var(--link); text-decoration:none; border-bottom:1px solid color-mix(in srgb,var(--link) 35%,transparent)}
a:hover{border-bottom-color:var(--link)}
a:focus-visible{outline:2px solid var(--stamp); outline-offset:3px; border-radius:2px}
.back{display:inline-block; margin:2rem 0 1.5rem; font-family:var(--mono); font-size:.78rem;
  letter-spacing:.06em; color:var(--ink-3); border:0}
.back:hover{color:var(--link)}
h1{font-size:clamp(1.7rem,4.6vw,2.4rem); line-height:1.2; letter-spacing:-0.012em;
  margin:0 0 .8rem; font-weight:640}
h2{font-size:clamp(1.16rem,3vw,1.42rem); line-height:1.28; letter-spacing:-0.008em;
  margin:2.6rem 0 .85rem; padding-top:.85rem; border-top:1px solid var(--rule); font-weight:640}
h3{font-size:1.04rem; margin:1.9rem 0 .5rem; font-weight:640}
p{margin:0 0 1rem}
ul,ol{margin:0 0 1rem; padding-left:1.2rem}
li{margin:.34rem 0}
strong{font-weight:640}
hr{border:0; border-top:2px solid var(--ink); margin:2.4rem 0}
code{font-family:var(--mono); font-size:.885em; background:var(--panel);
  border:1px solid var(--rule-2); border-radius:2px; padding:.06em .32em}
blockquote{margin:1.3rem 0; padding:.85rem 1.05rem; background:var(--panel);
  border-left:3px solid var(--stamp); border-radius:0 3px 3px 0; color:var(--ink-2)}
blockquote p:last-child{margin-bottom:0}
.tw{overflow-x:auto; margin:0 0 1.2rem; border:1px solid var(--rule);
  border-radius:3px; background:var(--panel)}
table{border-collapse:collapse; width:100%; min-width:24rem; font-size:.885rem}
th,td{padding:.5rem .72rem; text-align:left; border-bottom:1px solid var(--rule-2);
  vertical-align:top}
thead th{font-family:var(--mono); font-size:.66rem; letter-spacing:.1em; text-transform:uppercase;
  color:var(--ink-3); font-weight:500; border-bottom:1px solid var(--rule); white-space:nowrap}
tbody tr:last-child td{border-bottom:0}
td:has(strong:only-child){white-space:nowrap}
.byline{font-family:var(--mono); font-size:.78rem; color:var(--ink-3);
  border-bottom:2px solid var(--ink); padding-bottom:1.4rem; margin-bottom:2rem}
@media (prefers-reduced-motion:reduce){*{animation:none!important; transition:none!important}}
"""

TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title} — Nazar Golianych</title>
<meta name="description" content="{desc}">
<style>{style}</style>
</head>
<body>
<div class="wrap">
<a class="back" href="{back}">&#8592; {backlabel}</a>
{body}
</div>
</body>
</html>
"""

BACK = {
    "russian-military-ai": ("../portfolio/#russian-military-ai", "Portfolio"),
    "zhbk-185": ("../portfolio/#zhbk-185", "Portfolio"),
}

DESCS = {
    "russian-military-ai": "97 Russian military-AI entities checked against four sanctions "
                           "regimes. Ukraine 47, US 31, EU 21, UK 0.",
    "zhbk-185": "Tracing two captured Ukrainian plants in occupied Zaporizhzhia oblast into "
                "their successor Russian corporate network. Sample analytical report.",
}


def render(md_path: pathlib.Path) -> None:
    raw = md_path.read_text(encoding="utf-8")
    html = markdown.markdown(raw, extensions=["tables", "attr_list", "sane_lists"])

    # wrap tables so wide content scrolls inside its own box, never the page
    html = re.sub(r"<table>", '<div class="tw"><table>', html)
    html = re.sub(r"</table>", "</table></div>", html)

    # first h1 + the byline paragraph that follows it
    html = html.replace(
        "<p><strong>Nazar Golianych</strong> · OSINT analyst</p>",
        '<p class="byline"><strong>Nazar Golianych</strong> · OSINT analyst</p>',
        1,
    )

    title = re.search(r"<h1>(.*?)</h1>", html, re.S)
    title = re.sub(r"<[^>]+>", "", title.group(1)) if title else md_path.stem

    out = md_path.with_suffix(".html")
    out.write_text(
        TEMPLATE.format(
            title=title,
            desc=DESCS.get(md_path.stem, title),
            style=STYLE,
            body=html,
            back=BACK.get(md_path.stem, ("../", "Nazar Golianych"))[0],
            backlabel=BACK.get(md_path.stem, ("../", "Nazar Golianych"))[1],
        ),
        encoding="utf-8",
    )
    print(f"{md_path.name} -> {out.name}  ({len(html):,} bytes of body)")


if __name__ == "__main__":
    for md in sorted(BRIEFS.glob("*.md")):
        render(md)
