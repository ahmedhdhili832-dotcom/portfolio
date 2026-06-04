function setFooterYear(doc) {
  const root = doc || document;
  const year = root.querySelector("#year");
  if (year) {
    year.textContent = new Date().getFullYear();
    return true;
  }
  return false;
}

setFooterYear();

if (typeof module !== "undefined" && module.exports) {
  module.exports = { setFooterYear };
}
