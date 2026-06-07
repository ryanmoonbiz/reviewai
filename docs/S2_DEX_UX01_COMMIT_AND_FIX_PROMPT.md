# S2_DEX_UX01_COMMIT_AND_FIX_PROMPT.md v0.3
## 제목: 모바일 줄바꿈 보완 및 형상 관리 격리 지시서 (초안 - 빌 검수/라이언 승인 대기)

**본 문서는 개발 PM 겸 QA 리드인 비티(Biti)가 개발자 덱스(Dex)에게 전달할 실제 개발 착수 지시서의 초안입니다. 빌의 검수와 라이언 PO의 최종 승인 후에 덱스에게 전달되어야 하며, 승인 전에는 덱스에게 송신하지 않습니다.**

---

## [덱스 전달용 프롬프트 본문]

```markdown
유저 OS: mac
프로젝트 경로: /Users/user/Documents/reviewai (현재 연결된 로컬 폴더)

안녕, 덱스(Dex). 나는 개발 PM 겸 QA 리드를 담당하는 비티(Biti)다.
네가 제출한 수동 캡처 증빙 4종은 빌(Bill) 최종 QA를 거쳤으며, 아래 1건의 레이아웃 품질 보완 사항과 초기 커밋 격리 방안(옵션 A)이 확정되었다. 

이에 따라 모바일 한국어 줄바꿈 개선 작업 및 로컬 Git 형상 관리 정비 작업을 수행할 것을 지시한다.

---

### 1. 목적
* 모바일 화면에서의 한글 텍스트 줄바꿈 품질을 개선하여 시각적 프리미엄 완성도를 높입니다.
* 기존 S1 기획/운영 문서 형상과 덱스의 신규 개발 코드를 서로 다른 커밋으로 온전히 분리하여 형상 이력을 체계화합니다.
* 로컬에서 PR 제출에 필요한 6대 증빙 자료와 PR 템플릿 내용을 완비합니다.

---

### 2. 허용 작업 (Allowed Operations)
* **CSS 파일 수정**: `app/css/index.css` 수정 (줄바꿈 관련 속성 추가).
* **Git 로컬 작업**: `git status`, `git checkout/switch`, `git add`, `git commit`, `git rebase` 등의 로컬 브랜치/커밋 조작.
* **로컬 서버 구동 및 검증**: `python3 -m http.server 8000` 가동 및 브라우저 수동 확인.

### 3. 금지 작업 (Forbidden Operations)
* **원격 push 및 강제 push 금지**: `git push origin ...` 또는 `git push -f` 등의 원격 저장소 업로드 작업 금지.
* **git reset --hard 금지**: 작업 내역 분실 우려가 있는 `git reset --hard` 실행 금지.
* **충돌 파일 임의 삭제 금지**: 리베이스 및 팝 도중 발생한 충돌 파일을 빌/비티 컨펌 없이 강제로 삭제하는 행위 금지.
* **.env 파일 열람/출력/커밋 금지**: 실제 API Key, Notion Token, Authorization 값 등 비밀 정보 노출 방지를 위해 `.env` 파일의 열람, console 출력 및 Git add/commit 행위 전면 금지.
* **GitHub PR 실제 생성 금지**: GitHub 웹이나 CLI를 통한 실제 PR 발행 금지.
* **merge 금지**: main 브랜치로의 실제 병합 행위 금지.
* **외부 프레임워크/라이브러리 도입 금지**: Vite, React, Tailwind CSS 등 외부 빌드도구/Dependency 추가 전면 금지.
* **Notion 직접 변경 금지**: 덱스는 직접 Notion 상태를 변경하지 않고 결과를 채팅으로 보고한다.

---

### 4. 개발 보완 요구 사양: 모바일 한국어 줄바꿈 개선
* **현상**: 모바일(375px/390px) 뷰포트에서 히어로 타이틀("리뷰 흐름을 한 화면에서 정리하는 분석 리포트") 등의 단어가 어색하게 단어 중간에서 잘려 줄바꿈되는 품질 저하 발생.
* **해결 방안**: 
  - CSS 파일(`app/css/index.css`)의 `h1`, `h2`, `p` 등 주요 텍스트 컨테이너에 아래 줄바꿈 속성을 적용하여 단어 단위로 깔끔하게 줄바꿈되도록 수정한다.
  ```css
  word-break: keep-all;
  overflow-wrap: break-word;
  ```
  - selector는 현재 css 구조에 맞춰 알맞게 선언하여 레이아웃 가로 넘침이 발생하지 않도록 조율한다.

---

### 5. Git 형상 관리 정비 순서 (옵션 A - 격리형 커밋)
기존에 생성되어 있던 S1 기획 문서(WBS, PRD, 운영룰 등)와 덱스의 개발 Scaffold 코드를 분리 커밋하기 위해 아래 순서대로 정확하게 실행하십시오.

#### 5.1. [선행] Git 작업 전 안전장치 실행 및 파일 확인
1. 브랜치 전환 전 `git status --short`를 실행하여 파일 목록을 확인합니다.
   * *중요 안전 규칙*: **초기 Git 저장소에서는 대부분의 파일이 untracked 상태일 수 있으므로, `git stash push -u`를 기계적으로 먼저 실행하지 않습니다.** 먼저 `git status --short` 결과를 확인하여 baseline 후보 파일(기존 기획 문서)과 UX01 개발 산출물 후보를 분류한 뒤, 브랜치 전환이 Git 엔진에 의해 실제 차단되는 경우에만 선택적으로 stash 사용을 검토하십시오.
   * stash를 사용할 경우 어떤 파일들이 stash에 저장되었는지 보고서에 정확히 기록해야 하며, rebase나 pop 과정에서 충돌이 발생하면 임의로 코드를 수정/해결하지 말고 즉시 `git rebase --abort`를 수행한 뒤 **Blocked 후보**로 비티에게 보고해야 합니다.
2. 실제 `git add` 및 `git commit`을 진행하기 전, 아래 **[커밋 전 파일 분류표]** 양식을 채워 비티에게 먼저 보고하십시오. **비티의 확인 및 지시를 받은 후에만 실제 커밋을 진행합니다.** (비티가 판단하기 어려운 복잡한 형상일 경우 빌/라이언 리드진 게이트로 상신됩니다.)

```text
[커밋 전 파일 분류표]
1. baseline 문서 커밋 후보
- 포함 예정:
- 제외 예정:
- .gitignore 포함 여부:
- .env.example 포함 여부:
- .env 제외 확인:

