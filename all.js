// Simple JS for your links page
// Features: Search + Open + Copy + Click Count

document.addEventListener("DOMContentLoaded", () => {

  const links = Array.from(document.querySelectorAll("body > a"));
  const saved = JSON.parse(localStorage.getItem("clicks") || "{}");

  // --- Create search box ---
  const search = document.createElement("input");
  search.placeholder = "Search...";
  search.style.padding = "8px";
  search.style.margin = "10px 0";
  document.body.prepend(search);

  search.addEventListener("input", () => {
    const q = search.value.toLowerCase();
    links.forEach(a => {
      a.style.display = a.textContent.toLowerCase().includes(q) ? "" : "none";
    });
  });

  // --- Enhance each link ---
  links.forEach(a => {
    // load count
    const count = saved[a.href] || 0;

    // small label
    const label = document.createElement("span");
    label.style.fontSize = "12px";
    label.style.color = "gray";
    label.textContent = count ? ` (${count})` : "";
    a.append(label);

    // Open button
    const openBtn = document.createElement("button");
    openBtn.textContent = "Open";
    openBtn.style.marginLeft = "10px";
    openBtn.onclick = e => {
      e.stopPropagation();
      window.open(a.href, "_blank");
      addClick(a, label, saved);
    };
    a.after(openBtn);

    // Copy button
    const copyBtn = document.createElement("button");
    copyBtn.textContent = "Copy";
    copyBtn.style.marginLeft = "5px";
    copyBtn.onclick = e => {
      e.stopPropagation();
      navigator.clipboard.writeText(a.href);
      copyBtn.textContent = "Copied!";
      setTimeout(() => (copyBtn.textContent = "Copy"), 800);
    };
    openBtn.after(copyBtn);

    // count when clicking the link itself
    a.onclick = () => addClick(a, label, saved);
  });

});

// Save + update click count
function addClick(a, label, saved) {
  saved[a.href] = (saved[a.href] || 0) + 1;
  localStorage.setItem("clicks", JSON.stringify(saved));
  label.textContent = ` (${saved[a.href]})`;
}
