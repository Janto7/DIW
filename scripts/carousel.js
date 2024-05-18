document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".imagenes-fila .imagenes-contenedor");
  const prevBtn = document.querySelector(".imagenes-fila .prev");
  const nextBtn = document.querySelector(".imagenes-fila .next");

  let currentIndex = 0;

  function getVisibleImages() {
    return window.innerWidth < 768 ? 1 : Math.min(4, track.children.length);
  }

  function getMaxIndex() {
    const visibleImages = getVisibleImages();
    return Math.max(0, track.children.length - visibleImages);
  }

  function updatePosition() {
    const visibleImages = getVisibleImages();
    const shift = currentIndex * (100 / visibleImages);
    track.style.transform = `translateX(-${shift}%)`;
    updateButtons();
  }

  function updateButtons() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= getMaxIndex();
  }

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updatePosition();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < getMaxIndex()) {
      currentIndex++;
      updatePosition();
    }
  });

  window.addEventListener("resize", () => {
    currentIndex = 0;
    updatePosition();
  });

  updatePosition();
});
