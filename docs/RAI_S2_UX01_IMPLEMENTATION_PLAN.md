# 🏗️ RAI_S2_UX01_IMPLEMENTATION_PLAN.md v0.2
## 제목: 디자인 토큰 및 공통 컴포넌트 구현 계획서

본 계획서는 스프린트 2(S2)의 첫 번째 개발 단계인 `RAI-S2-UX01 디자인 토큰 및 공통 컴포넌트 구현`에 앞서, 프로젝트 Scaffold 준비 단계와 실제 토큰/레이아웃 구현 사양을 규정하고 보안/형상관리 가드레일을 통합하여 정의한 공식 개발 지침서입니다.

---

## 1. 개요 및 목적
* **목적**: 유료 수준의 신뢰감과 미려한 UI 품질을 갖춘 리뷰와이(Reviewai) 서비스를 개발하기 위해, 전체 페이지에 공통으로 적용될 CSS Custom Properties(디자인 토큰)와 기본 컴포넌트 스타일을 일원화하여 구축합니다.
* **대상 범위**:
  1. 선행 과제: Git 연동 준비, `.gitignore` 및 PR 템플릿 설정, 기본 Scaffold 디렉토리 생성
  2. 구현 범위: `app/css/index.css` (디자인 토큰 및 공통 클래스), `app/index.html` (Header/Footer 및 샘플 컴포넌트 마운트)
* **개발자 계약 연동**: 본 계획서에 정의된 완료 요건, 보안 규칙 및 금지 사항을 충족하지 못할 경우, 외주 계약 조항에 따라 재작업 지시가 내려집니다.

---

## 2. [선행 단계] Scaffold 및 형상관리 기초 구성
실제 앱 코드나 스타일 작성을 시작하기 전에 반드시 아래 형상관리 기초 구성 작업을 먼저 완료해야 합니다.

### 2.1. [선행] `.gitignore` 선행 작성
* **경로**: `.gitignore` (최상위 루트)
* **원칙**: Scaffold 폴더 생성 및 첫 커밋 전, 민감정보 유출 방지를 위해 반드시 `.gitignore` 파일을 먼저 생성해야 합니다.
* **필수 제외 패턴**:
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
* **마스킹 규칙**: `.env.example`에는 실제 키값을 넣지 않고, `NOTION_TOKEN=****MASKED****`, `GEMINI_API_KEY=****MASKED****`처럼 마스킹 예시만 작성합니다.


