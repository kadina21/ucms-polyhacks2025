// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://fwwrogoexraegwpniogx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3d3JvZ29leHJhZWd3cG5pb2d4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkwNTcxNzgsImV4cCI6MjA1NDYzMzE3OH0.ngrkJKdp1CEsPowzw4d1XLsYAe7gFf6MxnQrG2r86Qk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);