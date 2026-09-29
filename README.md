# Mrunaleeni Bhilare — Personal Portfolio

A single-page personal portfolio built with plain HTML, CSS, and vanilla JavaScript.  
No frameworks, no build tools, no npm. Just open `index.html` in a browser.

---

## File Structure

```
portfolio/
├── index.html          ← All page content (sections, text, links)
├── css/
│   └── style.css       ← All styling, design tokens, dark mode, responsive
├── js/
│   └── script.js       ← Theme toggle, nav, animations, contact form
├── assets/
│   ├── profile.jpg     ← (add your photo here — see below)
│   └── resume.pdf      ← (add your résumé here — see below)
└── README.md
```

---

## How to Preview Locally

1. Open your file manager and navigate to the project folder.
2. Double-click **`index.html`** — it opens in your default browser.

No server required. Everything is self-contained.

---

## Adding Your Photo

1. Place your photo in `assets/` and name it **`profile.jpg`**  
   (any square crop works; 400 × 400 px or larger is ideal).

2. In `index.html`, find the block that says:

   ```html
   <!-- Optional profile photo – add assets/profile.jpg to enable -->
   <!--
   <div class="hero-photo-wrapper">
     <img src="assets/profile.jpg" alt="Mrunaleeni Bhilare" ...>
   </div>
   -->
   ```

3. Remove the `<!--` and `-->` comment tags to uncomment those lines.  
   Save the file and refresh the browser.

---

## Adding Your Résumé PDF

1. Place your résumé in `assets/` and name it **`resume.pdf`**.
2. The **"Download Résumé"** button in the hero already points to  
   `assets/resume.pdf` — no code changes needed.

---

## Updating GitHub Project Links

Both project cards currently use `href="#"` as a placeholder.  
To add real links:

1. Open `index.html`.
2. Search for `aria-label="View JurisAI on GitHub"` and update the `href`:
   ```html
   <a href="https://github.com/Mrunaleeni/jurisai" ...>
   ```
3. Search for `aria-label="View Market Pulse on GitHub"` and do the same:
   ```html
   <a href="https://github.com/Mrunaleeni/market-pulse" ...>
   ```

---

## Changing the Accent Colour

Open `css/style.css` and look for the `:root` block at the very top.  
Change the three accent lines:

```css
--accent:       #0ea5e9;   /* main accent              */
--accent-dark:  #0284c7;   /* hover state              */
--accent-light: #e0f2fe;   /* chip / badge backgrounds */
```

The entire site will update automatically — every component reads from these variables.

---

## Editing Content

All visible text lives in **`index.html`**. Each section is clearly commented:

| Section     | Search for                      |
|-------------|----------------------------------|
| Hero        | `<!-- HERO -->`                  |
| About       | `<!-- ABOUT -->`                 |
| Experience  | `<!-- EXPERIENCE -->`            |
| Projects    | `<!-- PROJECTS -->`              |
| Skills      | `<!-- SKILLS -->`                |
| Activities  | `<!-- ACTIVITIES -->`            |
| Contact     | `<!-- CONTACT -->`               |

To add a new experience entry, copy an existing `<li class="timeline-item">` block and update the text inside it.

To add a new project, copy an existing `<article class="project-card">` block.

---

## Dark / Light Mode

The toggle button in the navbar switches themes. The choice is saved in  
`localStorage` so it persists across visits. On first load the site respects  
the visitor's OS preference (`prefers-color-scheme`).

---

## Deploying to GitHub Pages

### Option A — Deploying from the `main` branch root (simplest)

1. Create a new repository on GitHub (e.g. `portfolio`).
2. Push all files to the **`main`** (or `master`) branch:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/Mrunaleeni/<repo-name>.git
   git push -u origin main
   ```
3. Go to **Settings → Pages** in your repository.
4. Under **Source**, choose **"Deploy from a branch"**, select **`main`**, folder **`/ (root)`**.
5. Click **Save**. Your site will be live at:
   ```
   https://Mrunaleeni.github.io/<repo-name>/
   ```
   (GitHub takes about 1–2 minutes to build on the first deploy.)

### Option B — Custom domain (optional)

1. Buy a domain (e.g. `mrunaleeni.dev`).
2. Add a file named `CNAME` at the project root containing just the domain:
   ```
   mrunaleeni.dev
   ```
3. Point your domain's DNS to GitHub Pages following [GitHub's guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

---

## Customising Fonts

Fonts are loaded from Google Fonts in the `<head>` of `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600
      &family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
```

- **Inter** is used for body text (`--font-body` in CSS).
- **Space Grotesk** is used for headings (`--font-heading` in CSS).

To switch fonts, replace the Google Fonts URL and update the two CSS variables.

---

## Contact Form

The contact form does **not** need a backend. When submitted it opens the  
visitor's default email client with the fields pre-filled via a `mailto:` link.

The recipient address is set at the top of `js/script.js`:

```js
const CONTACT_EMAIL = 'mrunaleeni111@gmail.com';
```

Change it there if your email address changes.

---

*Built with ♥ using plain HTML, CSS & JavaScript.*
