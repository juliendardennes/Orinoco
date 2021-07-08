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
      //-------------------
      // -----localstorage------
      //----------------------
      var validCart = document.querySelector("#validationCart");
      validCart.addEventListener("click", addToCart);
      function addToCart() {
        let cartStorage = JSON.parse(localStorage.getItem("teddy"));
        if (null == cartStorage) {
          cartStorage = [];
        }
        if (!cartStorage.includes(teddy._id)) {
          cartStorage.push(teddy._id);
          localStorage.setItem(`teddy`, JSON.stringify(cartStorage));
        }
      }
    });
  })
  .catch((error) => {
    alert("la connexion au serveur n'a pas pu être effectué");
  });

//boucle pour récupérer les couleurs de chaque objet
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
          <option value="color">${getColor(teddy.colors)}
          </option>
        </select>
    </form>
    <p id="teddyPrice">${teddy.price / 100}.00 € </p>
    <button id="validationCart" type="button">
      <a href="cart.html">Ajouter au panier</a>
    </button>
    `;
}
