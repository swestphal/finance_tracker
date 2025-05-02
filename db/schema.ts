import { pgTable, integer, numeric, date, text } from 'drizzle-orm/pg-core'

export const categoriesTable = pgTable('categories', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  type: text({
    enum: ['income', 'expense'],
  }).notNull(),
})

export const transactionsTable = pgTable('transactions', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: text('user_id'),
  description: text().notNull(),
  amount: numeric().notNull(),
  transactionDate: date('transaction_date').notNull(),
  categoryId: integer('category_id')
    .references(() => categoriesTable.id)
    .notNull(),
})
