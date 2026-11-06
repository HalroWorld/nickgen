# nickgen

"행복한 고양이", "주남저수지 판다"처럼 **형용사 또는 지명 + 동물·캐릭터** 랜덤 한국어 닉네임.
의존성 없음. Node.js 18 이상.

| 버전 | 위치 | 쓰는 법 |
|---|---|---|
| 모듈 (API 없음) | `index.js` | `npm install`로 받아서 `import` |
| HTTP API | `api/` | Node 서버(`npm start`) 또는 Cloudflare Workers(`npm run deploy`) |

모듈로 받으면 `index.js`만 내려온다(`api/`는 안 따라옴).

## 모듈로 쓰기 (API 없음)

```bash
npm install github:HalroWorld/nickgen
```

```js
import { getRandomNickname, types, regions } from 'nickgen';

getRandomNickname();                    // "졸린 수달"      (형용사 + animals)
getRandomNickname('characters');        // "엉뚱한 탐정"
getRandomNickname('animals', '창원');   // "용지호수 펭귄"  (지역 지명)
types;   // ['animals', 'characters']
regions; // ['서울', '부산', ..., '제주']
```

`region`이 목록에 없으면 에러를 던진다. 위치 → 지역 이름 변환은 부르는 쪽에서 한다.

## HTTP API로 쓰기 (`api/`)

```bash
git clone git@github.com:HalroWorld/nickgen.git && cd nickgen
npm start   # PORT 환경변수, 기본 3000
```

### Cloudflare Workers

```bash
npx wrangler login   # 처음 한 번
npm run dev:worker   # 로컬 확인 (localhost:8787)
npm run deploy       # 배포
```

### 주소

운영: `https://nickgen.halro92.workers.dev`

- `GET /nickname?type=animals&region=창원&count=3`
- `GET /types`

자세한 건 [docs/API명세서.md](docs/API명세서.md).
