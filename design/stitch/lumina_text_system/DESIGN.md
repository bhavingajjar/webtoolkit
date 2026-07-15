---
name: Lumina Text System
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#cfc2d6'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#988d9f'
  outline-variant: '#4d4354'
  surface-tint: '#ddb7ff'
  primary: '#ddb7ff'
  on-primary: '#490080'
  primary-container: '#b76dff'
  on-primary-container: '#400071'
  inverse-primary: '#842bd2'
  secondary: '#4cd7f6'
  on-secondary: '#003640'
  secondary-container: '#03b5d3'
  on-secondary-container: '#00424e'
  tertiary: '#91db2a'
  on-tertiary: '#1f3700'
  tertiary-container: '#65a100'
  on-tertiary-container: '#1a2f00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#f0dbff'
  primary-fixed-dim: '#ddb7ff'
  on-primary-fixed: '#2c0051'
  on-primary-fixed-variant: '#6900b3'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#acf847'
  tertiary-fixed-dim: '#91db2a'
  on-tertiary-fixed: '#102000'
  on-tertiary-fixed-variant: '#304f00'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: 0.05em
  headline-md:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.02em
  headline-md-mobile:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-padding: 24px
  gutter: 16px
  ad-margin: 32px
---

## Brand & Style

This design system establishes a **Sleek Modern Tech** aesthetic, positioning a utility tool as a high-end, futuristic experience. The brand personality is precise, advanced, and energetic. By utilizing a dark-mode-first approach, we create a focused environment where content "pops" through vibrant neon accents.

The visual language blends **Glassmorphism** with a refined **Corporate Modern** structure. We utilize frosted-glass surfaces, subtle back-glows, and precision-engineered typography to evoke a sense of "New Age" software. Advertising placements are not treated as interruptions but as integrated modules within the grid, maintaining the high-end feel while ensuring commercial viability.

## Colors

The palette is anchored in a deep, atmospheric neutral to provide maximum contrast for neon accents. 

- **Primary (Electric Purple):** Used for primary actions, active states, and primary brand flourishes.
- **Secondary (Cyan):** Used for data visualization, secondary interactive elements, and "glow" effects.
- **Tertiary (Lime):** Reserved for success states, highlights, and specific "conversion" triggers.
- **Surface Strategy:** Backgrounds use a tiered dark-blue/grey scale to create depth. Interactive surfaces utilize semi-transparent "glass" overlays with a 1px border to define edges against dark backgrounds.

## Typography

The typography system balances futuristic display faces with ultra-legible technical fonts. 

- **Sora (Headlines):** Applied with wide tracking (letter-spacing) in all-caps or title case to create a "tech-luxe" feel.
- **Geist (Body):** A neutral, highly legible sans-serif for long-form text conversion results.
- **JetBrains Mono (Labels/UI):** Used for technical metadata (character counts, button labels, and small utility text) to reinforce the "utility/coding" nature of the product.

## Layout & Spacing

The layout follows a **Fluid Grid** system with rigorous alignment. We utilize a 12-column grid for desktop, collapsing to 4 columns for mobile.

- **Ad Integration:** Strategic slots for AdMob (horizontal banners) and Facebook Ads (vertical skyscrapers) are hard-coded into the grid logic. These containers use the same glassmorphism styles as utility cards to ensure they feel like native components.
- **Rhythm:** A strict 8px base unit governs all padding and margins. 
- **Margins:** Generous outer margins (32px+) on desktop ensure the central utility remains the focus, while negative space around ads prevents the UI from feeling cluttered.

## Elevation & Depth

Hierarchy is achieved through **Glassmorphism** and **Backlight Glows** rather than traditional drop shadows.

- **Base Layer:** The deep neutral background (#0F172A) with a subtle radial gradient.
- **Surface Layer:** Semi-transparent containers (Background blur: 12px, Opacity: 10-15%) with a 1px inner stroke in a lighter neutral.
- **Active State:** Elements gain a "Neon Underglow"—a soft, diffused outer glow (blur 20px) using the primary or secondary color.
- **Ad Containers:** These should have a slightly lower opacity backdrop than the main utility tools to naturally deprioritize them visually while maintaining the design language.

## Shapes

The design system utilizes **Rounded** geometry (0.5rem base) to soften the "hard tech" aesthetic, making the utility feel modern and approachable.

- **Buttons/Inputs:** 8px (0.5rem) corner radius.
- **Large Containers/Cards:** 16px (1rem) corner radius.
- **Chips/Status Tags:** Fully pill-shaped (rounded-full) to contrast against the structured grid of the utility buttons.

## Components

### Buttons & Inputs
- **Utility Buttons:** Used for text transformations. These feature a glass background, centered mono-spaced icons, and a 1px border. On hover, the border transitions to a neon glow.
- **Primary Action (Convert):** Solid gradient (Purple to Cyan) with white text to draw immediate attention.
- **Input Field:** Large, borderless text area with a heavy backdrop blur. Text within uses a larger font size for high readability.

### Ad Modules
- **Native Ad Containers:** These must include a small "Sponsored" label using the `label-sm` typography. They should mimic the card shape and border style of the utility tools to reduce visual friction.

### Utility Navigation
- **Tool Grid:** A dense collection of cards for different conversions. Each card uses a centered icon and label. Active tools are indicated by a thin Cyan neon bottom-border.

### Feedback
- **Toasts:** Floating glassmorphic notifications with Lime (#84CC16) accents for success (e.g., "Copied to clipboard").