# NVIDIA NIM API Proxy Setup

To keep your NVIDIA NIM API key secure when hosting your static portfolio on GitHub Pages, use a free serverless proxy (Cloudflare Worker or Vercel). This avoids exposing your key in frontend code.

---

## Option 1: Cloudflare Workers (Recommended for GitHub Pages)

Cloudflare Workers provides 100,000 free requests per day, zero maintenance, and instant setup without installing any tools.

### Step 1: Create a Worker
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) and sign up / log in (free tier, no credit card required).
2. On the left sidebar, click **Compute (Workers & Pages)** > **Workers & Pages**.
3. Click **Create Application** > **Create Worker**.
4. Name your worker (e.g. `resume-agent-proxy`), and click **Deploy**.

### Step 2: Paste the Proxy Code
1. Click **Edit Code** in your new worker's dashboard.
2. Replace all the default code in `worker.js` with the contents of [`proxy/worker.js`](./worker.js).
3. Click **Deploy** (top right).

### Step 3: Add Your NVIDIA API Key as a Secret
1. Go back to your Worker's main page.
2. Click **Settings** > **Variables and Secrets**.
3. Under **Secrets**, click **Add**.
4. Set:
   - **Variable name**: `NVIDIA_API_KEY`
   - **Value**: `nvapi-your_actual_key_here` (from [build.nvidia.com](https://build.nvidia.com))
5. Click **Deploy** or **Save**.

### Step 4: Update Your Portfolio
1. Copy your worker URL (e.g., `https://resume-agent-proxy.<your-subdomain>.workers.dev`).
2. Open [`agent.js`](../agent.js) and replace `PROXY_ENDPOINT`:
   ```javascript
   const PROXY_ENDPOINT = 'https://resume-agent-proxy.<your-subdomain>.workers.dev';
   ```

---

## Option 2: Vercel Serverless Function (If deploying to Vercel)

If you deploy this repository directly to Vercel:

1. Import your repository into [vercel.com](https://vercel.com).
2. Go to **Settings** > **Environment Variables** in Vercel.
3. Add `NVIDIA_API_KEY` with your `nvapi-...` value.
4. In [`agent.js`](../agent.js), set:
   ```javascript
   const PROXY_ENDPOINT = '/api/chat';
   ```
5. Deploy. Vercel automatically runs [`api/chat.js`](../api/chat.js).

