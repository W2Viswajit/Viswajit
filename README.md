# Viswajit R — W2 Portfolio

A responsive personal portfolio showcasing my projects, technical skills, education, certifications and leadership experience at **AUGMENTIX**.

Built around a refined, playful visual identity, the website combines an **Ink & Tangerine** palette with a custom **W2** logo and interactive motion.

**Production domain:** [viswajit-w2.vercel.app](https://viswajit-w2.vercel.app/)  
**Repository:** [W2Viswajit/Viswajit](https://github.com/W2Viswajit/Viswajit)

> The production domain serves the latest successful Vercel deployment. Uploading this source and successfully deploying it updates the live website.

## Features

- Responsive layouts for desktop, tablet and mobile.
- About, Projects, Skills, Experience, Education, Certifications and Contact sections.
- Project filtering and accessible project detail dialogs.
- Animated W2 preloader and interactive SVG logo.
- Layered hero parallax, word-by-word heading reveals and scroll-linked project artwork scaling.
- Subtle card tilt, magnetic buttons and animated link feedback.
- Custom cursor for supported mouse devices.
- Native scrolling; scroll snapping has been removed.
- Reduced-motion support and a manual motion toggle.
- Certificate links and resume viewing/download.
- Clickable email, phone, LinkedIn and GitHub links.

## Technology

| Area | Tools |
| --- | --- |
| Structure | HTML5 |
| Styling | CSS3, Grid, Flexbox and media queries |
| Interactivity | Vanilla JavaScript |
| Motion | Motion, Web Animations API and CSS animations |
| Icons | Lucide |
| Typography | Manrope and DM Serif Display |
| Hosting | Vercel |

The site is frontend-only. No backend, database, API key or build step is required. Fonts and JavaScript dependencies are included locally.

## Projects

| Project | Focus |
| --- | --- |
| Causal Reinforcement Learning | Causal inference and reinforcement learning for algorithmic trading; research in progress |
| Document Forgery Detection | Comparison of deep learning architectures for document classification |
| RhythmX | Music discovery using audio features and listening patterns |
| HackSurge X | Animated hackathon event website |
| Bank ATM Simulation | C++ banking simulation using OOP and data structures |
| AI Mentor | Gemini API-powered academic guidance prototype |
| UniteBLR | Campus clubs and community platform — work in progress |
| FontForge | Handwriting generation — work in progress |

Repository and live-demo links are displayed where verified URLs were available. Project illustrations are presentation artwork, not live executions of the underlying models.

## File Structure

```text
.
├── dist/
│   ├── index.html          # Page structure and visible content
│   ├── style.css           # Layout, responsive styles and animations
│   ├── script.js           # Interactions and embedded project details
│   ├── projects.json       # Project data reference
│   └── assets/             # W2 logo, fonts, libraries, resume and certificates
├── vercel.json             # Static deployment configuration
├── PORTFOLIO-PROMPT.md      # Original design and implementation brief
└── README.md
```

## Run Locally

Clone the repository:

```bash
git clone https://github.com/W2Viswajit/Viswajit.git
cd Viswajit
```

Serve the static website using Python 3:

```bash
python3 -m http.server 8080 --directory dist
```

On Windows, you can also use:

```powershell
py -m http.server 8080 --directory dist
```

Open [http://localhost:8080](http://localhost:8080).

## Deploy to Vercel

The repository is connected to the existing Vercel portfolio project. Updates to its production branch, `main`, trigger deployment through that integration.

### Uploading the ZIP contents

1. Extract the portfolio ZIP.
2. Upload its contents to the repository root. The `dist` folder and `vercel.json` must be directly at the root, not inside another portfolio folder.
3. Commit the changes to `main`.
4. Check the deployment status in Vercel before checking the production domain.

Use these project settings:

| Setting | Value |
| --- | --- |
| Framework Preset | Other |
| Root Directory | Repository root |
| Build Command | None / no override |
| Install Command | None / no override |
| Output Directory | `dist` |
| Production Branch | `main` |

The included configuration declares the static output directory:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": null,
  "outputDirectory": "dist"
}
```

Upload the extracted files, not the ZIP itself. Do not upload `.git`, private credentials or local environment files.

## Customization

### Personal content

Edit `dist/index.html` to update the About, Skills, Experience, Education, Certifications and Contact sections.

### Projects

Project content currently exists in three places:

- `dist/index.html`: visible project cards and links.
- `dist/script.js`: the embedded `projects` array used by detail dialogs.
- `dist/projects.json`: the project data reference.

Keep all three in sync when editing projects. Each card's `data-project` value must match its index in the JavaScript array. Editing only `projects.json` will not update the live page.

### Resume and certificates

Replace `dist/assets/resume.pdf` to update the resume while retaining existing links. Update certificate URLs in `dist/index.html` as needed. Certificates open through links rather than embedded previews.

### Colours

Update the CSS variables in `dist/style.css`:

```css
:root {
  --paper: #f5f1e9;
  --ink: #20211f;
  --accent: #c94b24;
}
```

### Logo and motion

The W2 favicon is stored in `dist/assets/w2.svg`. The header, hero, preloader and footer also contain inline SVG copies in `dist/index.html`; update these together when changing the logo.

Animation settings live in `dist/style.css` and `dist/script.js`. Keep reduced-motion and touch-device behaviour intact when adding effects.

## Accessibility and Performance

- Semantic navigation and keyboard-accessible controls.
- Skip-to-content link and visible focus indicators.
- Native project dialogs with close controls and focus restoration.
- Reduced-motion preferences and a manual motion toggle.
- Lighter effects on mobile; custom cursor and pointer tilt are limited to supported mouse devices.
- No required third-party API calls to render the portfolio.
- Preloader has a bounded duration and a no-JavaScript fallback.

## Verification

JavaScript syntax, local asset references, navigation targets and project-detail mappings were checked during preparation. Full visual and interactive browser testing remains outstanding.

Before sharing a new deployment, check:

- Desktop and mobile layouts for clipping or overlapping text.
- Project filters, detail dialogs and mobile navigation.
- Resume download and certificate links.
- Preloader dismissal and motion controls.
- Keyboard navigation and reduced-motion behaviour.
- Production deployment status and browser console errors.

## Contact

- **Email:** [viswajitw2@gmail.com](mailto:viswajitw2@gmail.com)
- **LinkedIn:** [Viswajit Ramesh Kumar](https://linkedin.com/in/viswajit-ramesh-kumar)
- **GitHub:** [W2Viswajit](https://github.com/W2Viswajit)

## Credits

- [Motion](https://motion.dev/) — animation library.
- [Lucide](https://lucide.dev/) — icon library.
- Manrope and DM Serif Display — typography.
- W2 logo — Viswajit's personal brand mark.

Third-party assets remain subject to their respective licenses. No open-source license has been specified for this portfolio.
