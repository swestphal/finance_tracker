'use server'

import { db } from '@/db'
import { transactionsTable } from '@/db/schema'
import { auth } from '@clerk/nextjs/server'
import { addDays, subYears } from 'date-fns'
import { z } from 'zod'

const transactionSchema = z.object({
  categoryId: z.number().positive('Please select a category'),
  transactionDate: z.coerce
    .date()
    .max(addDays(new Date(), 1), 'Transaction date connot be in the future')
    .min(
      subYears(new Date(), 50),
      'Transaction date cannot be older than 50 years'
    ),
  amount: z.number().positive('Amount must be greater than Zero'),
  description: z
    .string()
    .min(3, 'Description must contain at least 3 characters')
    .max(300, 'Description must not contain more than 300 characters'),
})
export const createTransaction = async (data: {
  amount: number
  transactionDate: string
  description: string
  categoryId: number
}) => {
  const { userId } = await auth()
  if (!userId) {
    return {
      error: true,
      message: 'Unauthorized',
    }
  }

  const validation = transactionSchema.safeParse(data)
  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0].message,
      // issues: validation.error.format(),
    }
  }
  const [transaction] = await db
    .insert(transactionsTable)
    .values({
      userId,
      amount: data.amount.toString(),
      description: data.description,
      transactionDate: data.transactionDate,
      categoryId: data.categoryId,
    })
    .returning()

  return {
    id: transaction.id,
  }
}
