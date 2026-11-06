import { createServer } from 'node:http';
import { handle, headers } from './handle.js';

const port = Number(process.env.PORT) || 3000;

createServer((req, res) => {
  const { status, body } = handle(new URL(req.url, 'http://x'));
  res.writeHead(status, headers);
  res.end(JSON.stringify(body));
}).listen(port, () => console.log(`http://localhost:${port}/nickname`));
