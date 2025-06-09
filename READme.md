# Modern Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features smooth animations, dark mode support, and a contact form.

## Features

- 🎨 Modern and clean design
- 🌓 Dark/Light mode toggle
- 📱 Fully responsive
- ✨ Smooth animations and transitions
- 📝 Contact form with email integration
- 🚀 Optimized for performance
- ♿ Accessible
- 🔍 SEO-friendly

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- EmailJS
- React Intersection Observer

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up EmailJS:
   - Create an account at [EmailJS](https://www.emailjs.com/)
   - Create a new email service
   - Create an email template
   - Replace the placeholders in `src/components/ContactForm.tsx`:
     ```typescript
     'YOUR_SERVICE_ID'
     'YOUR_TEMPLATE_ID'
     'YOUR_PUBLIC_KEY'
     ```

3. Add your project images:
   - Add your project images to the `public/projects` directory
   - Update the project data in `src/app/page.tsx`

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Customization

### Colors

The color scheme can be customized in `tailwind.config.ts`. The current theme uses a blue primary color, but you can modify the colors to match your brand.

### Content

1. Update the personal information in `src/app/page.tsx`
2. Modify the projects data in `src/app/page.tsx`
3. Customize the navigation links in `src/components/Navigation.tsx`

### Images

1. Replace the project images in `public/projects/`
2. Update the image paths in the projects data

## Deployment

The site can be deployed to any platform that supports Next.js, such as:

- Vercel (recommended)
- Netlify
- AWS Amplify
- Digital Ocean App Platform

## License

MIT License - feel free to use this template for your own portfolio!