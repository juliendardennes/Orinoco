function getEachTeddy() {
  fetch("http://localhost:3000/api/teddies").then((response) => {
    response.json().then((teddies) => {
      teddies.forEach((teddy) => {
        displayTeddy(teddy);
      });
    });
  });
}

function displayTeddy(teddy) {
  document.getElementById("vignettes-oursons").innerHTML += `
  <div class="oursons-accueil">
    <a href="produit.html">
      <img alt="teddy ${teddy.name}" src="${teddy.imageUrl}">
      <ul>
        <li class="name">${teddy.name}</li>
        <li class="price">${teddy.price / 100}.00 euros</li>
      </ul>
    </a>
  </div>
  `;
}

getEachTeddy();

/*
fetch("http://localhost:3000/api/teddies").then((response) => {
  response.json().then((teddies) => {
    var html = "";
    teddies.forEach((teddy) => {
      html =
        html +
        "<img>" +
        teddy.image +
        '<li><div class="name">' +
        teddy.name +
        '</div><div class="price">' +
        teddy.price +
        "</div></li>";
    });
    document.getElementById("vignettes-oursons").innerHTML = html;
  });
});

*/
