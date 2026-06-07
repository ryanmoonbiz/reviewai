# S2_DEX_UX01_SETUP_AND_TOKEN_IMPLEMENTATION_PROMPT.md v0.2
## 제목: 디자인 토큰 및 공통 컴포넌트 마크업 개발 지시서 (초안 - 빌 검수/라이언 승인 대기)

**본 문서는 개발 PM 겸 QA 리드인 비티(Biti)가 개발자 덱스(Dex)에게 전달할 실제 개발 착수 지시서의 초안입니다. 빌의 검수와 라이언 PO의 최종 승인 후에 덱스에게 전달되어야 하며, 승인 전에는 덱스에게 송신하지 않습니다.**

---

## [덱스 전달용 프롬프트 본문]

```markdown
유저 OS: mac
프로젝트 경로: /Users/user/Documents/reviewai (현재 연결된 로컬 폴더)

안녕, 덱스(Dex). 나는 개발 PM 겸 QA 리드를 담당하는 비티(Biti)다.
네가 제출한 S2 사전 분석 및 준비 보고서는 빌(Bill)과 라이언(Ryan) 리드진의 검수를 통과하였다. 이에 따라 첫 번째 개발 스토리인 `RAI-S2-UX01` (디자인 토큰 및 공통 컴포넌트 구현) 및 프로젝트 Scaffold 구축 단계의 개발 착수를 공식 지시한다.

본 단계에서는 아래 명시된 **허용 작업** 범위 내에서 실제 깃 초기화 및 마크업 코딩을 진행하되, **금지 작업**과 보안 수칙을 반드시 엄수해야 한다.

---

### 1. 목적
* 프로젝트 기초 Scaffold(기본 폴더 트리 및 파일)를 구축하고 형상관리를 시작합니다.
* 유료 서비스 수준의 시각 품질을 확보하기 위해 공통 CSS Custom Properties(디자인 토큰)와 필수 공통 UI 컴포넌트(버튼, 카드, 배지) 및 레이아웃을 작성합니다.

---

### 2. 선행 조건 (Prerequisites)
본 작업을 수행하기 위해 로컬 폴더 내의 다음 기준 문서를 확인 완료했어야 합니다:
1. [docs/RAI_S2_UX01_IMPLEMENTATION_PLAN.md](file:///Users/user/Documents/reviewai/docs/RAI_S2_UX01_IMPLEMENTATION_PLAN.md) v0.2
2. [docs/RAI_BRANCH_PR_RULES.md](file:///Users/user/Documents/reviewai/docs/RAI_BRANCH_PR_RULES.md) v0.3
3. [docs/RAI_OPERATING_RULES.md](file:///Users/user/Documents/reviewai/docs/RAI_OPERATING_RULES.md) v0.2

---

### 3. S2 협업 프로세스 운영 순서
본 UX01 첫 개발에서는 작업 완료 후 즉시 PR을 생성하거나 원격에 push하지 않으며, 아래 순서에 맞추어 검수 게이트를 엄격히 거친다:
1. `git init` 실행 및 로컬 git 저장소 초기 구성
2. `.gitignore` 생성 (최우선 선행 작성)
3. `feature/s2-ux01-token` 브랜치 생성 및 이동
4. Scaffold 구조 생성 및 UX01 구현 작업 진행
5. 로컬 환경에서 기능 및 마크업 정상 동작 확인 (로컬 검증)
6. 작업 완료 결과를 비티에게 보고 (덱스 결과 보고)
7. 비티 1차 QA 검수 진행
8. 빌(Bill)의 비즈니스/개발 가치 검수
9. 라이언(Ryan) PO의 최종 결과물 컨펌 및 승인
10. 승인 완료 후 PR 생성 또는 PR 준비 확정 지시에 따른 다음 액션 진행

---

### 4. 허용 작업 (Allowed Operations)
* **Git 초기화**: `git init` 실행 및 로컬 git 레포지토리 초기 구성.
* **브랜치 분기**: 기능 개발 브랜치 `feature/s2-ux01-token` 생성 및 이동.
* **파일 생성/수정**: 아래 명세된 디렉토리 및 소스 파일들의 신규 작성 및 스타일/마크업 구현.
* **PR 준비**: 작업 완료 후 PR 6대 증빙을 정리한다. 실제 PR 생성, push, merge는 비티 1차 QA, 빌 검수, 라이언 승인 후 별도 지시가 있을 때만 진행한다.

### 5. 금지 작업 (Forbidden Operations)
* **원격 push 및 PR 생성 금지**: 비티 1차 QA, 빌 검수, 라이언 승인 전에는 원격 push, PR 생성, merge를 진행하지 않는다.
* **보안 위협 행위 금지**: 실제 API Key, Notion Token, `.env` 실제 값 등 민감한 자격 증명 정보를 코드, 마크다운 파일, 주석, 혹은 콘솔 로그에 직접 기입하거나 노출하는 행위는 엄격히 금지된다.
* **외부 프레임워크 및 빌드 도구 도입 금지**: Vite, React, Next.js, Vue, Svelte, Tailwind, Bootstrap 등 외부 프레임워크/빌드 도구/대형 UI 라이브러리는 추가하지 않는다. 이번 UX01은 Vanilla HTML, Vanilla CSS, Vanilla JavaScript 기준으로만 진행한다.
* **오프스코프(Off-Scope) 구현 금지**:
  - 자동 크롤러 연동 UI/기능 구현 금지.
  - 외부 PDF 변환 및 다운로드 라이브러리 연동 금지 (Cmd+P 브라우저 인쇄 모드로 대체).
  - PG 결제창 모듈 및 가짜 결제 UI창 렌더링 금지.
  - 사장님 자동 리뷰 답글 등록 및 포스팅 API 연동 금지.

---

### 6. 생성/수정 예정 파일 목록 및 가이드

#### 6.1. [최우선] `.gitignore` 생성
* **경로**: `.gitignore` (최상위 루트)
* **가이드**: **프로젝트에 다른 어떤 파일이나 폴더를 생성하고 커밋하기 전에 반드시 `.gitignore`를 가장 먼저 작성해야 합니다.**
* **필수 제외 대상**:
  ```text
  .env
  .env.*
  !.env.example
  node_modules/
  .DS_Store
  *.log
  all_notion_results.json
  db_*.json
  scratch/
  ```
  *주의: `.env.example`에는 실제 키값을 넣지 않고, `NOTION_TOKEN=****MASKED****`, `GEMINI_API_KEY=****MASKED****`처럼 마스킹 예시만 작성한다.*

#### 6.2. PR 템플릿 생성
* **경로**: `.github/pull_request_template.md`
* **가이드**: [docs/RAI_BRANCH_PR_RULES.md](file:///Users/user/Documents/reviewai/docs/RAI_BRANCH_PR_RULES.md)에 규정된 마크다운 템플릿을 그대로 작성합니다.

#### 6.3. Scaffold 디렉토리 및 파일 생성
* **허용 폴더 및 파일 트리**:
  - `app/`
    - `app/index.html` (메인 엔트리 HTML 파일)
    - `app/css/`
      - `app/css/index.css` (디자인 토큰 및 공통 CSS)
    - `app/js/`
      - `app/js/main.js` (스크립트 핵심 엔트리)
      - `app/js/parser.js` (CSV 파싱 모듈)
      - `app/js/mockData.js` (테스트용 모의 데이터 모음)
    - `app/README.md` (간단 개발 가이드)
  - `data/`
    - `data/sample_review_template.csv` (CSV 업로드 가이드용 템플릿 파일)
  * package.json 안내: 본 UX01 개발에서는 package.json이 필수가 아니므로 가급적 생성하지 않으며, 생성 시 외부 dependency 없이 로컬 실행 스크립트 수준으로만 제한한다.

---

### 7. 구현 상세 사양 (UX01)

#### 7.1. 디자인 토큰 정의 (`app/css/index.css` 내 `:root`)
* **표준 브랜드 색상**:
  - `--primary`: `#1D4ED8` (프리미엄 블루)
  - `--primary-hover`: `#1E40AF`
  - `--background`: `#F8FAFC`
  - `--card-bg`: `#FFFFFF`
  - `--border`: `#E2E8F0`
  - `--text-primary`: `#0F172A`
  - `--text-secondary`: `#64748B`
  - `--success`: `#16A34A`
  - `--warning`: `#F97316`
  - `--danger`: `#DC2626`
  - `--danger-bg`: `#FEF2F2`
  - `--kakao-yellow`: `#FEE500`
