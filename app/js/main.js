(function () {
  var STORAGE_KEY = "reviewai:ux02-input";
  var REVIEW_LIMIT = 100;
  var MAX_FILE_SIZE = 2 * 1024 * 1024;
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
  var currentReviews = [];

  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  if (!form || !window.reviewaiParser) {
    return;
  }

  sessionStorage.removeItem(STORAGE_KEY);
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
  });

  limitModalClose.addEventListener("click", function () {
    closeLimitModal();
  });

  limitModal.addEventListener("click", function (event) {
    if (event.target === limitModal) {
      closeLimitModal();
    }
  });

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
})();
