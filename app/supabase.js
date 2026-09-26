import { createClient } from '@supabase/supabase-js';

// Забираем системные ключи из файла .env.local
const supabaseUrl = "https://apozphshtgmqtpxbcnyd.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwb3pwaHNodGdtcXRweGJjbnlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwMDg4ODQsImV4cCI6MjEwNTU4NDg4NH0.VLuPtp1sVkSYA_O_xwYRLDIESu7H81DAsWbrXKM1A20";

// Защитная проверка, чтобы проект не падал, если ключи забыли вписать
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("⚠️ Supabase URL or Anon Key is missing in your .env.local file!");
}

// Инициализируем и экспортируем готового клиента
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
