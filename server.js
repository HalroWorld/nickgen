import { createServer } from 'node:http';
import { getRandomNickname, types, regions } from './index.js';

const port = Number(process.env.PORT) || 3000;

createServer((req, res) => {
  const url = new URL(req.url, 'http://x');
  const send = (status, body) => {
    res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*' });
    res.end(JSON.stringify(body));
  };
  if (url.pathname === '/types') return send(200, { types, regions });

  if (url.pathname !== '/nickname') return send(404, { error: 'not found' });

  const type = url.searchParams.get('type') || 'animals';
  const region = url.searchParams.get('region') || undefined;
  if (region && !regions.includes(region)) return send(400, { error: `region must be one of: ${regions.join(', ')}` });
  const count = Number(url.searchParams.get('count') || 1);
  if (!types.includes(type)) return send(400, { error: `type must be one of: ${types.join(', ')}` });
  if (!Number.isInteger(count) || count < 1 || count > 100) return send(400, { error: 'count must be 1~100' });

  const nicknames = Array.from({ length: count }, () => getRandomNickname(type, region));
  send(200, count === 1 ? { nickname: nicknames[0] } : { nicknames });
}).listen(port, () => console.log(`http://localhost:${port}/nickname`));
