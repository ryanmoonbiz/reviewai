(function () {
  function parseCsvRows(csvText) {
    if (!csvText || typeof csvText !== "string") {
      return [];
    }

    var rows = [];
    var currentRow = [];
    var currentCell = "";
    var inQuotes = false;
    var index = 0;

    while (index < csvText.length) {
      var char = csvText[index];
      var nextChar = csvText[index + 1];

      if (char === "\"") {
        if (inQuotes && nextChar === "\"") {
          currentCell += "\"";
          index += 2;
          continue;
        }

        inQuotes = !inQuotes;
        index += 1;
        continue;
      }

      if (char === "," && !inQuotes) {
        currentRow.push(currentCell.trim());
        currentCell = "";
        index += 1;
        continue;
      }

      if ((char === "\n" || char === "\r") && !inQuotes) {
        if (char === "\r" && nextChar === "\n") {
          index += 1;
        }

        currentRow.push(currentCell.trim());
        if (currentRow.some(Boolean)) {
          rows.push(currentRow);
        }
        currentRow = [];
        currentCell = "";
        index += 1;
        continue;
      }

      currentCell += char;
      index += 1;
    }

    currentRow.push(currentCell.trim());
    if (currentRow.some(Boolean)) {
      rows.push(currentRow);
    }

    return rows;
  }

  function rowsToReviews(rows) {
    if (!Array.isArray(rows) || rows.length === 0) {
      return [];
    }

    var header = rows[0].map(function (cell) {
      return String(cell || "").toLowerCase();
    });
    var hasHeader = header.some(function (cell) {
      return ["review", "리뷰", "content", "text", "rating", "평점"].indexOf(cell) >= 0;
    });
    var dataRows = hasHeader ? rows.slice(1) : rows;
    var reviewIndex = findIndex(header, ["review", "리뷰", "content", "text", "내용"]);
    var ratingIndex = findIndex(header, ["rating", "평점", "score", "별점"]);

    if (!hasHeader) {
      reviewIndex = rows[0].length > 1 ? 1 : 0;
      ratingIndex = rows[0].length > 1 ? 0 : -1;
    }

    return dataRows
      .map(function (row, rowIndex) {
        var fallbackText = row.join(" ").trim();
        var text = String(row[reviewIndex] || fallbackText).trim();
        var rating = ratingIndex >= 0 ? String(row[ratingIndex] || "").trim() : "";

        return {
          id: rowIndex + 1,
          rating: rating,
          text: text
        };
      })
      .filter(function (review) {
        return review.text.length > 0;
      });
  }

  function parseTextReviews(text) {
    if (!text || typeof text !== "string") {
      return [];
    }

    return text
      .split(/\r?\n/)
      .map(function (line) {
        return line.trim();
      })
      .filter(Boolean)
      .map(function (line, index) {
        return {
          id: index + 1,
          rating: "",
          text: line
        };
      });
  }

  function findIndex(header, candidates) {
    for (var index = 0; index < candidates.length; index += 1) {
      var foundIndex = header.indexOf(candidates[index]);
      if (foundIndex >= 0) {
        return foundIndex;
      }
    }

    return -1;
  }

  window.reviewaiParser = {
    parseCsvRows: parseCsvRows,
    parseTextReviews: parseTextReviews,
    rowsToReviews: rowsToReviews
  };
})();
