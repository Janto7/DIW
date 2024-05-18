document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.querySelector(".icono-carrito-container");
  const cartPreview = document.getElementById("cart-preview");

  cartIcon.addEventListener("mouseover", () => {
    updateCartPreview();
    cartPreview.style.display = "block";
  });

  cartIcon.addEventListener("mouseout", () => {
    cartPreview.style.display = "none";
  });

  function updateCartPreview() {
    let cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = ""; 

    cart.slice(0, 3).forEach((item) => {
      let li = document.createElement("li");
      li.textContent = `${item.name} - ${item.price}`;
      cartItemsContainer.appendChild(li);
    });
  }
});
