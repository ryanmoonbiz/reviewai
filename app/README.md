# 리뷰와이 app 런북

## 로컬 확인

프로젝트 루트에서 아래 명령으로 정적 서버를 실행한 뒤 브라우저에서 확인합니다.

```bash
python3 -m http.server 8000
```

확인 URL:

```text
http://localhost:8000/app/
```

## UX01 범위

- `app/index.html`: Header, Footer, 공통 컴포넌트 기준 화면
- `app/css/index.css`: 디자인 토큰, 레이아웃, 버튼, 카드, 배지 스타일
- `app/js/main.js`: 공통 화면 보조 스크립트
- `app/js/parser.js`: CSV 파싱 보조 함수 scaffold
- `app/js/mockData.js`: 샘플 데이터 scaffold
