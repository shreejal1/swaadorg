import { createClient } from '@supabase/supabase-js';

let cachedClient: any | null | undefined;

export function getSupabaseClient() {
	if (cachedClient !== undefined) {
		return cachedClient;
	}

	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!supabaseUrl || !supabaseKey) {
		cachedClient = null;
		return cachedClient;
	}

	cachedClient = createClient(supabaseUrl, supabaseKey) as any;
	return cachedClient;
}