let searchParams = new URL(document.location).searchParams;
let teddyId = searchParams.get("_id");
console.log(teddyId);

function getTeddy() {
  fetch("http://localhost:3000/api/teddies/${teddyId}").then((response) => {
    response.json().then((teddies) => {
      teddies.for((teddy) => {
        afficherTeddy(teddy);
      });
    });
  });
}
function afficherTeddy(teddy) {
  document.getElementById("oursons-product").innerHTML = `
  <img alt="teddy ${teddy.name}" src="${teddy.imageUrl}">
                <div class="description">
                    <h3>${teddy.name}</h3>
                    <p>${teddy.description}</p>
                    <h4>Choisissez la couleur:</h4>
                    <ul>
                        <li>${teddy.colors}</li>
                    </ul>
                </div>
                <h5>${teddy.price / 100}.00 euros</h5>
                <a href="panier.html"><input class="validation-panier" type="button" value="Ajouter au panier"></a>
  `;
}
getTeddy();
