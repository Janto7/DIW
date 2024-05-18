document.addEventListener("keydown", function (event) {
    if (event.key === "t" || event.key === "T") {
      // La propiedad 'key' es sensible a mayúsculas y minúsculas
      window.scrollTo(0, 0); // Desplaza la vista al inicio de la página
    }
  });