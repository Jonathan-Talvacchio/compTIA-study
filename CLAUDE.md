# A+ Quest — notes for Claude

Static study site for CompTIA A+ 220-1201/220-1202. Plain HTML/CSS/JS, no build step; see README.md for the layout.

## Publishing workflow (owner's standing instruction)

`main` is what GitHub Pages serves, so merging to `main` puts changes live.

1. Do the work on a branch, test it, and commit/push to that branch.
2. **Before opening or merging a pull request, give the owner a short summary of what changed and wait for their explicit OK.**
3. Once they approve, open the pull request into `main` and merge it yourself.

Never merge to `main` (or push to it directly) without that OK.

## Before asking for approval

- Syntax-check every JS file: `for f in data/*.js js/*.js js/*/*.js; do node --check "$f"; done`
- Open the site in a browser (Playwright/Chromium) and confirm every page loads without JS errors.
- If you changed the terminal, play through the affected missions.
- Content must follow the current V15 objectives. CompTIA's official objectives PDFs are the authority.
