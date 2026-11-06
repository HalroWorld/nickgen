import assert from 'node:assert';
import { getRandomNickname, types, regions } from './index.js';

for (const t of types) assert.match(getRandomNickname(t), /^\S+ \S+$/);
assert.match(getRandomNickname(), /^\S+ \S+$/);
assert.throws(() => getRandomNickname('nope'));
for (const r of regions) assert.match(getRandomNickname('animals', r), /^\S+ \S+$/);
assert.throws(() => getRandomNickname('animals', '없는지역'));
console.log('ok');
