'use client'

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'

import { format } from 'date-fns'
import { useState } from 'react'

export default function Filters({
  year,
  month,
  yearsRange,
}: {
  year: number
  month: number
  yearsRange: number[]
}) {
  const [selectedMonth, setSelectedMonth] = useState(month)
  const [selectedYear, setSelectedYear] = useState(year)

  return (
    <>
      <Select
        value={selectedMonth.toString()}
        onValueChange={(newValue) => setSelectedMonth(Number(newValue))}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 12 }).map((_, i) => (
            <SelectItem key={i} value={`${i + 1}`}>
              {format(new Date(selectedYear, i, 1), 'MMM')}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  )
}
