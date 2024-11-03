import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const config = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
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
        "/auth/password-reset",
        "/auth/verify-email",
        "/auth/verify-email/success"
      ]
      
      const isPublicRoute = publicRoutes.some(route => 
        nextUrl.pathname.startsWith(route)
      )

      if (isPublicRoute) return true

      return !!auth
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.firstName = user.firstName
        token.lastName = user.lastName
        token.role = user.role
        token.currentPlan = user.currentPlan
        token.isVerified = user.isVerified
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string
        session.user.firstName = token.firstName as string
        session.user.lastName = token.lastName as string
        session.user.role = token.role as string
        session.user.currentPlan = token.currentPlan as string
        session.user.isVerified = token.isVerified as boolean
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

        // Debug-Log
        console.log("Searching for user:", credentials.email)

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            hashedPassword: true,
            role: true,
            currentPlan: true,
            isVerified: true
          }
        })

        // Debug-Log
        console.log("Found user:", user)

        if (!user || !user.hashedPassword) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          currentPlan: user.currentPlan,
          isVerified: user.isVerified
        }
      }
    })
  ],
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config) 