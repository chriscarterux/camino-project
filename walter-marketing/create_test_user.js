const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://cjechozcgxrjbsumltho.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqZWNob3pjZ3hyamJzdW1sdGhvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDMwMjQ2OSwiZXhwIjoyMDc1ODc4NDY5fQ.AcwT7m2czi_E2-U9si6Cipcd9Txf4Cl_x51aFidPm5o';

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createTestUser() {
  console.log('Creating test user for reflection testing...\n');

  const testEmail = 'test-reflections@camino.to';
  const testPassword = 'TestPassword123!';

  try {
    // Try to sign up a test user
    const { data, error } = await supabase.auth.admin.createUser({
      email: testEmail,
      password: testPassword,
      email_confirm: true,
      user_metadata: {
        name: 'Test User',
        created_by: 'test_script'
      }
    });

    if (error) {
      if (error.message.includes('already registered')) {
        console.log('✓ Test user already exists');

        // Get the existing user
        const { data: users } = await supabase.auth.admin.listUsers();
        const existingUser = users.users.find(u => u.email === testEmail);

        if (existingUser) {
          console.log(`✓ User ID: ${existingUser.id}`);
          console.log(`✓ Email: ${existingUser.email}\n`);
          return existingUser.id;
        }
      } else {
        throw error;
      }
    } else {
      console.log('✓ Test user created successfully!');
      console.log(`✓ User ID: ${data.user.id}`);
      console.log(`✓ Email: ${data.user.email}\n`);
      return data.user.id;
    }
  } catch (err) {
    console.error('❌ Error creating test user:', err.message);
    console.log('\nNote: You may need to create a test user manually in the Supabase dashboard.');
  }
}

createTestUser().catch(console.error);
