import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sojrtodtzpssspflbgec.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvanJ0b2R0enBzc3NwZmxiZ2VjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0NzM0MDYsImV4cCI6MjA2NTA0OTQwNn0.R4JtcAgZVdDr_siMyEuP97QbImjGsL0QOW_91Y84aRs'; 

export const supabase = createClient(supabaseUrl, supabaseKey);
