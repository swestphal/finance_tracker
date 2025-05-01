import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <Card className="mt-4 max-w-screen-md">
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Link href="/dashboard/transactions/new">New Transaction</Link>
      </CardContent>
    </Card>
  )
}
