import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund & Return Policy | Airweave",
  description:
    "Airweave offers a hassle-free 15-day return and exchange policy on all linen garments. Learn about eligibility, refund timelines, and how to initiate a return.",
};

export default function RefundPolicyPage() {
  return (
    <main className="pt-24 pb-20">
      {/* Hero */}
      <section className="bg-neutral-950 text-white py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm tracking-[0.4em] uppercase mb-4 text-white/60">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-light">
            Refund &amp; Return{" "}
            <span className="font-semibold">Policy</span>
          </h1>
          <p className="mt-4 text-white/50 text-sm">
            Last updated: March 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="space-y-12 text-neutral-700 leading-relaxed">
          {/* Commitment */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6">
            <p className="text-neutral-900 font-medium text-lg mb-2">
              Our Promise
            </p>
            <p>
              At Airweave, we want you to love every piece you own. If something
              doesn&apos;t feel right — the fit, the colour, the feel — we make
              returns and exchanges simple. No questions, no hassle, within 15
              days of delivery.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              1. Return &amp; Exchange Window
            </h2>
            <p>
              You may return or exchange any Airweave product within{" "}
              <span className="font-semibold text-neutral-900">
                15 days from the date of delivery
              </span>
              . The delivery date is determined by the shipping confirmation and
              tracking information provided by our logistics partner.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              2. Eligibility
            </h2>
            <p>To be eligible for a return or exchange, the item must be:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Unused, unwashed, and unaltered</li>
              <li>In its original condition with all tags attached</li>
              <li>In the original Airweave packaging (dust bag and branded box)</li>
              <li>Free from perfume, deodorant, or any stains</li>
            </ul>
            <p className="mt-4 font-medium text-neutral-900">
              The following items are not eligible for return:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Items purchased during final sale or clearance promotions (marked as &quot;Non-Returnable&quot;)</li>
              <li>Gift cards</li>
              <li>Items that have been worn, washed, or altered</li>
              <li>Accessories (pocket squares, cufflinks) unless defective</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              3. How to Initiate a Return
            </h2>
            <p>Returning an item is straightforward:</p>
            <ol className="list-decimal pl-6 mt-3 space-y-3">
              <li>
                <span className="font-medium text-neutral-900">
                  Contact us
                </span>{" "}
                — Email{" "}
                <span className="font-medium text-neutral-900">
                  returns@airweave.in
                </span>{" "}
                or WhatsApp us at +91 22 4000 5000 with your order number and
                reason for return.
              </li>
              <li>
                <span className="font-medium text-neutral-900">
                  Receive approval
                </span>{" "}
                — Our team will review your request and send you a return
                authorisation within 24 hours.
              </li>
              <li>
                <span className="font-medium text-neutral-900">
                  Schedule a pickup
                </span>{" "}
                — We will arrange a free reverse pickup from your address. No
                need to visit a courier office.
              </li>
              <li>
                <span className="font-medium text-neutral-900">
                  Quality check
                </span>{" "}
                — Once we receive the item, our team will inspect it within 2
                business days.
              </li>
              <li>
                <span className="font-medium text-neutral-900">
                  Refund or exchange
                </span>{" "}
                — Upon approval, your refund or exchange will be processed
                immediately.
              </li>
            </ol>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              4. Exchanges
            </h2>
            <p>
              We offer free exchanges for a different size or colour of the same
              product, subject to availability. If the desired variant is out of
              stock, we will process a full refund instead.
            </p>
            <p className="mt-4">
              Exchange shipments are dispatched within 2 business days of
              receiving the returned item and typically arrive within 3–7
              business days, depending on your location.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              5. Refund Methods &amp; Timelines
            </h2>
            <p>
              Refunds are processed to the original payment method. Here are the
              expected timelines after we approve your return:
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border border-neutral-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-neutral-100">
                    <th className="text-left px-4 py-3 font-semibold text-neutral-900">
                      Payment Method
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-neutral-900">
                      Refund Timeline
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  <tr>
                    <td className="px-4 py-3">Credit / Debit Card</td>
                    <td className="px-4 py-3">5–7 business days</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">UPI</td>
                    <td className="px-4 py-3">2–3 business days</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Net Banking</td>
                    <td className="px-4 py-3">5–7 business days</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Cash on Delivery</td>
                    <td className="px-4 py-3">
                      7–10 business days (refund via bank transfer — NEFT/IMPS)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Airweave Store Credit</td>
                    <td className="px-4 py-3">Instant</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-neutral-500">
              You may also choose to receive your refund as Airweave Store
              Credit, which is processed instantly and never expires.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              6. Refund Amount
            </h2>
            <p>Refunds include:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Full product price (inclusive of taxes)</li>
              <li>
                Shipping charges paid on the original order (only if the return
                is due to a defect, damage, or wrong item shipped by us)
              </li>
            </ul>
            <p className="mt-4">Refunds do not include:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>COD handling fees (&#8377;49)</li>
              <li>
                Shipping charges on the original order for change-of-mind
                returns
              </li>
              <li>Gift wrapping charges</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              7. Damaged or Defective Products
            </h2>
            <p>
              Received a damaged, defective, or incorrect item? We sincerely
              apologise. Please contact us within{" "}
              <span className="font-semibold text-neutral-900">
                48 hours of delivery
              </span>{" "}
              with photographs of the issue, and we will:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Arrange an immediate free pickup</li>
              <li>Ship a replacement at no extra cost, or</li>
              <li>Process a full refund including all shipping charges</li>
            </ul>
            <p className="mt-4">
              For defective items, the standard 15-day window applies but we
              encourage you to report issues as early as possible so we can
              resolve them quickly.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              8. Cancellations
            </h2>
            <p>
              You may cancel an order before it has been dispatched by contacting
              us at{" "}
              <span className="font-medium text-neutral-900">
                support@airweave.in
              </span>
              . Once an order has been shipped, it cannot be cancelled — you will
              need to wait for delivery and then initiate a return.
            </p>
            <p className="mt-4">
              For prepaid cancellations, a full refund is processed within 3–5
              business days. COD orders cancelled before dispatch do not incur
              any charges.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              9. Shipping for Returns
            </h2>
            <p>
              We offer{" "}
              <span className="font-semibold text-neutral-900">
                free reverse pickup
              </span>{" "}
              for all eligible returns and exchanges across India. Our logistics
              partner will contact you to schedule a convenient pickup time.
              Pickup is typically arranged within 2–3 business days of return
              approval.
            </p>
            <p className="mt-4">
              If reverse pickup is not available at your pin code, we will
              provide a prepaid shipping label. You can drop the package at the
              nearest courier partner location, and we will reimburse any
              shipping costs up to &#8377;150.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              10. Contact Us
            </h2>
            <p>
              For any questions about returns, exchanges, or refunds, reach out
              to our team:
            </p>
            <ul className="mt-3 space-y-1">
              <li>
                <span className="font-medium text-neutral-900">Email:</span>{" "}
                returns@airweave.in
              </li>
              <li>
                <span className="font-medium text-neutral-900">
                  General support:
                </span>{" "}
                support@airweave.in
              </li>
              <li>
                <span className="font-medium text-neutral-900">
                  WhatsApp / Phone:
                </span>{" "}
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
              This Refund &amp; Return Policy is part of our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 text-neutral-700 hover:text-neutral-900 transition-colors"
              >
                Terms of Service
              </Link>
              . For information on how we handle your data during returns,
              please see our{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 text-neutral-700 hover:text-neutral-900 transition-colors"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
