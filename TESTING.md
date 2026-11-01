# Selectable-text certificate verification

Verified on 31 October 2026 in Microsoft Edge 152.0.4191.66.

The certificate uses real SVG text in the browser and actual text objects in the downloadable PDF. The removed fine-print line is absent from the artwork. The OSI seal is a vector medallion with a fine serrated gold rim, concentric borders, dotted detailing, a star and selectable OSI lettering. The fixed signature is the only image in the document.

## Checks

- Login fields remain blank on opening; the existing preset credentials work.
- The form derives the fifth calendar date and retains 15 hours over five days, Online self-paced.
- No signature controls, separate description block, or removed footer text appear on the certificate page.
- SVG wording can be selected through the browser selection API.
- Actual A4 landscape PDF downloads work over HTTP and directly from disk using file://.
- Names with Latin accents and Chinese characters export as Unicode PDF text; long names fit across two lines.
- At 390px the page does not overflow and the download succeeds with a changed participant name.
- Empty-name validation disables downloading.
- No browser JavaScript errors, missing HTTP resources or remote application requests occur.
- Independent PDF parsing confirms extractable certificate wording, participant names, director caption and seal text, and real PDF text drawing operators. The removed footer statement is absent.
- The only image object is the wide signature artwork; no full-page flattened image is present.
- The PDF is rendered and visually inspected, including complete participant-name glyphs, typography and the improved seal.
- All local links, scripts, font data and license files are checked before packaging in a flat ZIP with no subfolders.

## Font handling

Name fonts are embedded intact to avoid missing-glyph errors observed during PDF font subsetting. Latin-script names use a compact regular font. Names requiring the wider CJK font embed that larger font, so those PDFs are larger. The preview and PDF use matching glyph widths. The font license and bundled PDF/font-library notices are included.

## Limits

Mobile testing uses desktop browser viewport emulation, not a physical phone. Other browsers are not separately verified. Characters outside the bundled font’s supported set produce validation guidance. The PDF has selectable text but is not a tagged accessible PDF. The README retains the limits of the static access check and its lack of training-completion verification. No repository or live hosting account was changed.

Latest certificate update: recognition wording identifies the 15-hour professional development training program, followed by the full program description. The bold date line uses the chosen dates, for example October 5–9, 2026 · Online Self-Paced Training. The title remains large bold sans serif, the participant name sits close to its underline, and text colors remain dark. Browser login, live preview and PDF download passed. Independent PDF extraction confirms all requested wording as selectable text; the downloaded PDF was rendered and visually checked for spacing and clipping.

## Certification page refresh — 1 November 2026

Home and About Us use the vector OSI seal and certification-focused copy. Blue body accents retain the shared navy/orange navigation and footer. Trainings starts directly at the searchable list; all eleven course descriptions and the single available course remain intact. All thirteen FAQ answers are visible immediately, including free access, invitation-only beta, optional donations, employer discretion, expert-created programs, and PDF certificates.

Desktop (1440 px) and mobile emulation (390 px) checks passed for page layout, course search, menu opening/Escape closing, blank login fields, certificate preview, and successful PDF downloads. The word "in" is bold in the preview and actual PDF. The date range also passed a month-boundary check. No browser JavaScript or HTTP resource errors were recorded. The latest one-page PDF was independently checked for selectable text, bold font use, and the signature as its sole image, then rendered and visually reviewed. Local file references and all archive contents were verified before delivery.

## Dedicated course information page — 1 November 2026

Learn About This Training appears directly below Take This Training for the available course on both Trainings and Home. The link opens public-information-management.html, with the expanded overview, five learning outcomes, a suggested five-day/15-hour plan, intended audience, and certificate details. The former catalog certification block is absent. Browser checks passed at 1440, 768, and 390 px for button order, navigation to the new page and back to login, blank login inputs, course search, correct shared styling, loaded OSI seal, and no horizontal overflow or browser/HTTP resource errors. Desktop and mobile screenshots were visually reviewed. All local page links and assets, plus every flat ZIP entry, were verified.

## Wide summary and public copy — 1 November 2026

The At a glance summary now follows the audience and digital certificate cards as live HTML, using a landscape layout on desktop/tablet and a stacked mobile layout. Home uses an About OSI outlined button. Requested technical notices were removed from public pages and retained in owner documentation; no authentication, credential, or certificate generation behavior was changed. Browser checks passed at 1440, 768, and 390 px for summary placement, facts, button links, blank login fields, FAQ content, absence of the removed notices, no horizontal overflow, and no resource or JavaScript errors. Desktop and mobile summary screenshots were visually inspected.

## Button sizes, top bar, and address — 1 November 2026

Course action pairs and the Home hero action pair have equal widths/heights within each pair. Browser checks passed at 1440, 768, 390, and 320 px, including text fit and no horizontal overflow. All seven top bars use the general tagline without training hours, days, or delivery mode. All seven footers and the About Us address section contain the complete supplied address. The certificate includes the address below the director as two lines of real, selectable text. The actual PDF download passed; independent extraction confirmed the complete address and existing wording, a single page, and the signature as the only image. The rendered PDF, Home page, and About Us page were visually inspected. No browser JavaScript or HTTP resource errors were recorded.

## Sticky navigation and three-column footer — 1 November 2026

On all seven pages, the main header stays at the viewport top while scrolling. Desktop and mobile checks passed, including opening and closing the mobile menu after scrolling. Every desktop footer has three distinct columns; the address is the rightmost column with Open Skills Institute in bold. Columns stack cleanly on mobile. The certificate contains the full address on one live SVG text line, and the actual downloaded PDF was independently checked for one-line selectable address text, retained wording, a single page, and the signature as its only image. The rendered PDF, desktop footer, and scrolled mobile header were visually reviewed. No horizontal overflow, JavaScript errors, or missing HTTP resources were detected.

## Compact menu and inline course actions — 1 November 2026

The sticky header reduces from 102 to 51 px on desktop and from 83 to 41.5 px on mobile after scrolling down, with scaled branding and controls. It expands again near the top; separate scroll thresholds prevent repeated toggling. All seven pages passed desktop/mobile shrinking and restoration checks, including branding fit, sticky position, and the compact mobile dropdown and Escape key. Course action pairs are horizontal and equal in width/height on Home and Trainings. Six viewport widths from 320 to 1440 px passed button alignment, text fit, and no horizontal overflow checks. Compact desktop/mobile menus and inline desktop buttons were visually reviewed. No JavaScript or HTTP resource errors were recorded. Certificate artwork and PDF output logic were not changed in this update.

## Full-width introduction card and login label — 1 November 2026

The course introduction now uses the same white background, border, rounded corners, and responsive padding as the information cards below it, spanning the full content width. Desktop (1440 px) and mobile (390 px) checks confirmed matching card widths/alignment, no horizontal overflow, and no browser/resource errors. The login submit button is labeled Log in; blank fields and successful sign-in navigation to the certificate were verified. The introduction card was visually reviewed.
