# Dani Mahfoud Portfolio

A responsive static personal portfolio website focused on software engineering, enterprise implementation, AI-assisted development, Rashaqa AI, wedding technology, and intelligent automation.

## Preview locally

Open `index.html` in a browser, or run `python -m http.server 8000` in this folder and visit `http://localhost:8000`.

## Contact form: free setup

The form is intentionally backend-free. To use the zero-cost email flow, add the destination email to the homepage form:

```html
<form data-contact-form data-recipient="your@email.com" data-form-endpoint="">
```

The visitor's email application will open with a prepared message. This has no monthly fee, but it depends on the visitor having an email application configured.

The JavaScript also supports a hosted endpoint later through `data-form-endpoint`. Keep the endpoint empty if you want the free `mailto:` flow.

## Before publishing

1. Replace `https://example.com` in the HTML metadata, JSON-LD, `sitemap.xml`, and `robots.txt` with the real HTTPS domain.
2. Add the real recipient email to `data-recipient` if you want the free form flow to work.
3. Replace the illustrative Rashaqa project visual with a real screenshot when available.
4. Add verified career dates, certifications, measurable outcomes, and technical details only when confirmed.
5. Replace the social preview SVG with an absolute PNG or JPEG URL for broad LinkedIn and WhatsApp compatibility.
6. Test Lighthouse, structured data, mobile usability, keyboard navigation, and Search Console indexing after hosting.

## Updating experience

The homepage timeline is rendered from `experience.json`. To update your LinkedIn-derived experience later, replace the JSON contents and reload the site. Each entry supports:

```json
{
  "period": "May 2025 – Present · UAE · On-site",
  "title": "Implementation Associate",
  "company": "Octave",
  "highlights": ["Achievement or responsibility"]
}
```

Use a local HTTP server such as `python -m http.server 8000` when testing, because browsers may block `fetch()` when opening the HTML directly from the file system.

## Files

- `index.html`: homepage
- `experience.json`: editable experience data rendered on the homepage
- `projects/rashaqa-ai/index.html`: Rashaqa AI case study
- `projects/wedding-platform/index.html`: wedding invitations and SaaS project story
- `projects/intelligent-automation/index.html`: automation and AI story
- `assets/css/style.css`: responsive styling and theme tokens
- `assets/js/main.js`: theme toggle, mobile navigation, year, and contact-form behavior
- `assets/images/social-preview.svg`: social preview artwork
- `robots.txt` and `sitemap.xml`: SEO boilerplate awaiting the production domain

No external packages or build step are required.
