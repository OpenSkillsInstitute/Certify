# Open Skills Institute (OSI)

A complete GitHub Pages-ready static HTML/CSS/JavaScript website, using navy navigation and footer colors inspired by [Amazon.com](https://www.amazon.com/). OSI retains its own name, logo, and layout, with blue accents throughout the page content and the vector OSI seal on Home and About Us. No Amazon affiliation or endorsement is implied.

## Included

- Home, Trainings, About Us, FAQs, Login, and Certificate pages.
- All 11 requested training titles and one-paragraph descriptions.
- Public Information Management and Effective Communication is available through Take This Training; the other ten courses are Coming Soon.
- Login fields start blank, have no credential placeholders, and clear when the page loads or is restored through Back/Forward navigation. Browser autocomplete and password-manager ignore hints discourage automatic filling; a browser or password manager can still override these hints. Login values are not printed on any page, in error messages, or in this documentation. The existing preset credentials are retained, with only their combined SHA-256 digest included in `access-config.js`.
- A cream certificate workspace with a left details panel and right landscape preview, styled to match the supplied reference image. Its header menu, logo template, and navy footer retain the shared website design. The gold and dark certificate features diagonal ribbons, an OSI rosette, a centered director signature area, and a download button **below the certificate**. Narrow screens stack the panels.
- A 15-hour schedule: **five consecutive calendar dates, three hours daily**.
- Certification description and all five intended learning outcomes are drawn directly on the certificate and included in the PDF. They are not displayed as a separate block on the certificate page; an equivalent screen-reader summary is available. The Trainings page retains its course details.
- **Dan Johnson — Training Director** on the certificate, with an automatically loaded signature-style graphic based on the supplied visual reference. The graphic is fixed; no signature upload, replacement, or removal controls appear in the certificate form.
- All production assets are local. No backend, database, build step, remotely loaded fonts, CDN, analytics, or external PDF service is required. PDF libraries and the participant-name font are bundled locally.

## Preview locally

Open a terminal inside this extracted folder and run:

```sh
python -m http.server 8000
```

Visit `http://localhost:8000`. Stop the server with Ctrl+C. Login uses browser cryptography and should be previewed on localhost or served over HTTPS, rather than relying on `file://` behavior.

## Deploy on GitHub Pages

1. Extract the ZIP. It contains the site directly at the top level.
2. Create a GitHub repository, for example `open-skills-institute`. A public repository is the straightforward choice for GitHub Pages on GitHub Free.
3. Upload every extracted file directly to the repository root. All HTML, CSS, JavaScript, image, and documentation files live together in this one folder; there are no subfolders. `index.html` must be directly in that root, rather than inside a wrapper folder. Preserve the empty `.nojekyll` file if your file picker displays it.
4. Commit to `main`.
5. In the repository, choose **Settings > Pages**.
6. Under **Build and deployment**, set **Source** to **Deploy from a branch**, select **main** and **/(root)**, then choose **Save**.
7. Wait for the deployment to complete and use **Visit site**. A project repository normally publishes at `https://YOUR-USERNAME.github.io/open-skills-institute/`.
8. Test Trainings > Take This Training > Login > Certificate > Download Certificate PDF.

All site links are relative, so repository subpaths work without configuration changes. There is no Actions workflow or package installation requirement. If a 404 appears, check the Pages deployment status and confirm `index.html` is in the chosen source folder.

Guidance follows [GitHub's publishing-source documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site). Account and organization policies may affect Pages availability.

## Schedule and learning outcomes

Select a start date between 1 January 2000 and 27 December 2099. The site derives five consecutive calendar dates, including weekends when applicable. Allocate **three hours of independent study per day**, for **15 hours across five days**. This is **independent online learning** learning: there are no fixed meeting times or timezone-dependent session slots. The end field shows the fifth date, four calendar days after the start. UTC midnight is used internally only for stable calendar arithmetic; it is not a displayed or required study time.

For example, a start of 30 October 2026 produces sessions on 30 October, 31 October, 1 November, 2 November, and 3 November 2026. The end field reads 3 November 2026, without a fixed completion time.

The course description lists these intended outcomes:

1. Organize public information with accuracy, ethics, and accessibility.
2. Identify audience needs and develop purposeful key messages.
3. Prepare readable announcements, briefings, and information materials.
4. Select channels and adapt messages for different audiences.
5. Use listening and feedback to improve communication.

The site does not host learning materials, track study activity, or assess whether these outcomes have been achieved. No live meetings, meeting IDs, invitations, or conferencing integrations are created.

## Director's signature image

`dan-johnson-signature.png` is included in the same folder as the website files. It loads automatically in the certificate preview and PDF. The artwork reads Dan Johnson and follows the supplied signature reference's flowing black-ink style. It is generated signature-style name artwork, not an authenticated reproduction of Dan Johnson's actual handwriting or proof that he approved a document.

The signature controls have been removed from the certificate page. The fixed graphic loads automatically. Its PNG bytes are embedded in `certificate-media.js`, so the browser can include the signature in the SVG preview and PDF when opened directly from disk as well as over HTTP/HTTPS. The standalone PNG is retained in the same folder for reference.

The artwork was made with the built-in image-generation tool using this prompt:

> Use case: text-localization / signature-style design asset. The attached image is a STYLE REFERENCE ONLY: thin flowing black-ink cursive signature strokes on a transparent background. Create new decorative signature-style name artwork reading exactly "Dan Johnson" (capital D and J), appropriate for an illustrated training director signature area on a certificate. Use elegant confident connected cursive lettering, natural thin pen-pressure variation, and a tasteful long trailing flourish/underline; retain the supplied reference's handwritten character. The text must read Dan Johnson, no other names or wording. Transparent background with crisp black ink, wide horizontal composition, signature large within the canvas with modest clear padding, no shadows, no stamp, no logos, no certificate or page around it. This is designed name artwork, not a reproduction or authentication of any person's real signature.

## Static login limitations and privacy

Removing visible credential values and replacing plaintext source values with a SHA-256 digest does **not** create secure private authentication. The browser performs the comparison and stores a convenience access flag in tab session storage. Visitors can bypass the check or attempt to guess the credentials. The digest is not salted or suitable for protecting a valuable password. Never reuse a personal or production password here. Genuine private accounts require server-side authentication or a trusted identity service, which are outside this no-backend website.

Use the preset credentials already supplied to you. They are intentionally omitted from the delivered files and screenshots. To change them, replace the digest in `access-config.js` with the lowercase hexadecimal SHA-256 digest of the UTF-8 string `username + NUL character + password`. The separator is a single zero byte, not the two characters backslash and zero. This does not remove the security limitations above.

No training attendance, identity, instructional hours, completion, or accreditation is verified. The requested fine-print line has been removed from the certificate artwork. The website’s FAQs and documentation continue to explain these limitations. The document is not independently verified proof of completion or a qualification.

Participant details and dates stay in the current page memory and are included in the PDF. They are not stored in a database or sent to an application server. Only the access flag uses `sessionStorage`; logout clears it. Refresh clears the entered participant details; the fixed signature graphic remains bundled. The hosting provider may retain normal request logs.

## PDF and reference details

The Download Certificate PDF button remains below the preview and is enabled when the participant name and start date are valid and the local fonts are ready. The PDF is one A4 landscape page (841.89 × 595.28 points). Its wording, participant name, dates, reference, director caption, and seal lettering are actual selectable/searchable PDF text. Borders, ribbons, and the new OSI coin-style seal are vector paths. The signature is the only graphic image; the page is not flattened into a photograph.

The live preview uses SVG `<text>` elements, so certificate wording is also real selectable text on the page. The SVG and PDF share one layout model. Names use a bundled Noto Serif SC regular font; supported Latin, Greek, Cyrillic, Vietnamese, Japanese kana and common Chinese characters are preserved as Unicode. Unsupported characters produce a clear validation message rather than a missing-glyph certificate. Not every script or emoji is covered, and the PDF is not a tagged accessible PDF. A screen-reader summary accompanies the preview.

All scripts, font data, licenses, and the signature asset are in the same folder. The browser generates the PDF locally with bundled pdf-lib and fontkit. There are no remote font or PDF API requests. The name font is bundled as a data script to support opening the site directly from disk. The font is larger than the other assets; the download button waits while it initializes. Latin-script names use a smaller embedded font in the PDF. Names using the wider CJK character set embed a larger font and therefore produce larger PDFs. Fonts are embedded intact to preserve their glyphs.

The name-based reference uses Unicode NFC normalization, collapsed whitespace, uppercase text, and FNV-1a over UTF-8 bytes. It has the form `OSI-` plus eight hexadecimal characters. The same normalized name yields the same reference; collisions are possible. It is not a unique person ID, cryptographic token, verification record, or meeting ID.

## Files and customization

| File | Purpose |
| --- | --- |
| `index.html` | Home and featured course |
| `trainings.html` | 11-course catalog, certification description, outcomes |
| `about.html` | About Us |
| `faqs.html` | Access, schedule, certificate, signature, and privacy questions |
| `login.html` | Login form without printed credentials |
| `certificate.html` | Details, fixed director signature, reference-style preview, and download; description and outcomes are inside the artwork |
| `styles.css` | Responsive Amazon-inspired palette and layout for the main site |
| `certificate-page.css` | Scoped cream, serif, sidebar-and-preview certificate workspace; shared navy header and footer retained |
| `site.js` | Mobile navigation and catalog search |
| `access-config.js` | Credential digest; contains no plaintext login values |
| `login.js` | Blank-on-load/reset behavior, digest comparison, generic errors, and session flag |
| `certificate-core.js` | Name reference, five-day self-paced study plan, PDF writer |
| `certificate-vector.js` | Shared SVG/PDF text-and-vector layout, fixed signature, live updates and PDF download |
| `certificate-media.js` | Embedded signature image data |
| `certificate-font.js` | Bundled Unicode participant-name font |
| `pdf-lib.min.js` | Local PDF generation library |
| `fontkit.umd.min.js` | Local font embedding support |
| `FONT-LICENSE.txt` | Noto font license |
| `THIRD-PARTY-LICENSES.txt` | Bundled library licenses |
| `favicon.svg` | OSI icon |
| `dan-johnson-signature.png` | Bundled signature-style name graphic, loaded automatically |
| `.nojekyll` | Plain static site marker |
| `TESTING.md` | Verification record |
| `LICENSE` | MIT license for the supplied code and design |

Edit page copy directly in the HTML files. Header/footer markup appears in each page; update all seven copies together. The requested Certificate information footer block has been removed from all pages. Colors are defined in `styles.css`. Certificate artwork and the director name are in `makeLayout` within `certificate-vector.js`. Keep schedule text, calculation logic, and PDF artwork consistent when changing hours or dates. The removed footer statement is not drawn on the certificate; keep the website documentation and FAQs accurate.

Designed for current desktop/mobile browsers with JavaScript, Canvas 2D, Web Crypto, `TextEncoder`, `Blob`, session storage, and Unicode property escapes. Static catalog text and FAQ disclosures remain readable without JavaScript; login and PDF generation require it. International names depend on installed system fonts. Rare scripts, right-to-left layout, and complex emoji have not been separately validated on every device.

## Certification-focused pages

Home and About Us introduce certification for skills development and employment goals, with the same vector seal used in the certificate. Trainings opens directly at the searchable course list. FAQs displays all questions and answers immediately, covering free access, invitation-only beta testing, optional donations, employer discretion, expert-created programs, digital PDF certificates, and the limits of the certificate generator. No donation checkout or external payment service is configured; participants are directed to ask the organizer for contribution options.

## Training information page

The public-information-management.html page contains the expanded course overview, five intended learning outcomes, suggested five-day study plan, audience guidance, and digital certificate details. The available course links to it through Learn About This Training directly below Take This Training on the Trainings and Home pages. The former certification information block has been removed from the catalog. The new page uses the shared navigation, footer, and blue body accents, and remains directly inside the single website folder.

## Public copy and course layout

The course summary is a wide panel below the audience and digital-certificate cards. Home links to About OSI through an outlined button. Visitor-facing technical access and certificate-generator notices have been removed from the pages at the owner’s request. The implementation and its limitations remain documented here: removing page copy does not change the browser-side preset login, add server authentication, restrict access to only the owner, verify training completion, or confer accreditation. The website still has no backend or participant database.

## Address and shared navigation

The top bar uses the general OSI tagline without course hours, duration, or delivery details. Those remain on the relevant course and certificate pages. The supplied address is shown in all seven page footers, the About Us page, and as selectable text below the Training Director in the certificate and exported PDF: 420 Lexington Avenue, Suite 1402, New York, NY 10170, United States. Course action pairs share equal width and height; the Home hero action pair also shares equal width and height within its responsive row.

## Sticky menu and three-column footer

The main navigation stays at the top of the viewport when scrolling; the small tagline bar scrolls normally. Desktop footers have separate institute, navigation, and address columns, with the supplied address on the right and Open Skills Institute in bold. Footer columns stack on narrow screens. The certificate prints the complete address as one selectable line below the Training Director.

## Compact scrolling menu and inline course actions

After scrolling down, the main menu reduces from 102 to 51 pixels on desktop and from 83 to 41.5 pixels on mobile. Branding and controls scale to fit, with a smooth transition and reduced-motion support. It returns to its full height near the top. Both course action buttons remain in one horizontal row on Home and Trainings; on narrow screens labels can wrap inside equally sized buttons.
