document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".merch-add, .game-add");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const product = this.closest(".merch-item, .game-card");
      const productName = product.querySelector("h2").textContent;
      const productPrice = product.querySelector(
        ".merch-price p, .price p"
      ).textContent;
      const productImage = product.querySelector("img").src;

      let productData = {
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: 1,
      };

      if (product.classList.contains("game-card")) {
        const platformSelect = product.querySelector(".game-platforms select");
        const editionSelect = product.querySelector(".game-editions select");
        productData.platform =
          platformSelect.options[platformSelect.selectedIndex].textContent;
        productData.edition =
          editionSelect.options[editionSelect.selectedIndex].textContent;
      }

      addToCart(productData);
    });
  });

  function addToCart(product) {
    let cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    let existingProduct = cart.find(
      (item) =>
        item.name === product.name &&
        (item.platform ? item.platform === product.platform : true) &&
        (item.edition ? item.edition === product.edition : true)
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    showSnackbar("Producto añadido: " + product.name);
  }

  function showSnackbar(message) {
    const snackbar = document.getElementById("snackbar");
    snackbar.textContent = message;
    snackbar.className = "show";
    setTimeout(() => {
      snackbar.className = snackbar.className.replace("show", "");
    }, 3000);
  }
});
