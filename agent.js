// Chat agent for the terminal drawer. Answers questions about Dhruv's resume
// (grounded in resume.json) plus anything else, via NVIDIA NIM API.
// Exposes window.TerminalAgent.ask(question) -> Promise<string> (plain text).
//
// VERCEL PROXY SETUP:
// In production on Vercel, requests are sent to '/api/chat' which securely injects
// NVIDIA_API_KEY from Vercel's environment variables (never exposed to visitors).
(function () {
    const PROXY_ENDPOINT = '/api/chat';
    const NVIDIA_API_KEY = ''; // Optional: only used if calling NVIDIA directly without a proxy
    const MODEL = 'meta/llama-3.1-8b-instruct';
    const DIRECT_ENDPOINT = 'https://integrate.api.nvidia.com/v1/chat/completions';

    const PERSONA = `You are the built-in terminal agent on Dhruv Varshney's portfolio site (dhruvvarshney1.github.io/resume).
Guests type questions at a bash-style prompt; you are the thing that answers.

Rules:
- For questions about Dhruv (education, experience, projects, skills, achievements, contact), answer ONLY from the JSON resume data below. Never invent facts, dates, employers, or numbers. If the data doesn't cover it, say so and suggest the "contact" command.
- For everything else (general knowledge, coding help, chit-chat), answer helpfully and honestly as a knowledgeable assistant.
- Keep replies concise and terminal-friendly: plain text, short paragraphs or "-" bullets, under ~120 words unless more is explicitly needed. No markdown formatting, no HTML.
- Be warm but economical, first-person plural is fine ("he", "Dhruv" preferred over "I am Dhruv").

RESUME DATA (JSON):
`;

    // resume.json is fetched once and cached; conversation is per-page-visit.
    let resumePromise = null;
    const history = [];
    const MAX_TURNS = 8; // pairs of user/assistant messages kept

    function loadResume() {
        if (!resumePromise) {
            resumePromise = fetch('resume.json')
                .then(r => (r.ok ? r.json() : Promise.reject(new Error('resume.json: HTTP ' + r.status))))
                .then(data => JSON.stringify(data));
        }
        return resumePromise;
    }

    async function ask(question) {
        const useProxy = Boolean(PROXY_ENDPOINT);
        const endpoint = useProxy ? PROXY_ENDPOINT : DIRECT_ENDPOINT;

        if (!useProxy && (!NVIDIA_API_KEY || NVIDIA_API_KEY === 'nvapi-REPLACE_ME')) {
            return 'agent: no API key or proxy configured yet.\nSet NVIDIA_API_KEY in your Vercel Environment Variables or local .env file.';
        }

        const resumeJson = await loadResume().catch(() => null);
        if (!resumeJson) {
            return 'agent: could not load resume.json — check the browser console. I\'d rather not answer resume questions without the source data.';
        }

        history.push({ role: 'user', content: question });
        while (history.length > MAX_TURNS * 2) history.shift();

        const headers = { 'Content-Type': 'application/json' };
        if (!useProxy && NVIDIA_API_KEY) {
            headers['Authorization'] = 'Bearer ' + NVIDIA_API_KEY;
        }

        let res;
        try {
            res = await fetch(endpoint, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    model: MODEL,
                    messages: [
                        { role: 'system', content: PERSONA + resumeJson },
                        ...history
                    ],
                    max_tokens: 384,
                    temperature: 0.4,
                    stream: false
                })
            });
        } catch (err) {
            history.pop();
            return 'agent: failed to connect to endpoint (' + (err.message || 'Network error') + ').';
        }

        if (!res.ok) {
            history.pop(); // don't leave a dangling unanswered user turn
            let serverErrMsg = '';
            try {
                const errData = await res.json();
                if (errData && errData.error) serverErrMsg = ': ' + (typeof errData.error === 'string' ? errData.error : errData.error.message || JSON.stringify(errData.error));
            } catch (_) {}

            if (res.status === 401 || res.status === 403) {
                return 'agent: API key rejected (' + res.status + ')' + serverErrMsg + '. Check NVIDIA_API_KEY in Vercel settings.';
            }
            if (res.status === 429) {
                return 'agent: rate limited (429). Give it a few seconds and ask again.';
            }
            return 'agent: API error ' + (res.status || 'unknown') + serverErrMsg + '. Try again shortly.';
        }

        const data = await res.json();
        const reply = (data.choices && data.choices[0] && data.choices[0].message.content || '').trim();
        if (!reply) {
            history.pop();
            return 'agent: got an empty reply from the model. Try rephrasing?';
        }
        history.push({ role: 'assistant', content: reply });
        return reply;
    }

    window.TerminalAgent = { ask };
})();
