import { getRandomNickname, types, regions } from '../index.js';

// URL → { status, body }. Node 서버(server.js)와 Cloudflare Workers(worker.js)가 같이 쓴다
export function handle(url) {
  if (url.pathname === '/types') return { status: 200, body: { types, regions } };
  if (url.pathname !== '/nickname') return { status: 404, body: { error: 'not found' } };

  const q = url.searchParams;
  const type = q.get('type') || 'animals';
  const region = q.get('region') || undefined;
  const count = Number(q.get('count') || 1);
  if (!types.includes(type)) return { status: 400, body: { error: `type must be one of: ${types.join(', ')}` } };
  if (region && !regions.includes(region)) return { status: 400, body: { error: `region must be one of: ${regions.join(', ')}` } };
  if (!Number.isInteger(count) || count < 1 || count > 100) return { status: 400, body: { error: 'count must be 1~100' } };

  const nicknames = Array.from({ length: count }, () => getRandomNickname(type, region));
  return { status: 200, body: count === 1 ? { nickname: nicknames[0] } : { nicknames } };
}

export const headers = { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*' };
