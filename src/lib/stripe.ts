import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-10-28.acacia',
  typescript: true,
});

export async function createCustomerPortalSession(customerId: string) {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/auth/profile`,
    });
    return { url: session.url };
  } catch (error) {
    console.error('Error creating customer portal session:', error);
    throw error;
  }
}

export async function createOrRetrieveCustomer(email: string, name: string) {
  try {
    // Suche nach existierendem Customer
    const customers = await stripe.customers.list({ email });
    
    if (customers.data.length > 0) {
      return customers.data[0];
    }

    // Erstelle neuen Customer
    const customer = await stripe.customers.create({
      email,
      name,
      metadata: {
        createdAt: new Date().toISOString(),
      },
    });

    return customer;
  } catch (error) {
    console.error('Error in createOrRetrieveCustomer:', error);
    throw error;
  }
}

export async function getSubscriptionStatus(customerId: string) {
  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
      expand: ['data.default_payment_method'],
    });

    return subscriptions.data[0] || null;
  } catch (error) {
    console.error('Error getting subscription status:', error);
    throw error;
  }
}
