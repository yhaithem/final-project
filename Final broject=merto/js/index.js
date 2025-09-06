document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("flashDealsCarousel");
  if (!carousel) return;

  // منع التكرار لو السكربت اتنفذ قبل كده
  if (carousel.dataset.carouselProcessed === "true") return;

  const inner = carousel.querySelector(".carousel-inner");
  if (!inner) return;

  // خزن نسخة من كل الكروت (clone) قبل ما نمسح الـ inner
  const originalCols = Array.from(inner.querySelectorAll(".col-md-3"))
    .map(el => el.cloneNode(true));

  const total = originalCols.length;
  if (total === 0) return;

  // إعدادات: 5 ظاهرة، نمشي 3 في كل ضغطة
  const itemsPerSlide = 5;
  const slideBy = 3;

  // امسح ال slides القديمة
  inner.innerHTML = "";

  // نبني السلايدات: start = 0, 3, 6, ...
  for (let start = 0; start < total; start += slideBy) {
    const slide = document.createElement("div");
    slide.className = "carousel-item";
    if (start === 0) slide.classList.add("active");

    const row = document.createElement("div");
    row.className = "row g-3";

    // ضيف بالظبط itemsPerSlide كروت، مع wrap-around لمنع السلايد الفاضي/الوحيد
    for (let k = 0; k < itemsPerSlide; k++) {
      const idx = (start + k) % total; // wrap
      row.appendChild(originalCols[idx].cloneNode(true));
    }

    slide.appendChild(row);
    inner.appendChild(slide);
  }

  // علم إننا عالجنا الكاروسيل (عشان لو السكربت اتنفذ تاني ما يعملش دوبل)
  carousel.dataset.carouselProcessed = "true";
});

/* ===================================== */










