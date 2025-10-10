import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover",
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const tier = searchParams.get("tier");

  if (!tier) {
    return NextResponse.json({ error: "Tier is required" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            recurring: {
              interval: "month",
            },
            product_data: {
              name:
                tier === "transformation"
                  ? "Walter Transformation"
                  : "Walter Mastery",
              description:
                tier === "transformation"
                  ? "Unlimited AI reflections, 8-week programs, weekly summaries"
                  : "1:1 coaching, life architecture, custom curriculum",
            },
            unit_amount: tier === "transformation" ? 1995 : 100000, // in cents
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/pricing`,
      metadata: {
        tier,
      },
    });

    return NextResponse.redirect(session.url!);
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
