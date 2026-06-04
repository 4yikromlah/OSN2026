Supabase integration for SMASA-Online

What this adds
- JS client helper at `js/supabase-client.js` that exposes basic CRUD helpers for exams, teachers, students, results and settings.
- Migration helper `js/migrate-to-supabase.js` that can push your current localStorage data into Supabase.
- DB schema file `db/schema.sql` with table DDL you can run in Supabase SQL editor.
- package.json updated to add dependency `@supabase/supabase-js`.

Quick setup
1) Create a new project on https://app.supabase.com
2) In the project settings > API, copy the "URL" and "anon public" key.
3) Locally create a `.env` (or use Vite approach) with:
   VITE_SUPABASE_URL="https://your-project-ref.supabase.co"
   VITE_SUPABASE_ANON_KEY="your-anon-key"

4) Run the app locally:
   npm ci
   npm run dev

5) Create tables: open Supabase > SQL editor and run the contents of `db/schema.sql`.

6) Migrate existing localStorage data into Supabase (automatic helper):
   - Open the app in your browser (dev server) after setting env vars.
   - Open devtools Console and run:
       import('/js/migrate-to-supabase.js').then(mod => mod.migrateLocalToSupabase({ dryRun: true }));
     This will show a dry-run summary.
   - If OK, run:
       import('/js/migrate-to-supabase.js').then(mod => mod.migrateLocalToSupabase());
     This will push localStorage data into Supabase tables.

Security notes
- Do NOT commit service_role key to the repo. Use only anon public key in the frontend with strict RLS policies.
- For admin-only operations (e.g., deleting exams), prefer a server-side function or Edge Function with service_role key and authentication.
- Configure Row Level Security (RLS) and policies in Supabase to restrict write operations as needed.

Next steps (recommended)
- Add RLS policies for tables and configure auth (email/password) if you want proper sign-in.
- Replace localStorage usage in app code with calls to `js/supabase-client.js` functions (I left that as a manual change to keep modifications small). I can help rewrite the app.js/admin.js to use Supabase directly if you want.
