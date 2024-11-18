"use client"

import React, { useState } from 'react'
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { Role, SubscriptionTier } from "@prisma/client"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface UserEditPanelProps {
  isOpen: boolean
  onClose: () => void
  user?: {
    id: string
    firstName: string
    lastName?: string | null
    email: string
    role: Role
    subscriptionTier: SubscriptionTier
    referralCode?: string
    isVerified: boolean
  }
  currentUserRole?: Role
  onSave: (userId: string, data: EditableUserFields) => void
}

interface EditableUserFields {
  role: Role
  subscriptionTier: SubscriptionTier
  referralCode?: string
  isVerified: boolean
}

export function UserEditPanel({ 
  isOpen, 
  onClose, 
  user, 
  currentUserRole,
  onSave,
}: UserEditPanelProps) {
  const [formData, setFormData] = useState<EditableUserFields>({
    role: user?.role || Role.USER,
    subscriptionTier: user?.subscriptionTier || SubscriptionTier.FREE,
    referralCode: user?.referralCode || '',
    isVerified: user?.isVerified || false
  })
  const [isSaving, setIsSaving] = useState(false)

  // Reset form when user changes
  React.useEffect(() => {
    if (user) {
      setFormData({
        role: user.role,
        subscriptionTier: user.subscriptionTier,
        referralCode: user.referralCode || '',
        isVerified: user.isVerified
      })
    }
  }, [user])

  const handleSave = async () => {
    if (!user) return

    setIsSaving(true)
    try {
      const response = await fetch(`/api/dashboard/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update user')
      }

      const updatedUser = await response.json()
      onSave(user.id, formData)
      onClose()
    } catch (error) {
      console.error('Error updating user:', error)
    } finally {
      setIsSaving(false)
    }
  }

  // Only SUPER_ADMIN can modify ADMIN roles
  const canModifyRole = currentUserRole === Role.SUPER_ADMIN

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Side Panel */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full bg-white dark:bg-zinc-900",
          "transform transition-transform duration-300 ease-in-out z-50",
          "w-full sm:w-[80%] md:w-[50%] lg:w-[36%]",
          "p-6 shadow-xl overflow-y-auto",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full"
          aria-label="Close panel"
        >
          <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Edit User
          </h2>
          {user && (
            <p className="text-gray-500 dark:text-gray-400">
              {user.firstName} {user.lastName} ({user.email})
            </p>
          )}
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Role Select */}
          <div className="space-y-2">
            <Label>Role</Label>
            <Select
              value={formData.role}
              onValueChange={(value: Role) => setFormData(prev => ({ ...prev, role: value }))}
              disabled={!canModifyRole}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={Role.USER}>User</SelectItem>
                <SelectItem value={Role.TEAM}>Team</SelectItem>
                <SelectItem value={Role.PARTNER}>Partner</SelectItem>
                <SelectItem value={Role.ADMIN}>Admin</SelectItem>
                {currentUserRole === Role.SUPER_ADMIN && (
                  <SelectItem value={Role.SUPER_ADMIN}>Super Admin</SelectItem>
                )}
              </SelectContent>
            </Select>
            {!canModifyRole && (
              <p className="text-sm text-gray-500">
                Only Super Admins can modify user roles
              </p>
            )}
          </div>

          {/* Subscription Tier Select */}
          <div className="space-y-2">
            <Label>Subscription Plan</Label>
            <Select
              value={formData.subscriptionTier}
              onValueChange={(value: SubscriptionTier) => 
                setFormData(prev => ({ ...prev, subscriptionTier: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={SubscriptionTier.FREE}>Free</SelectItem>
                <SelectItem value={SubscriptionTier.PREMIUM}>Premium</SelectItem>
                <SelectItem value={SubscriptionTier.LIFETIME}>Lifetime</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Referral Code Input */}
          <div className="space-y-2">
            <Label htmlFor="referralCode">Referral Code</Label>
            <Input
              id="referralCode"
              value={formData.referralCode}
              onChange={(e) => 
                setFormData(prev => ({ ...prev, referralCode: e.target.value }))
              }
              placeholder="Enter referral code"
            />
          </div>

          {/* Verified Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isVerified"
              checked={formData.isVerified}
              onCheckedChange={(checked: boolean) =>
                setFormData(prev => ({ ...prev, isVerified: checked }))
              }
            />
            <Label htmlFor="isVerified">
              Email Verified
            </Label>
          </div>

          {/* Action Button */}
          <div className="flex justify-end pt-6">
            <Button 
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
