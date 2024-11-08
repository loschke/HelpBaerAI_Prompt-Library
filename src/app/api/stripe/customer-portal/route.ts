import { auth } from "../../../../auth";
import { NextResponse } from "next/server";
import { createCustomerPortalSession } from "../../../../lib/stripe";
import { prisma } from "../../../../lib/prisma";

export async function POST() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Hole User mit Stripe Customer ID
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { stripeCustomerId: true }
    });

    if (!user?.stripeCustomerId) {
      return new NextResponse("No Stripe customer found", { status: 400 });
    }

    // Erstelle Customer Portal Session
    const { url } = await createCustomerPortalSession(user.stripeCustomerId);

    return NextResponse.json({ url });
  } catch (error) {
    console.error("[STRIPE_CUSTOMER_PORTAL]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
