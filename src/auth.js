import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import authConfig from "./auth.config";
import { getDb, hasMongoConfig } from "./lib/mongodb";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Admin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        if (!hasMongoConfig()) return null;

        const db = await getDb();
        let admin = await db.collection("admins").findOne({
          email: credentials.email.toLowerCase(),
        });

        // Bootstrap single admin from env if collection empty
        if (!admin) {
          const seedEmail = (process.env.ADMIN_EMAIL || "admin@rvevents.com").toLowerCase();
          const seedPass = process.env.ADMIN_PASSWORD || "ChangeMeStrong123!";
          const count = await db.collection("admins").countDocuments();
          if (count === 0 && credentials.email.toLowerCase() === seedEmail) {
            const hash = await bcrypt.hash(seedPass, 10);
            const doc = {
              name: process.env.ADMIN_NAME || "RV Events Admin",
              email: seedEmail,
              password: hash,
              role: "admin",
              createdAt: new Date(),
            };
            const result = await db.collection("admins").insertOne(doc);
            admin = { ...doc, _id: result.insertedId };
          }
        }

        if (!admin?.password) return null;
        const valid = await bcrypt.compare(credentials.password, admin.password);
        if (!valid) return null;

        return {
          id: admin._id.toString(),
          name: admin.name,
          email: admin.email,
          role: "admin",
        };
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  trustHost: true,
});
