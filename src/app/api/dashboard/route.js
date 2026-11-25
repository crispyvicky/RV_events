import { requireAdmin } from "@/lib/auth-helpers";
import { getDb, hasMongoConfig } from "@/lib/mongodb";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  if (!hasMongoConfig()) {
    return Response.json({
      leadsTotal: 0,
      leadsNew: 0,
      quotes: { draft: 0, sent: 0, accepted: 0, rejected: 0, expired: 0, total: 0 },
      services: 0,
      projects: 0,
    });
  }

  const db = await getDb();
  const [leadsTotal, leadsNew, services, projects, quotations] = await Promise.all([
    db.collection("leads").countDocuments(),
    db.collection("leads").countDocuments({ status: "new" }),
    db.collection("services").countDocuments(),
    db.collection("projects").countDocuments(),
    db.collection("quotations").find({}).project({ status: 1 }).toArray(),
  ]);

  const quotes = { draft: 0, sent: 0, accepted: 0, rejected: 0, expired: 0, total: quotations.length };
  for (const q of quotations) {
    if (quotes[q.status] !== undefined) quotes[q.status] += 1;
  }

  return Response.json({ leadsTotal, leadsNew, quotes, services, projects });
}
