#!/usr/bin/env python3
"""Render briefs/*.md into standalone HTML pages.

Run after editing any brief:  python3 build-briefs.py

These pages link ../assets/style.css like every other page — there is one
palette in this project and it lives there. Brief-only rules are scoped
under `body.brief` in that same file. Do not reintroduce a <style> block
here: a forked stylesheet is why palette changes used to land on some
pages and not others.
"""
import pathlib
import re

import markdown

HERE = pathlib.Path(__file__).parent
BRIEFS = HERE / "briefs"

TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title} — Nazar Golianych</title>
<meta name="description" content="{desc}">
<link rel="stylesheet" href="../assets/style.css">
</head>
<body class="brief">
<div class="wrap">
<a class="back-link" href="{back}">&#8592; {backlabel}</a>
{body}
<p class="back-foot"><a class="back-link" href="{back}">&#8592; {backlabel}</a></p>
</div>
</body>
</html>
"""

# where each brief returns to, and what to call it
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

    # wide content scrolls inside its own box, never the page
    html = html.replace("<table>", '<div class="tw"><table>').replace("</table>", "</table></div>")

    html = html.replace(
        "<p><strong>Nazar Golianych</strong> · OSINT analyst</p>",
        '<p class="byline"><strong>Nazar Golianych</strong> · OSINT analyst</p>',
        1,
    )

    m = re.search(r"<h1>(.*?)</h1>", html, re.S)
    title = re.sub(r"<[^>]+>", "", m.group(1)) if m else md_path.stem

    back, backlabel = BACK.get(md_path.stem, ("../portfolio/", "Portfolio"))
    out = md_path.with_suffix(".html")
    out.write_text(
        TEMPLATE.format(
            title=title,
            desc=DESCS.get(md_path.stem, title),
            body=html,
            back=back,
            backlabel=backlabel,
        ),
        encoding="utf-8",
    )
    print(f"{md_path.name} -> {out.name}  ({len(html):,} bytes of body)")


if __name__ == "__main__":
    for md in sorted(BRIEFS.glob("*.md")):
        render(md)
