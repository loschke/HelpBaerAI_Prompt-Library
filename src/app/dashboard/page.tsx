"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { UserTable } from "@/components/dashboard/user-table"
import { UserEditPanel } from "@/components/dashboard/user-edit-panel"
import { Role, SubscriptionTier } from "@prisma/client"
import { useSession } from "next-auth/react"

interface User {
  id: string
  firstName: string
  lastName?: string | null
  email: string
  role: Role
  subscriptionTier: SubscriptionTier
  referralCode?: string
  isVerified: boolean
  isDeleted?: boolean
  deletedAt?: Date
}

interface EditableUserFields {
  role: Role
  subscriptionTier: SubscriptionTier
  referralCode?: string
  isVerified: boolean
}

export default function DashboardPage() {
  const { data: session } = useSession()
  const [users, setUsers] = useState<User[]>([])
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [includeDeleted, setIncludeDeleted] = useState(false)

  const isSuperAdmin = session?.user?.role === Role.SUPER_ADMIN

  // Get the currently selected user
  const selectedUser = selectedUserId 
    ? users.find(user => user.id === selectedUserId)
    : undefined

  // Fetch users
  const fetchUsers = async () => {
    try {
      const url = new URL('/api/dashboard/users', window.location.origin)
      if (includeDeleted) {
        url.searchParams.set('includeDeleted', 'true')
      }
      
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }
      const data = await response.json()
      setUsers(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  // Initial fetch
  useEffect(() => {
    fetchUsers()
  }, [includeDeleted])

  const handleEdit = (userId: string) => {
    setSelectedUserId(userId)
    setIsPanelOpen(true)
  }

  const handleDelete = async (userId: string) => {
    const user = users.find(u => u.id === userId)
    if (!user) return

    const confirmed = window.confirm(
      `Möchten Sie den Benutzer ${user.firstName} ${user.lastName} wirklich löschen?`
    )

    if (confirmed) {
      try {
        const response = await fetch(`/api/dashboard/users/${userId}`, {
          method: 'DELETE',
        })

        if (!response.ok) {
          throw new Error('Failed to delete user')
        }

        // Refresh the users list
        await fetchUsers()
      } catch (error) {
        console.error('Error deleting user:', error)
      }
    }
  }

  const handleSave = async (userId: string, data: EditableUserFields) => {
    try {
      const response = await fetch(`/api/dashboard/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to update user')
      }

      // Refresh the users list
      await fetchUsers()
      // Close the edit panel
      handleClose()
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  const handleClose = () => {
    setIsPanelOpen(false)
    setSelectedUserId(null)
  }

  return (
    <>
      <Card className="border-border/50 bg-secondary">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold font-ff-clan">
            Registrierte Benutzer
          </CardTitle>
          {isSuperAdmin && (
            <div className="flex items-center space-x-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={includeDeleted}
                  onChange={(e) => setIncludeDeleted(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Gelöschte Benutzer anzeigen
                </span>
              </label>
            </div>
          )}
        </CardHeader>
        <Separator className="bg-border/50" />
        <CardContent className="py-6">
          <UserTable 
            users={users}
            isLoading={isLoading}
            error={error}
            onEdit={handleEdit}
            onDelete={handleDelete}
            showDeletedStatus={includeDeleted}
          />
        </CardContent>
      </Card>

      <UserEditPanel
        isOpen={isPanelOpen}
        onClose={handleClose}
        user={selectedUser}
        currentUserRole={session?.user?.role as Role}
        onSave={handleSave}
      />
    </>
  )
}
