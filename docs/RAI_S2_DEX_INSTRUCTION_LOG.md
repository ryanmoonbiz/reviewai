# 📝 RAI_S2_DEX_INSTRUCTION_LOG.md v0.1
## 제목: 스프린트 2 개발자 덱스(Dex) 지시 로그

본 문서는 개발 PM 겸 QA 리드인 비티(Biti)가 개발자 덱스(Dex)에게 지시를 내리기 전 또는 후에 지시 내용, 권한 범위, 기대 산출물 및 리스크를 투명하게 기록하기 위한 공식 운영 로그입니다.

---

## 덱스 지시 로그 목록

### [지시 로그 #01] S2 개발 분석 및 사전 준비 요청
* **날짜**: 2026년 06월 07일
* **대상 Story/Task**: `RAI-S2-UX01` 및 S2 전체 태스크 (분석/준비 단계)
* **지시 유형**: 준비
* **비티 단독 가능 여부**: 가능 (단독 진행 가능 항목에 해당)
* **빌 검수 필요 여부**: 불필요
* **라이언 승인 필요 여부**: 불필요
* **덱스에게 전달한 프롬프트**: [S2_DEX_NEW_CHAT_HANDOFF_PROMPT.md](file:///Users/user/Documents/reviewai/docs/S2_DEX_NEW_CHAT_HANDOFF_PROMPT.md) v0.3 본문 내용
* **기대 산출물**: 덱스 측의 기획/운영 문서 유효성 보고, WBS 의존성 이해도 요약, UX01 구현 계획서 사양 분석, 권장 Scaffold 및 `.gitignore` 설정 제안, 잠재적 Blocked 위험 요소가 포함된 사전 준비 보고서
* **완료 기준**:
  1. 덱스가 임의의 코드 생성이나 `git init` 등의 수정 행위를 수행하지 않고 분석만 수행했는가?
  2. 14대 WBS 의존성과 UX01 구현 계획서 변수 사양을 바르게 요약했는가?
  3. 기획서 기준에 부합하는 Scaffold 디렉토리 트리를 충실히 제안했는가?
  4. Blocked 후보 및 리스크 요소를 식별 보고했는가?
* **리스크**: 없음 (읽기 전용 분석 작업이므로 코드Regression이나 보안 노출 위험이 원천 차단됨)
* **다음 게이트**: 빌(Bill)의 `RAI-S2-ST01` (Scaffold 생성) 지시문 검수 및 라이언 PO의 착수 승인

### [지시 로그 #02] S2 Scaffold 및 디자인 토큰 개발 지시서 초안 작성 (v0.2 개정)
* **날짜**: 2026년 06월 07일
* **대상 Story/Task**: `RAI-S2-UX01` 및 WBS 하위 태스크 (Scaffold 및 공통 디자인 토큰 구축)
* **지시 유형**: 개발 착수 지시서 (초안 작성 및 개정 완료)
* **비티 단독 가능 여부**: 불가능 (초안 작성은 가능하나 덱스 실제 전달 시 **빌 검수 및 라이언 최종 승인 필수**)
* **빌 검수 필요 여부**: 필요 (조건부 승인 후 v0.2 재검수 대기)
* **라이언 승인 필요 여부**: 필요 (대기 중)
* **덱스에게 전달한 프롬프트**: [S2_DEX_UX01_SETUP_AND_TOKEN_IMPLEMENTATION_PROMPT.md](file:///Users/user/Documents/reviewai/docs/S2_DEX_UX01_SETUP_AND_TOKEN_IMPLEMENTATION_PROMPT.md) v0.2 (개정 완료, 미전달)
* **기대 산출물**:
  1. 최상위 루트 `.gitignore` 파일 생성 (예외 및 .env.example 복구 예외 규칙 적용)
  2. `.github/pull_request_template.md` 파일 생성
  3. `app/`, `data/` 디렉토리 하위의 핵심 Scaffold 파일 생성
  4. `app/css/index.css` 내 12대 색상 변수 및 Pretendard 타이포그래피, 둥글기 변수 선언 완료
  5. `app/index.html` 공통 레이아웃 마크업 및 스타일링 구현
  6. 공통 컴포넌트(버튼, 카드, 배지) 마크업 구현 및 최소 44px 클릭 영역 준수
* **완료 기준**:
  1. `.gitignore`가 프로젝트 Scaffold 생성보다 선행하여 작성되었는가? (`!.env.example` 예외 적용 확인)
  2. PR 템플릿의 6대 필수 증빙 요건을 로컬 런칭 단계 수준으로 "PR 준비" 상태로 완비했는가? (원격 push 및 PR 생성은 최종 승인 전 금지)
  3. UI에 하드코딩된 API Key 및 Notion Token 등의 보안 위반 요소가 없는가?
  4. 덱스가 임의로 오프스코프(크롤링, PDF 라이브러리, PG결제 등) 및 외부 빌드 도구(Vite, React 등)를 도입하지 않았는가?
* **리스크**: `.gitignore` 작성 누락 시 환경 변수 노출 우려, 빌드 도구 도입으로 인한 아키텍처 혼선, 사전 승인 전 원격 push 진행 리스크.
* **다음 게이트**: 빌(Bill)의 v0.2 지시서 최종 재검수 및 라이언 PO의 최종 착수 승인 후 덱스에게 송신.

### [지시 로그 #03] UX01 로컬 커밋 격리 및 모바일 줄바꿈 보완 지시 (v0.3 개정)
* **날짜**: 2026년 06월 07일
* **대상 Story/Task**: `RAI-S2-UX01` (모바일 가독성 품질 보완 및 형상 관리 격리)
* **지시 유형**: 보완 및 로컬 커밋 정비
* **비티 단독 가능 여부**: 불가능 (개발 동작 및 브랜치/형상 변경 명령이 수반되므로 **빌 검수 및 라이언 최종 승인 필요**)
* **빌 검수 필요 여부**: 필요 (조건부 승인 후 v0.3 재검수 대기)
* **라이언 승인 필요 여부**: 필요 (대기 중)
* **덱스에게 전달할 프롬프트**: [S2_DEX_UX01_COMMIT_AND_FIX_PROMPT.md](file:///Users/user/Documents/reviewai/docs/S2_DEX_UX01_COMMIT_AND_FIX_PROMPT.md) v0.3 (개정 완료, 미전달)
* **기대 산출물**:
  1. `app/css/index.css` 수정 (keep-all 및 break-word 규칙 반영하여 모바일 제목 줄바꿈 가독성 개선)
  2. main 브랜치에서 기존 기획/운영 문서 20여 종과 함께 `.gitignore`, `.env.example`을 baseline commit으로 구성 (`docs: S1 기획 및 운영 기준 문서 초기 커밋`)
  3. `feature/s2-ux01-token` 브랜치에 main의 baseline commit 리베이스(rebase) 및 pop 충돌 시 즉시 중단 및 에스컬레이션
  4. 덱스 개발 Scaffold 코드만 별도 커밋 분리 (`feat: S2 UX01 scaffold and design tokens` - `.gitignore`와 `.env.example` 커밋 대상에서 제외)
  5. PR 6대 필수 증빙(로컬 URL, 모바일 375px/390px 캡처, CSV 경계값 결과, grep 결과, 인쇄 캡처, 파일 요약) 및 추가 참고 증빙(Desktop 1200px 캡처) 로컬 완비
* **완료 기준**:
  1. 기획/운영 문서 및 기어이그노어 커밋과 덱스의 Scaffold 개발 코드 커밋이 온전히 분리되었는가? (git log 대조)
  2. 모바일 제목에서 단어 중간 끊김 줄바꿈이 keep-all 및 break-word 속성을 통해 완벽히 해결되었는가?
  3. 커밋 전 [커밋 전 파일 분류표]를 성실히 작성하여 보고 및 승인 하에 커밋을 수행했는가?
  4. 원격 저장소로의 push, PR 실제 생성, merge, git reset --hard가 실행되지 않았는가?
  5. .env 보안 위반(API Key, Token 노출)이 완벽히 통제되었는가?
* **리스크**: 리베이스/팝 충돌 리스크, git reset --hard로 인한 작업 유실 리스크, 민감값 노출 리스크, 파일 중복 커밋으로 인한 정합성 위배.
* **다음 게이트**: 빌(Bill)의 v0.3 지시서 최종 재검수 및 라이언 PO의 최종 착수 승인 후 덱스에게 송신.