### 2.2. [선행] PR 템플릿 생성
* **경로**: `.github/pull_request_template.md`
* **내용**: [RAI_BRANCH_PR_RULES.md](file:///Users/user/Documents/reviewai/docs/RAI_BRANCH_PR_RULES.md)의 섹션 4에 규정된 'PR 템플릿 마크다운 예시'와 동일하게 작성하여 덱스가 PR 생성 시 6대 필수 증빙을 누락 없이 체크할 수 있게 합니다.

### 2.3. [선행] 프로젝트 Scaffold 구조 생성
* **경로**: 프로젝트 루트 아래 하위 디렉토리 생성
* **허용 구조**:
  - `app/` (프론트엔드 최상위 디렉토리)
    - `app/index.html` (메인 엔트리 HTML 파일)
    - `app/css/` (스타일시트 디렉토리)
      - `app/css/index.css` (디자인 토큰 및 공통 스타일)
    - `app/js/` (자바스크립트 로직 디렉토리)
      - `app/js/main.js` (프론트엔드 핵심 컨트롤러)
      - `app/js/parser.js` (CSV 파서 로직)
      - `app/js/mockData.js` (샘플 데이터 모음)
    - `app/README.md` (덱스 개발용 간단 런북)
  - `data/` (데이터 템플릿 디렉토리)
    - `data/sample_review_template.csv` (CSV 템플릿 샘플 파일)

---

## 3. [구현 단계] 세부 작업 명세 및 완료 조건

### 3.1. [RAI-S2-UX01-01] 디자인 토큰 변수 정의
* **구현 파일**: `app/css/index.css`
* **완료 요건 (Acceptance Criteria)**:
  1. `:root` 선택자 내에 아래의 표준 컬러 변수를 정확한 색상 코드로 선언해야 합니다.
     - `--primary`: `#1D4ED8` (프리미엄 블루)
     - `--primary-hover`: `#1E40AF` (마우스 오버 시 어두워지는 색상)
     - `--background`: `#F8FAFC` (화면 전체 부드러운 배경색)
     - `--card-bg`: `#FFFFFF` (카드 컨테이너용 순백색)
     - `--border`: `#E2E8F0` (경계선 색상)
     - `--text-primary`: `#0F172A` (주요 텍스트, 차분한 다크 그레이)
     - `--text-secondary`: `#64748B` (보조 텍스트/캡션)
     - `--success`: `#16A34A` (안정/긍정 신호용 초록색)
     - `--warning`: `#F97316` (주의 신호용 주황색)
     - `--danger`: `#DC2626` (위험 신호용 빨간색)
     - `--danger-bg`: `#FEF2F2` (위험 카드 배경용 옅은 빨간색)
     - `--kakao-yellow`: `#FEE500` (카카오 상담 CTA 전용 옐로우)
  2. 타이포그래피 규칙을 CSS 변수로 선언하고 공통 스타일을 지정합니다.
     - 폰트 폴백: `Pretendard`, -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
     - `--font-h1`: `bold 28px/1.4` (최상위 타이틀)
     - `--font-h2`: `semibold 20px/1.4` (섹션 및 카드 타이틀)
     - `--font-body`: `normal 15px/1.6` (일반 텍스트 및 본문)
     - `--font-caption`: `normal 12px/1.5` (메타데이터 및 부연 설명)
  3. 라운드 규칙을 CSS 변수로 선언합니다.
     - `--radius-lg`: `12px` (리포트/입력 대형 카드 컴포넌트용)
     - `--radius-sm`: `8px` (버튼, 인풋, 배지용)

### 3.2. [RAI-S2-UX01-02] 공통 레이아웃 구조 마크업
* **구현 파일**: `app/index.html`, `app/css/index.css`
* **완료 요건 (Acceptance Criteria)**:
  1. 전체 레이아웃의 최대 가로폭을 `1200px`로 제한하고, 중앙 정렬(`margin: 0 auto;`) 및 좌우 최소 패딩(`20px`)을 적용하여 뷰포트 크기 변화에도 정보가 중앙에 안정적으로 유지되도록 설계합니다.
  2. 로고 내비바 헤더(Header) 마크업을 진행합니다.
     - 좌측에 서비스 텍스트 로고 "리뷰와이(Reviewai)" 배치 완료.
     - 우측에 메인 화면 라우팅용 내비게이션 링크 구조 마련 (예: 홈/서비스 소개, 분석하기, 샘플 리포트).
  3. 정보 하단 풋터(Footer) 마크업을 진행합니다.
     - 카피라이트 문구 및 고객 센터/상담 접수 링크 수록 완료.

### 3.3. [RAI-S2-UX01-03] 공통 버튼/카드/배지 스타일 구현
* **구현 파일**: `app/css/index.css`, `app/index.html`
* **완료 요건 (Acceptance Criteria)**:
  1. **Primary Button 스타일 (`.btn-primary`)**:
     - 높이 `48px`, 배경색 `--primary`, 글자색 `#FFFFFF`, 라운드 `--radius-sm`.
     - 마우스 오버 시 `--primary-hover`로 배경색이 부드럽게 변하는 `transition: background-color 0.2s;` 적용.
  2. **카드 컴포넌트 스타일 (`.card`)**:
     - 배경색 `--card-bg`, 라운드 `--radius-lg`, 보더 `1px solid --border`.
     - 시각적 깊이감을 위한 미세한 그림자(`box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);`) 적용.
  3. **알림 배지/칩 스타일 (`.badge`)**:
     - 둥글기 `20px` 스타일 적용.
     - 경고 배지용 옅은 주황색 배경(배경 불투명도 10% 지원) 클래스 작성 완료.
  4. **모바일 사용성 가이드라인 준수**:
     - 모든 링크, 버튼, 탭 전환 단추 등 인터랙티브 요소는 최소 클릭 영역이 **가로/세로 44px 이상**이 되도록 패딩 또는 높이 값을 명시적으로 확보해야 합니다 (`QA-MB-06` 만족).

---

## 4. 금지 사항 및 오프스코프 (Off-Scope)
개발자 덱스는 구현 중 아래의 보안 및 범위 리스크 통제 수칙을 엄격하게 준수해야 합니다.
1. **임의 스타일 정의 금지**: 기획서에 명시되지 않은 ad-hoc 색상(예: 단순 원색 빨강, 원색 파랑 등)을 개별 클래스에 하드코딩하는 것을 금지합니다. 반드시 정의된 CSS 변수를 사용해야 합니다.
2. **보안 위협 완전 차단 (실제 Key 취급 금지)**:
   - 실제 API Key, Notion Token, `.env` 실제 값을 어떤 파일이나 코드, 주석, 로그 출력에도 기입하거나 노출해서는 안 됩니다.
   - 데이터 바인딩 로직을 테스트할 때는 하드코딩된 토큰 대신 모의 데이터(`mockData.js`)를 활용합니다.
3. **외부 프레임워크/빌드 도구 도입 금지**:
   - Vite, React, Next.js, Vue, Svelte, Tailwind, Bootstrap 등 외부 프레임워크/빌드 도구/대형 UI 라이브러리는 추가하지 않습니다. 이번 UX01은 Vanilla HTML, Vanilla CSS, Vanilla JavaScript 기준으로만 진행합니다.
   - package.json은 가급적 생성하지 않으며, 생성 시 외부 dependency 없이 로컬 실행 스크립트 수준으로 제한합니다.
4. **미승인 PR 생성 및 push 금지**:
   - 비티 1차 QA, 빌 검수, 라이언 승인 전에는 원격 push, PR 생성, merge를 진행하지 않습니다.
5. **오프스코프 기능 구현 금지**:
   - 스토어 API 연동 자동 리뷰 수집 UI 추가 금지.
   - PDF 자동 변환 및 파일 다운로드 UI 추가 금지 (Cmd+P 브라우저 인쇄 대체).
   - 가짜 또는 실제 결제 완료 화면 추가 금지.
   - 사장님 복사 전 자동 답변 게시 UI 추가 금지.


---

## 5. 검증 계획 및 PR 제출 기준 (QA ID 매핑)
* **연결 기획 QA ID**: `QA-MB-06` (최소 터치 범위 44px) 및 디자인 시스템 가이드.
* **PR 제출 6대 증빙 요건**:
  덱스는 main 브랜치 병합 요청용 PR을 제출할 때 반드시 다음 6가지 증빙을 설명에 포함하여 제출해야 합니다:
  1. **로컬 구동 URL**: python3 -m http.server 8000 실행 후 http://localhost:8000/app/에서 확인 (또는 별도 서버 없이 app/index.html 파일을 브라우저에서 직접 열어 확인한 경로).
  2. **모바일 반응형 검수**: iPhone SE 375px 및 표준 390px 크기에서의 헤더/풋터/레이아웃 구동 화면 캡처.
  3. **CSV 용량 제한 경계값 테스트 결과**: (UX01 단계에서는 구현 범위가 아니므로 "해당 없음 - UX01 범위 제외"로 기재).
  4. **금지 표현 grep 검색 결과**: 소스 코드 전체를 대상으로 금지 단어(허위 리뷰, 악성 고객, 블랙컨슈머 등)를 검색한 터미널 출력 결과 (검출 건수 0건 필수).
  5. **인쇄 미리보기 캡처**: 브라우저 인쇄 모드(Cmd+P)를 트리거하여 공통 레이아웃이 깔끔하게 용지에 표시되는지 확인한 미리보기 캡처 (UX01 단계의 공통 레이아웃 출력 레이아웃 수준 확인).
  6. **최종 수정 파일 요약**: 생성 및 수정한 파일 명세.
