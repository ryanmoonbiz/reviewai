# 🏗️ RAI_S2_SCAFFOLD_PLAN.md (스프린트 2 Scaffold 준비안)

본 문서는 스프린트 1(S1)에서 최종 승인된 기획 범위를 바탕으로, 스프린트 2(S2) 개발에 공식 진입하기 전 필요한 폴더 구조, 기술 스택, Mock 데이터 규격 및 개발 계획을 수립한 준비안입니다.

---

## 1. S2 개발 목표 및 범위 요약
* **핵심 목표**: Mock 데이터를 기반으로 직접 복사-붙여넣기 및 CSV 업로드 폼을 연동하여 100개 이하의 리뷰 데이터를 처리하고, `/report` 화면(분석 요약, AI 답글 초안, 개선 가이드 탭)을 시각적으로 완성하는 MVP 구축.
* **제외 사항**: 실결제 연동, API 직접 호출 및 하드코딩, PDF 생성 엔진, Excel 업로드.

---

## 2. 권장 프로젝트 폴더 구조
덱스(Dex)의 개발 착수 및 구조 일원화를 위해 아래의 디렉토리 구조를 생성합니다. (S2 공식 진입 후 스캐폴딩 작업)

```text
reviewai/
├── .github/
│   └── pull_request_template.md        # PR 작성 템플릿
├── docs/                               # S1 6대 운영 문서 및 개발 계획
│   ├── RAI_OPERATING_RULES.md
│   ├── RAI_AGENT_ROLES.md
│   ├── RAI_BRANCH_PR_RULES.md
│   ├── RAI_SCRUM_BACKLOG_RULES.md
│   ├── RAI_QA_CHECKLIST.md
│   ├── RAI_RISK_GUARDRAILS.md
│   └── RAI_S2_SCAFFOLD_PLAN.md
├── product/                            # PRD v1.6, 스토리보드, 기획 원본
├── data/                               # CSV 업로드 템플릿 및 데이터 샘플
│   └── sample_review_template.csv      # CSV 업로드 샘플 파일
├── app/                                # 실제 프론트엔드 웹앱 소스 코드
│   ├── index.html                      # 진입 HTML 파일
│   ├── css/
│   │   └── index.css                   # 공통 리셋, 테마 변수, 레이아웃 CSS
│   ├── js/
│   │   ├── main.js                     # 렌더링 및 UI 바인딩 로직
│   │   ├── parser.js                   # CSV 파싱 및 예외 처리
│   │   └── mockData.js                 # UI 표시용 Mock 분석 데이터 세트
│   └── README.md                       # 앱 폴더 마크다운 설명서
└── package.json                        # 로컬 개발 및 번들러용 설정 파일 (필요 시)
```

---

## 3. 기술 스택 및 테마 스타일 가이드
* **기본 기술**: Vanilla HTML, Vanilla CSS, Vanilla JavaScript (프레임워크 배제)
* **CSS 테마 디자인**:
  * **메인 컬러**: 프리미엄 신뢰감을 주는 블루 계열 (`#1E3A8A` / HSL 조율 컬러)
  * **보조 컬러**: 깔끔하고 가독성 높은 그레이 계열 (`#F3F4F6` / `#374151`)
  * CSS Custom Properties(변수)를 `app/css/index.css` 최상단에 선언하여 일괄 관리.
  * 반응형 웹디자인(Flexbox, CSS Grid)을 적용하여 모바일 화면 최적화 보장.

---

## 4. 데이터 및 Mock 데이터 규격

### 4.1. CSV 업로드 템플릿 규격 (`data/sample_review_template.csv`)
* **필수 컬럼**:
  * `reviewText` (텍스트): 분석할 고객 리뷰 내용
  * `rating` (숫자 1~5): 리뷰 별점
* **선택 컬럼**:
  * `date` (텍스트/날짜): 리뷰 작성일 (YYYY-MM-DD)
  * `options` (텍스트): 구매 옵션 정보

### 4.2. Mock 분석 리포트 JSON 규격 (`app/js/mockData.js`)
Gemini API 미연동 상태에서도 완벽하게 UI 화면을 렌더링하기 위해, 덱스는 아래 구조의 Mock 데이터를 호출하여 사용합니다.

