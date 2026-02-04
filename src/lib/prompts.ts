import { ScanResult } from "./detector";

function formatDetections(scan: ScanResult): string {
  const lines: string[] = [];
  for (const [category, items] of Object.entries(scan.categories)) {
    lines.push(`\n### ${category}`);
    for (const item of items) {
      lines.push(`- **${item.name}**: ${item.description}`);
    }
  }
  return lines.join("\n");
}

export function getPrivacyPrompt(scan: ScanResult): string {
  return `You are a legal document expert. Generate a comprehensive Privacy Policy for the website "${scan.siteName}" (${scan.url}).

The following technologies and integrations were detected on the website:
${formatDetections(scan)}

Requirements:
- Write in clear, professional language that's easy to understand
- Use HTML formatting (h2 headings, paragraphs, lists)
- Cover ALL detected integrations and explain what data they collect
- Include sections for:
  1. Introduction and scope
  2. Information we collect (based on detected technologies)
  3. How we use your information
  4. Cookies and tracking technologies (detail each detected tool)
  5. Third-party services (list each detected service and link to their privacy policies)
  6. Data sharing and disclosure
  7. Data retention
  8. Your rights (GDPR, CCPA, etc.)
  9. Children's privacy
  10. International data transfers
  11. Security measures
  12. Changes to this policy
  13. Contact information (use placeholder [CONTACT EMAIL])
- Include last updated date as today's date
- Reference specific detected services by name
- Be thorough but readable
- Do NOT include any markdown — use only HTML tags

Output ONLY the HTML content, starting from the first <h2> tag. Do not wrap in a code block.`;
}

export function getTermsPrompt(scan: ScanResult): string {
  return `You are a legal document expert. Generate comprehensive Terms of Service for the website "${scan.siteName}" (${scan.url}).

The following technologies and integrations were detected on the website:
${formatDetections(scan)}

Requirements:
- Write in clear, professional language
- Use HTML formatting (h2 headings, paragraphs, lists)
- Include sections for:
  1. Acceptance of terms
  2. Description of service
  3. User accounts and registration (if authentication detected)
  4. User responsibilities and acceptable use
  5. Intellectual property rights
  6. Payment terms (if payment processors detected, reference specific ones)
  7. Third-party services and links
  8. Disclaimers and limitations of liability
  9. Indemnification
  10. Termination
  11. Governing law
  12. Dispute resolution
  13. Changes to terms
  14. Contact information (use placeholder [CONTACT EMAIL])
- Reference detected payment processors and services by name where relevant
- Include last updated date as today's date
- Be thorough but readable
- Do NOT include any markdown — use only HTML tags

Output ONLY the HTML content, starting from the first <h2> tag. Do not wrap in a code block.`;
}

export function getCookiePrompt(scan: ScanResult): string {
  return `You are a legal document expert. Generate a comprehensive Cookie Policy for the website "${scan.siteName}" (${scan.url}).

The following technologies and integrations were detected on the website:
${formatDetections(scan)}

Requirements:
- Write in clear, professional language
- Use HTML formatting (h2 headings, paragraphs, lists)
- Include sections for:
  1. What are cookies
  2. How we use cookies
  3. Types of cookies we use:
     a. Strictly necessary cookies
     b. Performance/analytics cookies (detail detected analytics tools)
     c. Functionality cookies
     d. Targeting/advertising cookies (detail detected ad pixels)
     e. Third-party cookies (detail each detected third-party service)
  4. Cookie table/list with:
     - Cookie name (infer from detected services)
     - Provider
     - Purpose
     - Duration (estimate based on known defaults)
     - Type (first-party/third-party)
  5. How to manage cookies (browser-specific instructions)
  6. Cookie consent (reference detected cookie management tools if any)
  7. Changes to this policy
  8. Contact information (use placeholder [CONTACT EMAIL])
- Be specific about each detected tracking technology
- Include last updated date as today's date
- Do NOT include any markdown — use only HTML tags

Output ONLY the HTML content, starting from the first <h2> tag. Do not wrap in a code block.`;
}
