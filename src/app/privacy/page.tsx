import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold font-outfit mb-2">
            Privacy <span className="text-gradient">Policy</span>
          </h1>
          <p className="text-zinc-500 text-sm mb-10">Last updated: February 4, 2026</p>

          <div className="prose-legal">
            <h2>1. Introduction</h2>
            <p>
              Welcome to LegalForge (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), a product of Automatik Studio. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services at legalforge.vercel.app (the &quot;Service&quot;).
            </p>
            <p>
              By using our Service, you agree to the collection and use of information in accordance with this policy.
            </p>

            <h2>2. Information We Collect</h2>
            <h3>2.1 Information You Provide</h3>
            <ul>
              <li><strong>Website URLs:</strong> When you use our scanning feature, you provide us with website URLs that you wish to analyze.</li>
              <li><strong>Account Information:</strong> If you create an account, we may collect your name, email address, and payment information.</li>
            </ul>

            <h3>2.2 Information Collected Automatically</h3>
            <ul>
              <li><strong>Usage Data:</strong> We collect information about how you interact with our Service, including pages visited, features used, and time spent.</li>
              <li><strong>Device Information:</strong> Browser type, operating system, device type, and screen resolution.</li>
              <li><strong>Log Data:</strong> IP address, access times, and referring URLs.</li>
            </ul>

            <h3>2.3 Website Scanning Data</h3>
            <p>
              When you submit a URL for scanning, we fetch and analyze the publicly available HTML content of that webpage. We do not store the scanned website content permanently. The analysis results (detected integrations and technologies) are processed in real-time and used solely to generate your legal documents.
            </p>

            <h2>3. How We Use Your Information</h2>
            <p>We use the collected information to:</p>
            <ul>
              <li>Provide, operate, and maintain our Service</li>
              <li>Scan websites and generate legal documents as requested</li>
              <li>Process transactions and manage subscriptions</li>
              <li>Improve and personalize user experience</li>
              <li>Communicate with you about updates, support, and marketing (with your consent)</li>
              <li>Detect and prevent fraud or abuse</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>4. Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul>
              <li><strong>Anthropic (Claude AI):</strong> We send detected website integration data to Anthropic&apos;s API to generate legal documents. Anthropic processes this data according to their <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.</li>
              <li><strong>Vercel:</strong> Our Service is hosted on Vercel. See <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel&apos;s Privacy Policy</a>.</li>
            </ul>

            <h2>5. Cookies</h2>
            <p>
              We use minimal cookies necessary for the functioning of our Service. We do not use advertising cookies or tracking pixels. Essential cookies may include session management and security tokens.
            </p>

            <h2>6. Data Retention</h2>
            <p>
              Generated documents are not stored on our servers unless you have a paid account with document storage enabled. Scan results are processed in real-time and discarded after the response is sent.
            </p>

            <h2>7. Your Rights</h2>
            <p>Depending on your jurisdiction, you may have the right to:</p>
            <ul>
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict processing of your data</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>

            <h2>8. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.
            </p>

            <h2>9. Children&apos;s Privacy</h2>
            <p>
              Our Service is not intended for individuals under the age of 16. We do not knowingly collect personal information from children.
            </p>

            <h2>10. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers.
            </p>

            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
            </p>

            <h2>12. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:automatikstudiomail@gmail.com">automatikstudiomail@gmail.com</a>.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
