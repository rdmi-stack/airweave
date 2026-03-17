"use client";

import { use } from "react";
import { useAuthStore } from "@/lib/auth-store";
import { useAdminStore } from "@/lib/admin-store";

export default function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const authOrders = useAuthStore((s) => s.orders);
  const adminOrders = useAdminStore((s) => s.orders);
  const settings = useAdminStore((s) => s.settings);

  const order =
    authOrders.find((o) => o.id === id) ||
    adminOrders.find((o) => o.id === id);

  if (!order) {
    return (
      <main className="pt-24 pb-20 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2">Invoice not found</h1>
          <p className="text-neutral-500">No order found with ID: {id}</p>
        </div>
      </main>
    );
  }

  const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= settings.freeShippingThreshold ? 0 : settings.shippingFee;
  const total = order.total;
  const orderDate = new Date(order.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #invoice-container,
          #invoice-container * {
            visibility: visible;
          }
          #invoice-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 40px;
          }
          #print-button {
            display: none !important;
          }
          nav, footer, header {
            display: none !important;
          }
        }
      `}</style>

      <main className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          {/* Print Button */}
          <div id="print-button" className="mb-8 flex justify-end">
            <button
              onClick={() => window.print()}
              className="bg-neutral-900 text-white px-6 py-3 text-sm font-medium cursor-pointer hover:bg-neutral-800 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18.75 12h.008v.008h-.008V12Zm-3 0h.008v.008h-.008V12Z" />
              </svg>
              Print Invoice
            </button>
          </div>

          {/* Invoice */}
          <div
            id="invoice-container"
            className="bg-white border border-neutral-200 p-10"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-10">
              <div>
                <h1 className="text-3xl font-bold tracking-wider text-black">AIRWEAVE</h1>
                <p className="text-xs text-neutral-500 mt-1 tracking-wide">Premium Linen Clothing</p>
              </div>
              <div className="text-right">
                <h2 className="text-lg font-semibold text-black uppercase tracking-wider">Invoice</h2>
              </div>
            </div>

            {/* Invoice Meta */}
            <div className="flex justify-between mb-10 pb-6 border-b border-neutral-300">
              <div>
                <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Invoice Number</p>
                <p className="text-sm font-semibold text-black">{order.id}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Date</p>
                <p className="text-sm font-semibold text-black">{orderDate}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Status</p>
                <p className="text-sm font-semibold text-black capitalize">{order.status}</p>
              </div>
            </div>

            {/* Billing Address */}
            <div className="mb-10">
              <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2">Bill To</p>
              <p className="text-sm text-black whitespace-pre-line">{order.address}</p>
            </div>

            {/* Items Table */}
            <table className="w-full mb-8" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr className="border-b-2 border-black">
                  <th className="text-left text-xs uppercase tracking-wider text-black py-3 font-semibold">Product</th>
                  <th className="text-left text-xs uppercase tracking-wider text-black py-3 font-semibold">Size</th>
                  <th className="text-left text-xs uppercase tracking-wider text-black py-3 font-semibold">Color</th>
                  <th className="text-right text-xs uppercase tracking-wider text-black py-3 font-semibold">Qty</th>
                  <th className="text-right text-xs uppercase tracking-wider text-black py-3 font-semibold">Unit Price</th>
                  <th className="text-right text-xs uppercase tracking-wider text-black py-3 font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, i) => (
                  <tr key={i} className="border-b border-neutral-200">
                    <td className="py-3 text-sm text-black">{item.name}</td>
                    <td className="py-3 text-sm text-black">{item.size}</td>
                    <td className="py-3 text-sm text-black">{item.color}</td>
                    <td className="py-3 text-sm text-black text-right">{item.quantity}</td>
                    <td className="py-3 text-sm text-black text-right">&#8377;{item.price.toLocaleString("en-IN")}</td>
                    <td className="py-3 text-sm text-black text-right font-medium">
                      &#8377;{(item.price * item.quantity).toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="flex justify-end mb-10">
              <div className="w-64">
                <div className="flex justify-between py-2 text-sm">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="text-black">&#8377;{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between py-2 text-sm">
                  <span className="text-neutral-600">Shipping</span>
                  <span className="text-black">
                    {shipping === 0 ? "FREE" : `\u20B9${shipping.toLocaleString("en-IN")}`}
                  </span>
                </div>
                <div className="flex justify-between py-3 text-base font-bold border-t-2 border-black mt-2">
                  <span className="text-black">Total</span>
                  <span className="text-black">&#8377;{total.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-neutral-300 pt-8 mt-8">
              <p className="text-center text-sm text-neutral-600 mb-6">
                Thank you for shopping with Airweave
              </p>
              <div className="text-center text-xs text-neutral-400 space-y-1">
                <p className="font-semibold text-neutral-500">Airweave</p>
                <p>Bandra West, Mumbai 400050</p>
                <p>GSTIN: 27XXXXX1234X1ZX</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
