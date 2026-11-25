"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import QuoteForm from "@/components/admin/QuoteForm";

export default function EditQuotationPage() {
  const params = useParams();
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!params?.id) return;
    fetch(`/api/quotations?id=${params.id}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.quotation) setQuote(d.quotation);
        else setError(d.error || "Not found");
      })
      .catch((e) => setError(e.message));
  }, [params?.id]);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!quote) return <p className="text-zinc-500">Loading…</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{quote.quoteNumber}</h1>
        <p className="text-sm text-zinc-500 capitalize">Status: {quote.status}</p>
      </div>
      <QuoteForm initial={quote} />
    </div>
  );
}
