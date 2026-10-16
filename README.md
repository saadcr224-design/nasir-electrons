# Nasir Electrons

Animated, video-driven website for a home & kitchen appliance store (fans, ACs, air coolers, refrigeration and kitchen appliances). It's plain HTML, CSS and JavaScript, with no build step.

## Features
- Full-screen **background video** hero and a second video showcase section. Each video plays only while it's on screen.
- **Live typing** headline that cycles through Smartphones, Laptops, Smart TVs and more.
- Product photos: drop your own at `assets/products/<product-name>.jpg` (for example `assets/products/ceiling-fan.jpg`) and at `assets/categories/<category>.jpg` (`fans`, `ac`, `coolers`, `fridge`, `cooking`, `small`, `care`). Until you do, real free-licence photos from [Pexels](https://www.pexels.com/license/) (product-only, no people) are used, otherwise a styled icon.
- Motion: 3D tilt with light sheen on cards, cursor glow, magnetic buttons, floating hero icons, hero parallax, photo fade-in, scroll-reveal animations, animated stat counters, brand marquee, scroll progress bar.
- Product grid with category filters, add-to-cart counter and wishlist toggles.
- Weekly deal countdown, testimonials, contact form with validation.
- Responsive on all screen sizes (mobile menu included), and respects reduced-motion settings.

## Run
Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

To publish it, enable **GitHub Pages** (Settings → Pages → deploy from branch, root folder).

## Customize
- **Your own videos:** put `assets/hero.mp4` and `assets/showcase.mp4` in the folder. The page uses them first and falls back to the online stock clips.
- **Products and prices:** edit the `PRODUCTS` array and `CURRENCY` at the top of `js/main.js`.
- **Contact details:** edit the Contact section in `index.html`.
- **Colors:** change the CSS variables in `:root` at the top of `css/style.css`.
