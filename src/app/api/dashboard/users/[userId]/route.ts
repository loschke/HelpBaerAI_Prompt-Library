import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { Role, SubscriptionTier } from "@prisma/client"
import { z } from "zod"

// Helper to check if user has admin access
const hasAdminAccess = (role?: Role) => {
  return role === Role.ADMIN || role === Role.SUPER_ADMIN
}

// Validation schema for update operations
const updateUserSchema = z.object({
  role: z.enum([Role.SUPER_ADMIN, Role.ADMIN, Role.PARTNER, Role.TEAM, Role.USER]).optional(),
  subscriptionTier: z.enum([SubscriptionTier.FREE, SubscriptionTier.PREMIUM, SubscriptionTier.LIFETIME]).optional(),
  referralCode: z.string().optional().nullable(),
  isVerified: z.boolean().optional(),
})

export async function PATCH(
  request: Request,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    // Get and await params
    const params = await context.params

    // Check authentication and authorization
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    if (!hasAdminAccess(session.user.role)) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validationResult = updateUserSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid request data", details: validationResult.error },
        { status: 400 }
      )
    }

    const data = validationResult.data

    // Additional role change validation
    if (data.role && session.user.role !== Role.SUPER_ADMIN) {
      return NextResponse.json(
        { error: "Only SUPER_ADMIN can modify user roles" },
        { status: 403 }
      )
    }

    // Prepare update data with proper Prisma format
    const updateData = {
      ...(data.role && { role: { set: data.role } }),
      ...(data.subscriptionTier && { subscriptionTier: { set: data.subscriptionTier } }),
      ...(data.referralCode !== undefined && { referralCode: { set: data.referralCode } }),
      ...(data.isVerified !== undefined && { isVerified: { set: data.isVerified } }),
      updatedAt: new Date(),
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: params.userId },
      data: updateData,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        subscriptionTier: true,
        referralCode: true,
        isVerified: true,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Error updating user:', error)
    
    if ((error as any).code === 'P2025') {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    // Get and await params
    const params = await context.params

    // Check authentication and authorization
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    if (!hasAdminAccess(session.user.role)) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      )
    }

    // Soft delete the user
    const deletedUser = await prisma.user.update({
      where: { id: params.userId },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting user:', error)
    
    if ((error as any).code === 'P2025') {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
