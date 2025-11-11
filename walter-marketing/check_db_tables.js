const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://cjechozcgxrjbsumltho.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqZWNob3pjZ3hyamJzdW1sdGhvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDMwMjQ2OSwiZXhwIjoyMDc1ODc4NDY5fQ.AcwT7m2czi_E2-U9si6Cipcd9Txf4Cl_x51aFidPm5o';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTables() {
  console.log('Checking database tables...\n');

  // Check for prompts table
  const { data: prompts, error: promptsError } = await supabase
    .from('prompts')
    .select('count');

  if (promptsError) {
    console.log('❌ prompts table:', promptsError.message);
  } else {
    console.log('✓ prompts table exists');
    const { count } = await supabase
      .from('prompts')
      .select('*', { count: 'exact', head: true });
    console.log(`  - ${count || 0} prompts found\n`);
  }

  // Check for reflections table (from streak_automation migration)
  const { data: reflections, error: reflectionsError } = await supabase
    .from('reflections')
    .select('count');

  if (reflectionsError) {
    console.log('❌ reflections table:', reflectionsError.message);
  } else {
    console.log('✓ reflections table exists\n');
  }

  // Check for leads table
  const { data: leads, error: leadsError } = await supabase
    .from('leads')
    .select('count');

  if (leadsError) {
    console.log('❌ leads table:', leadsError.message);
  } else {
    console.log('✓ leads table exists\n');
  }
}

checkTables().catch(console.error);
