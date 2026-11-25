"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import QuoteForm from "@/components/admin/QuoteForm";

function NewQuoteInner() {
  const params = useSearchParams();
  const leadId = params.get("leadId") || "";
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">New quotation</h1>
        <p className="text-sm text-zinc-500">Build a premium quote with line items & GST</p>
      </div>
      <QuoteForm leadId={leadId} />
    </div>
  );
}

export default function NewQuotationPage() {
  return (
    <Suspense>
      <NewQuoteInner />
    </Suspense>
  );
}
