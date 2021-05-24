let searchParams = new URL(document.location).searchParams;
let teddyId = searchParams.get("_id"); //obtenir l'ID du produit
_teddy = {}; //definir une variable global _teddy qui recevera le teddy

//appel de l'aAPI
fetch(`http://localhost:3000/api/teddies/${teddyId}`) //rappel notre API + l'ID de notre produit
  .then((response) => {
    //recupère le tableau Json
    response.json().then((teddy) => {
      // assigné ce teddy a la variable global
      _teddy = teddy;
      displayTeddy(teddy);
      addToPrice(teddy);

      //-------------------
      // -----localstorage------
      //----------------------
      var validCart = document.querySelector("#validationCart");
      validCart.addEventListener("click", addToCart);
      function addToCart() {
        let cartStorage = JSON.parse(localStorage.getItem("teddy"));
        if (cartStorage) {
          cartStorage.push({
            imageUrl: teddy.imageUrl,
            name: teddy.name,
            price: teddy.price,
            _id: teddy._id,
          });
          localStorage.setItem(`teddy`, JSON.stringify(cartStorage));
        } else {
          cartStorage = [];
          cartStorage.push({
            imageUrl: teddy.imageUrl,
            name: teddy.name,
            price: teddy.price,
            _id: teddy._id,
          });
          localStorage.setItem(`teddy`, JSON.stringify(cartStorage));
        }
      }
    });
  });

//boucle pour récupérer les couleurs de chaque objet
function getColor(colors) {
  let options = "";
  for (let i = 0, size = colors.length; i < size; i++) {
    options += `<option>${colors[i]}</option>`; //incrémente les couleurs à notre liste d'option
  }
  return options;
}

// // changer le prix en fonction de la quantité
function addToPrice(teddy) {
  let teddyPrice = _teddy.price;
  let newProductQuantitySelect = document.getElementById("quantity");
  let productQuantity =
    newProductQuantitySelect.options[newProductQuantitySelect.selectedIndex]
      .value;
  let newPriceQuantity = teddyPrice * productQuantity;
  document.getElementById("price").innerHTML =
    (_teddy.price * productQuantity) / 100 + ",00€";
}

function displayTeddy(teddy) {
  //Recuperation de l'element HTML "teddy.product"
  document.getElementById("teddy-product").innerHTML = `
  <img alt="teddy ${teddy.name}" src="${teddy.imageUrl}">
    <div class="description">
      <h3>${teddy.name}</h3>
      <p>${teddy.description}</p>
    </div>
    <form>
      <label for="teddy-colors"> Choisissez la couleur : </label>
        <select name="teddy-colors" id="teddy-colors">
          <option value="color">${getColor(teddy.colors)}
          </option>
        </select>
    </form>
    <label class="teddy-quantity-selector" for="teddy-quantity">Quantité:
    </label>
      <select id="quantity" form="quantity" onchange="addToPrice()" name="teddy-quantity">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
      </select>
    <p id="price"></p>
    <button id="validationCart" type="button"><a href="cart.html">Ajouter au panier</a></button>
    `;
}
