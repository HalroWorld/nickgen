import { handle, headers } from './handle.js';

// Cloudflare Workers 진입점 (wrangler.toml의 main)
export default {
  fetch(request) {
    const { status, body } = handle(new URL(request.url));
    return new Response(JSON.stringify(body), { status, headers });
  },
};
