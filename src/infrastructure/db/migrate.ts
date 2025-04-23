import fs from "fs";
import path from "path";
import { db } from "../db/connection";

async function runMigrations() {
  // Crea tabla para controlar qué migraciones se han ejecutado
  await db.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) UNIQUE,
      run_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const migrationDir = path.join(__dirname, "migrations");
  const files = fs.readdirSync(migrationDir).filter(f => f.endsWith(".sql")).sort();

  for (const file of files) {
    const [rows] = await db.query("SELECT * FROM migrations WHERE name = ?", [file]);
    if ((rows as any[]).length === 0) {
      const sql = fs.readFileSync(path.join(migrationDir, file), "utf-8");
      console.log(`▶️ Running: ${file}`);
      await db.query(sql);
      await db.query("INSERT INTO migrations (name) VALUES (?)", [file]);
    } else {
      console.log(`✔️ Already run: ${file}`);
    }
  }

  console.log("✅ Migrations complete.");
  process.exit(0);
}

runMigrations().catch((err) => {
  console.error("❌ Migration error:", err);
  process.exit(1);
});