* **타이포그래피 및 폰트**:
  - 폰트: `Pretendard`, -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  - `--font-h1`: `bold 28px/1.4`
  - `--font-h2`: `semibold 20px/1.4`
  - `--font-body`: `normal 15px/1.6`
  - `--font-caption`: `normal 12px/1.5`
* **라운드 값**:
  - `--radius-lg`: `12px` (대형 카드용)
  - `--radius-sm`: `8px` (버튼, 인풋, 배지용)

#### 7.2. 공통 레이아웃 마크업 (`app/index.html`, `app/css/index.css`)
* **레이아웃 컨테이너**: 최대 너비 `1200px` 제한, 중앙 정렬(`margin: 0 auto;`), 좌우 최소 패딩 `20px` 적용.
* **내비게이션 헤더(Header)**: 좌측 로고 명칭 "리뷰와이(Reviewai)" 및 우측 탭 메뉴 구조 설계.
* **정보 풋터(Footer)**: 카피라이트 및 고객 지원 문의 접수 링크 포함.

#### 7.3. 공통 컴포넌트 마크업 및 스타일
* **버튼 (`.btn-primary`)**: 높이 `48px`, 배경 `--primary`, 텍스트 흰색, 호버 시 `--primary-hover` 트랜지션 적용.
* **카드 (`.card`)**: 배경 `--card-bg`, 테두리 `1px solid --border`, 라운드 `--radius-lg`, 그림자 `box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05)` 적용.
* **배지 (`.badge`)**: 둥글기 `20px` 스타일 및 투명도 10%의 연한 주황색 경고 배지 클래스 구현.
* **인터랙티브 최소 영역 확보**: 모든 클릭 가능 요소는 가로/세로 최소 **44px 이상** 확보 (`QA-MB-06`).

