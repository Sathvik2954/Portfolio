# Personal Portfolio

🌐 **Live:** [sathvik2954.netlify.app](https://sathvik2954.netlify.app/)

A personal portfolio showcasing my projects, writing, skills, and experience in AI/ML and full-stack development — built from scratch with vanilla HTML, CSS, and JavaScript, no frameworks.

---

## Tech Stack

| Layer     | Technology                                                           |
| --------- | -------------------------------------------------------------------- |
| Markup    | HTML5                                                                |
| Styling   | CSS3 (custom properties, glassmorphism, animations, responsive grid) |
| Scripting | Vanilla JavaScript (ES6+)                                            |
| Fonts     | Inter + Space Grotesk (Google Fonts)                                 |
| Icons     | Font Awesome 6                                                       |
| Hosting   | Netlify                                                              |

---

## Sections

- **Hero** — asymmetric two-column layout with typewriter role animation and quick-info panel
- **About** — bio with interests and currently-building sidebar
- **Education** — horizontal card timeline
- **Skills** — filterable tag grid (Languages, Frameworks, ML/AI, Tools)
- **Projects** — filterable flip-card grid (Full Stack, AIML, Data Science, SDE)
- **Writing** — Medium article cards
- **Certifications** — horizontal badge row
- **Leadership** — activity cards

---

## Features

- Glassmorphism cards with `backdrop-filter: blur` across all sections
- Flip cards on hover for project details
- Typewriter animation cycling through roles
- Filter tabs for both Skills and Projects
- Click-to-copy email
- Smooth scroll + active nav link tracking
- Scroll-shrink navbar
- Custom cursor dot
- Scroll-triggered `slide-up` entrance animations
- Fully responsive down to mobile (flip cards disabled on touch)

---

## Local Setup

No build tools or dependencies required.

```bash
git clone https://github.com/Sathvik2954/portfolio.git
cd portfolio
```

Open `index.html` directly in a browser, or serve locally:

```bash
python -m http.server 3000
# Open http://localhost:3000
```
