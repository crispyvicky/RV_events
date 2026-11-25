import { ObjectId } from "mongodb";
import { requireAdmin } from "@/lib/auth-helpers";
import { getDb, hasMongoConfig } from "@/lib/mongodb";
import { calcLineAmount, calcQuoteTotals, nextQuoteNumber } from "@/lib/quotes";

export async function GET(request) {
  const { error } = await requireAdmin();
  if (error) return error;
  if (!hasMongoConfig()) return Response.json({ quotations: [] });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const db = await getDb();

  if (id) {
    const doc = await db.collection("quotations").findOne({ _id: new ObjectId(id) });
    if (!doc) return Response.json({ error: "Not found" }, { status: 404 });
    const { _id, ...rest } = doc;
    return Response.json({ quotation: { id: _id.toString(), ...rest } });
  }

  const quotations = await db
    .collection("quotations")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return Response.json({
    quotations: quotations.map(({ _id, ...rest }) => ({ id: _id.toString(), ...rest })),
  });
}

export async function POST(request) {
  const { session, error } = await requireAdmin();
  if (error) return error;

  const body = await request.json();
  const db = await getDb();
  const settings = await db.collection("settings").findOne({ key: "company" });
  const gstPercent = body.gstPercent ?? settings?.gstPercent ?? 18;

  const lineItems = (body.lineItems || []).map((item) => ({
    description: item.description || "",
    qty: Number(item.qty) || 0,
    unit: item.unit || "item",
    rate: Number(item.rate) || 0,
    amount: calcLineAmount(item.qty, item.rate),
  }));

  const totals = calcQuoteTotals(lineItems, gstPercent);
  const quoteNumber = body.quoteNumber || (await nextQuoteNumber(db));

  const doc = {
    quoteNumber,
    status: body.status || "draft",
    leadId: body.leadId || null,
    client: {
      name: body.client?.name || "",
      email: body.client?.email || "",
      phone: body.client?.phone || "",
      city: body.client?.city || "Hyderabad",
    },
    event: {
      type: body.event?.type || "Custom",
      date: body.event?.date || null,
      venue: body.event?.venue || "",
      guestCount: body.event?.guestCount ? Number(body.event.guestCount) : null,
    },
    lineItems,
    ...totals,
    validityDate: body.validityDate || null,
    notes: body.notes || "",
    createdBy: session.user.email,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await db.collection("quotations").insertOne(doc);

  if (body.leadId) {
    try {
      await db.collection("leads").updateOne(
        { _id: new ObjectId(body.leadId) },
        { $set: { status: "quoted", updatedAt: new Date() } }
      );
    } catch {
      /* ignore invalid lead id */
    }
  }

  return Response.json({ ok: true, id: result.insertedId.toString(), quoteNumber });
}

export async function PUT(request) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await request.json();
  if (!body.id) return Response.json({ error: "id required" }, { status: 400 });

  const db = await getDb();
  const settings = await db.collection("settings").findOne({ key: "company" });
  const gstPercent = body.gstPercent ?? settings?.gstPercent ?? 18;

  const lineItems = (body.lineItems || []).map((item) => ({
    description: item.description || "",
    qty: Number(item.qty) || 0,
    unit: item.unit || "item",
    rate: Number(item.rate) || 0,
    amount: calcLineAmount(item.qty, item.rate),
  }));
  const totals = calcQuoteTotals(lineItems, gstPercent);

  const { id, ...rest } = body;
  await db.collection("quotations").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...rest,
        lineItems,
        ...totals,
        updatedAt: new Date(),
      },
    }
  );

  return Response.json({ ok: true });
}

export async function DELETE(request) {
  const { error } = await requireAdmin();
  if (error) return error;
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return Response.json({ error: "id required" }, { status: 400 });
  const db = await getDb();
  await db.collection("quotations").deleteOne({ _id: new ObjectId(id) });
  return Response.json({ ok: true });
}
