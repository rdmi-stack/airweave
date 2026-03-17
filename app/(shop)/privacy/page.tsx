import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Airweave",
  description:
    "Learn how Airweave collects, uses, and protects your personal data. We are committed to safeguarding your privacy while delivering premium linen clothing across India.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="pt-24 pb-20">
      {/* Hero */}
      <section className="bg-neutral-950 text-white py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm tracking-[0.4em] uppercase mb-4 text-white/60">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-light">
            Privacy <span className="font-semibold">Policy</span>
          </h1>
          <p className="mt-4 text-white/50 text-sm">
            Last updated: March 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="space-y-12 text-neutral-700 leading-relaxed">
          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              1. Introduction
            </h2>
            <p>
              At Airweave, we value your trust and are committed to protecting
              your personal information. This Privacy Policy explains how
              Airweave Clothing Pvt. Ltd. (&quot;Airweave,&quot; &quot;we,&quot;
              &quot;our,&quot; or &quot;us&quot;) collects, uses, stores, and
              shares your information when you visit{" "}
              <span className="font-medium text-neutral-900">
                www.airweave.in
              </span>{" "}
              or interact with our services.
            </p>
            <p className="mt-4">
              This policy complies with the Information Technology Act, 2000, the
              Information Technology (Reasonable Security Practices and
              Procedures and Sensitive Personal Data or Information) Rules, 2011,
              and the Digital Personal Data Protection Act, 2023 as applicable.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              2. Information We Collect
            </h2>
            <p>We collect the following types of information:</p>

            <h3 className="text-lg font-semibold text-neutral-900 mt-6 mb-2">
              a) Information You Provide
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Full name, email address, phone number</li>
              <li>Shipping and billing addresses</li>
              <li>Payment details (processed securely via our payment gateway — we do not store card numbers)</li>
              <li>Account credentials (email and encrypted password)</li>
              <li>Size preferences and wishlists</li>
              <li>Communications you send us (support queries, feedback)</li>
            </ul>

            <h3 className="text-lg font-semibold text-neutral-900 mt-6 mb-2">
              b) Information Collected Automatically
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>IP address, browser type, device information</li>
              <li>Pages visited, time spent, click patterns</li>
              <li>Referring URLs and search terms</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h3 className="text-lg font-semibold text-neutral-900 mt-6 mb-2">
              c) Information From Third Parties
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Payment confirmation from our payment processors (Razorpay)</li>
              <li>Shipping and delivery status from logistics partners</li>
              <li>Social media profile data if you log in via Google or Facebook</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              3. How We Use Your Information
            </h2>
            <p>We use your personal data for the following purposes:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Processing and fulfilling your orders for Airweave linen garments</li>
              <li>Sending order confirmations, shipping updates, and delivery notifications</li>
              <li>Providing customer support and resolving disputes</li>
              <li>Personalising your shopping experience and product recommendations</li>
              <li>Sending promotional communications (only with your consent — you can opt out at any time)</li>
              <li>Improving our website, products, and services through analytics</li>
              <li>Detecting and preventing fraud</li>
              <li>Complying with legal obligations under Indian law</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              4. Cookies &amp; Tracking
            </h2>
            <p>
              We use cookies and similar technologies to enhance your browsing
              experience. These include:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>
                <span className="font-medium text-neutral-900">Essential cookies:</span>{" "}
                Required for the website to function (cart, session, authentication)
              </li>
              <li>
                <span className="font-medium text-neutral-900">Analytics cookies:</span>{" "}
                Help us understand how visitors use our site (Google Analytics)
              </li>
              <li>
                <span className="font-medium text-neutral-900">Marketing cookies:</span>{" "}
                Used to deliver relevant advertisements (Meta Pixel, Google Ads)
              </li>
            </ul>
            <p className="mt-4">
              You can manage your cookie preferences through your browser
              settings. Disabling certain cookies may affect your ability to use
              some features of our website.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              5. Data Sharing &amp; Disclosure
            </h2>
            <p>
              We do not sell your personal data. We may share your information
              with:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>
                <span className="font-medium text-neutral-900">Logistics partners</span>{" "}
                (Delhivery, Blue Dart, DTDC) for order delivery
              </li>
              <li>
                <span className="font-medium text-neutral-900">Payment processors</span>{" "}
                (Razorpay) for secure transaction processing
              </li>
              <li>
                <span className="font-medium text-neutral-900">Analytics providers</span>{" "}
                (Google Analytics) to improve our services
              </li>
              <li>
                <span className="font-medium text-neutral-900">Marketing platforms</span>{" "}
                (Meta, Google) for advertising with your consent
              </li>
              <li>
                <span className="font-medium text-neutral-900">Legal authorities</span>{" "}
                when required by Indian law or to protect our rights
              </li>
            </ul>
            <p className="mt-4">
              All third-party service providers are contractually obligated to
              handle your data in accordance with applicable data protection
              laws.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              6. Data Storage &amp; Security
            </h2>
            <p>
              Your data is stored on secure servers within India. We implement
              industry-standard security measures including:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>256-bit SSL/TLS encryption for all data in transit</li>
              <li>Encrypted storage for sensitive personal information</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Role-based access control for internal teams</li>
            </ul>
            <p className="mt-4">
              While we take every reasonable precaution to protect your data, no
              method of electronic storage is 100% secure. We encourage you to
              use strong passwords and keep your account credentials
              confidential.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              7. Data Retention
            </h2>
            <p>
              We retain your personal data for as long as necessary to fulfil
              the purposes outlined in this policy, or as required by law.
              Specifically:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Order and transaction records: 8 years (as per Indian tax and accounting regulations)</li>
              <li>Account data: Until you request deletion</li>
              <li>Marketing preferences: Until you opt out</li>
              <li>Analytics data: 26 months</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              8. Your Rights
            </h2>
            <p>
              Under the Digital Personal Data Protection Act, 2023, you have the
              right to:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request erasure of your data (subject to legal retention requirements)</li>
              <li>Withdraw consent for marketing communications at any time</li>
              <li>Nominate a representative to exercise your rights in case of death or incapacity</li>
              <li>Lodge a grievance with the Data Protection Board of India</li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, contact our Grievance Officer at{" "}
              <span className="font-medium text-neutral-900">
                privacy@airweave.in
              </span>
              . We will respond within 30 days.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              9. Children&apos;s Privacy
            </h2>
            <p>
              Our website is not directed at individuals under the age of 18. We
              do not knowingly collect personal data from minors. If you believe
              a child has provided us with personal information, please contact
              us and we will promptly delete it.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              10. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with the revised &quot;Last
              updated&quot; date. We encourage you to review this policy
              periodically. Material changes will also be communicated via email
              to registered users.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              11. Contact Us
            </h2>
            <p>
              For any privacy-related queries or to exercise your data rights,
              please contact:
            </p>
            <ul className="mt-3 space-y-1">
              <li>
                <span className="font-medium text-neutral-900">
                  Grievance Officer:
                </span>{" "}
                privacy@airweave.in
              </li>
              <li>
                <span className="font-medium text-neutral-900">Email:</span>{" "}
                support@airweave.in
              </li>
              <li>
                <span className="font-medium text-neutral-900">Phone:</span>{" "}
                +91 22 4000 5000
              </li>
              <li>
                <span className="font-medium text-neutral-900">Address:</span>{" "}
                Airweave Clothing Pvt. Ltd., 14 Turner Road, Bandra West, Mumbai
                400050, Maharashtra, India
              </li>
            </ul>
          </div>

          <div className="border-t border-neutral-200 pt-8">
            <p className="text-sm text-neutral-500">
              By using our website, you acknowledge that you have read and
              understood this Privacy Policy. For our complete terms, please
              review our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 text-neutral-700 hover:text-neutral-900 transition-colors"
              >
                Terms of Service
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
