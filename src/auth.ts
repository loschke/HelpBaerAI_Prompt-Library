import NextAuth, { DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import type { NextAuthConfig } from "next-auth"
import type { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import { Role, SubscriptionTier, User } from "@prisma/client"

// Erweitere den DefaultSession User
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      firstName: string
      lastName?: string | null
      role: Role
      subscriptionTier: SubscriptionTier
      isVerified: boolean
    } & DefaultSession["user"]
  }
}

interface ExtendedJWT extends JWT {
  id: string
  firstName: string
  lastName?: string | null
  role: Role
  subscriptionTier: SubscriptionTier
  isVerified: boolean
}

export const runtime = 'nodejs'

export const config = {
  adapter: PrismaAdapter(prisma) as any,
  session: { 
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
    verifyRequest: "/auth/verify-email",
    signOut: "/"
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const publicRoutes = [
        "/",
        "/auth/login", 
        "/auth/register", 
        "/auth/verify-email",
        "/auth/verify-email/success"
      ]
      
      const isPublicRoute = publicRoutes.some(route => 
        nextUrl.pathname.startsWith(route)
      )

      if (isPublicRoute) return true

      return !!auth
    },
    async jwt({ token, user }): Promise<ExtendedJWT> {
      if (user) {
        const typedUser = user as User
        return {
          ...token,
          id: typedUser.id,
          firstName: typedUser.firstName,
          lastName: typedUser.lastName,
          role: typedUser.role,
          subscriptionTier: typedUser.subscriptionTier,
          isVerified: typedUser.isVerified
        }
      }
      return token as ExtendedJWT
    },
    async session({ session, token }) {
      const extendedToken = token as ExtendedJWT
      
      if (session?.user) {
        session.user.id = extendedToken.id
        session.user.firstName = extendedToken.firstName
        session.user.lastName = extendedToken.lastName
        session.user.role = extendedToken.role
        session.user.subscriptionTier = extendedToken.subscriptionTier
        session.user.isVerified = extendedToken.isVerified
      }
      return session
    }
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            hashedPassword: true,
            role: true,
            subscriptionTier: true,
            isVerified: true
          }
        })

        if (!user || !user.hashedPassword) {
          return null
        }

        const isPasswordValid = await hashPassword(credentials.password as string);

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          subscriptionTier: user.subscriptionTier,
          isVerified: user.isVerified
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)

async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Buffer.from(hash).toString('hex');
}
