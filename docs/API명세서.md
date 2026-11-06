# API 명세서

## GET /nickname
| 쿼리 | 기본값 | 설명 |
|---|---|---|
| `type` | `animals` | `animals` / `characters` |
| `region` | 없음 | 주면 그 지역 지명이 앞에 붙고, 안 주면 형용사가 붙음. `GET /types`의 `regions` 중 하나 |
| `count` | `1` | 1~100 |

- 응답: `{"nickname":"정병산 강아지"}` (count=1), `{"nicknames":[...]}` (count>1)
- 오류: 400 `{"error":"..."}` (잘못된 type·region·count), 404 (없는 경로)

## GET /types
- 응답: `{"types":["animals","characters"],"regions":["창원"]}`

