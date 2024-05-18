document.addEventListener("DOMContentLoaded", function () {
  const cartContainer = document.getElementById("cart-container");
  const cartTotalElement = document.getElementById("cart-total");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
      cartContainer.innerHTML = "";
      if (cart.length > 0) {
          cart.forEach((product) => {
              let decrementButton =
                  product.quantity > 1
                      ? `<button id="decrement-${product.name}" onclick="decrementQuantity('${product.name}')" style="display:inline;">-</button>`
                      : `<button id="decrement-${product.name}" onclick="decrementQuantity('${product.name}')" style="display:none;">-</button>`;
              const productHTML = `
                  <div class="merch-item">
                      <img src="${product.image}" alt="${product.name}" style="width: 100px; height: 100px;">
                      <div>
                          <h2>${product.name}</h2>
                          <div class="merch-price"><p>${product.price}</p></div>
                          <div>
                              <p>Cantidad: ${decrementButton}
                                  <span id="quantity-${product.name}">${product.quantity}</span>
                                  <button onclick="incrementQuantity('${product.name}')">+</button>
                              </p>
                          </div>
                          ${product.platform ? `<p>Plataforma: ${product.platform}</p>` : ""}
                          ${product.edition ? `<p>Edición: ${product.edition}</p>` : ""}
                      </div>
                      <div class="button-group">
                          <button onclick="removeFromCart('${product.name}')" class="merch-add">Quitar del carrito</button>
                      </div>
                  </div>
              `;
              const itemElement = htmlToElement(productHTML);
              cartContainer.appendChild(itemElement);
          });
      } else {
          cartContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
      }
      updateCartTotal();
  }

  function updateCartTotal() {
      let total = cart.reduce((sum, product) => {
          let price = parseFloat(product.price.replace(",", ".").replace("€", ""));
          return sum + price * product.quantity;
      }, 0);
      cartTotalElement.textContent = total.toFixed(2).replace(".", ",") + "€";
  }

  function htmlToElement(html) {
      let template = document.createElement("template");
      html = html.trim();
      template.innerHTML = html;
      return template.content.firstChild;
  }

  window.incrementQuantity = function (productName) {
      let product = cart.find((item) => item.name === productName);
      if (product) {
          product.quantity += 1;
          localStorage.setItem("cart", JSON.stringify(cart));
          document.getElementById(`quantity-${product.name}`).textContent = product.quantity;
          document.getElementById(`decrement-${product.name}`).style.display = "inline";
      }
      updateCartTotal();
  };

  window.decrementQuantity = function (productName) {
      let product = cart.find((item) => item.name === productName);
      if (product && product.quantity > 1) {
          product.quantity -= 1;
          localStorage.setItem("cart", JSON.stringify(cart));
          document.getElementById(`quantity-${product.name}`).textContent = product.quantity;
          if (product.quantity === 1) {
              document.getElementById(`decrement-${product.name}`).style.display = "none";
          }
      }
      updateCartTotal();
  };

  window.removeFromCart = function (productName) {
      cart = cart.filter((item) => item.name !== productName);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
      updateCartTotal();
  };

  renderCart();
});