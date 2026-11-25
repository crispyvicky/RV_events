const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");

function loadEnv() {
  const raw = fs.readFileSync(path.join(__dirname, "..", ".env.local"), "utf8");
  const env = {};
  for (const line of raw.split(/\r?\n/)) {
    if (!line || line.startsWith("#") || !line.includes("=")) continue;
    const i = line.indexOf("=");
    env[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return env;
}

(async () => {
  const env = loadEnv();
  const client = await MongoClient.connect(env.MONGODB_URI);
  const db = client.db("rvEventsDB");
  const email = (env.ADMIN_EMAIL || "admin@rvevents.com").toLowerCase();
  const password = env.ADMIN_PASSWORD || "ChangeMeStrong123!";
  const existing = await db.collection("admins").findOne({ email });
  if (existing) {
    const hash = await bcrypt.hash(password, 10);
    await db.collection("admins").updateOne({ email }, { $set: { password: hash, role: "admin" } });
    console.log("Admin password reset for", email);
  } else {
    await db.collection("admins").insertOne({
      name: env.ADMIN_NAME || "RV Events Admin",
      email,
      password: await bcrypt.hash(password, 10),
      role: "admin",
      createdAt: new Date(),
    });
    console.log("Admin created for", email);
  }
  await client.close();
  console.log("Email:", email);
  console.log("Password:", password);
})().catch((e) => {
  console.error("FAILED:", e.message);
  process.exit(1);
});
