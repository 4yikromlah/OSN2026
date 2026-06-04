// Migration helper to run in browser console
// Usage:
// 1) Ensure VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY are set in your dev env and app is built/run
// 2) Open browser devtools on the running app and run:
//    import('/js/migrate-to-supabase.js').then(m => m.migrateLocalToSupabase())

import supabaseClient from './supabase-client.js';

export async function migrateLocalToSupabase({ dryRun = false } = {}) {
  if (!supabaseClient.isSupabaseConfigured()) {
    console.error('Supabase not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY and restart dev server.');
    return;
  }

  console.log('Starting migration (dryRun=' + dryRun + ')...');
  try {
    const summary = await supabaseClient.pushLocalStorageToSupabase({ dryRun });
    console.log('Migration summary:', summary);
    if (!dryRun) console.log('Migration complete. LocalStorage data pushed to Supabase.');
    return summary;
  } catch (err) {
    console.error('Migration failed:', err.message || err);
    throw err;
  }
}

export default { migrateLocalToSupabase };
