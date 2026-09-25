import { createClient } from '@supabase/supabase-js';

// Забираем системные ключи из файла .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Защитная проверка, чтобы проект не падал, если ключи забыли вписать
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("⚠️ Supabase URL or Anon Key is missing in your .env.local file!");
}

// Инициализируем и экспортируем готового клиента
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
