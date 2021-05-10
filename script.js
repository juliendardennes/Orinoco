function getEachTeddy() {
  fetch("http://localhost:3000/api/teddies").then((response) => {
    response.json().then((teddies) => {
      teddies.forEach((teddy) => {
        afficherTeddy(teddy);
      });
    });
  });
}

//afficher les oursons
function afficherTeddy(teddy) {
  document.getElementById("vignettes-oursons").innerHTML += `
  <div class="oursons-accueil">
    <a href="./produit.html?_id=${teddy._id}">
      <img alt="teddy ${teddy.name}" src="${teddy.imageUrl}">
      <ul>
        <li>${teddy.name}</li>
        <li>${teddy.price / 100}.00 euros</li>
      </ul>
    </a>
  </div>
  `;
}

getEachTeddy();