```json
{
  "summary": {
    "totalReviews": 85,
    "averageRating": 3.8,
    "ratingDropWarning": true,
    "negativeKeywords": ["배송 지연", "파손", "고객센터 무응답"],
    "positiveKeywords": ["디자인 예쁨", "가성비 최고", "친절함"]
  },
  "complaints": [
    { "keyword": "배송 지연", "count": 12, "ratio": 14.1 },
    { "keyword": "포장 불량", "count": 8, "ratio": 9.4 }
  ],
  "dangerousReviews": [
    {
      "reviewText": "주문한 지 일주일이 지났는데도 아무 연락이 없고 배송이 안 오네요. 당장 환불해 주세요. 안 그러면 고소합니다.",
      "rating": 1,
      "date": "2026-06-01"
    }
  ],
  "aiDrafts": {
    "friendly": [
      {
        "content": "안녕하세요 사장님입니다! 배송 지연으로 불편을 드려 정말 죄송합니다. 빠르게 조치를 취하겠습니다.",
        "needsWarning": false
      }
    ],
    "brand": [
      {
        "content": "리뷰와이 스토어를 찾아주셔서 감사합니다. 배송 처리에 지연이 발생한 점 고개 숙여 사과드립니다.",
        "needsWarning": false
      }
    ],
    "cs": [
      {
        "content": "안녕하세요. 불편을 드린 배송 지연 사항은 담당 부서와 조율 중에 있습니다. 신속히 안내드리겠습니다.",
        "needsWarning": false
      }
    ],
    "revisit": [
      {
        "content": "소중한 피드백 감사드립니다. 더 나은 배송 품질로 다시 보답할 수 있도록 조치하겠습니다.",
        "needsWarning": true
      }
    ]
  },
  "improvements": [
    {
      "category": "상세페이지",
      "issue": "배송 지연 불만 다수 발생",
      "recommendation": "상세페이지 상단에 '현재 택배사 물량 폭주로 인한 배송 지연 가능성(2~3일)' 배너를 추가하여 사전 기대를 조절하세요."
    }
  ]
}
```

---

## 5. S2 덱스(Dex) 작업 분해 요약 (10단계)
1. **`RAI-S2-ST01`**: 프로젝트 scaffold 및 기본 README/폴더 구조 생성 (S1 산출물 docs 정리)
2. **`RAI-S2-ST02`**: 스타일가이드 index.css 및 공통 레이아웃 컴포넌트 세팅
3. **`RAI-S2-ST03`**: 홈 화면 기획 적용 및 스토어 정보, 수동 리뷰 데이터 입력 화면(복붙 + CSV) 개발
4. **`RAI-S2-ST04`**: 리뷰 100개 제한 검증 및 초과 시 견적 안내/상담 팝업 개발
5. **`RAI-S2-ST05`**: 분석 대기 진행 뷰 및 통합 대시보드 리포트 화면(`/report`) 마운트 (Mock 데이터 연동)
6. **`RAI-S2-ST06`**: 위험 리뷰 리스트 카드 및 별점 하락 우려 신호 분석 요약 컴포넌트 개발
7. **`RAI-S2-ST07`**: 4종 브랜드 톤 탭 선택에 따른 AI 답글 초안 컴포넌트 개발 및 클립보드 복사 구현
8. **`RAI-S2-ST08`**: 5대 위험 표현군 필터링 및 **[민감 표현 감지 - 수동 검수 필수]** 배지 UI 구현
9. **`RAI-S2-ST09`**: 상세페이지/FAQ 개선 포인트 제안 카드 및 브라우저 인쇄 친화형 CSS 스타일 디자인 적용
10. **`RAI-S2-ST10`**: 신청/상담 연결 CTA 폼 구현 및 최종 통합 테스트

---

## 6. 다음 단계 실행 지침 (주의사항)
* 덱스에게 실제 개발 개시나 계약 지시를 전달하기 전, **본 준비안 및 6대 운영 문서의 리드진 최종 서명 완료**를 확인해야 합니다.
* 본 준비안이 합의되면 S2 스프린트의 첫 태스크인 `RAI-S2-ST01`에 착수하여 로컬 디렉토리 스캐폴딩과 운영 문서 탑재 작업을 덱스가 직접 진행하게 됩니다.
