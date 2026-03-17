import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Airweave",
  description:
    "Read the Terms of Service for Airweave — India's premium linen clothing brand. Understand our policies on orders, payments, shipping, and more.",
};

export default function TermsOfServicePage() {
  return (
    <main className="pt-24 pb-20">
      {/* Hero */}
      <section className="bg-neutral-950 text-white py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm tracking-[0.4em] uppercase mb-4 text-white/60">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-light">
            Terms of <span className="font-semibold">Service</span>
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
              Welcome to Airweave. These Terms of Service (&quot;Terms&quot;)
              govern your access to and use of the Airweave website at{" "}
              <span className="font-medium text-neutral-900">
                www.airweave.in
              </span>{" "}
              and all associated services, including browsing, purchasing, and
              interacting with our platform. By accessing or using our website,
              you agree to be bound by these Terms. If you do not agree, please
              refrain from using our services.
            </p>
            <p className="mt-4">
              Airweave is operated by Airweave Clothing Pvt. Ltd., a company
              registered in India with its office at 14, Turner Road, Bandra
              West, Mumbai 400050, Maharashtra, India.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              2. Eligibility
            </h2>
            <p>
              You must be at least 18 years of age to make a purchase on
              Airweave. By placing an order, you represent and warrant that you
              are of legal age and have the legal capacity to enter into a
              binding contract under the Indian Contract Act, 1872.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              3. Products &amp; Pricing
            </h2>
            <p>
              All products listed on our website are premium linen garments
              crafted from 100% European flax linen. We make every effort to
              display colours and details accurately, but slight variations may
              occur due to screen settings and the natural character of linen
              fabric.
            </p>
            <p className="mt-4">
              Prices are listed in Indian Rupees (&#8377;) and are inclusive of
              all applicable taxes (GST). We reserve the right to modify pricing
              at any time without prior notice. Any price changes will not affect
              orders that have already been confirmed.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              4. Orders &amp; Payment
            </h2>
            <p>
              When you place an order, you will receive an order confirmation via
              email. This confirmation does not constitute acceptance of your
              order — acceptance occurs when we dispatch your order and send a
              shipping confirmation.
            </p>
            <p className="mt-4">We accept the following payment methods:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Credit and debit cards (Visa, Mastercard, RuPay)</li>
              <li>UPI (Google Pay, PhonePe, Paytm)</li>
              <li>Net banking</li>
              <li>Cash on Delivery (COD) — available on orders up to &#8377;10,000</li>
              <li>EMI options on select banks</li>
            </ul>
            <p className="mt-4">
              A COD handling fee of &#8377;49 may apply. We reserve the right to
              cancel orders that we suspect are fraudulent or placed in bad
              faith.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              5. Shipping &amp; Delivery
            </h2>
            <p>
              We offer free standard shipping on all prepaid orders above
              &#8377;2,999. For orders below this threshold, a flat shipping fee
              of &#8377;149 applies.
            </p>
            <p className="mt-4">Estimated delivery timelines:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Metro cities (Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad): 3–5 business days</li>
              <li>Tier 2 cities: 5–7 business days</li>
              <li>Rest of India: 7–10 business days</li>
            </ul>
            <p className="mt-4">
              Delivery timelines are estimates and may vary due to unforeseen
              circumstances such as weather, courier delays, or public holidays.
              Airweave is not liable for delays caused by third-party logistics
              partners.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              6. Returns &amp; Exchanges
            </h2>
            <p>
              We offer a 15-day return and exchange policy from the date of
              delivery. Please refer to our{" "}
              <Link
                href="/refund-policy"
                className="underline underline-offset-4 text-neutral-900 font-medium hover:text-neutral-600 transition-colors"
              >
                Refund &amp; Return Policy
              </Link>{" "}
              for complete details on eligibility, process, and timelines.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              7. Intellectual Property
            </h2>
            <p>
              All content on this website — including but not limited to text,
              images, graphics, logos, product designs, and code — is the
              property of Airweave Clothing Pvt. Ltd. and is protected under
              Indian copyright and trademark laws. You may not reproduce,
              distribute, or create derivative works from any content without our
              prior written consent.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              8. User Accounts
            </h2>
            <p>
              You may create an account to streamline your shopping experience.
              You are responsible for maintaining the confidentiality of your
              login credentials and for all activity that occurs under your
              account. Please notify us immediately at{" "}
              <span className="font-medium text-neutral-900">
                support@airweave.in
              </span>{" "}
              if you suspect unauthorised access.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              9. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by applicable Indian law, Airweave
              shall not be liable for any indirect, incidental, special, or
              consequential damages arising out of or in connection with your use
              of our website or products. Our total liability in any case shall
              not exceed the amount paid by you for the specific product giving
              rise to the claim.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              10. Privacy
            </h2>
            <p>
              Your use of our website is also governed by our{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 text-neutral-900 font-medium hover:text-neutral-600 transition-colors"
              >
                Privacy Policy
              </Link>
              , which describes how we collect, use, and protect your personal
              information.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              11. Governing Law &amp; Disputes
            </h2>
            <p>
              These Terms are governed by the laws of India. Any disputes arising
              from these Terms or your use of our services shall be subject to
              the exclusive jurisdiction of the courts in Mumbai, Maharashtra.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              12. Changes to These Terms
            </h2>
            <p>
              We may update these Terms from time to time. Changes will be posted
              on this page with the updated &quot;Last updated&quot; date. Your
              continued use of our website following any changes constitutes
              acceptance of those changes.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              13. Contact Us
            </h2>
            <p>
              If you have any questions about these Terms, please reach out to
              us:
            </p>
            <ul className="mt-3 space-y-1">
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
        </div>
      </section>
    </main>
  );
}
