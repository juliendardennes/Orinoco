let searchParams = new URL(document.location).searchParams;
let teddyId = searchParams.get("_id");

function getTeddy() {
  fetch(`http://localhost:3000/api/teddies/${teddyId}`).then((response) => {
    response.json().then((teddy) => {
      displayTeddy(teddy);
    });
  });
}

function getColor(colors) {
  let options = "";
  for (let i = 0, size = colors.length; i < size; i++) {
    options += `<option>${colors[i]}</option>`;
  }
  return options;
}

function displayTeddy(teddy) {
  document.getElementById("teddy-product").innerHTML = `
  <img alt="teddy ${teddy.name}" src="${teddy.imageUrl}">
    <div class="description">
      <h3>${teddy.name}</h3>
      <p>${teddy.description}</p>
    </div>
    <select id="teddy-colors">
      ${getColor(teddy.colors)}
    </select>
    <h5>${teddy.price / 100}€</h5>
    <a href="panier.html"><input class="validation-cart" type="button" value="Ajouter au panier"></a>
  `;
}
getTeddy();
