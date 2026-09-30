# Screenshot Stitcher

A browser-based tool that joins together scrolling screenshots from the
Uma Musume game into a single image — useful for sharing factor / skill
/ inheritance lists in one shot.

This project is a fork of [daftuyda/Stitcher](https://github.com/daftuyda/Stitcher),
which is itself an English fork of
[lt900ed/receipt_factor](https://github.com/lt900ed/receipt_factor).
It adapts the tool to the **English version** of the game: English OCR,
an English skill dictionary with fuzzy matching, and the matching icon
set. See [Fork lineage](#fork-lineage) below.

Everything runs client-side. No uploads, no server, no analytics (the
upstream Google Tag has been removed).

## Using it

1. Open `index.html` in a modern browser (or serve the folder over HTTP).
2. Drop in your screenshots, paste them with **Ctrl+V**, or pick them with
   the file input.
3. Drag preview thumbnails to reorder them; click one to preview it
   full-size; click the **×** to remove it.
4. Click **Generate**. After a few seconds an image appears below.
5. Save as JPG/PNG, or copy to the clipboard.

Optional **Add skill icons (β)** annotates the result with skill icons
detected via OCR (Tesseract.js, English model). Skill names are matched
against the English skill dictionary with fuzzy matching, so minor OCR
mistakes still resolve to the right icon.

The **theme toggle** in the top-right switches between light and dark.
The choice is persisted in `localStorage`.

## Tips for good screenshots

- For mobile (JP version), use the same orientation across all images
  and make sure at least two rows of content overlap between consecutive
  shots.
- For PC/Steam, alt-print-screen the game window so the surrounding
  desktop UI stays consistent across screenshots. Don't crop manually —
  the algorithm needs the panel position to be the same in each frame.
- Make sure no notifications, mouse cursors, or overlays are captured.
- If two screenshots have no shared content, the tool can't align them
  by content. It now falls back to the order you loaded them in, so
  drag the previews into the order you want them stacked.

## Project layout

```
.
├── index.html             # main page
├── css/
│   ├── base.css           # rewritten clean utility UI + light/dark themes
│   ├── common.css         # small shared rules (image, .hidden)
│   └── reset.css          # Eric Meyer reset
├── js/
│   ├── base.js            # UI wiring, drag/drop, lightbox, theme toggle, generatePhoto
│   ├── receipt_factor.js  # the main stitching pipeline (OpenCV.js)
│   ├── dict_skills.js     # English skill name → icon ID dictionary (used by skill-icon mode)
│   ├── race_factors.js    # JP race name reference data
│   ├── regexps.js         # regex passes used in OCR text normalization
│   ├── shortcut.js        # global keyboard shortcut helper
│   └── opencv.js          # bundled OpenCV.js
└── img/
    ├── tmpl_*.png         # template images (JP UI) for layout detection
    ├── skill_icons/       # icons used by the β skill-icon overlay
    └── ...
```

## Running locally

The page works straight from disk for most browsers, but a few things
(OpenCV wasm, clipboard paste, the Tesseract worker) prefer being served
over HTTP. From the project root:

```
python -m http.server 8000
```

then open <http://localhost:8000>.

## Development

There's no build step. Edit the files and reload.

`node --check js/base.js js/receipt_factor.js` is enough to catch syntax
errors.

## Fork lineage

1. [lt900ed/receipt_factor](https://github.com/lt900ed/receipt_factor) —
   the original tool, for the Japanese version of the game.
2. [daftuyda/Stitcher](https://github.com/daftuyda/Stitcher) — English
   UI, rewritten interface, memory/performance fixes, and PC/Steam
   screenshot support.
3. This repo — adapts skill recognition to the English game (below).

Nearly all of the stitching pipeline and the UI rewrite come from the two
projects above; full credit to their authors.

## What's different in this fork

Compared with `daftuyda/Stitcher`:
- OCR runs with the Tesseract **English** model instead of Japanese.
- `dict_skills.js` is keyed by English skill names.
- `regexps.js` was replaced with light English cleanup (whitespace,
  quotes, `○` / `◎` / `×` marker fixes, common OCR confusions).
- Skill names are snapped to the closest dictionary entry using
  Levenshtein distance, so small OCR errors still get the right icon. The
  aptitude marker must match exactly.
- Added the missing English skill icons; a skill whose icon element is
  missing now falls back to the "unknown" icon instead of throwing.
- Removed the upstream Google Analytics tag and updated the site metadata
  and links for this repo.

## What's different from the original (via daftuyda/Stitcher)

Translated:
- All UI strings, error messages, and instructions translated to English.
- The race data and the JP UI templates are still Japanese matching keys
  (`race_factors.js` is reference data only and is not used by the app).

Rewritten / fixed:
- Clean utility UI with a light/dark theme toggle.
- Reset is in-place (no full page reload, so OpenCV / Tesseract / icons
  stay cached).
- Memory-leak pass: closed several Mat lifecycle issues, fixed a
  use-after-free, removed double-frees.
- Performance pass: replaced five per-pixel `ucharAt` loops with bulk
  reads via `mat.data`, cached decoded template Mats, cached the
  Tesseract worker so its OCR model loads once per session.
- Stricter PC/Steam matching: tighter panel crop, less noise-sensitive
  diff masks, stricter overlap-region verification, minimum-overlap-size
  rule that rejects spurious header-only matches.
- Unmatched screenshots now respect your load order instead of being
  appended at the end.
- Drag-to-reorder preview thumbnails; click a thumbnail to see it
  full-size in a lightbox.
- Canvas paste no longer paints overlapping content twice — each image
  only paints its unique tail beyond what's already drawn.

See the **Update history** section in the page itself for the full
versioned list (Ver4.01 onwards covers this fork).

## Credits

- Original tool: [lt900ed](https://twitter.com/lt900ed) — see
  [receipt_factor](https://github.com/lt900ed/receipt_factor).
- English fork this project is based on:
  [daftuyda/Stitcher](https://github.com/daftuyda/Stitcher) — English UI,
  rewritten interface, robustness and PC/Steam work.
- Skill icons & data: [U-tools](https://ウマ娘.攻略.tools/).
- OpenCV.js, Tesseract.js — bundled.
- Original spinner: SpinKit (`sk-fading-circle`).

## License

The upstream repo has no license file, so neither does this one. Treat
it as source-available for personal use.
