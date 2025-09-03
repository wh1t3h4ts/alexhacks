# Starlex WiFi Billing System - UI Documentation

## Overview

A modern, responsive web application for WiFi billing management with M-Pesa integration. Built with Django, custom CSS design system, and vanilla JavaScript.

## 🎨 Design System

### Color Palette
- **Primary**: `#EA580C` (Orange)
- **Secondary**: `#1F2937` (Dark Gray)
- **Success**: `#10b981` (Emerald)
- **Warning**: `#f59e0b` (Amber)
- **Error**: `#ef4444` (Red)
- **Background**: `#0f172a` (Dark Slate)
- **Surface**: `#1e293b` (Slate)

### Typography
- **Font Family**: Inter, system fonts
- **Scale**: 0.75rem → 3rem (8px → 48px)
- **Weights**: 400, 500, 600, 700

### Spacing Scale
- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)
- **2xl**: 3rem (48px)

### Border Radius
- **sm**: 0.25rem (4px)
- **md**: 0.5rem (8px)
- **lg**: 0.75rem (12px)
- **xl**: 1rem (16px)
- **2xl**: 1.5rem (24px)

## 📁 File Structure

```
billing/
├── static/
│   ├── css/
│   │   └── starlex.css          # Main design system
│   ├── js/
│   │   └── main.js              # Interactive functionality
│   └── images/
│       └── favicon.svg           # Site favicon
├── templates/
│   ├── base.html                # Layout with navigation
│   ├── portal/
│   │   ├── landing.html         # Plan selection
│   │   ├── payment.html         # M-Pesa payment
│   │   └── success.html         # Confirmation page
│   └── billing/
│       ├── admin_dashboard.html # Admin overview
│       └── transactions.html    # Transaction management
├── responsive-showcase.html     # Design showcase
└── UI_README.md                 # This documentation
```

## 🚀 Features

### ✨ Modern UI Components
- **Dark Theme**: Professional dark mode by default
- **Glassmorphism**: Subtle backdrop blur effects
- **Gradient Accents**: Orange to dark gradients
- **Smooth Animations**: CSS transitions and hover effects
- **Accessibility**: WCAG AA compliant with focus management

### 📱 Responsive Design
- **Mobile First**: Optimized for small screens
- **Breakpoint System**: 768px, 1024px, 1200px
- **Flexible Grid**: CSS Grid and Flexbox layouts
- **Touch Friendly**: Appropriate button sizes and spacing

### 🎯 Component Library

#### Buttons
```html
<button class="btn btn-primary">Primary Button</button>
<button class="btn btn-secondary">Secondary Button</button>
<button class="btn btn-success">Success Button</button>
<button class="btn btn-error">Error Button</button>
<button class="btn btn-ghost">Ghost Button</button>
```

#### Cards
```html
<div class="card">
  <h3 class="card-header">Card Title</h3>
  <div class="card-body">
    Card content goes here
  </div>
  <div class="card-footer">
    Card footer
  </div>
</div>
```

#### Forms
```html
<div class="form-group">
  <label class="form-label">Label</label>
  <input type="text" class="form-input">
  <p class="form-help">Helper text</p>
  <p class="form-error">Error message</p>
</div>
```

#### Tables
```html
<div class="table-responsive">
  <table class="table">
    <thead>
      <tr>
        <th>Header 1</th>
        <th>Header 2</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Data 1</td>
        <td>Data 2</td>
      </tr>
    </tbody>
  </table>
</div>
```

#### Badges
```html
<span class="badge badge-primary">Primary</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-error">Error</span>
```

#### Alerts
```html
<div class="alert alert-success">
  <strong>Success!</strong> Operation completed.
</div>
```

## 📱 Responsive Breakpoints

### Mobile (< 768px)
- Single column layouts
- Collapsible navigation
- Touch-optimized buttons
- Stacked form elements

### Tablet (768px - 1024px)
- 2-column grids where appropriate
- Expanded navigation
- Medium-sized components

### Desktop (> 1024px)
- Multi-column layouts
- Full navigation
- Large component sizes
- Sidebar layouts

## 🎨 Customization

### Colors
Modify CSS custom properties in `starlex.css`:

```css
:root {
  --color-primary: #your-color;
  --color-secondary: #your-color;
  /* ... other variables */
}
```

