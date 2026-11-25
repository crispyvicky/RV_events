import { ObjectId } from "mongodb";
import { requireAdmin } from "@/lib/auth-helpers";
import { getDb, hasMongoConfig } from "@/lib/mongodb";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  if (!hasMongoConfig()) return Response.json({ templates: [] });

  const db = await getDb();
  const templates = await db.collection("quoteTemplates").find({}).toArray();
  return Response.json({
    templates: templates.map(({ _id, ...rest }) => ({ id: _id.toString(), ...rest })),
  });
}

export async function POST(request) {
  const { error } = await requireAdmin();
  if (error) return error;
  const body = await request.json();
  const db = await getDb();
  const doc = {
    name: body.name,
    eventType: body.eventType || "Custom",
    lineItems: body.lineItems || [],
    notes: body.notes || "",
    createdAt: new Date(),
  };
  const result = await db.collection("quoteTemplates").insertOne(doc);
  return Response.json({ ok: true, id: result.insertedId.toString() });
}

export async function DELETE(request) {
  const { error } = await requireAdmin();
  if (error) return error;
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return Response.json({ error: "id required" }, { status: 400 });
  const db = await getDb();
  await db.collection("quoteTemplates").deleteOne({ _id: new ObjectId(id) });
  return Response.json({ ok: true });
}
