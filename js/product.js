//recuperation des url des objets
let searchParams = new URL(document.location).searchParams;
let teddyId = searchParams.get("_id");

function getTeddy() {
  //appel de l'api avec le paramètre ID
  fetch(`http://localhost:3000/api/teddies/${teddyId}`).then((response) => {
    response.json().then((teddy) => {
      displayTeddy(teddy);
    });
  });
}

//boucle pour récupérer les couleurs de chaque objets
function getColor(colors) {
  let options = "";
  for (let i = 0, size = colors.length; i < size; i++) {
    options += `<option>${colors[i]}</option>`;
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
    <select id="teddy-colors">
      <option>Choisissez la couleur</option>
      ${getColor(teddy.colors)}
    </select>
    <h5>${teddy.price / 100}€</h5>
    <a href="html/cart.html"><input class="validation-cart" type="button" value="Ajouter au panier"></a>
  `;
}
getTeddy();
