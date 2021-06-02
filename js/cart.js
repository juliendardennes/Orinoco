// declaration de la variable
let cartStorage = localStorage.getItem("teddy");
if (cartStorage == null) {
  cartStorage = [];
} else {
  cartStorage = JSON.parse(cartStorage);
}

// selection de l'id où je vais injecter le code html
const displayCart = document.querySelector("#myCart");
var productCart = "";
const promises = cartStorage.map((id) => {
  return fetch("http://localhost:3000/api/teddies/" + id).then((response) => {
    return response.json();
  });
});

Promise.all(promises).then((data) => {
  data.forEach((teddy) => {
    productCart =
      productCart +
      `
    <div class="thumbnail-cart">
      <img alt="teddy ${teddy.name}" src="${teddy.imageUrl}">
      <div class="descriptionCart">
        <h3>${teddy.name}</h3>
        <p class="price">${teddy.price / 100}.00 € </p>
      </div>
    </div>
    `;
    displayCart.innerHTML = productCart;
  });
});
