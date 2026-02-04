export interface Detection {
  category: string;
  name: string;
  description: string;
}

export interface ScanResult {
  url: string;
  detections: Detection[];
  categories: Record<string, Detection[]>;
  siteName: string;
}

const PATTERNS: { pattern: RegExp; name: string; category: string; description: string }[] = [
  // Analytics
  { pattern: /google-analytics\.com|googletagmanager\.com|gtag|ga\('|GA_MEASUREMENT_ID|G-[A-Z0-9]+|UA-\d+/i, name: "Google Analytics", category: "Analytics", description: "Tracks website traffic and user behavior" },
  { pattern: /analytics\.google\.com/i, name: "Google Analytics 4", category: "Analytics", description: "Google's latest analytics platform" },
  { pattern: /googletagmanager\.com|GTM-[A-Z0-9]+/i, name: "Google Tag Manager", category: "Analytics", description: "Tag management system for analytics and marketing tags" },
  { pattern: /hotjar\.com|_hj[A-Za-z]+/i, name: "Hotjar", category: "Analytics", description: "Heatmaps, recordings, and user feedback tool" },
  { pattern: /mixpanel\.com|mixpanel\.init/i, name: "Mixpanel", category: "Analytics", description: "Product analytics for tracking user interactions" },
  { pattern: /amplitude\.com|amplitude\.init/i, name: "Amplitude", category: "Analytics", description: "Product analytics platform" },
  { pattern: /segment\.com|analytics\.js|segment\.io/i, name: "Segment", category: "Analytics", description: "Customer data platform for collecting and routing data" },
  { pattern: /plausible\.io/i, name: "Plausible", category: "Analytics", description: "Privacy-friendly website analytics" },
  { pattern: /fathom\.com|usefathom/i, name: "Fathom", category: "Analytics", description: "Privacy-focused website analytics" },
  { pattern: /matomo\.org|piwik/i, name: "Matomo", category: "Analytics", description: "Open source web analytics platform" },
  { pattern: /clarity\.ms|microsoft.*clarity/i, name: "Microsoft Clarity", category: "Analytics", description: "User behavior analytics tool by Microsoft" },

  // Advertising / Tracking Pixels
  { pattern: /facebook\.net|fbq\(|fb-pixel|connect\.facebook|fbevents/i, name: "Facebook Pixel", category: "Advertising", description: "Facebook/Meta conversion tracking and remarketing" },
  { pattern: /ads\.linkedin\.com|linkedin.*insight|snap\.licdn/i, name: "LinkedIn Insight", category: "Advertising", description: "LinkedIn conversion tracking and audience analytics" },
  { pattern: /ads\.twitter\.com|t\.co.*tracking|twq\(/i, name: "Twitter Pixel", category: "Advertising", description: "Twitter/X advertising pixel for conversion tracking" },
  { pattern: /googleads\.g\.doubleclick|googlesyndication|adsbygoogle|google_ad_client/i, name: "Google Ads", category: "Advertising", description: "Google advertising and remarketing services" },
  { pattern: /tiktok\.com.*analytics|analytics.*tiktok/i, name: "TikTok Pixel", category: "Advertising", description: "TikTok advertising pixel" },
  { pattern: /pinterest\.com.*tag|pintrk/i, name: "Pinterest Tag", category: "Advertising", description: "Pinterest conversion tracking" },

  // Payment
  { pattern: /stripe\.com|stripe\.js|Stripe\(/i, name: "Stripe", category: "Payments", description: "Payment processing platform" },
  { pattern: /paypal\.com|paypalobjects/i, name: "PayPal", category: "Payments", description: "Online payment system" },
  { pattern: /square\.com|squareup/i, name: "Square", category: "Payments", description: "Payment processing and business tools" },
  { pattern: /braintree|braintreegateway/i, name: "Braintree", category: "Payments", description: "Payment gateway by PayPal" },
  { pattern: /shopify\.com/i, name: "Shopify", category: "Payments", description: "E-commerce platform with payment processing" },
  { pattern: /paddle\.com/i, name: "Paddle", category: "Payments", description: "SaaS billing and payment platform" },
  { pattern: /lemonsqueezy/i, name: "Lemon Squeezy", category: "Payments", description: "Digital product payment platform" },

  // Cookie Management
  { pattern: /onetrust\.com|optanon/i, name: "OneTrust", category: "Cookie Management", description: "Cookie consent and privacy management platform" },
  { pattern: /cookiebot\.com|CookieConsent/i, name: "Cookiebot", category: "Cookie Management", description: "Cookie consent and compliance solution" },
  { pattern: /cookieyes\.com/i, name: "CookieYes", category: "Cookie Management", description: "Cookie consent solution for GDPR/CCPA" },
  { pattern: /iubenda\.com/i, name: "iubenda", category: "Cookie Management", description: "Privacy and cookie policy generator" },
  { pattern: /trustarc\.com/i, name: "TrustArc", category: "Cookie Management", description: "Privacy compliance and consent management" },
  { pattern: /osano\.com/i, name: "Osano", category: "Cookie Management", description: "Data privacy and consent management" },

  // Social Media
  { pattern: /platform\.twitter\.com|twitter-widgets/i, name: "Twitter Embed", category: "Social Media", description: "Embedded Twitter/X content and sharing" },
  { pattern: /connect\.facebook\.net.*sdk|facebook\.com.*plugins/i, name: "Facebook SDK", category: "Social Media", description: "Facebook social plugins and login" },
  { pattern: /instagram\.com.*embed/i, name: "Instagram Embed", category: "Social Media", description: "Embedded Instagram content" },
  { pattern: /youtube\.com.*embed|youtube-nocookie/i, name: "YouTube Embed", category: "Social Media", description: "Embedded YouTube video player" },
  { pattern: /open\.spotify\.com.*embed/i, name: "Spotify Embed", category: "Social Media", description: "Embedded Spotify content" },
  { pattern: /disqus\.com/i, name: "Disqus", category: "Social Media", description: "Comment hosting and community platform" },

  // Email / Newsletter
  { pattern: /mailchimp\.com|mc\.us|list-manage\.com/i, name: "Mailchimp", category: "Email Marketing", description: "Email marketing and newsletter platform" },
  { pattern: /convertkit\.com|ck\.page/i, name: "ConvertKit", category: "Email Marketing", description: "Email marketing for creators" },
  { pattern: /hubspot\.com|hs-scripts|hbspt/i, name: "HubSpot", category: "Email Marketing", description: "CRM, marketing, and email automation" },
  { pattern: /sendinblue|brevo\.com/i, name: "Brevo", category: "Email Marketing", description: "Email marketing and CRM platform" },
  { pattern: /klaviyo\.com/i, name: "Klaviyo", category: "Email Marketing", description: "Email and SMS marketing platform" },
  { pattern: /mailerlite\.com/i, name: "MailerLite", category: "Email Marketing", description: "Email marketing and website builder" },
  { pattern: /beehiiv\.com/i, name: "Beehiiv", category: "Email Marketing", description: "Newsletter platform" },
  { pattern: /substack\.com/i, name: "Substack", category: "Email Marketing", description: "Newsletter publishing platform" },

  // CDN / Infrastructure
  { pattern: /cloudflare\.com|cdnjs\.cloudflare/i, name: "Cloudflare", category: "Infrastructure", description: "CDN, DDoS protection, and web security" },
  { pattern: /amazonaws\.com|aws\./i, name: "Amazon AWS", category: "Infrastructure", description: "Cloud computing infrastructure" },
  { pattern: /cloudfront\.net/i, name: "Amazon CloudFront", category: "Infrastructure", description: "Content delivery network by AWS" },
  { pattern: /vercel\.com|vercel-analytics/i, name: "Vercel", category: "Infrastructure", description: "Frontend cloud platform and hosting" },
  { pattern: /netlify\.com|netlify-identity/i, name: "Netlify", category: "Infrastructure", description: "Web hosting and automation platform" },
  { pattern: /fastly\.net/i, name: "Fastly", category: "Infrastructure", description: "Edge cloud platform and CDN" },
  { pattern: /googleapis\.com/i, name: "Google APIs", category: "Infrastructure", description: "Google Cloud services and APIs" },

  // Forms
  { pattern: /<form[\s>]/i, name: "Web Forms", category: "Data Collection", description: "HTML forms collecting user input" },
  { pattern: /type=["']email["']/i, name: "Email Collection", category: "Data Collection", description: "Forms collecting email addresses" },
  { pattern: /type=["']password["']/i, name: "Password Fields", category: "Data Collection", description: "Forms collecting passwords (user accounts)" },
  { pattern: /type=["']tel["']/i, name: "Phone Collection", category: "Data Collection", description: "Forms collecting phone numbers" },
  { pattern: /recaptcha|hcaptcha|turnstile/i, name: "CAPTCHA", category: "Data Collection", description: "Bot protection collecting behavioral data" },
  { pattern: /typeform\.com/i, name: "Typeform", category: "Data Collection", description: "Online form builder" },
  { pattern: /jotform\.com/i, name: "Jotform", category: "Data Collection", description: "Online form builder" },

  // Chat / Support
  { pattern: /intercom\.com|intercomSettings/i, name: "Intercom", category: "Customer Support", description: "Customer messaging and support platform" },
  { pattern: /crisp\.chat/i, name: "Crisp", category: "Customer Support", description: "Customer messaging and live chat" },
  { pattern: /drift\.com/i, name: "Drift", category: "Customer Support", description: "Conversational marketing and sales platform" },
  { pattern: /zendesk\.com/i, name: "Zendesk", category: "Customer Support", description: "Customer service and support platform" },
  { pattern: /freshdesk\.com|freshchat/i, name: "Freshdesk", category: "Customer Support", description: "Customer support software" },
  { pattern: /tawk\.to/i, name: "Tawk.to", category: "Customer Support", description: "Free live chat and customer support" },
  { pattern: /livechat\.com/i, name: "LiveChat", category: "Customer Support", description: "Live chat and help desk software" },

  // Authentication
  { pattern: /auth0\.com/i, name: "Auth0", category: "Authentication", description: "Identity and access management platform" },
  { pattern: /clerk\.com|clerk\.dev/i, name: "Clerk", category: "Authentication", description: "User authentication and management" },
  { pattern: /supabase\.io|supabase\.co/i, name: "Supabase", category: "Authentication", description: "Open source backend with authentication" },
  { pattern: /firebase\.google|firebaseapp/i, name: "Firebase", category: "Authentication", description: "Google's app development platform with auth" },
  { pattern: /accounts\.google\.com|googleapis.*auth/i, name: "Google Sign-In", category: "Authentication", description: "Google OAuth authentication" },
];

export function scanHTML(html: string, url: string): ScanResult {
  const detections: Detection[] = [];
  const seen = new Set<string>();

  for (const rule of PATTERNS) {
    if (rule.pattern.test(html) && !seen.has(rule.name)) {
      seen.add(rule.name);
      detections.push({
        category: rule.category,
        name: rule.name,
        description: rule.description,
      });
    }
  }

  // Group by category
  const categories: Record<string, Detection[]> = {};
  for (const d of detections) {
    if (!categories[d.category]) categories[d.category] = [];
    categories[d.category].push(d);
  }

  // Extract site name from URL
  let siteName = "the website";
  try {
    const u = new URL(url);
    siteName = u.hostname.replace(/^www\./, "");
  } catch {
    // keep default
  }

  return { url, detections, categories, siteName };
}
