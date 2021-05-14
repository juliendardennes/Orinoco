//appel de l'api avec la methode fetch
function getEachTeddy() {
  fetch("http://localhost:3000/api/teddies").then((response) => {
    //transformer la reponse en json
    response.json().then((teddies) => {
      teddies.forEach((teddy) => {
        displayTeddy(teddy);
      });
    });
  });
}

//afficher les oursons dans le html
function displayTeddy(teddy) {
  document.getElementById("thumbnails-teddies").innerHTML += `
  <div class="teddy-home">
    <a href="./product.html?_id=${teddy._id}">
      <img alt="teddy ${teddy.name}" src="${teddy.imageUrl}">
      <ul>
        <li>${teddy.name}</li>
        <li>${teddy.price / 100} €</li>
      </ul>
    </a>
  </div>
  `;
}
getEachTeddy();
