import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ymlfemualzqpmtxlqtol.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltbGZlbXVhbHpxcG10eGxxdG9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4OTY5MzYsImV4cCI6MjA0OTQ3MjkzNn0.UOvv0k8V7tKnkhQFlJiAnC9se5k1uyW7uc-uRuSsLZs";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
