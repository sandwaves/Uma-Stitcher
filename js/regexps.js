// Skill name normalization for English OCR output.
// Applied in order, each repeated until the text stops changing (see normalize_text).
// Goal: turn raw Tesseract text into the exact key format used in dict_skills.js
// ("Corner Recovery ○", "Firm Conditions ◎", "Down in the Dirt ×", ...).
const regexps = [
  // Whitespace: newlines/tabs/NBSP -> single space, then trim
  {pattern: /[\s ]+/g, rep: ' '},
  {pattern: /^ | $/g, rep: ''},

  // Stray glyphs Tesseract picks up from the shield border / background
  {pattern: /[|_^~\[\]{}<>]+/g, rep: ''},

  // Quotes and dashes -> the forms used in dict keys
  {pattern: /[‘’´`]/g, rep: "'"},
  {pattern: /[“”]/g, rep: '"'},
  {pattern: /[–―]/g, rep: '—'},

  // Trailing aptitude marker. Order matters: check ◎ before ○ before ×.
  // Only matches a standalone final token so words like "Go" or "Two" are safe.
  // ◎ (double circle) often read as ©, @, (o), OO, 00, O0, 0O
  {pattern: / (?:\([oO0]\)|[©@⊚◉]|[oO0Q]{2})$/, rep: ' ◎'},
  // ○ (circle) often read as O, 0, o, Q, C, ()
  {pattern: / (?:[oO0QC]|\(\))$/, rep: ' ○'},
  // × (cross) often read as x, X, %, *, ✕
  {pattern: / [xX%*✕✗]$/, rep: ' ×'},
  // Marker glued to the last word ("Conditions○") -> add the space
  {pattern: /([A-Za-z!?.'])([○◎×])$/, rep: '$1 $2'},
  // Leftover trailing punctuation that isn't part of any key (keep ! ? . ☆)
  {pattern: /[,;:'"-]+$/, rep: ''},

  // Common Latin OCR confusions inside words
  // (digits between lowercase letters are never legitimate in a skill name)
  {pattern: /(?<=[a-z])0(?=[a-z])/g, rep: 'o'},    // "N0w" -> "Now"
  {pattern: /(?<=[a-z])1(?=[a-z])/g, rep: 'l'},    // "Ho1d" -> "Hold"

  // Re-collapse in case removals above left double spaces
  {pattern: / {2,}/g, rep: ' '},
  {pattern: /^ | $/g, rep: ''},
]
