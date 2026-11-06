import assert from 'node:assert';
import { getRandomNickname, types, regions } from './index.js';

for (const t of types) assert.match(getRandomNickname(t), /^\S+ \S+$/);
assert.match(getRandomNickname(), /^\S+ \S+$/);
assert.throws(() => getRandomNickname('nope'));
for (const r of regions) assert.match(getRandomNickname('animals', r), /^\S+ \S+$/);
assert.throws(() => getRandomNickname('animals', '없는지역'));
console.log('ok');

const { handle } = await import('./api/handle.js');
const call = (path) => handle(new URL(path, 'http://x'));
assert.equal(call('/nickname').status, 200);
assert.equal(call('/nickname?region=제주&count=3').body.nicknames.length, 3);
assert.equal(call('/nickname?type=nope').status, 400);
assert.equal(call('/nickname?region=없는곳').status, 400);
assert.equal(call('/nickname?count=0').status, 400);
assert.equal(call('/nope').status, 404);
console.log('api ok');
