# The Pink Edit — Landing Page

Static landing page for **The Pink Edit** — block-printed, 100% cotton textiles from Jaipur, Rajasthan, for Canadian homes.

Plain HTML, CSS and vanilla JS. No build step.

## Structure

```
the-pink-edit/
├── index.html                  # Page markup
├── favicon.ico                 # Lotus favicon (16/32/48)
├── assets/
│   ├── css/styles.css          # All styles (tokens at the top)
│   ├── js/main.js              # Page switching (Home / Collection)
│   └── images/
│       ├── brand/              # Lotus mark, favicons, booti hero strip
│       └── products/           # Product photos (.webp + .jpg fallback)
├── .github/workflows/pages.yml # Auto-deploy to GitHub Pages
├── .nojekyll
└── README.md
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Deploy on GitHub Pages

1. Create a repo and push this folder's contents to the `main` branch.
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Every push to `main` redeploys via `.github/workflows/pages.yml`.

**Custom domain:** add a `CNAME` file at the root containing `www.thepinkedit.ca`, then point your DNS to GitHub Pages.

## Notes

- The page has two views (Home / Collection) switched by `showPage()` in `assets/js/main.js`.
- The hero section references `The_Pink_Edit_Hero_Background.svg` as a background. That file wasn't in the original upload — add it to the repo root, or remove the `background: url(...)` from the `.hero` section in `index.html`.
- **Add a product photo:** drop `name.webp` + `name.jpg` into `assets/images/products/` and replace that card's emoji `<div class="product-image">` with a `has-photo` block copied from another card.
  Bath Robes still uses an emoji placeholder.
