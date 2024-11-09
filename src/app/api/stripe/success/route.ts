import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-10-28.acacia",
});

// Handle webhook POST requests
export async function POST(request: Request) {
  try {
    const body = await request.text();
    const event = JSON.parse(body);

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        
        // Get subscription details
        const subscription = await stripe.subscriptions.retrieve(session.subscription);
        
        // Update user's subscription status
        await prisma.user.update({
          where: {
            id: session.metadata.userId,
          },
          data: {
            subscriptionTier: "PREMIUM",
            stripeCustomerId: session.metadata.customerId,
            subscriptionEndDate: new Date(subscription.current_period_end * 1000), // Convert Unix timestamp to Date
          },
        });
        break;
      
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return new NextResponse(JSON.stringify({ received: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("[STRIPE_WEBHOOK_ERROR]", error);
    return new NextResponse(
      JSON.stringify({ error: "Webhook handler failed" }), 
      { 
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

// Handle success redirect GET requests
export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return new NextResponse("Missing session_id", { status: 400 });
    }

    // Retrieve the checkout session to verify payment status
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription']
    });

    if (checkoutSession.payment_status !== "paid") {
      return new NextResponse("Payment not completed", { status: 400 });
    }

    // Verify that this checkout session was for this user
    if (checkoutSession.metadata?.userId !== session.user.id) {
      return new NextResponse("Invalid user", { status: 400 });
    }

    // Update user's subscription status with Stripe data
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        subscriptionTier: "PREMIUM",
        stripeCustomerId: checkoutSession.metadata.customerId,
        subscriptionEndDate: checkoutSession.subscription 
          ? new Date((checkoutSession.subscription as Stripe.Subscription).current_period_end * 1000)
          : undefined,
      },
    });

    // Redirect to payment success page
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/auth/payment-success`
    );
  } catch (error) {
    console.error("[STRIPE_SUCCESS_ERROR]", error);
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/premium?error=true`
    );
  }
}
