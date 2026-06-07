(function () {
  function parseCsvRows(csvText) {
    if (!csvText || typeof csvText !== "string") {
      return [];
    }

    return csvText
      .trim()
      .split(/\r?\n/)
      .filter(Boolean)
      .map(function (row) {
        return row.split(",").map(function (cell) {
          return cell.trim();
        });
      });
  }

  window.reviewaiParser = {
    parseCsvRows: parseCsvRows
  };
})();
