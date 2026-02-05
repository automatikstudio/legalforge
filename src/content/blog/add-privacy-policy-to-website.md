---
title: "How to Add a Privacy Policy to Your Website"
description: "Step-by-step instructions for adding a privacy policy to any website — WordPress, Shopify, Wix, custom sites, and more. Plus where to link it."
date: "2026-01-12"
slug: "add-privacy-policy-to-website"
tags: ["Privacy Policy", "How-To", "Website"]
---

## You Have a Privacy Policy — Now What?

Generating a privacy policy is step one. Step two is making sure it's properly published on your website and accessible to visitors. Where you place it, how you link to it, and how you present it all matter for both legal compliance and user experience.

This guide covers how to add a privacy policy to any type of website, with specific instructions for popular platforms.

## Where to Display Your Privacy Policy

Before diving into platform-specific instructions, let's cover the universal best practices for privacy policy placement:

### Footer Link (Mandatory)
Every page of your website should include a link to your privacy policy in the footer. This is the standard location that users and regulators expect.

### Data Collection Points
Any form that collects personal data should include a link to your privacy policy:
- Registration/signup forms
- Contact forms
- Newsletter subscription forms
- Checkout pages
- Comment sections

### Cookie Consent Banner
Your cookie consent banner should link to your privacy policy (or specifically to the cookie section of your policy).

### Account Settings
If your site has user accounts, include a link to the privacy policy in account settings or the user dashboard.

### App Store Listings
If you have a mobile app, both Apple's App Store and Google Play require a privacy policy URL.

## Adding a Privacy Policy to WordPress

### Option 1: Built-in Privacy Page
WordPress has built-in privacy policy functionality:

1. Go to **Settings → Privacy** in your WordPress dashboard
2. Click **Create New Page** or select an existing page
3. Paste your privacy policy content
4. Click **Publish**
5. WordPress will automatically link to this page in your login and registration forms

### Option 2: Manual Page
1. Go to **Pages → Add New**
2. Title it "Privacy Policy"
3. Paste your privacy policy content
4. Click **Publish**
5. Navigate to **Appearance → Menus** and add the page to your footer menu

### Adding the Footer Link
Most WordPress themes support footer menus:
1. Go to **Appearance → Menus**
2. Create a new menu or select your footer menu
3. Add the Privacy Policy page
4. Set the menu location to "Footer" (varies by theme)
5. Save

## Adding a Privacy Policy to Shopify

1. Go to **Settings → Policies** in your Shopify admin
2. You'll see a field for Privacy Policy — paste your content here
3. Shopify automatically creates a page at `yourstore.com/policies/privacy-policy`
4. The link is automatically added to your checkout footer

For additional footer placement:
1. Go to **Online Store → Navigation**
2. Select your footer menu
3. Add a menu item linking to `/policies/privacy-policy`

## Adding a Privacy Policy to Wix

1. In the Wix Editor, click **Add** (the + button)
2. Select **Page** and add a new blank page
3. Name it "Privacy Policy"
4. Add a text element and paste your privacy policy
5. To add it to your footer, edit the footer section and add a link to the page

## Adding a Privacy Policy to Squarespace

1. Go to **Pages** in the Squarespace editor
2. Click **+** to add a new page
3. Choose a blank page and name it "Privacy Policy"
4. Add a text block and paste your content
5. Go to **Navigation** to add the page to your footer links

## Adding a Privacy Policy to a Custom Website

If you built your website with HTML, React, Next.js, or any other framework:

### Create a Dedicated Page
Create a `/privacy-policy` or `/privacy` route/page. This is the cleanest approach.

### Add Footer Links
Add a link in your site's footer template/component:

```html
<footer>
  <a href="/privacy-policy">Privacy Policy</a>
  <a href="/terms-of-service">Terms of Service</a>
</footer>
```

### For Single-Page Apps (React, Vue, etc.)
Make sure your privacy policy page is server-rendered or statically generated so search engines can index it. Users and regulators need to access it without JavaScript.

## Formatting Your Privacy Policy

How you present your privacy policy matters:

### Use Clear Headings
Break the policy into sections with descriptive headings (H2, H3). This helps users find specific information quickly.

### Keep Font Size Readable
Use at least 14-16px font size. Don't shrink your privacy policy text to discourage reading.

### Avoid PDF-Only
Some sites only provide their privacy policy as a downloadable PDF. This is bad for accessibility, SEO, and user experience. Always have an HTML version.

### Add a Last Updated Date
Display the date prominently at the top of the page. This tells users and regulators that the policy is current.

### Consider a Table of Contents
For longer policies, a clickable table of contents helps users navigate to specific sections.

## Technical SEO Considerations

### Meta Tags
Add appropriate meta tags to your privacy policy page:

```html
<title>Privacy Policy — Your Company Name</title>
<meta name="description" content="Read our privacy policy to understand how we collect, use, and protect your personal data." />
```

### Noindex (Optional)
Some companies choose to add `noindex` to their privacy policy page to keep it out of search results. This is optional — there's no harm in having it indexed.

### Schema Markup
Consider adding WebPage schema markup to help search engines understand the page type.

## Don't Forget Mobile

Ensure your privacy policy is fully readable on mobile devices:
- Responsive layout
- Adequate font size
- Scrollable content (not hidden behind modals)
- Links are tappable (not too small)

## Generate, Then Publish

If you haven't created your privacy policy yet, [LegalForge](https://legalforge-chi.vercel.app) can generate one tailored to your website in about 60 seconds. Just enter your URL, let the AI scan your site, and copy the generated policy to your website using any of the methods described above.

The combination of an AI-generated privacy policy and proper placement ensures you're both legally compliant and user-friendly. [Get started now](https://legalforge-chi.vercel.app).
