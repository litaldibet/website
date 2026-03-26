const url = import.meta.env.VITE_SUPABASE_URL

export const loadPost: string = `${url}/functions/v1/load_post`
export const loadCards: string = `${url}/functions/v1/load_cards`
