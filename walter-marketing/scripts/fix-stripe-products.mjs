import Stripe from 'stripe';
import 'dotenv/config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia',
});

async function fixProducts() {
  console.log('🔧 Fixing Stripe Products...\n');

  try {
    // Step 1: Archive the incorrect products
    console.log('📦 Archiving incorrect products...');

    const incorrectProductIds = [
      'prod_TPD1svjwKB2BNR', // Free Discovery (wrong name)
      'prod_TPD19WEtwOeXXo', // Workshop (wrong product)
      'prod_TPD1pSPhFP8s07', // Deep Discovery (wrong product)
    ];

    for (const productId of incorrectProductIds) {
      await stripe.products.update(productId, { active: false });
      console.log(`  ✅ Archived ${productId}`);
    }

    console.log('\n✅ Incorrect products archived\n');

    // Step 2: Create REFLECT (Free) product
    console.log('Creating REFLECT (Free) product...');
    const reflectProduct = await stripe.products.create({
      name: 'Reflect',
      description: '5-10 min daily gentle introduction to self-reflection. Limited AI prompts. Basic tracking and journaling.',
      metadata: {
        tier: 'reflect',
        type: 'free',
        duration: 'ongoing',
      },
    });

    const reflectPrice = await stripe.prices.create({
      product: reflectProduct.id,
      unit_amount: 0,
      currency: 'usd',
      metadata: {
        tier: 'reflect',
      },
    });

    console.log(`✅ Reflect created`);
    console.log(`   Product ID: ${reflectProduct.id}`);
    console.log(`   Price ID: ${reflectPrice.id}\n`);

    // Step 3: Create JOURNEY ($19.95/mo subscription) product
    console.log('Creating JOURNEY ($19.95/mo) product...');
    const journeyProduct = await stripe.products.create({
      name: 'Journey',
      description: '30-day Daily Reflection Practice + 20 Professional Development Courses (1/month included) + Unlimited AI support',
      metadata: {
        tier: 'journey',
        type: 'subscription',
        courses_included: '20',
        courses_per_month: '1',
      },
    });

    const journeyPrice = await stripe.prices.create({
      product: journeyProduct.id,
      unit_amount: 1995, // $19.95
      currency: 'usd',
      recurring: {
        interval: 'month',
      },
      metadata: {
        tier: 'journey',
      },
    });

    console.log(`✅ Journey created`);
    console.log(`   Product ID: ${journeyProduct.id}`);
    console.log(`   Price ID: ${journeyPrice.id}`);
    console.log(`   Price: $19.95/month\n`);

    // Summary
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 SUMMARY - Add these to your .env files:\n');
    console.log(`STRIPE_PRODUCT_REFLECT=${reflectProduct.id}`);
    console.log(`STRIPE_PRICE_REFLECT=${reflectPrice.id}\n`);
    console.log(`STRIPE_PRODUCT_JOURNEY=${journeyProduct.id}`);
    console.log(`STRIPE_PRICE_JOURNEY=${journeyPrice.id}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log('✅ All products fixed successfully!');
    console.log('📝 Note: Products with TBD pricing (Identity Shift, Worldview Shift, etc.) not created yet');

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.raw) {
      console.error('Details:', error.raw);
    }
  }
}

fixProducts();
