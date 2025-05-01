'use client'

import { UserButton } from '@clerk/nextjs'
import { ChartBarIcon, ChartColumnBigIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function UserDropdown() {
  const router = useRouter()
  return (
    <UserButton
      showName
      appearance={{
        elements: {
          userButtonOuterIdentifier: {
            color: 'white',
          },
        },
      }}
    >
      <UserButton.MenuItems>
        <UserButton.Action
          label="Dashboard"
          labelIcon={<ChartBarIcon size={16} />}
          onClick={() => router.push('/dashboard')}
        />
      </UserButton.MenuItems>
    </UserButton>
  )
}
