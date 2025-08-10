import { supabase, SUBMISSIONS_TABLE } from './supabase.js';

async function testSupabaseConnection() {
  try {
    console.log('Testing Supabase connection...');
    
    // Test basic connection
    const { data, error } = await supabase
      .from(SUBMISSIONS_TABLE)
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Connection failed:', error.message);
      return false;
    }
    
    console.log('✅ Supabase connection successful!');
    console.log('📊 Table accessible:', SUBMISSIONS_TABLE);
    
    // Test inserting a sample record
    const { data: insertData, error: insertError } = await supabase
      .from(SUBMISSIONS_TABLE)
      .insert([
        {
          app_name: 'Test App',
          description: 'Test description',
          features: 'Test feature',
          contact_name: 'Test User',
          email: 'test@example.com',
          phone: 'null',
          status: 'New'
        }
      ])
      .select();
    
    if (insertError) {
      console.error('❌ Insert test failed:', insertError.message);
      return false;
    }
    
    console.log('✅ Insert test successful!');
    console.log('📝 Sample record created:', insertData[0]);
    
    // Clean up test record
    const { error: deleteError } = await supabase
      .from(SUBMISSIONS_TABLE)
      .delete()
      .eq('id', insertData[0].id);
    
    if (deleteError) {
      console.warn('⚠️  Could not clean up test record:', deleteError.message);
    } else {
      console.log('🧹 Test record cleaned up');
    }
    
    return true;
    
  } catch (error) {
    console.error('❌ Test failed with error:', error);
    return false;
  }
}

testSupabaseConnection();
