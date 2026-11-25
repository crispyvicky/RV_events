import { requireAdmin } from "@/lib/auth-helpers";
import { SITE } from "@/lib/constants";
import { getDb, hasMongoConfig } from "@/lib/mongodb";

const defaults = {
  key: "company",
  companyName: SITE.name,
  email: SITE.email,
  phone: SITE.phone,
  cities: SITE.cities,
  gstPercent: 18,
  quotePrefix: "RVQ",
  address: "Hyderabad & Kakinada, India",
};

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  if (!hasMongoConfig()) return Response.json({ settings: defaults });

  const db = await getDb();
  const settings = await db.collection("settings").findOne({ key: "company" });
  return Response.json({ settings: settings || defaults });
}

export async function PUT(request) {
  const { error } = await requireAdmin();
  if (error) return error;

  const body = await request.json();
  const db = await getDb();
  const payload = {
    key: "company",
    companyName: body.companyName || SITE.name,
    email: body.email || SITE.email,
    phone: body.phone || SITE.phone,
    cities: body.cities || SITE.cities,
    gstPercent: Number(body.gstPercent) || 18,
    quotePrefix: body.quotePrefix || "RVQ",
    address: body.address || "",
    updatedAt: new Date(),
  };

  await db.collection("settings").updateOne(
    { key: "company" },
    { $set: payload, $setOnInsert: { createdAt: new Date() } },
    { upsert: true }
  );

  return Response.json({ ok: true, settings: payload });
}
