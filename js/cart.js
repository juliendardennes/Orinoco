// declaration de la variable
let cartStorage = JSON.parse(localStorage.getItem("teddy"));
// selection de l'id où je vais injecter le code html
const displayCart = document.querySelector("#myCart");

let productCart = [];
// si le panier est vide, afficher le panier est vide
if (cartStorage === null) {
  let emptyCart = `
    <div class="empty-cart">
        <p>Le panier est vide</p>
    </div>
  `;
  displayCart.innerHTML = emptyCart;
  // sinon, si le panier n'est pas vide, il faut afficher les produits dans le localstorage
} else {
  for (i = 0; i < cartStorage.length; i++) {
    productCart =
      productCart +
      `
    <div class="thumbnail-cart">
      <img alt="teddy ${cartStorage[i].name}" src="${cartStorage[i].imageUrl}">
      <div class="descriptionCart">
        <h3>${cartStorage[i].name}</h3>
        <p class="colors">${cartStorage[i].colors}</p>
        <p class="price">${cartStorage[i].price / 100}.00 € </p>
      </div>
    </div>
    `;
  }
  if (i === cartStorage.length) {
    // injection html dans la page panier
    displayCart.innerHTML = productCart;
  }
}
