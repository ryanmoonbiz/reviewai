# MRVS JSON 제출양식

Notion에 직접 접근하지 못하는 평가자는 아래 JSON 양식으로 평가 결과를 제출한다.

```json
{
  "evaluator": "",
  "role": "",
  "scores": {
    "problem_intensity": 0,
    "target_clarity": 0,
    "value_proposition": 0,
    "behavior_conversion": 0,
    "willingness_to_pay": 0,
    "trust_quality": 0,
    "operational_readiness": 0,
    "repeatability": 0
  },
  "total_score": 0,
  "score_rationale": {
    "problem_intensity": "",
    "target_clarity": "",
    "value_proposition": "",
    "behavior_conversion": "",
    "willingness_to_pay": "",
    "trust_quality": "",
    "operational_readiness": "",
    "repeatability": ""
  },
  "top_risks": ["", "", ""],
  "recommended_backlogs": [
    {
      "priority": "P0",
      "backlog": "",
      "reason": ""
    },
    {
      "priority": "P1",
      "backlog": "",
      "reason": ""
    },
    {
      "priority": "P2",
      "backlog": "",
      "reason": ""
    }
  ],
  "s3_decision": "",
  "reasoning_summary": ""
}
```

작성 규칙:
- 점수 합계는 100점을 넘지 않는다.
- 비어 있는 항목을 남기지 않는다.
- 근거가 부족하면 낮게 평가한다.
- 추천 백로그는 실제로 다음 스프린트에 넣을 수 있는 수준으로 작성한다.
