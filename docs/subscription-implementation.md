# Subscription Implementation Plan

## Overview
Implementation plan for subscription model with minimal effort using Stripe Payment Links.

## Database Changes (schema.prisma)

```prisma
enum SubscriptionTier {
  FREE
  PREMIUM
  PARTNER
  TEAM
}

model User {
  // ... existing fields ...
  subscriptionTier    SubscriptionTier  @default(FREE)
  subscriptionEndDate DateTime?         // Only used for PREMIUM
  stripeCustomerId    String?           // Store Stripe Customer ID for PREMIUM users
}
```

## Implementation Steps

### 1. Database Setup
- Add subscription fields to User model
- Run prisma migrate
- Update existing users to FREE tier

### 2. Stripe Integration
- Create Product in Stripe Dashboard for PREMIUM tier
- Create Payment Link in Stripe Dashboard
  - Set to recurring yearly subscription
  - Configure success/cancel URLs
  - Enable Customer Portal
- Store Payment Link URL in environment variables

### 3. Backend Changes
- Create Stripe webhook endpoint for subscription events
  - Update user's subscriptionTier and subscriptionEndDate on successful payment
  - Handle subscription cancellations/updates
- Add admin API endpoint for managing PARTNER/TEAM subscriptions

### 4. Frontend Changes
- Update Profile page to display:
  - Current subscription tier
  - Subscription end date (for PREMIUM)
  - Upgrade button with Stripe Payment Link for FREE users
  - Link to Stripe Customer Portal for PREMIUM users
- Add admin interface for assigning PARTNER/TEAM subscriptions

### 5. Access Control
- Update middleware to check subscription tier for protected routes
- Implement feature flags based on subscription tier

## Minimal Implementation Details

### Environment Variables
```env
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PAYMENT_LINK_URL=
STRIPE_CUSTOMER_PORTAL_URL=
```

### API Routes
- POST /api/admin/subscription
  - Admin only endpoint for managing PARTNER/TEAM subscriptions
- POST /api/stripe/webhook
  - Webhook endpoint for Stripe events

### Frontend Components
Update src/app/auth/profile/page.tsx to include:
```typescript
// Subscription section showing:
- Current tier badge
- End date (if PREMIUM)
- Upgrade button (if FREE)
- Customer Portal link (if PREMIUM)
```

## Security Considerations
- Validate all Stripe webhook signatures
- Implement proper admin-only middleware for PARTNER/TEAM management
- Ensure subscription checks in middleware for protected routes

## Testing Plan
1. Verify FREE tier access restrictions
2. Test PREMIUM subscription flow via Payment Link
3. Test admin assignment of PARTNER/TEAM subscriptions
4. Verify subscription expiration handling
5. Test Stripe webhook handling

## Deployment Checklist
- [ ] Set up Stripe webhook endpoints
- [ ] Configure environment variables
- [ ] Run database migrations
- [ ] Test payment flow in production
- [ ] Verify admin controls
