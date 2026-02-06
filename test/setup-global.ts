import path from 'path';
import dotenv from 'dotenv';
import { Client } from 'pg';
import fs from 'fs';

export default async function globalSetup() {
  const envPath = path.resolve(__dirname, '../.env.test');
  dotenv.config({ path: envPath });
  process.env.NODE_ENV = process.env.NODE_ENV ?? 'test';

  const dbUrl = process.env.DATABASE_URL as string;
  await waitForDatabase(dbUrl);
  await resetAndApplyMigrations(dbUrl);
}

async function waitForDatabase(url: string, attempts = 20, delayMs = 1000) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const client = new Client({ connectionString: url });
      await client.connect();
      await client.query('SELECT 1');
      await client.end();
      return;
    } catch (err) {
      if (i === attempts - 1) {
        throw err;
      }
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
}

async function resetAndApplyMigrations(url: string) {
  const client = new Client({ connectionString: url });
  await client.connect();
  try {
    await client.query(
      'DROP SCHEMA IF EXISTS public CASCADE; CREATE SCHEMA public;',
    );
    const migrationsDir = path.resolve(__dirname, '../prisma/migrations');
    const migrationFolders = fs
      .readdirSync(migrationsDir)
      .filter((name) =>
        fs.statSync(path.join(migrationsDir, name)).isDirectory(),
      )
      .sort();

    for (const folder of migrationFolders) {
      const sqlPath = path.join(migrationsDir, folder, 'migration.sql');
      if (!fs.existsSync(sqlPath)) continue;
      const sql = fs.readFileSync(sqlPath, 'utf8');
      await client.query(sql);
    }
  } finally {
    await client.end();
  }
}
