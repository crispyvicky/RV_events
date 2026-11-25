if (process.env.NEXT_RUNTIME === "edge") {
  throw new Error("MongoDB cannot be used in the Edge Runtime.");
}

import { MongoClient, ServerApiVersion } from "mongodb";

function resolveUri() {
  if (process.env.MONGODB_URI) return process.env.MONGODB_URI;
  if (process.env.DB_USER && process.env.DB_PASS) {
    return `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cewig2g.mongodb.net/?appName=RVEvents`;
  }
  return null;
}

const uri = resolveUri();

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let clientPromise;

if (uri) {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      const client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    const client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
}

export function hasMongoConfig() {
  return Boolean(uri);
}

export async function getDb() {
  if (!clientPromise) {
    throw new Error(
      "MongoDB is not configured. Set MONGODB_URI (or DB_USER + DB_PASS) in .env.local"
    );
  }
  const client = await clientPromise;
  return client.db("rvEventsDB");
}

export default clientPromise;
