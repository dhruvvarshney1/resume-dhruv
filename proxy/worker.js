/**
 * Cloudflare Worker Proxy for NVIDIA NIM API
 * 
 * Securely forwards chat completion requests from your portfolio frontend to NVIDIA NIM API.
 * The NVIDIA_API_KEY is stored as a secret environment variable in Cloudflare.
 */

export default {
  async fetch(request, env, ctx) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*', // Or restrict to 'https://dhruvvarshney1.github.io'
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Handle CORS preflight request
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed. Use POST.' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const apiKey = env.NVIDIA_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: 'NVIDIA_API_KEY secret is not set in Cloudflare Worker environment variables.',
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    try {
      const clientPayload = await request.json();

      const nvidiaResponse = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientPayload),
      });

      const responseData = await nvidiaResponse.text();

      return new Response(responseData, {
        status: nvidiaResponse.status,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      });
    } catch (err) {
      return new Response(
        JSON.stringify({ error: 'Proxy error: ' + (err.message || 'Unknown error') }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
  },
};

