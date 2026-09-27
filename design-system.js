(function () {
  var table = document.querySelector(".ds-table");
  if (!table || table.dataset.collapseReady === "true") return;
  table.dataset.collapseReady = "true";

  function tokenRows(header) {
    var rows = [];
    var node = header.nextElementSibling;
    while (node && !node.classList.contains("ds-table-group")) {
      if (node.classList.contains("ds-table-row")) rows.push(node);
      node = node.nextElementSibling;
    }
    return rows;
  }

  function setCollapsed(header, collapsed) {
    header.classList.toggle("is-collapsed", collapsed);
    header.setAttribute("aria-expanded", collapsed ? "false" : "true");
    tokenRows(header).forEach(function (row) {
      row.hidden = collapsed;
    });
  }

  table.querySelectorAll(".ds-table-group").forEach(function (header) {
    var name = header.querySelector(".ds-group-label span");
    header.setAttribute("aria-expanded", "true");
    if (name) {
      header.setAttribute("aria-label", name.textContent.trim() + " tokens");
    }

    header.addEventListener("click", function () {
      setCollapsed(header, !header.classList.contains("is-collapsed"));
    });
  });
})();
