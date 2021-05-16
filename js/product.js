let searchParams = new URL(document.location).searchParams;
let teddyId = searchParams.get("_id"); //obtenir l'ID du produit

//appel de l'aAPI
fetch(`http://localhost:3000/api/teddies/${teddyId}`) //rappel notre API + l'ID de notre produit
  .then((response) => {
    //recupère le tableau Json
    response.json().then((teddy) => {
      displayTeddy(teddy);
      addToPrice(teddy);
    });
  });

// changer le prix en fonction de la quantité
function addToPrice(teddy) {
  let teddyPrice = teddy.price;
  console.log(teddyPrice);
  // let newProductQuantitySelect = document.getElementById("quantity");
  // let productQuantity =
  //   newProductQuantitySelect.options[newProductQuantitySelect.selectedIndex]
  //     .value;
  // console.log(productQuantity);
}

//boucle pour récupérer les couleurs de chaque objets
function getColor(colors) {
  let options = "";
  for (let i = 0, size = colors.length; i < size; i++) {
    options += `<option>${colors[i]}</option>`; //incrémente les couleurs à notre liste d'option
  }
  return options;
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
          <option value="color">${getColor(teddy.colors)}</option>
        </select>
    </form>
    <label class="teddy-quantity-selector" for="teddy-quantity">Quantité:
      <select id="quantity" form="quantity" onclick="addToPrice()" name="teddy-quantity">
          <option value="0">0</option>
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
    </label>
    <p id="teddy-price"></p>
    <button id="validation-cart" type="submit" name="validation">Ajouter au panier</button>
    `;
}
