import NextAuth from "next-auth"







import { PrismaAdapter } from "@auth/prisma-adapter"







import type { NextAuthConfig } from "next-auth"







import type { User as PrismaUser, Role } from "@prisma/client"







import CredentialsProvider from "next-auth/providers/credentials"







import { prisma } from "@/lib/prisma"







import bcrypt from "bcryptjs"







import { sendVerificationEmail } from "@/lib/email"















declare module "next-auth" {







  interface Session {







    user: {







      id: string







      email: string







      firstName: string







      lastName?: string | null







      image?: string | null







      role: Role







      emailVerified?: Date | null







    }







  }















  interface User extends Omit<PrismaUser, "password"> {}







}















export const config = {







  adapter: PrismaAdapter(prisma),







  session: { strategy: "jwt" },







  pages: {







    signIn: "/auth/login",







    error: "/auth/error",







    verifyRequest: "/auth/verify-email",







  },







  providers: [







    CredentialsProvider({







      name: "credentials",







      credentials: {







        email: { label: "Email", type: "email" },







        password: { label: "Password", type: "password" }







      },







      async authorize(credentials) {







        if (!credentials?.email || !credentials?.password) {







          throw new Error("Invalid credentials")







        }















        const user = await prisma.user.findUnique({







          where: { 







            email: credentials.email as string 







          },







          select: {







            id: true,







            email: true,







            hashedPassword: true,







            firstName: true,







            lastName: true,







            role: true,







            emailVerified: true,







            image: true,







            isVerified: true







          }







        })















        if (!user) {







          throw new Error("User not found")







        }















        const isValid = await bcrypt.compare(







          credentials.password as string,







          user.hashedPassword







        )















        if (!isValid) {







          throw new Error("Invalid password")







        }















        if (!user.isVerified) {







          throw new Error("Please verify your email first")







        }















        const { hashedPassword: _, ...userWithoutPassword } = user







        return userWithoutPassword







      }







    })







  ],







  callbacks: {







    async jwt({ token, user }) {







      if (user) {







        token.id = user.id







        token.role = user.role







        token.emailVerified = user.emailVerified







      }







      return token







    },







    async session({ session, token }) {







      if (token && session.user) {







        session.user.id = token.id as string







        session.user.role = token.role as Role







        session.user.emailVerified = token.emailVerified as Date | null







      }







      return session







    }







  }







} satisfies NextAuthConfig















export const { handlers, auth, signIn, signOut } = NextAuth(config)














