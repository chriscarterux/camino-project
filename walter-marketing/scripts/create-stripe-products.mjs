import Stripe from 'stripe';
import 'dotenv/config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia',
});

async function createProducts() {
  console.log('🏗️  Creating Camino Stripe Products...\n');

  try {
    // 1. Free Discovery
    console.log('Creating Free Discovery product...');
    const freeProduct = await stripe.products.create({
      name: 'Free Discovery',
      description: 'Phase 1 only (Foundation) - 7-day foundation building with daily reflection prompts',
      metadata: {
        tier: 'free',
        phases: '1',
        duration_days: '7',
      },
    });

    const freePrice = await stripe.prices.create({
      product: freeProduct.id,
      unit_amount: 0,
      currency: 'usd',
      metadata: {
        tier: 'free',
      },
    });

    console.log(`✅ Free Discovery created`);
    console.log(`   Product ID: ${freeProduct.id}`);
    console.log(`   Price ID: ${freePrice.id}\n`);

    // 2. Workshop ($97)
    console.log('Creating Workshop product...');
    const workshopProduct = await stripe.products.create({
      name: 'Workshop',
      description: 'Phases 1-2 (Foundation + Psychometrics) - 10+ validated assessments with Life Model AI context',
      metadata: {
        tier: 'workshop',
        phases: '2',
        duration_days: '14',
        early_bird: 'true',
        regular_price: '147',
      },
    });

    const workshopPrice = await stripe.prices.create({
      product: workshopProduct.id,
      unit_amount: 9700, // $97.00
      currency: 'usd',
      metadata: {
        tier: 'workshop',
        early_bird_price: 'true',
      },
    });

    console.log(`✅ Workshop created`);
    console.log(`   Product ID: ${workshopProduct.id}`);
    console.log(`   Price ID: ${workshopPrice.id}`);
    console.log(`   Price: $97.00 (early bird)\n`);

    // 3. Deep Discovery ($497)
    console.log('Creating Deep Discovery product...');
    const deepProduct = await stripe.products.create({
      name: 'Deep Discovery',
      description: 'All 5 Phases - Complete Life Model with 8-week cohort coaching and lifetime access',
      metadata: {
        tier: 'deep_discovery',
        phases: '5',
        duration_days: '30',
        early_bird: 'true',
        regular_price: '697',
        includes_cohort: 'true',
      },
    });

    const deepPrice = await stripe.prices.create({
      product: deepProduct.id,
      unit_amount: 49700, // $497.00
      currency: 'usd',
      metadata: {
        tier: 'deep_discovery',
        early_bird_price: 'true',
      },
    });

    console.log(`✅ Deep Discovery created`);
    console.log(`   Product ID: ${deepProduct.id}`);
    console.log(`   Price ID: ${deepPrice.id}`);
    console.log(`   Price: $497.00 (early bird)\n`);

    // Summary
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 SUMMARY - Add these to your .env.production:\n');
    console.log(`STRIPE_PRODUCT_FREE_DISCOVERY=${freeProduct.id}`);
    console.log(`STRIPE_PRICE_FREE_DISCOVERY=${freePrice.id}\n`);
    console.log(`STRIPE_PRODUCT_WORKSHOP=${workshopProduct.id}`);
    console.log(`STRIPE_PRICE_WORKSHOP=${workshopPrice.id}\n`);
    console.log(`STRIPE_PRODUCT_DEEP_DISCOVERY=${deepProduct.id}`);
    console.log(`STRIPE_PRICE_DEEP_DISCOVERY=${deepPrice.id}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log('✅ All products created successfully!');
    console.log('🎉 Your Stripe account is ready for Camino payments!');

  } catch (error) {
    console.error('❌ Error creating products:', error.message);
    if (error.raw) {
      console.error('Details:', error.raw);
    }
  }
}

createProducts();
