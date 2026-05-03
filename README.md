# Screenshot Stitcher

A browser-based tool that joins together scrolling screenshots from the
Uma Musume game into a single image — useful for sharing factor / skill
/ inheritance lists in one shot.

This is an English fork of [lt900ed/receipt_factor](https://github.com/lt900ed/receipt_factor),
with the UI translated and several rewrites focused on robustness, memory
behavior, performance, and PC/Steam screenshot support.

Everything runs client-side. No uploads, no server, no analytics beyond
the upstream Google Tag.

## Using it

1. Open `index.html` in a modern browser (or serve the folder over HTTP).
2. Drop in your screenshots, paste them with **Ctrl+V**, or pick them with
   the file input.
3. Drag preview thumbnails to reorder them; click one to preview it
   full-size; click the **×** to remove it.
4. Click **Generate**. After a few seconds an image appears below.
5. Save as JPG/PNG, or copy to the clipboard.

Optional **Add skill icons (β)** annotates the result with skill icons
detected via OCR (Tesseract.js, Japanese model). This only matches
against the Japanese game UI, so it is most useful for JP-mobile
screenshots.

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
│   ├── dict_skills.js     # JP skill name → icon ID dictionary (used by skill-icon mode)
│   ├── race_factors.js    # JP race name reference data
│   ├── regexps.js         # regex passes used in OCR text normalization
│   ├── shortcut.js        # global keyboard shortcut helper
│   └── opencv.js          # bundled OpenCV.js
├── img/
│   ├── tmpl_*.png         # template images (JP UI) for layout detection
│   ├── skill_icons/       # icons used by the β skill-icon overlay
│   └── ...
└── source/                # snapshot of the original repo, kept for reference
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

## What's different from upstream

Translated:
- All UI strings, error messages, and instructions translated to English.
- The skill name dictionary, race data, OCR regex, and JP UI templates
  are intentionally **not** translated — they're matching keys for
  Japanese game text, not user-facing copy.

Rewritten / fixed:
- Clean utility UI with a light/dark theme toggle.
- Reset is in-place (no full page reload, so OpenCV / Tesseract / icons
  stay cached).
- Memory-leak pass: closed several Mat lifecycle issues, fixed a
  use-after-free, removed double-frees.
- Performance pass: replaced five per-pixel `ucharAt` loops with bulk
  reads via `mat.data`, cached decoded template Mats, cached the
  Tesseract worker so its Japanese model loads once per session.
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
- Skill icons & data: [U-tools](https://ウマ娘.攻略.tools/).
- OpenCV.js, Tesseract.js — bundled.
- Original spinner: SpinKit (`sk-fading-circle`).

## License

The upstream repo has no license file, so neither does this one. Treat
it as source-available for personal use.
