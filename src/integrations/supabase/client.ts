// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://dkwhufisbixmfjmymybr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrd2h1ZmlzYml4bWZqbXlteWJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4MjE5MjcsImV4cCI6MjA1OTM5NzkyN30.48IOKDasPROmiDeaYDuCGRF8ZANlAUU9i__iVegXZ1w";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);