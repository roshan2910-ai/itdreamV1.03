/* Shared theme preference across all Inside Track pages */
(function () {
  "use strict";
  var KEY = "insideTrackColorTheme";
  var themes = [
    ["white-chocolate", "White Chocolate"],
    ["dutch-white", "Dutch White"],
    ["old-lace", "Old Lace"]
  ];
  var root = document.documentElement;

  function applyTheme(name) {
    var valid = themes.some(function (item) { return item[0] === name; });
    var selected = valid ? name : "white-chocolate";
    root.setAttribute("data-theme", selected);
    try { localStorage.setItem(KEY, selected); } catch (e) {}
  }

  var saved = "white-chocolate";
  try { saved = localStorage.getItem(KEY) || saved; } catch (e) {}
  applyTheme(saved);

  function addControl() {
    if (document.getElementById("insideTrackThemeControl")) return;
    var wrap = document.createElement("div");
    wrap.id = "insideTrackThemeControl";
    var label = document.createElement("label");
    label.htmlFor = "insideTrackThemeSelect";
    label.textContent = "Colour theme";
    var select = document.createElement("select");
    select.id = "insideTrackThemeSelect";
    select.setAttribute("aria-label", "Choose website colour theme");
    themes.forEach(function (item) {
      var option = document.createElement("option");
      option.value = item[0];
      option.textContent = item[1];
      select.appendChild(option);
    });
    select.value = root.getAttribute("data-theme");
    select.addEventListener("change", function () { applyTheme(select.value); });
    wrap.appendChild(label);
    wrap.appendChild(select);
    document.body.appendChild(wrap);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addControl);
  } else {
    addControl();
  }
})();