### Typography
```css
:root {
  --font-family: 'Your Font', sans-serif;
  --font-size-base: 1rem;
}
```

### Spacing
```css
:root {
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
}
```

## 🔧 JavaScript Features

### Plan Selection
```javascript
// Automatically handles plan card selection
initializePlanSelection();
```

### Form Validation
```javascript
// Phone number validation for M-Pesa
initializeFormValidation();
```

### Countdown Timer
```javascript
// Session countdown with progress bar
initializeCountdownTimer();
```

### Theme Toggle
```javascript
// Dark/light theme switching
initializeThemeToggle();
```

### Mobile Menu
```javascript
// Responsive navigation toggle
initializeMobileMenu();
```

## 📊 Pages Overview

### Landing Page (`portal/landing.html`)
- Hero section with gradient text
- Responsive plan cards grid
- Interactive selection system
- Mobile-optimized layout

### Payment Page (`portal/payment.html`)
- Clean payment form
- Phone number validation
- Payment method selection
- Loading states

### Success Page (`portal/success.html`)
- Confirmation banner
- Session countdown with progress bar
- Plan details display
- Device information

### Admin Dashboard (`billing/admin_dashboard.html`)
- Sidebar navigation
- KPI cards grid
- Transaction table
- Responsive layout

### Transactions (`billing/transactions.html`)
- Advanced filtering
- Search functionality
- Pagination
- Modal details view

## 🚀 Getting Started

1. **Include CSS**
   ```html
   <link rel="stylesheet" href="{% static 'css/starlex.css' %}">
   ```

2. **Include JavaScript**
   ```html
   <script src="{% static 'js/main.js' %}"></script>
   ```

3. **Use Components**
   ```html
   <button class="btn btn-primary">Click me</button>
   <div class="card">Content</div>
   ```

4. **Responsive Classes**
   ```html
   <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
     <!-- Responsive grid -->
   </div>
   ```

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## ♿ Accessibility

### Features
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper ARIA labels
- **Focus Management**: Visible focus indicators
- **Color Contrast**: WCAG AA compliant
- **Semantic HTML**: Proper heading hierarchy

### Implementation
```html
<button class="btn btn-primary focus-ring" aria-label="Submit form">
  Submit
</button>
```

## 🎯 Best Practices

### CSS
- Use design tokens (CSS custom properties)
- Follow mobile-first approach
- Minimize specificity conflicts
- Use semantic class names

### HTML
- Semantic markup
- Proper heading hierarchy
- Accessible form labels
- ARIA attributes where needed

### JavaScript
- Progressive enhancement
- Minimal dependencies
- Error handling
- Performance optimized

## 🔧 Development

### Adding New Components
1. Define styles in `starlex.css`
2. Add semantic HTML structure
3. Include JavaScript functionality if needed
4. Test across breakpoints

### Customization Workflow
1. Modify CSS variables for theming
2. Update component styles
3. Test responsive behavior
4. Validate accessibility

## 📈 Performance

### Metrics
- **CSS Size**: ~15KB (compressed)
- **JavaScript Size**: ~8KB (compressed)
- **First Paint**: < 1.5s
- **Interactive**: < 2s

### Optimizations
- CSS custom properties for theming
- Minimal JavaScript footprint
- Efficient selectors
- Optimized images

## 🐛 Troubleshooting

### Common Issues

**Styles not loading**
- Check static file configuration
- Verify file paths
- Clear browser cache

**Responsive issues**
- Test with browser dev tools
- Check CSS media queries
- Validate HTML structure

**JavaScript errors**
- Check console for errors
- Verify DOM element selectors
- Test progressive enhancement

## 📚 Resources

### Design Inspiration
- Material Design
- Tailwind CSS
- Ant Design
- Chakra UI

### Accessibility Guidelines
- WCAG 2.1 AA
- WAI-ARIA Authoring Practices
- WebAIM Guidelines

### Performance Tools
- Lighthouse
- WebPageTest
- GTmetrix

---

## 🎉 Showcase

View the complete design system in action:
- Open `responsive-showcase.html` in your browser
- Resize the window to see responsive behavior
- Test all interactive elements
- Check accessibility with screen readers

**Built with ❤️ for the Starlex WiFi community**
