export function calcLineAmount(qty, rate) {
  const q = Number(qty) || 0;
  const r = Number(rate) || 0;
  return Math.round(q * r * 100) / 100;
}

export function calcQuoteTotals(lineItems = [], gstPercent = 18) {
  const subtotal = lineItems.reduce(
    (sum, item) => sum + calcLineAmount(item.qty, item.rate),
    0
  );
  const gst = Math.round(subtotal * (Number(gstPercent) / 100) * 100) / 100;
  const cgst = Math.round((gst / 2) * 100) / 100;
  const sgst = Math.round((gst - cgst) * 100) / 100;
  const grandTotal = Math.round((subtotal + gst) * 100) / 100;
  return { subtotal, gstPercent: Number(gstPercent), gst, cgst, sgst, grandTotal };
}

export function formatINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);
}

export async function nextQuoteNumber(db) {
  const settings = await db.collection("settings").findOne({ key: "company" });
  const prefix = settings?.quotePrefix || "RVQ";
  const year = new Date().getFullYear();
  const count = await db.collection("quotations").countDocuments({
    createdAt: {
      $gte: new Date(`${year}-01-01T00:00:00.000Z`),
    },
  });
  const seq = String(count + 1).padStart(4, "0");
  return `${prefix}-${year}-${seq}`;
}
