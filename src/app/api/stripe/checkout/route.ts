import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY");
}

if (!process.env.STRIPE_PRICE_ID) {
  throw new Error("Missing STRIPE_PRICE_ID");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-10-28.acacia",
});

export async function POST() {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Don't allow already premium users to create another subscription
    if (session.user.subscriptionTier === "PREMIUM") {
      return new NextResponse("Already subscribed", { status: 400 });
    }

    // Create or retrieve a Stripe customer
    let customer;
    if (session.user.stripeCustomerId) {
      // Retrieve existing customer
      customer = await stripe.customers.retrieve(session.user.stripeCustomerId);
      
      // If customer was deleted on Stripe, create a new one
      if ((customer as any).deleted) {
        customer = await stripe.customers.create({
          email: session.user.email || undefined,
          metadata: {
            userId: session.user.id
          }
        });
      }
    } else {
      // Create new customer
      customer = await stripe.customers.create({
        email: session.user.email || undefined,
        metadata: {
          userId: session.user.id
        }
      });
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customer.id,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXTAUTH_URL}/api/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/premium?canceled=true`,
      metadata: {
        userId: session.user.id,
        customerId: customer.id
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      automatic_tax: {
        enabled: true
      },
      customer_update: {
        address: 'auto'
      }
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("[STRIPE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
