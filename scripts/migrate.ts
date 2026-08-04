import { Client } from "pg";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function migrate() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  
  try {
    await client.connect();
    console.log("Adding interview_scheduled to candidate_profiles...");
    await client.query(`
      ALTER TABLE candidate_profiles 
      ADD COLUMN IF NOT EXISTS interview_scheduled boolean DEFAULT false NOT NULL;
    `);
    console.log("Migration successful.");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    await client.end();
  }
}

migrate();

migrate();
