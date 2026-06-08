(function () {
  var STORAGE_KEY = "reviewai:ux02-input";
  var REVIEW_LIMIT = 100;
  var MAX_FILE_SIZE = 2 * 1024 * 1024;
  var REPORT_DELAY = 700;
  var yearNode = document.getElementById("current-year");
  var form = document.getElementById("review-form");
  var storeNameInput = document.getElementById("store-name");
  var reviewTextInput = document.getElementById("review-text");
  var csvFileInput = document.getElementById("csv-file");
  var dropzone = document.getElementById("review-dropzone");
  var formMessage = document.getElementById("form-message");
  var startButton = document.getElementById("analysis-start");
  var clearButton = document.getElementById("form-clear");
  var previewTitle = document.getElementById("preview-title");
  var previewList = document.getElementById("preview-list");
  var reviewCountBadge = document.getElementById("review-count-badge");
  var limitModal = document.getElementById("limit-modal");
  var limitModalClose = document.getElementById("limit-modal-close");
  var sampleReportLink = document.getElementById("sample-report-link");
  var loadingView = document.getElementById("loading-view");
  var reportView = document.getElementById("report-view");
  var reportBackButton = document.getElementById("report-back");
  var reportStoreName = document.getElementById("report-store-name");
  var reportSummaryCopy = document.getElementById("report-summary-copy");
  var reportAverageRating = document.getElementById("report-average-rating");
  var reportTotalCount = document.getElementById("report-total-count");
  var reportCheckCount = document.getElementById("report-check-count");
  var reportRatingDelta = document.getElementById("report-rating-delta");
  var positiveKeywordList = document.getElementById("positive-keyword-list");
  var checkKeywordList = document.getElementById("check-keyword-list");
  var priorityReviewList = document.getElementById("priority-review-list");
  var replyTabs = document.getElementById("reply-tabs");
  var replyDraftText = document.getElementById("reply-draft-text");
  var replyCopyButton = document.getElementById("reply-copy");
  var replyCopyMessage = document.getElementById("reply-copy-message");
  var improvementList = document.getElementById("improvement-list");
  var activeDraftId = "brand";
  var currentReviews = [];

  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  if (!form || !window.reviewaiParser) {
    return;
  }

  renderState([], "idle", "리뷰 데이터를 입력하면 분석 시작 버튼이 활성화됩니다.");

  reviewTextInput.addEventListener("input", function () {
    var reviews = window.reviewaiParser.parseTextReviews(reviewTextInput.value);
    applyReviews(reviews, "텍스트 입력을 확인했습니다.");
  });

  storeNameInput.addEventListener("input", function () {
    if (currentReviews.length > 0 && currentReviews.length <= REVIEW_LIMIT) {
      persistReviews(currentReviews, "draft");
    }
  });

  csvFileInput.addEventListener("change", function (event) {
    var file = event.target.files && event.target.files[0];
    handleFile(file);
  });

  ["dragenter", "dragover"].forEach(function (eventName) {
    dropzone.addEventListener(eventName, function (event) {
      event.preventDefault();
      dropzone.classList.add("is-dragging");
    });
  });

  ["dragleave", "drop"].forEach(function (eventName) {
    dropzone.addEventListener(eventName, function (event) {
      event.preventDefault();
      dropzone.classList.remove("is-dragging");
    });
  });

  dropzone.addEventListener("drop", function (event) {
    var file = event.dataTransfer.files && event.dataTransfer.files[0];
    handleFile(file);
  });

  clearButton.addEventListener("click", function () {
    clearInputs();
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (currentReviews.length === 0 || currentReviews.length > REVIEW_LIMIT) {
      sessionStorage.removeItem(STORAGE_KEY);
      return;
    }

    sessionStorage.removeItem(STORAGE_KEY);
    persistReviews(currentReviews, "ready");

    renderState(currentReviews, "success", "입력 데이터가 임시 저장되었습니다.");
    showLoadingThenReport();
  });

  limitModalClose.addEventListener("click", function () {
    closeLimitModal();
  });

  limitModal.addEventListener("click", function (event) {
    if (event.target === limitModal) {
      closeLimitModal();
    }
  });

  if (sampleReportLink) {
    sampleReportLink.addEventListener("click", function (event) {
      event.preventDefault();
      ensureSampleInput();
      showLoadingThenReport();
    });
  }

  if (reportBackButton) {
    reportBackButton.addEventListener("click", function () {
      showInputView();
    });
  }

  if (replyCopyButton) {
    replyCopyButton.addEventListener("click", function () {
      copyActiveDraft();
    });
  }

  function handleFile(file) {
    if (!file) {
      return;
    }

    sessionStorage.removeItem(STORAGE_KEY);

    if (file.size > MAX_FILE_SIZE) {
      currentReviews = [];
      renderState([], "danger", "2MB 이하의 CSV 파일만 업로드할 수 있습니다.");
      csvFileInput.value = "";
      return;
    }

    var reader = new FileReader();

    reader.addEventListener("load", function () {
      var rows = window.reviewaiParser.parseCsvRows(String(reader.result || ""));
      var reviews = window.reviewaiParser.rowsToReviews(rows);
      reviewTextInput.value = reviews.map(function (review) {
        return review.text;
      }).join("\n");
      applyReviews(reviews, "CSV 파일을 파싱했습니다.");
    });

    reader.addEventListener("error", function () {
      currentReviews = [];
      renderState([], "danger", "CSV 파일을 읽지 못했습니다. UTF-8 인코딩 형식인지 확인해 주세요.");
    });

    reader.readAsText(file, "utf-8");
  }

  function applyReviews(reviews, successMessage) {
    sessionStorage.removeItem(STORAGE_KEY);
    currentReviews = reviews;

    if (reviews.length > REVIEW_LIMIT) {
      currentReviews = [];
      renderLimitExceeded(reviews.length);
      openLimitModal();
      return;
    }

    if (reviews.length === 0) {
      renderState([], "idle", "리뷰 데이터를 입력하면 분석 시작 버튼이 활성화됩니다.");
      return;
    }

    persistReviews(reviews, "draft");
    renderState(reviews, "success", successMessage);
  }

  function persistReviews(reviews, status) {
    if (!reviews.length || reviews.length > REVIEW_LIMIT) {
      sessionStorage.removeItem(STORAGE_KEY);
      return;
    }

    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        status: status,
        storeName: storeNameInput.value.trim(),
        reviewCount: reviews.length,
        reviews: reviews
      })
    );
  }

  function renderState(reviews, state, message) {
    var count = reviews.length;

    reviewCountBadge.textContent = count + "건";
    startButton.disabled = count === 0 || count > REVIEW_LIMIT;
    formMessage.textContent = message;
    formMessage.className = "form-message";

    if (state !== "idle") {
      formMessage.classList.add("is-" + state);
    }

    previewTitle.textContent = count > 0 ? "파싱 미리보기" : "미리보기 대기";
    previewList.innerHTML = "";

    if (count === 0) {
      previewList.appendChild(createEmptyPreview());
      return;
    }

    reviews.slice(0, 5).forEach(function (review) {
      previewList.appendChild(createPreviewItem(review));
    });

    if (count > 5) {
      var extraItem = document.createElement("li");
      extraItem.textContent = "외 " + (count - 5) + "건이 더 있습니다.";
      previewList.appendChild(extraItem);
    }
  }

  function renderLimitExceeded(count) {
    reviewCountBadge.textContent = count + "건 이상";
    startButton.disabled = true;
    formMessage.textContent = "입력 가능한 리뷰 수를 초과했습니다. 상담 안내를 확인해 주세요.";
    formMessage.className = "form-message is-warning";
    previewTitle.textContent = "상담 안내 필요";
    previewList.innerHTML = "";

    var item = document.createElement("li");
    item.textContent = "대량 리뷰 진단은 상담을 통해 입력 범위와 리포트 구성을 안내합니다.";
    previewList.appendChild(item);
  }

  function createEmptyPreview() {
    var item = document.createElement("li");
    item.textContent = "아직 입력된 리뷰가 없습니다.";
    return item;
  }

  function createPreviewItem(review) {
    var item = document.createElement("li");
    var title = document.createElement("strong");
    var meta = document.createElement("span");

    title.textContent = review.text;
    meta.textContent = review.rating ? "평점 " + review.rating : "직접 입력";
    item.appendChild(title);
    item.appendChild(meta);

    return item;
  }

  function clearInputs() {
    storeNameInput.value = "";
    reviewTextInput.value = "";
    csvFileInput.value = "";
    currentReviews = [];
    sessionStorage.removeItem(STORAGE_KEY);
    closeLimitModal();
    renderState([], "idle", "리뷰 데이터를 입력하면 분석 시작 버튼이 활성화됩니다.");
  }

  function openLimitModal() {
    sessionStorage.removeItem(STORAGE_KEY);
    limitModal.hidden = false;
  }

  function closeLimitModal() {
    limitModal.hidden = true;
  }

  function showLoadingThenReport() {
    if (!loadingView || !reportView) {
      return;
    }

    loadingView.hidden = false;
    reportView.hidden = true;
    loadingView.scrollIntoView({ behavior: "smooth", block: "start" });

    window.setTimeout(function () {
      renderReport();
      loadingView.hidden = true;
      reportView.hidden = false;
      reportView.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", "#report-view");
    }, REPORT_DELAY);
  }

  function showInputView() {
    if (reportView) {
      reportView.hidden = true;
    }
    if (loadingView) {
      loadingView.hidden = true;
    }
    document.getElementById("analysis").scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", "#analysis");
  }

  function getReportInput() {
    var storedValue = sessionStorage.getItem(STORAGE_KEY);

    if (storedValue) {
      try {
        return JSON.parse(storedValue);
      } catch (error) {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    }

    return buildSampleInput();
  }

  function buildSampleInput() {
    var sampleReviews = (window.reviewaiMockData.priorityReviews || []).map(function (review, index) {
      return {
        id: index + 1,
        rating: String(review.rating),
        text: review.text
      };
    });

    return {
      status: "sample",
      storeName: "리뷰와이 샘플 스토어",
      reviewCount: window.reviewaiMockData.reviewSummary.totalCount,
      reviews: sampleReviews
    };
  }

  function ensureSampleInput() {
    var sampleInput = buildSampleInput();
    storeNameInput.value = sampleInput.storeName;
    reviewTextInput.value = sampleInput.reviews.map(function (review) {
      return review.text;
    }).join("\n");
    currentReviews = sampleInput.reviews;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(sampleInput));
    renderState(currentReviews, "success", "샘플 리뷰를 불러왔습니다.");
  }

  function renderReport() {
    var input = getReportInput();
    var mockData = window.reviewaiMockData || {};
    var summary = mockData.reviewSummary || {};
    var reviews = Array.isArray(input.reviews) ? input.reviews : [];
    var totalCount = input.reviewCount || reviews.length || summary.totalCount || 0;
    var lowRatingCount = countLowRatingReviews(reviews) || summary.lowRatingCount || 0;

    reportStoreName.textContent = (input.storeName || "리뷰 리포트") + " 리뷰 리포트";
    reportSummaryCopy.textContent = totalCount + "건의 입력 리뷰를 기준으로 반복 키워드, 우선 검토 리뷰, 답글 초안을 정리했습니다.";
    reportAverageRating.textContent = String(summary.averageRating || "4.6");
    reportTotalCount.textContent = String(totalCount);
    reportCheckCount.textContent = String(lowRatingCount || summary.checkItems || 0);
    reportRatingDelta.textContent = String(summary.ratingDelta || "-");

    renderKeywordBars(positiveKeywordList, mockData.positiveKeywords || [], false);
    renderKeywordBars(checkKeywordList, mockData.checkKeywords || [], true);
    renderPriorityReviews(reviews, mockData.priorityReviews || []);
    renderReplyTabs(mockData.replyDrafts || []);
    renderImprovements(mockData.improvementCards || []);
  }

  function countLowRatingReviews(reviews) {
    return reviews.filter(function (review) {
      var rating = Number(review.rating);
      return rating > 0 && rating <= 2;
    }).length;
  }

  function renderKeywordBars(container, keywords, isWarning) {
    container.innerHTML = "";

    keywords.forEach(function (keyword) {
      var item = document.createElement("div");
      var header = document.createElement("div");
      var label = document.createElement("strong");
      var value = document.createElement("span");
      var track = document.createElement("div");
      var fill = document.createElement("span");

      item.className = "keyword-bar";
      header.className = "keyword-bar-header";
      track.className = "keyword-track";
      fill.className = isWarning ? "keyword-fill is-warning" : "keyword-fill";
      fill.style.width = Math.min(Number(keyword.value) || 0, 99) + "%";
      label.textContent = keyword.label;
      value.textContent = keyword.value + "점";

      header.appendChild(label);
      header.appendChild(value);
      track.appendChild(fill);
      item.appendChild(header);
      item.appendChild(track);
      container.appendChild(item);
    });
  }

  function renderPriorityReviews(inputReviews, fallbackReviews) {
    var lowRatingReviews = inputReviews.filter(function (review) {
      var rating = Number(review.rating);
      return rating > 0 && rating <= 2;
    });
    var reviews = lowRatingReviews.length ? lowRatingReviews.slice(0, 3) : fallbackReviews.slice(0, 3);

    priorityReviewList.innerHTML = "";
    reviews.forEach(function (review) {
      var item = document.createElement("article");
      var rating = document.createElement("strong");
      var body = document.createElement("div");
      var text = document.createElement("p");
      var reason = document.createElement("span");
      var shouldClamp = String(review.text || "").length > 32;

      item.className = "priority-item";
      rating.className = "priority-rating";
      rating.textContent = (review.rating || "-") + "점";
      text.className = shouldClamp ? "priority-copy is-clamped" : "priority-copy";
      text.textContent = review.text;
      reason.textContent = review.reason || "낮은 별점 리뷰";
      body.appendChild(text);

      if (shouldClamp) {
        var toggle = document.createElement("button");
        toggle.className = "priority-toggle";
        toggle.type = "button";
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "자세히 보기";
        toggle.addEventListener("click", function () {
          var isExpanded = toggle.getAttribute("aria-expanded") === "true";
          toggle.setAttribute("aria-expanded", String(!isExpanded));
          text.classList.toggle("is-clamped", isExpanded);
          toggle.textContent = isExpanded ? "자세히 보기" : "접기";
        });
        body.appendChild(toggle);
      }

      body.appendChild(reason);
      item.appendChild(rating);
      item.appendChild(body);
      priorityReviewList.appendChild(item);
    });
  }

  function renderReplyTabs(drafts) {
    if (!drafts.length) {
      return;
    }

    replyTabs.innerHTML = "";
    drafts.forEach(function (draft) {
      var tab = document.createElement("button");
      tab.className = draft.id === activeDraftId ? "reply-tab is-active" : "reply-tab";
      tab.type = "button";
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-selected", draft.id === activeDraftId ? "true" : "false");
      tab.textContent = draft.label;
      tab.addEventListener("click", function () {
        activeDraftId = draft.id;
        renderReplyTabs(drafts);
      });
      replyTabs.appendChild(tab);
    });

    var activeDraft = drafts.find(function (draft) {
      return draft.id === activeDraftId;
    }) || drafts[0];
    replyDraftText.textContent = activeDraft.text;
    replyCopyMessage.textContent = "";
  }

  function renderImprovements(cards) {
    improvementList.innerHTML = "";

    cards.forEach(function (card) {
      var item = document.createElement("article");
      var title = document.createElement("h3");
      var body = document.createElement("p");

      item.className = "card improvement-card";
      title.textContent = card.title;
      body.textContent = card.body;
      item.appendChild(title);
      item.appendChild(body);
      improvementList.appendChild(item);
    });
  }

  function copyActiveDraft() {
    var text = replyDraftText.textContent.trim();

    if (!text) {
      return;
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        replyCopyMessage.textContent = "초안이 클립보드에 복사되었습니다.";
      }).catch(function () {
        replyCopyMessage.textContent = "복사 버튼을 다시 눌러 주세요.";
      });
      return;
    }

    replyCopyMessage.textContent = "브라우저에서 클립보드 권한을 확인해 주세요.";
  }
})();
