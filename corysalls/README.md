# BWS Client Template

This is the master template for building client websites at Bayou Web Studios. Each new client site should be based on this template.

## Template Structure

```
_bws-template/
├── index.html          # Main site template
├── shop.html          # Shop page (Pro+ plan)
├── changes.html       # Change request form
├── stats.html         # Analytics dashboard placeholder
├── styles.css         # Base CSS with custom variables
├── script.js          # All interactive functionality
└── README.md          # This file
```

## Setup Process

### 1. Create New Client Site

1. Copy the entire `_bws-template/` folder
2. Rename it to the client's domain name (e.g., `johndoetattoo`)
3. Begin customization process

### 2. Customize Variables

Open `index.html` and replace all template variables with client-specific content:

#### Basic Info
- `{{ARTIST_NAME}}` - Client's name (e.g., "John Doe")
- `{{FIRST_NAME}}` - First name only (e.g., "John")
- `{{ARTIST_TAGLINE}}` - Short tagline (e.g., "Neo-Traditional Tattoo Artist")
- `{{ARTIST_BIO}}` - One-line bio for hero section
- `{{FULL_BIO}}` - Full bio paragraphs for About section
- `{{SITE_URL}}` - Full site URL (e.g., "https://johndoetattoo.com")

#### Contact & Location
- `{{EMAIL_ADDRESS}}` - Client's email
- `{{PHONE_NUMBER}}` - Phone number
- `{{STUDIO_NAME}}` - Studio name
- `{{STUDIO_ADDRESS}}` - Street address
- `{{STUDIO_CITY}}` - City
- `{{STUDIO_STATE}}` - State
- `{{STUDIO_ZIP}}` - ZIP code
- `{{STUDIO_HOURS}}` - Operating hours

#### Booking
- `{{BOOKING_LINK}}` - Link to booking system
- `{{BOOKING_TEXT}}` - Button text ("Book Now", "Reservar", etc.)

#### Social Media
- `{{INSTAGRAM_LINK}}` - Instagram URL
- `{{SOCIAL_LINKS}}` - All social media links (generated)
- `{{FOOTER_SOCIAL_LINKS}}` - Footer social links

#### Business Info
- `{{YEARS_EXPERIENCE}}` - Years tattooing
- `{{FOLLOWER_COUNT}}` - Instagram followers (formatted, e.g., "25K")
- `{{CONSULTATION_INFO}}` - Consultation process
- `{{DEPOSIT_INFO}}` - Deposit requirements
- `{{TOUCHUP_INFO}}` - Touch-up policy

#### Images
- `{{HERO_IMAGE}}` - Main hero image
- `{{ABOUT_IMAGE}}` - About section image
- `{{OG_IMAGE}}` - Social sharing image

#### Google Integration
- `{{GOOGLE_MAPS_EMBED}}` - Google Maps embed code
- `{{GOOGLE_REVIEWS_LINK}}` - Google Reviews URL

#### Content Sections
- `{{SPECIALTIES_LIST}}` - List of specialties (HTML)
- `{{SERVICES_CARDS}}` - Service cards HTML
- `{{GALLERY_ITEMS}}` - Gallery items HTML
- `{{REVIEW_CARDS}}` - Review cards HTML
- `{{CATEGORY_FILTERS}}` - Gallery category filters
- `{{TATTOO_TYPE_OPTIONS}}` - Form dropdown options

#### Current Year
- `{{CURRENT_YEAR}}` - Current year (2026, etc.)

### 3. Customize Colors

In `styles.css`, update the CSS variables for client branding:

```css
:root {
  --primary: #c9a84c;      /* Change to client's brand color */
  --primary-dark: #b5943a; /* Darker shade of primary */
  /* Keep other variables as-is unless client requests changes */
}
```

Common brand colors:
- Gold: `#c9a84c` (default)
- Red: `#dc2626`
- Blue: `#2563eb`
- Purple: `#7c3aed`
- Green: `#059669`
- Orange: `#ea580c`

### 4. Gallery Setup

Replace gallery items with client work:

```html
<div class="gallery-item" data-category="fresh geometric">
    <div class="gallery-image">
        <img src="images/gallery/piece-1.jpg" alt="Geometric sleeve - fresh" loading="lazy">
    </div>
    <div class="gallery-info">
        <h3>Geometric Sleeve</h3>
        <p>Fresh - 8 hours</p>
    </div>
</div>
```

Categories to use:
- `fresh` / `healed`
- Style categories: `geometric`, `traditional`, `blackwork`, `color`, `portrait`, etc.

### 5. Services Setup

