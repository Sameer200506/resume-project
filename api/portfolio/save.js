export const config = { runtime: 'edge' }

const ADMIN_PASSWORD = 'admin123'

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    return new Response(JSON.stringify({ error: 'Supabase not configured' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const { data, password } = await req.json()

    // Validate password to prevent unauthorized modifications
    if (!password || password !== ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ error: 'Unauthorized: Invalid password' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Upsert the data in Supabase (id: 'main')
    const res = await fetch(`${supabaseUrl}/rest/v1/portfolio?id=eq.main`, {
      method: 'POST',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates,return=representation'
      },
      body: JSON.stringify({
        id: 'main',
        data,
        updated_at: new Date().toISOString()
      })
    })

    if (!res.ok) {
      const errText = await res.text()
      throw new Error(`Supabase upsert failed: ${res.status} - ${errText}`)
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
