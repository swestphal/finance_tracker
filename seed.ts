import dotenv from 'dotenv'
import { drizzle } from 'drizzle-orm/neon-http'
import { categoriesTable } from './db/schema'
import categoriesSeedData from './categoriesSeedData'

dotenv.config({
  path: '.env.local',
})

const db = drizzle(process.env.DATABASE_URL!)

const importedCategoriesSeedData: (typeof categoriesTable.$inferInsert)[] =
  categoriesSeedData

async function main() {
  await db.insert(categoriesTable).values(importedCategoriesSeedData)
}

main()
