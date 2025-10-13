#!/usr/bin/env node
/**
 * Create LMS Categories in Frappe
 * Run after getting API credentials
 */

const courseLibrary = require('../data/course-library.json');

const FRAPPE_URL = process.env.LMS_API_URL || 'http://46.202.93.22:8000';
const FRAPPE_API_KEY = process.env.LMS_API_KEY;
const FRAPPE_API_SECRET = process.env.LMS_API_SECRET;

async function createCategory(category) {
  try {
    const response = await fetch(`${FRAPPE_URL}/api/resource/LMS Category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${FRAPPE_API_KEY}:${FRAPPE_API_SECRET}`,
      },
      body: JSON.stringify({
        category_name: category.name,
        name: category.id,
        description: category.description,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function main() {
  console.log('\n📁 Creating LMS Categories in Frappe\n');

  if (!FRAPPE_API_KEY || !FRAPPE_API_SECRET) {
    console.error('❌ Error: LMS_API_KEY and LMS_API_SECRET must be set in .env.local');
    console.log('\nTo get API credentials:');
    console.log('1. Open: http://46.202.93.22:8000');
    console.log('2. Login: Administrator / admin');
    console.log('3. Go to: User → Administrator → API Access');
    console.log('4. Click "Generate Keys"');
    console.log('5. Add to .env.local:\n');
    console.log('   LMS_API_KEY=your_key_here');
    console.log('   LMS_API_SECRET=your_secret_here\n');
    process.exit(1);
  }

  let successCount = 0;
  let failCount = 0;

  for (const category of courseLibrary.categories) {
    process.stdout.write(`Creating: ${category.name}... `);

    const result = await createCategory(category);

    if (result.success) {
      console.log('✅');
      successCount++;
    } else {
      console.log(`❌ ${result.error}`);
      failCount++;
    }
  }

  console.log(`\n✅ Created ${successCount} categories`);
  if (failCount > 0) {
    console.log(`⚠️  Failed: ${failCount} (may already exist)`);
  }

  console.log('\n📝 Next: Run bulk course upload');
  console.log('   node scripts/scan-and-upload-courses.js\n');
}

main().catch(console.error);
