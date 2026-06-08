window.reviewaiMockData = {
  reviewSummary: {
    totalCount: 24,
    averageRating: 4.6,
    lowRatingCount: 3,
    checkItems: 3,
    ratingDelta: "-0.4"
  },
  positiveKeywords: [
    { label: "응대", value: 82 },
    { label: "청결", value: 68 },
    { label: "재방문", value: 54 }
  ],
  checkKeywords: [
    { label: "대기 시간", value: 46 },
    { label: "포장 안내", value: 32 },
    { label: "주차 문의", value: 24 }
  ],
  priorityReviews: [
    {
      rating: 2,
      text: "방문객이 몰린 시간대에 대기가 길었고 안내를 받기 어려웠습니다.",
      reason: "대기 시간 언급"
    },
    {
      rating: 1,
      text: "포장 요청이 누락되어 다시 확인해야 했습니다.",
      reason: "주문 처리 확인 필요"
    },
    {
      rating: 2,
      text: "주차 위치를 찾는 데 시간이 오래 걸렸습니다.",
      reason: "방문 안내 보완 필요"
    }
  ],
  improvementCards: [
    {
      title: "피크 시간 안내 보강",
      body: "상세페이지와 매장 안내 영역에 혼잡 시간대와 예상 대기 안내를 함께 배치합니다."
    },
    {
      title: "포장 주문 체크리스트",
      body: "포장 요청 확인 문구를 주문 확인 단계와 수령 안내 메시지에 반복 노출합니다."
    },
    {
      title: "방문 전 안내 FAQ",
      body: "주차 위치, 대기 방식, 문의 방법을 FAQ 카드로 묶어 첫 방문 고객의 탐색 시간을 줄입니다."
    }
  ],
  replyDrafts: [
    {
      id: "brand",
      label: "브랜드 톤",
      text: "소중한 의견 감사합니다. 말씀해 주신 대기 안내와 주문 확인 흐름을 내부에서 다시 점검하고, 방문 전 안내가 더 분명하게 전달되도록 개선하겠습니다."
    },
    {
      id: "friendly",
      label: "친근한 톤",
      text: "방문해 주셔서 감사합니다. 기다리시는 동안 안내가 충분하지 못했던 점을 확인했습니다. 다음 방문에는 더 편하게 이용하실 수 있도록 안내 방식을 다듬겠습니다."
    },
    {
      id: "formal",
      label: "격식 톤",
      text: "이용에 불편을 드린 점 확인했습니다. 고객님께서 남겨주신 내용을 바탕으로 대기 안내와 포장 확인 절차를 재점검하겠습니다."
    },
    {
      id: "short",
      label: "간결한 톤",
      text: "의견 감사합니다. 대기 안내와 주문 확인 절차를 점검해 더 나은 이용 경험을 준비하겠습니다."
    }
  ]
};