Customize service cards in the `{{SERVICES_CARDS}}` section:

```html
<div class="service-card">
    <h3>Small Tattoos</h3>
    <div class="price">$150</div>
    <p>2-4 inches, simple designs, 1-2 hours of work</p>
</div>
```

### 6. Reviews Setup

Add real client reviews:

```html
<div class="review-card">
    <div class="review-rating">⭐⭐⭐⭐⭐</div>
    <div class="review-text">"Amazing work and great experience. Highly recommend!"</div>
    <div class="review-author">
        <div class="review-avatar">M</div>
        <div class="review-name">Mike Johnson</div>
    </div>
</div>
```

### 7. Shop Setup (Pro+ Plans Only)

For Pro and Premium plans, customize `shop.html`:

1. Add Stripe publishable key: `{{STRIPE_PUBLISHABLE_KEY}}`
2. Add product information:
   - `{{PRODUCT_NAME_1}}`, `{{PRODUCT_PRICE_1}}`, etc.
   - `{{STRIPE_PRICE_ID_1}}` - Stripe Price ID for each product
3. Configure gift card price IDs

### 8. Forms Configuration

All forms use FormSubmit. Update email addresses:
- Contact forms → client's email
- Change requests → `bayouwebstudio@gmail.com`

## Deployment Checklist

### Before Going Live

- [ ] All template variables replaced
- [ ] Colors updated to match client brand
- [ ] Gallery populated with client work (minimum 12 pieces)
- [ ] Services and pricing updated
- [ ] Contact information correct
- [ ] Google Maps embed working
- [ ] All forms tested
- [ ] Images optimized (WebP preferred, max 1MB each)
- [ ] Meta descriptions updated
- [ ] Favicon added
- [ ] Books status set correctly

### Testing

1. **Mobile responsive** - Test on phone/tablet
2. **Form submissions** - Test contact and email forms
3. **Gallery filtering** - Test all filter buttons
4. **Navigation** - Test all links and smooth scrolling
5. **Performance** - Site loads quickly on 3G
6. **Books toggle** - Test open/closed functionality

### SEO Setup

1. Update all meta tags with client info
2. Add structured data for business
3. Submit sitemap to Google
4. Set up Google Analytics (Pro+ plans)
5. Optimize images with alt text
6. Add local business schema

## Plan-Specific Features

### Basic Plan ($25/mo)
- Full website with all core features
- Contact forms
- Gallery
- Mobile responsive
- Change request portal

### Pro Plan ($49/mo)
- Everything in Basic
- Shop functionality (`shop.html`)
- Analytics dashboard (`stats.html`) - coming soon
- Email capture forms
- Books open/closed toggle
- Priority support

### Premium Plan ($99/mo)
- Everything in Pro
- SEO optimization
- Google Ads management
- Advanced analytics
- Client healed photo gallery
- Priority support + strategy calls

## File Organization

```
client-site/
├── index.html
├── shop.html (Pro+ only)
├── changes.html
├── stats.html
├── styles.css
├── script.js
├── images/
│   ├── hero-image.jpg
│   ├── about-image.jpg
│   ├── gallery/
│   │   ├── piece-1.jpg
│   │   └── ...
│   └── og-image.jpg
└── favicon.ico
```

## Common Customizations

### Multi-language Sites
For Spanish-speaking clients:
- Update `{{BOOKING_TEXT}}` to "Reservar"
- Translate navigation items
- Update form placeholders
- Consider adding language toggle

### Multiple Artists
For shops with multiple artists:
- Duplicate gallery sections
- Add artist filtering
- Update about section for team
- Modify contact info

### Special Features
- **Apprentice pricing** - Add separate pricing tier
- **Guest artist spots** - Add guest artist section
- **Flash sheets** - Add flash gallery
- **Merchandise** - Expand shop functionality

## Maintenance Notes

- **Images**: Keep gallery updated monthly
- **Reviews**: Add new reviews quarterly
- **Prices**: Update annually or as needed
- **Hours**: Update during holidays/vacations
- **Content**: Refresh bio and services annually

## Support & Updates

- **Change requests**: Use `changes.html` form
- **Urgent issues**: Text/call client's provided number
- **Template updates**: Apply to all client sites
- **BWS contact**: bayouwebstudio@gmail.com

## Version History

- **v1.0** (March 2026) - Initial template
- **v1.1** (TBD) - Analytics integration
- **v1.2** (TBD) - Enhanced e-commerce features

---

*This template is designed to be fast, SEO-friendly, and easy to maintain. Follow this guide for consistent, high-quality client deliverables.*