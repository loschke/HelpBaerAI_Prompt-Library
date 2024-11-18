"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Role, SubscriptionTier } from "@prisma/client"
import { Edit, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { de } from "date-fns/locale"

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

interface UserTableProps {
  users: User[]
  isLoading?: boolean
  error?: string | null
  onEdit: (userId: string) => void
  onDelete: (userId: string) => void
  showDeletedStatus?: boolean
}

export function UserTable({ 
  users, 
  isLoading, 
  error,
  onEdit, 
  onDelete,
  showDeletedStatus = false
}: UserTableProps) {
  const getRoleEmoji = (role: Role) => {
    switch (role) {
      case Role.SUPER_ADMIN:
      case Role.ADMIN:
        return "👑"
      case Role.PARTNER:
        return "🤝"
      case Role.TEAM:
        return "👤"
      case Role.USER:
        return "👤"
      default:
        return ""
    }
  }

  const getSubscriptionEmoji = (tier: SubscriptionTier) => {
    switch (tier) {
      case SubscriptionTier.PREMIUM:
        return "⭐"
      case SubscriptionTier.LIFETIME:
        return "🤝"
      case SubscriptionTier.FREE:
        return "🆓"
      default:
        return ""
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-600 dark:text-red-400">
        Error: {error}
      </div>
    )
  }

  return (
    <div className="rounded-md border border-border/50">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Referral Code</TableHead>
            <TableHead>Verifiziert</TableHead>
            {showDeletedStatus && <TableHead>Status</TableHead>}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className={user.isDeleted ? "opacity-60" : ""}>
              <TableCell className="font-medium">
                {user.firstName} {user.lastName}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {getRoleEmoji(user.role)} {user.role}
              </TableCell>
              <TableCell>
                {getSubscriptionEmoji(user.subscriptionTier)} {user.subscriptionTier}
              </TableCell>
              <TableCell>{user.referralCode}</TableCell>
              <TableCell>
                {user.isVerified ? "✅" : "❌"}
              </TableCell>
              {showDeletedStatus && (
                <TableCell>
                  {user.isDeleted ? (
                    <span title={`Gelöscht am ${format(new Date(user.deletedAt!), 'dd.MM.yyyy', { locale: de })}`}>
                      🗑️ Gelöscht
                    </span>
                  ) : (
                    <span>✅ Aktiv</span>
                  )}
                </TableCell>
              )}
              <TableCell className="text-right space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(user.id)}
                  disabled={user.isDeleted}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(user.id)}
                  disabled={user.isDeleted}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
