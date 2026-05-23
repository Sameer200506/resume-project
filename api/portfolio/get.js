export const config = { runtime: 'edge' }

export default async function handler(req) {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    return new Response(JSON.stringify({ error: 'Supabase not configured, using local fallback' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/portfolio?id=eq.main&select=data`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      throw new Error(`Supabase returned status ${res.status}`)
    }

    const rows = await res.json()
    if (rows && rows.length > 0) {
      return new Response(JSON.stringify({ data: rows[0].data }), {
        headers: { 'Content-Type': 'application/json' },
      })
    } else {
      // Row doesn't exist, return empty
      return new Response(JSON.stringify({ data: null }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