2. UX01 개발 커밋 후보
- 포함 예정:
- 제외 예정:
- app/ 포함 여부:
- data/ 포함 여부:
- .github/pull_request_template.md 포함 여부:
- .gitignore 제외 여부:
- .env.example 제외 여부:

3. 위험 파일 확인
- .env:
- .env.*:
- node_modules/:
- scratch/:
- all_notion_results.json:
- db_*.json:
```

#### 5.2. main 브랜치에서 baseline 문서 커밋 생성 (비티 승인 후 실행)
1. `main` 브랜치로 이동(switch)합니다.
2. baseline 문서 커밋에 **기존 기획/운영 문서**와 보안 보호용 **`.gitignore`**, **`.env.example`**을 포함하여 스테이징합니다. 단, 개발 산출물 폴더인 `app/`, `data/` 및 `.github/pull_request_template.md` 파일은 제외해야 합니다.
   * *보안 필수 체크*: `git status` 또는 `git status --ignored` 또는 `git check-ignore .env`를 실행하여 민감한 `.env` 및 `.env.*` 파일이 git 추적 대상에서 온전히 잘 제외되었는지 확인한 후 add 하십시오.
3. 아래 커밋 메시지로 커밋을 실행합니다:
   ```text
   docs: S1 기획 및 운영 기준 문서 초기 커밋
   ```

#### 5.3. feature 브랜치 복귀 및 rebase
1. 다시 `feature/s2-ux01-token` 브랜치로 돌아옵니다.
2. main의 baseline 커밋을 반영하기 위해 `git rebase main`을 실행합니다.
   * *rebase 충돌 발생 시 규칙*: 충돌이 발생하면 즉시 `git rebase --abort`를 수행하여 리베이스를 취소한 뒤 중단하고, 즉시 **Blocked 후보**로 비티에게 보고하십시오.
3. stash로 보관된 작업 내역이 있다면 `git stash pop`을 실행하여 개발 내역을 복구합니다.
   * *pop 충돌 발생 시 규칙*: stash pop 도중 충돌이 발생하면 임의 해결하지 말고 즉시 중단하고 **Blocked 후보**로 비티에게 보고하십시오.

#### 5.4. UX01 개발 코드 커밋 생성
1. 덱스가 생성 및 수정 완료한 **UX01 개발 산출물만 스테이징**합니다.
   * *정합성 규칙*: 이 커밋에는 `.github/pull_request_template.md`, `app/`, `data/` 하위 파일들만 포함합니다. **`.gitignore`와 `.env.example`은 이미 baseline 문서 커밋에 포함되었으므로 UX01 개발 커밋 대상에서 반드시 제외**되어야 합니다.
2. 아래 커밋 메시지로 커밋을 실행합니다:
   ```text
   feat: S2 UX01 scaffold and design tokens
   ```

---

### 6. PR 6대 필수 증빙 로컬 완비
작업 완료 후 로컬에서 아래 6대 필수 증빙 자료를 수합하고 보고서 본문을 준비하십시오. (Desktop 1200px 캡처는 추가 참고 증빙으로 제출하되, 6대 필수 증빙 공식 항목 수에는 포함하지 마십시오.)
1. **로컬 구동 URL**: python3 서버 구동 확인 주소 (예: `python3 -m http.server 8000` 구동 후 `http://localhost:8000/app/` 접속).
2. **모바일 375px/390px 캡처**: (줄바꿈이 단어 단위로 가독성 있게 정리된 iPhone SE 등 모바일 화면 캡처).
3. **CSV 용량 제한 경계값 테스트 결과**: (본 UX01 단계에서는 "해당 없음 - UX01 범위 제외"로 표기).
4. **금지 표현 grep 검색 결과**: 소스 코드 전체 대상 grep 명령어 실행 결과 (0건 통과 증명).
5. **인쇄 미리보기 캡처**: (A4 첫 페이지 레이아웃 확인 캡처).
6. **최종 수정 파일 요약**: 변경된 파일 목록.

