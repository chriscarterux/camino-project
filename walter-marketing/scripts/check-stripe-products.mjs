import Stripe from 'stripe';
import 'dotenv/config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia',
});

async function checkProducts() {
  console.log('🔍 Fetching Stripe Products...\n');

  try {
    const products = await stripe.products.list({ limit: 100 });

    if (products.data.length === 0) {
      console.log('⚠️  No products found in Stripe account\n');
      console.log('You need to create products for:');
      console.log('  - Reflect (Free tier)');
      console.log('  - Journey (Paid tier)');
      console.log('  - Coach (Paid tier)\n');
      return;
    }

    console.log(`Found ${products.data.length} products:\n`);

    for (const product of products.data) {
      console.log(`📦 ${product.name}`);
      console.log(`   ID: ${product.id}`);
      console.log(`   Active: ${product.active}`);
      console.log(`   Description: ${product.description || 'N/A'}`);

      // Get prices for this product
      const prices = await stripe.prices.list({ product: product.id });
      if (prices.data.length > 0) {
        console.log(`   Prices:`);
        for (const price of prices.data) {
          const amount = price.unit_amount ? `$${(price.unit_amount / 100).toFixed(2)}` : 'Free';
          const interval = price.recurring ? ` / ${price.recurring.interval}` : '';
          console.log(`     - ${amount}${interval} (ID: ${price.id})`);
        }
      }
      console.log('');
    }
  } catch (error) {
    console.error('❌ Error fetching products:', error.message);
  }
}

checkProducts();
