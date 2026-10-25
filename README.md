# Adinfix website

A multi-page marketing site for Adinfix Advertising Pvt Ltd, built with static HTML, CSS and JavaScript. It uses the brand's existing logo, team photographs, client logos and Lottie animations from the previous website.

## Run locally

From this folder:

```bash
node serve.js . 4173
```

Then open [http://localhost:4173](http://localhost:4173).

Any static file server works. The pages are plain HTML and can also be opened directly, though a local server is recommended for the Lottie animations and relative asset paths.

## Build

The shared header, footer, meta tags and schema are assembled by `build.js`. Page content lives in `src/pages/`.

```bash
node build.js
```

This writes the final `.html` files into the project root. Edit the files in `src/pages/` and re-run the build rather than editing the generated root files.

## Pages

- `index.html` — home
- `about.html` — story, why clients choose us, team
- `services.html` — nine services, how we work, FAQ
- `work.html` — client quotes and logo wall
- `contact.html` — enquiry form, direct contact details, FAQ
- `privacy.html`, `terms.html`
- `404.html` — not-found page (noindex)

## Assets

- `assets/img/` — logo, team photos and client logos downloaded from the existing Adinfix website
- `assets/lottie/` — service icons and illustrations from the existing Adinfix website
- `assets/fonts/` — Fraunces and Manrope, self-hosted
- `assets/css/style.css` — design system and responsive layout
- `assets/js/main.js` — loader, navigation, reveals, counters, Lottie, testimonial slider, form handling

## Forms

The contact and newsletter forms open the visitor's email application with a pre-filled message to `mail@adinfix.com`. No form data is stored on the site. If a backend or CRM integration is added later, replace the `mailto:` handlers in `assets/js/main.js`.

## Notes

- Client quotes are reproduced from the existing Adinfix website. Confirm they are approved for use before publication.
- The privacy and terms pages are general templates and should be reviewed by legal counsel.
- The OG image is generated from `og.html`; the favicon is `assets/img/favicon.svg`.
