# S2_DEX_NEW_CHAT_HANDOFF_PROMPT.md v0.3 (개발자 덱스 새 채팅 핸드오프 프롬프트 - 분석 및 준비용)

본 문서는 사용자가 개발자 덱스(Dex)의 새 채팅창을 열었을 때 복사하여 첫 메시지로 전송할 수 있도록 최적화된 프롬프트입니다. 실제 코드 수정, 파일 생성, git init 등의 작업을 유예하고 기획 분석 및 위험 보고에 초점을 맞추어 수정되었습니다.

---

## [덱스 채팅 입력용 프롬프트 본문]

```markdown
유저 OS: mac
프로젝트 경로: /Users/user/Documents/reviewai (현재 연결된 로컬 폴더)

안녕, 덱스(Dex). 나는 이 프로젝트의 개발 PM이자 QA 리드를 담당하는 AI 에이전트 비티(Biti)다.
리뷰와이(Reviewai) 서비스의 스프린트 1(S1) 기획 및 계약 설계가 최종 완료되어 라이언 PO의 승인을 얻었으며, 이제 스프린트 2(S2) 개발 구현 단계에 진입한다.

현재 프로젝트 폴더 내에는 실제 앱 코드(scaffold)는 아직 생성되지 않은 상태이며, S1 단계에서 기획된 6대 운영 문서와 개발 WBS, 작업 계약서 등이 들어 있다.

본 단계에서는 실제 파일 생성, 코드 수정, git init, 브랜치 및 PR 생성은 진행하지 않으며, 다음 6대 항목에 대해 사전 분석 및 점검을 수행하고 결과를 보고해 주기 바란다.

### 1. S1 최종 기준 문서 목록 (로컬 폴더 내 존재)
1. [S1_PRD_V1_6.md](file:///Users/user/Documents/reviewai/S1_PRD_V1_6.md) v0.3: 제품 요구사항 및 100건 제한 정책 명세
2. [S1_UX_UI_V1_6.md](file:///Users/user/Documents/reviewai/S1_UX_UI_V1_6.md) v0.5: 화면 설계 표준 및 컴포넌트 시각 품질 가이드
3. [S1_LANDING_REPORT_DESIGN_DIRECTION.md](file:///Users/user/Documents/reviewai/S1_LANDING_REPORT_DESIGN_DIRECTION.md) v0.4: 랜딩 및 리포트 세부 구조
4. [S1_S2_DESIGN_QA_CHECKLIST.md](file:///Users/user/Documents/reviewai/S1_S2_DESIGN_QA_CHECKLIST.md) v0.3: 29대 디자인 QA 체크리스트
5. [S1_DEX_UX_UI_TASK_SPEC.md](file:///Users/user/Documents/reviewai/S1_DEX_UX_UI_TASK_SPEC.md) v0.3: 마크업 개발 세부 사양
6. [S1_DEX_DEVELOPMENT_WBS.md](file:///Users/user/Documents/reviewai/S1_DEX_DEVELOPMENT_WBS.md) v0.3: 14개 하위 태스크 WBS 분해표 (우리가 구현할 핵심 WBS)
7. [contracts/S1_dex_work_contract.md](file:///Users/user/Documents/reviewai/RAI/contracts/S1_dex_work_contract.md) v0.2: 덱스 작업 공식 계약서 및 재작업 지시 조항
8. [docs/RAI_BRANCH_PR_RULES.md](file:///Users/user/Documents/reviewai/docs/RAI_BRANCH_PR_RULES.md) v0.3: GitHub 브랜치/PR 운영 규칙

### 2. S2 핵심 개발 환경 및 보안 가이드라인
* **기술 스택**: Vanilla HTML, Vanilla CSS, Vanilla JavaScript (외부 프레임워크나 복잡한 빌드 툴 배제)
* **보안 위험 해제**: Notion API 개인 토큰 및 Gemini API Key 등 민감한 자격 증명 정보는 절대 코드나 파일 내부에 하드코딩해서는 안 된다.
  - 현재 로컬에 `.env` 및 `.env.example` 템플릿이 구성되어 있다. Notion 데이터 추출 등 스크립트를 호출할 때 필요한 `NOTION_TOKEN` 등은 환경 변수나 로컬 `.env` 파일(Git 추적 배제)에서 읽어오도록 수정 완료되었다.
  - 덱스는 개발 중 어떠한 코드 파일에도 실제 비밀 키 값을 하드코딩해 넣지 않도록 주의해야 한다.

### 3. S2 형상 관리 및 PR 6대 증빙 규칙
* **main 직접 작업 제한**: main 브랜치 직접 push는 허용되지 않는다.
* **기능 개발 브랜치 생성**: 개발 범위에 맞춰 feature 브랜치를 분기하여 작업한다 (예: `feature/s2-ux01-token`).
* **PR 제출 시 6대 필수 증빙**: 덱스가 작업을 끝내고 main 브랜치로 병합하기 위해 PR을 작성할 때 반드시 다음 항목을 기재해야 한다:
  1. 로컬 구동 URL 정보
  2. 모바일 SE(375px) 및 표준(390px) 캡처 이미지
  3. CSV 용량 제한 경계값 테스트 결과 (0건/1건/100건/101건 초과 모달 팝업 결과)
  4. 금지 표현 grep 검색 결과 (매칭 0건)
  5. 인쇄 미리보기 캡처 (Cmd+P)
  6. 최종 수정 파일 요약

### 4. 금지 단어 및 오프스코프 (Off-Scope)
* **금지 단어**: 코드 및 UI에 "허위 리뷰", "악성 고객", "블랙컨슈머", "리뷰 삭제 보장", "매출 상승 보장", "검색 노출 보장", "100%", "완벽", "최상", "전격" 등의 단어가 포함되어서는 안 된다 (순화 표현 사용).
* **오프스코프**: 외부 크롤러 연동, 스토어 답변 자동 업로드 API, 가짜 결제 UI창 렌더링, 외부 PDF 다운로드 라이브러리는 구현 범위에서 제외한다 (Cmd+P를 통한 인쇄 모드로 대체).

### 5. 노션 스프린트 2 하위 WBS 세부 백로그 링크
빌(Bill)이 S2 개발 WBS 14대 항목을 노션 스프린트 백로그에 공식 등재 완료하였다. 작업 시 진행 상황에 맞추어 상태를 업데이트하라:
* **RAI-S2-UX01 (디자인 토큰 & 공통 컴포넌트)**:
  - [[RAI-S2-UX01-01] 디자인 토큰 변수 정의](https://app.notion.com/p/RAI-S2-UX01-01-3780f619eb7b81058292c4db2a313adf)
  - [[RAI-S2-UX01-02] 공통 레이아웃 구조 마크업 기준 정리](https://app.notion.com/p/RAI-S2-UX01-02-3780f619eb7b814199d5dc7c8283a705)
  - [[RAI-S2-UX01-03] 공통 버튼/카드/배지 스타일 기준 정리](https://app.notion.com/p/RAI-S2-UX01-03-3780f619eb7b8131964ddd706d49b4ca)
* **RAI-S2-UX02 (랜딩 페이지 & submit 입력)**:
  - [[RAI-S2-UX02-01] 홈 화면 7대 섹션 마크업 기준 정리](https://app.notion.com/p/RAI-S2-UX02-01-7-3780f619eb7b81c6ae0fedf2212b044e)
  - [[RAI-S2-UX02-02] /submit CSV 드롭존 피드백 기준 정리](https://app.notion.com/p/RAI-S2-UX02-02-submit-CSV-3780f619eb7b81dc87e8edb1399f015b)
  - [[RAI-S2-UX02-03] 100건 초과 모달 및 샘플 데이터 동선 기준 정리](https://app.notion.com/p/RAI-S2-UX02-03-100-3780f619eb7b81bd83a7dd360beaa1fe)
* **RAI-S2-UX03 (리포트 대시보드 시각 계층)**:
  - [[RAI-S2-UX03-01] /report 상단 헤더 및 4대 지표 기준 정리](https://app.notion.com/p/RAI-S2-UX03-01-report-4-3780f619eb7b813bb93bc3e0f76e6e1d)
  - [[RAI-S2-UX03-02] [탭 1] 분석 결과 요약 영역 기준 정리](https://app.notion.com/p/RAI-S2-UX03-02-1-3780f619eb7b8176b977e373164cfd03)
  - [[RAI-S2-UX03-03] [탭 2] AI 답글 초안 영역 기준 정리](https://app.notion.com/p/RAI-S2-UX03-03-2-AI-3780f619eb7b81b4abaed7198dc8257a)
* **RAI-S2-UX04 (모바일 반응형 & CTA QA)**:
  - [[RAI-S2-UX04-01] 375px/390px 반응형 기준 정리](https://app.notion.com/p/RAI-S2-UX04-01-375px-390px-3780f619eb7b813a923bcee6950c52e9)
  - [[RAI-S2-UX04-02] 모바일 가로 스크롤 필 탭 및 긴 리뷰 자세히 보기 기준 정리](https://app.notion.com/p/RAI-S2-UX04-02-3780f619eb7b816ea09de8508ad5c3f5)
  - [[RAI-S2-UX04-03] 카카오 CTA 모바일 배치 및 플로팅 CTA 배제 기준 정리](https://app.notion.com/p/RAI-S2-UX04-03-CTA-CTA-3780f619eb7b81e98934da42f032c6c3)
* **RAI-S2-UX05 (인쇄 레이아웃 QA)**:
  - [[RAI-S2-UX05-01] @media print 인쇄용 스타일 기준 정리](https://app.notion.com/p/RAI-S2-UX05-01-media-print-3780f619eb7b81b6ba6ac762f473f776)
  - [[RAI-S2-UX05-02] A4 인쇄 레이아웃 최적화 기준 정리](https://app.notion.com/p/RAI-S2-UX05-02-A4-3780f619eb7b81908816e20d4b78b5e1)

### 6. 지금 수행할 사전 분석 및 점검 요청 사항 (수정 금지)
덱스는 다음 6가지 항목에 대해 폴더 내 문서들과 Notion을 파악한 뒤 보고서 형식으로 답변을 제공하라:
1. **기준 문서 확인**: 로컬 폴더에 존재하는 8대 기획/운영 문서가 손상 없이 모두 잘 로딩되는지 유효성을 확인하라.
2. **S2 Story/Task 구조 이해**: 노션 링크를 통해 등재된 14개 하위 태스크의 선후 의존성 관계와 각 완료 요건(AC)을 바르게 이해했는지 보고하라.
3. **UX01 착수 전 선행 조건 정리**: 디자인 토큰 및 공통 레이아웃 작업(`RAI-S2-UX01`)에 진입하기 전에 먼저 확인하거나 정렬해야 할 규칙이 무엇인지 정리하라.
4. **UX01 구현 계획서 확인**: 로컬 문서 [docs/RAI_S2_UX01_IMPLEMENTATION_PLAN.md](file:///Users/user/Documents/reviewai/docs/RAI_S2_UX01_IMPLEMENTATION_PLAN.md) v0.1이 존재하는지 확인하고, 해당 문서에 규정된 토큰 색상 변수 및 레이아웃 너비 등의 기술 규격을 요약 분석하라.
5. **Scaffold 필요 여부와 추천 구조 제안**: S2 개발 시작 시 프로젝트 scaffold(기본 폴더 트리 및 파일)가 필요한 이유를 설명하고, 권장하는 최적의 파일/폴더 트리 구조 및 `.gitignore`에 넣어야 할 예외 파일 패턴 목록을 제안하라 (단, 실제 파일 생성이나 git init 등은 수행하지 말 것).
6. **Blocked 후보 보고**: 기획 및 운영 규칙을 토대로 개발 착수 시 예외 처리가 필요하거나, Blocked 상태로 빠질 가능성이 높은 잠재적 위험 요소가 있는지 보고하라.
```
