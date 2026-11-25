import { ObjectId } from "mongodb";
import { requireAdmin } from "@/lib/auth-helpers";
import { DEFAULT_SERVICES } from "@/lib/constants";
import { getDb, hasMongoConfig } from "@/lib/mongodb";

export async function GET() {
  if (!hasMongoConfig()) {
    return Response.json({ services: DEFAULT_SERVICES });
  }
  const db = await getDb();
  const services = await db.collection("services").find({}).sort({ order: 1 }).toArray();
  if (!services.length) return Response.json({ services: DEFAULT_SERVICES });
  return Response.json({
    services: services.map(({ _id, ...rest }) => ({ id: _id.toString(), ...rest })),
  });
}

export async function POST(request) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await request.json();
  const db = await getDb();
  const doc = {
    ...body,
    slug: body.slug || slugify(body.title),
    featured: Boolean(body.featured),
    order: Number(body.order) || 99,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const result = await db.collection("services").insertOne(doc);
  return Response.json({ ok: true, id: result.insertedId.toString() });
}

export async function PUT(request) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await request.json();
  if (!body.id) return Response.json({ error: "id required" }, { status: 400 });

  const { id, ...rest } = body;
  const db = await getDb();
  await db.collection("services").updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...rest, updatedAt: new Date() } }
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
  await db.collection("services").deleteOne({ _id: new ObjectId(id) });
  return Response.json({ ok: true });
}

function slugify(text = "") {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
