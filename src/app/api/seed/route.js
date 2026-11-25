import bcrypt from "bcryptjs";
import { requireAdmin } from "@/lib/auth-helpers";
import { DEFAULT_SERVICES, EVENT_TYPES, SITE } from "@/lib/constants";
import { DEFAULT_PROJECTS } from "@/lib/data";
import { getDb, hasMongoConfig } from "@/lib/mongodb";
import { defaultLinesFor } from "@/lib/quoteTemplates";

export async function POST() {
  const { error } = await requireAdmin();
  if (error) return error;
  if (!hasMongoConfig()) {
    return Response.json({ error: "MongoDB not configured" }, { status: 400 });
  }

  const db = await getDb();

  const adminEmail = (process.env.ADMIN_EMAIL || "admin@rvevents.com").toLowerCase();
  const adminPass = process.env.ADMIN_PASSWORD || "ChangeMeStrong123!";
  const existingAdmin = await db.collection("admins").findOne({ email: adminEmail });
  if (!existingAdmin) {
    await db.collection("admins").insertOne({
      name: process.env.ADMIN_NAME || "RV Events Admin",
      email: adminEmail,
      password: await bcrypt.hash(adminPass, 10),
      role: "admin",
      createdAt: new Date(),
    });
  }

  const serviceCount = await db.collection("services").countDocuments();
  if (serviceCount === 0) {
    await db.collection("services").insertMany(
      DEFAULT_SERVICES.map((s) => ({ ...s, createdAt: new Date(), updatedAt: new Date() }))
    );
  } else {
    for (const s of DEFAULT_SERVICES) {
      await db.collection("services").updateOne(
        { slug: s.slug },
        {
          $set: {
            title: s.title,
            subtitle: s.subtitle,
            category: s.category,
            excerpt: s.excerpt,
            description: s.description,
            image: s.image,
            featured: s.featured,
            order: s.order,
            updatedAt: new Date(),
          },
        }
      );
    }
  }

  const projectCount = await db.collection("projects").countDocuments();
  if (projectCount === 0) {
    await db.collection("projects").insertMany(
      DEFAULT_PROJECTS.map((p) => ({ ...p, createdAt: new Date(), updatedAt: new Date() }))
    );
  } else {
    for (const p of DEFAULT_PROJECTS) {
      await db.collection("projects").updateOne(
        { slug: p.slug },
        {
          $set: {
            title: p.title,
            category: p.category,
            city: p.city,
            excerpt: p.excerpt,
            description: p.description,
            image: p.image,
            gallery: p.gallery,
            featured: p.featured,
            year: p.year,
            updatedAt: new Date(),
          },
        }
      );
    }
  }

  await db.collection("quoteTemplates").deleteMany({});
  const templates = EVENT_TYPES.map((type) => ({
    name: `${type} — Full production`,
    eventType: type,
    lineItems: defaultLinesFor(type),
    notes:
      "Indicative RV EVENTS quotation. Final pricing depends on venue, guest count, city (Hyderabad / Kakinada), and production scope. GST extra as applicable.",
    createdAt: new Date(),
  }));
  await db.collection("quoteTemplates").insertMany(templates);

  await db.collection("settings").updateOne(
    { key: "company" },
    {
      $set: {
        key: "company",
        companyName: SITE.name,
        email: SITE.email,
        phone: SITE.phone,
        cities: SITE.cities,
        gstPercent: 18,
        quotePrefix: "RVQ",
        address: "Hyderabad & Kakinada, India",
        updatedAt: new Date(),
      },
      $setOnInsert: { createdAt: new Date() },
    },
    { upsert: true }
  );

  return Response.json({ ok: true, message: "Seed complete" });
}

