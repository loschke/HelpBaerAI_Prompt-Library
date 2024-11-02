import crypto from "crypto"



import bcrypt from "bcryptjs"



import { prisma } from "@/lib/prisma"



import { ActivityType } from "@prisma/client"







export async function hashPassword(password: string): Promise<string> {



  return bcrypt.hash(password, 12)



}







export function generateVerificationToken(): string {



  return crypto.randomBytes(32).toString("hex")



}







export async function createActivity(



  userId: string, 



  type: ActivityType,



  description: string



) {



  return prisma.activity.create({



    data: {



      type,



      userId,



      description,



    },



  })



}







export async function updateLastLogin(userId: string) {



  return prisma.user.update({



    where: { id: userId },



    data: { lastLogin: new Date() },



  })



}







export async function verifyEmail(token: string) {



  const user = await prisma.user.findFirst({



    where: {



      verificationToken: token



    },



  })







  if (!user) {



    throw new Error("Invalid verification token")



  }







  await prisma.user.update({



    where: { id: user.id },



    data: {



      emailVerified: new Date(),



      verificationToken: null,



      isVerified: true,



    },



  })







  await createActivity(



    user.id, 



    "EMAIL_VERIFICATION" as ActivityType,



    "Email verified successfully"



  )







  return user



}






