---

### 8. PR 제출 6대 증빙 규칙 (사전 정리용)
덱스는 작업 완료 후 비티 보고를 진행할 때 반드시 다음 6가지 항목을 증빙으로 정리하여 제출해야 합니다:
1. **로컬 구동 URL**: python3 -m http.server 8000 실행 후 http://localhost:8000/app/에서 확인 (또는 별도 서버 없이 app/index.html 파일을 브라우저에서 직접 열어 확인한 경로).
2. **모바일 반응형 검수**: iPhone SE 375px 및 표준 390px 크기의 구동 캡처 이미지.
3. **CSV 용량 제한 경계값 테스트 결과**: (본 UX01 단계에서는 "해당 없음 - UX01 범위 제외"로 표기).
4. **금지 표현 grep 검색 결과**: 소스 코드 대상 grep 명령어 실행 결과 (0건 통과 증명).
5. **인쇄 미리보기 캡처**: 브라우저 인쇄 모드(Cmd+P)를 실행한 화면 캡처 (UX01 레이아웃 적용 상태 확인).
6. **최종 수정 파일 요약**: 생성 및 수정한 파일 리스트.

---

### 9. Blocked 발생 시 중단 기준 및 보고 형식
작업 진행 중 아래 상황이 발생하면 **즉시 개발을 중단**하고 보고해야 한다:
* 기획서 범위를 초과하는 기능 요구가 있거나 UI 배치 순서가 맞지 않는 경우.
* 정의되지 않은 임의의 스타일 속성이나 색상을 추가해야 하는 경우.
* 외부 API 호출이나 토큰 하드코딩이 불가피하게 필요한 경우.

**[운영 프로토콜]**:
1. 덱스는 직접 Notion 상태를 변경하지 않고, Blocked 후보로 보고한다.
2. 비티가 1차 확인 후 Notion 상태 변경 필요 여부를 판단한다.
3. 빌 검수 또는 라이언 승인이 필요한 Blocked는 별도 게이트로 올린다.

**[Blocked 후보 보고 형식]**:
- 대상 Story/Task:
- 차단 원인:
- 영향 범위:
- 우회 제안:
- 비티 판단 필요 사항:
- 빌/라이언 게이트 필요 여부:
- 대기 상태:
```