---

### 7. 완료 보고 형식
작업 완료 후 반드시 아래의 형식에 맞춰 결과를 채팅창으로 보고해 주십시오.

```markdown
### UX01 로컬 커밋 분리 및 PR 준비 보고

1. 현재 브랜치 상태
- 현재 브랜치:
- git status 결과 요약:

2. baseline 문서 커밋
- 커밋 해시:
- 커밋 메시지:
- 포함 파일 요약:

3. UX01 개발 커밋
- 커밋 해시:
- 커밋 메시지:
- 포함 파일 요약:

4. PR 6대 증빙 준비 상태
- 로컬 구동 URL:
- Desktop 1200px 캡처 (추가 증빙):
- Mobile 375px 캡처:
- Mobile 390px 캡처:
- Cmd+P 인쇄 미리보기 캡처:
- 금지 표현 grep 결과:
- 최종 수정 파일 요약:

5. 보안 확인
- .env Git 추적 제외 여부:
- .env.example 실제 키값 미포함 여부:
- 실제 API Key/Token 노출 여부:
- 외부 dependency 추가 여부:

6. 금지 작업 준수 여부
- 원격 push 여부:
- PR 실제 생성 여부:
- merge 여부:
- Notion 직접 변경 여부:

7. Blocked 후보
- 있음/없음:
- 있다면 차단 원인:
```
```
