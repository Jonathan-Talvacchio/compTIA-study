# A+ Quest — CompTIA A+ study game

A gamified, interactive study site for the current CompTIA A+ exams:

- **Core 1 — 220-1201**: Mobile Devices, Networking, Hardware, Virtualization & Cloud, Hardware & Network Troubleshooting
- **Core 2 — 220-1202**: Operating Systems, Security, Software Troubleshooting, Operational Procedures

It's a static site: plain HTML, CSS and JavaScript, with no build step and no server. Progress is saved in your browser's localStorage.

## Run it

- **Quickest:** open `index.html` in a browser (double-click works).
- **Local server:** `python3 -m http.server 8000`, then visit http://localhost:8000.
- **Host it free on GitHub Pages:** go to the repo's Settings → Pages → Deploy from branch → `main` / root.

## What's inside

| Area | What it does |
|---|---|
| **Dashboard** | XP, levels, daily goal, streaks, daily missions, and per-domain mastery bars weighted like the real exam. |
| **Practice Quiz** | 240 original questions (120 per exam) with explanations. Modes: Practice, Survival (3 lives), Speed Run (60s), Daily Challenge (double XP), Retry Missed, Weak Spots. Combos earn bonus XP. |
| **Exam Simulator** | Timed 20/45/90-question exams, drawn in proportion to the domain weights. Includes flag-for-review, a scaled 100–900 score estimate, and a domain breakdown plus a full answer review. |
| **Flashcards** | 272 cards using spaced repetition (SM-2 style). Modes: Smart Review, Cram, and Type-It (active recall). Many cards include mnemonics. |
| **Arcade** | Port Match (timed), Put It In Order (troubleshooting steps, malware removal, laser printing, DORA, OSI…), Sort It Out (Wi-Fi bands, RAID, malware types, cloud models, tools…), Memory Match, Tech Blitz (true/false), Acronym Attack. |
| **Terminal Lab** | Simulated Windows CMD and Linux bash. Free play, plus 12 ticket-style missions: APIPA/DHCP, malware hunt with netstat/taskkill/sfc, Group Policy, DiskPart, least-privilege accounts, tracert/pathping, chmod/chown, log forensics with grep/find, apt, runaway processes, disk full, and DNS failure. |
| **Study Lab** | Pomodoro timer, a Feynman-style teach-back mode (40 prompts with key-point self-checks), a daily goal setting, and a suggested study plan. |
| **Cheat Sheets** | Searchable tables: ports, Wi-Fi, RAID, cabling, Windows tools and commands, Linux commands, file systems, cloud, security, operational procedures, and mnemonics. |
| **Progress** | Badges, personal bests, exam history, and progress export/import/reset. |

## Project layout

```
index.html            app shell + script includes
css/style.css         theme (dark/light), layout, components
data/                 content: exams.js (blueprints), core1/core2 questions, flashcards,
                      teachback prompts, game data, cheat-sheet tables
js/core.js            state, XP/levels/badges, spaced repetition, router, DOM helper
js/views/             one file per page
js/games/             arcade games
js/terminal/          shell engine + virtual FS (shell.js), windows.js, linux.js, missions.js
```

### Adding content

- **Questions:** append to `DATA.core1Questions` / `DATA.core2Questions`. Each question needs `id`, `domain` ("1"–"5"), `q`, `choices`, `answer` (an array of indices) and `explanation`. Multi-answer questions just have more than one index in `answer`.
- **Flashcards:** append to `DATA.flashcards` (`id`, `exam`, `domain`, `front`, `back`, optional `hint`).
- **Games:** add entries to `DATA.orderPuzzles`, `DATA.sortPuzzles`, `DATA.truefalse` or `DATA.acronyms` in `data/games.js`.
- **Terminal missions:** add to `App.missions` in `js/terminal/missions.js`. Each mission has a `setup(world)` function and objectives whose `check(ctx)` runs after every command.

> Content is original practice material written against the published 220-1201/220-1202 objectives. It isn't affiliated with or endorsed by CompTIA, and the scaled score is an estimate.
