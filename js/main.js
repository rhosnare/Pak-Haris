// File: js/main.js (Rebuild Versi Final untuk Index)
// Deskripsi: Interaksi global halaman utama Adrise

// =================== TYPING TEXT ===================
const typingText = document.getElementById("typing-text");
if (typingText) {
  const messages = [
    "Diskon 20% untuk semua produk iklan!",
    "Adrise bantu branding bisnismu lebih efektif.",
    "Layanan digital marketing terpercaya."
  ];
  let msgIndex = 0, charIndex = 0, isDeleting = false;

  function type() {
    const current = messages[msgIndex];
    typingText.textContent = isDeleting
      ? current.substring(0, charIndex--)
      : current.substring(0, charIndex++);

    if (!isDeleting && charIndex === current.length) {
      setTimeout(() => (isDeleting = true), 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      msgIndex = (msgIndex + 1) % messages.length;
    }
    setTimeout(type, isDeleting ? 40 : 100);
  }
  type();
}

// =================== AUTO-SCROLL PRODUK ===================
const produkScroll = document.querySelector(".produk-scroll");
if (produkScroll) {
  let scrollX = 0;
  setInterval(() => {
    scrollX += 1;
    produkScroll.scrollTo({ left: scrollX, behavior: "smooth" });
    if (scrollX >= produkScroll.scrollWidth - produkScroll.clientWidth) {
      scrollX = 0;
    }
  }, 40);
}

// =================== GSAP ANIMASI MASUK ===================
if (typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  const fadeSettings = [
    { selector: ".fade-up", x: 0, y: 60 },
    { selector: ".fade-left", x: -60, y: 0 },
    { selector: ".fade-right", x: 60, y: 0 }
  ];

  fadeSettings.forEach(({ selector, x, y }) => {
    gsap.utils.toArray(selector).forEach(el => {
      gsap.from(el, {
        x,
        y,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%"
        }
      });
    });
  });

  document.body.classList.add("scroll-ready");
} else {
  // fallback visible if gsap fails
  document.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach(el => {
    el.style.opacity = 1;
    el.style.transform = "none";
  });
}