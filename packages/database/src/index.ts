import { PrismaClient } from "../generated/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// Strip sslrootcert file path from connection string — cert is supplied inline via CA_CERT env var
const rawUrl =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/jpenterprises?schema=public";

// Remove sslrootcert param so pg doesn't try to read a local file in production
const connectionString = rawUrl.replace(/[&?]sslrootcert=[^&]*/g, "");

// Build ssl options — use CA_CERT env var if present, otherwise rely on system CAs
const sslOptions: { rejectUnauthorized: boolean; ca?: string } = {
  rejectUnauthorized: true,
};
if (process.env.CA_CERT) {
  sslOptions.ca = process.env.CA_CERT;
}

// Only enable SSL when the URL contains sslmode (i.e. it's a remote database)
const needsSsl = rawUrl.includes("sslmode=");
const pool = new Pool({
  connectionString,
  ...(needsSsl ? { ssl: sslOptions } : {}),
});

const adapter = new PrismaPg(pool);

const prismaClientSingleton = () => {
  return new PrismaClient({ adapter });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

export * from "../generated/client";
