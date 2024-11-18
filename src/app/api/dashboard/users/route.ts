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

export async function GET(request: Request) {
  try {
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

    // Parse URL to get query parameters
    const url = new URL(request.url)
    const includeDeleted = url.searchParams.get('includeDeleted') === 'true'

    // Only SUPER_ADMINs can see deleted users
    const whereClause = {
      isDeleted: session.user.role === Role.SUPER_ADMIN && includeDeleted ? undefined : false
    }

    // Fetch users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        subscriptionTier: true,
        referralCode: true,
        isVerified: true,
        isDeleted: true,
        deletedAt: true,
      },
      where: whereClause,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

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

    // Get the user ID from params
    const userId = params.userId
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
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
      where: { id: userId },
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
