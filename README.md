# Screenshot Stitcher

Joins scrolling screenshots from Uma Musume into one tall image, so you can
share a full factor, skill, or inheritance list in a single picture. This
version is adapted for the **English** release of the game.

**Live site:** https://sandwaves.github.io/Uma-Stitcher/

Everything runs in your browser. Nothing is uploaded, there's no server,
and there are no analytics.

## How to use

1. Add your screenshots. You can drag them onto the page, paste them with
   **Ctrl+V**, or use the file picker.
2. Drag the thumbnails into top-to-bottom order. Click a thumbnail to see
   it full-size, or click its **×** to remove it.
3. Click **Generate**. The stitched image appears below after a few
   seconds.
4. Save it as JPG or PNG, or copy it to the clipboard.

### Options

- **Add skill icons to factors (β)** reads skill names with OCR and adds
  the matching icon next to each one. Names are fuzzy-matched against the
  skill dictionary, so small OCR mistakes still get the right icon.
- The **theme toggle** in the top-right switches between light and dark,
  and remembers your choice.

### Getting good results

- Each screenshot should overlap the previous one by at least two rows of
  content.
- Take every screenshot the same way, with the same device, orientation,
  and window size.
- On PC/Steam, capture only the game window with **Alt+Print Screen**, and
  don't crop the images. The tool needs the panel to be in the same place
  in every frame.
- Keep mouse cursors, notifications, and overlays out of the shots.
- If two screenshots share no content, the tool can't line them up by
  content. It stacks them in the order the thumbnails show, so arrange
  them before you click Generate.

## Running locally

There's no build step. Serve the project folder over HTTP:

```
python -m http.server 8000
```

Then open <http://localhost:8000>. Opening `index.html` directly works in
most browsers, but OpenCV's wasm, clipboard paste, and the Tesseract worker
are more reliable over HTTP.

After editing, this catches syntax errors:

```
node --check js/base.js js/receipt_factor.js
```

### Project layout

```
.
├── index.html             # main page
├── css/
│   ├── base.css           # UI styles and light/dark themes
│   ├── common.css         # small shared rules (image, .hidden)
│   └── reset.css          # Eric Meyer reset
├── js/
│   ├── base.js            # UI wiring, drag/drop, lightbox, theme toggle, generatePhoto
│   ├── receipt_factor.js  # the stitching pipeline (OpenCV.js)
│   ├── dict_skills.js     # English skill name → icon ID dictionary
│   ├── regexps.js         # OCR text cleanup rules
│   ├── race_factors.js    # JP race names (reference only, not used by the app)
│   ├── shortcut.js        # global keyboard shortcut helper
│   └── opencv.js          # bundled OpenCV.js
└── img/
    ├── tmpl_*.png         # JP UI templates for layout detection
    ├── skill_icons/       # icons for the skill-icon option
    └── ...
```

## What's changed

This is the third project in a chain of forks (see [Credits](#credits)).
The page's **Update history** section has the full versioned list;
Ver4.01 onwards covers this line of forks.

### In this fork (compared with daftuyda/Stitcher)

- OCR uses the Tesseract **English** model instead of Japanese.
- `dict_skills.js` is keyed by English skill names, and the missing
  English skill icons have been added.
- `regexps.js` now does light English cleanup: whitespace, quotes,
  `○` / `◎` / `×` marker fixes, and common OCR confusions.
- Skill names snap to the closest dictionary entry by Levenshtein
  distance. The aptitude marker must still match exactly.
- A skill with no icon shows the "unknown" icon instead of throwing an
  error.
- The upstream Google Analytics tag is removed, and the site metadata and
  links point to this repo.

### In daftuyda/Stitcher (compared with the original)

- All UI text, error messages, and instructions are in English. The race
  data and UI templates still use Japanese matching keys.
- A new, cleaner UI with a light/dark theme.
- Reset happens in place, without reloading the page, so OpenCV,
  Tesseract, and the icons stay cached.
- Drag-to-reorder thumbnails and a full-size lightbox preview.
- Memory fixes: several Mat lifecycle leaks closed, a use-after-free
  fixed, and double-frees removed.
- Speed fixes: bulk pixel reads via `mat.data` instead of per-pixel
  `ucharAt` loops, cached template Mats, and a cached Tesseract worker so
  the OCR model loads once per session.
- Stricter PC/Steam matching: a tighter panel crop, less noise-sensitive
  diff masks, stricter overlap checks, and a minimum overlap size that
  rejects false header-only matches.
- Screenshots that can't be matched keep your order instead of being
  moved to the end.
- Overlapping content is drawn once; each image only paints the part
  below what's already on the canvas.

## Credits

Nearly all of the stitching pipeline and UI come from these two projects:

1. [lt900ed/receipt_factor](https://github.com/lt900ed/receipt_factor) by
   [lt900ed](https://twitter.com/lt900ed): the original tool, for the
   Japanese version of the game.
2. [daftuyda/Stitcher](https://github.com/daftuyda/Stitcher): the English
   UI, rewritten interface, robustness fixes, and PC/Steam support.

Also used:

- Skill icons and data from [U-tools](https://ウマ娘.攻略.tools/).
- OpenCV.js and Tesseract.js, both bundled.
- The loading spinner from SpinKit (`sk-fading-circle`).

## License

The upstream repo has no license file, so neither does this one. Treat it
as source-available for personal use.
