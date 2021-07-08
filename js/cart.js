var cartStorage = localStorage.getItem("teddy");
let totalPrice = 0;

if (cartStorage == null) {
  cartStorage = [];
} else {
  cartStorage = JSON.parse(cartStorage);
}
// selection de l'id où je vais injecter le code html
const displayCart = document.querySelector("#myCart");
var productCart = "";
const promises = cartStorage.map((id) => {
  return fetch("http://localhost:3000/api/teddies/" + id)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      alert("la connexion au serveur n'a pas pu être effectué");
    });
});

Promise.all(promises).then((data) => {
  data.forEach((teddy) => {
    productCart =
      productCart +
      `
    <div class="thumbnail-cart">
      <img alt="teddy ${teddy.name}" src="${teddy.imageUrl}">
      <div class="descriptionCart">
        <h3>${teddy.name}</h3>
        <p id="teddyPrice">${teddy.price / 100}.00 €</p>
        <div id="${teddy._id}" class="deleteTeddy">
          <i class="icon-delete fas fa-trash-alt" data-id="${teddy._id}">
            Supprimer article
          </i>
        </div>
      </div>
    </div>
    `;
    displayCart.innerHTML = productCart;

    // -----------------afficher prix total --------------------------
    totalPrice += teddy.price;
    document.getElementById("totalPrice").innerHTML =
      totalPrice / 100 + " .00 €";
    // -----------------------------------------------------------

    // ------------- supprimer l'article de son choix --------------------

    var btnDeleteTeddy = document.getElementsByClassName("deleteTeddy");
    for (let btn of btnDeleteTeddy) {
      btn.addEventListener("click", (event) => {
        if (cartStorage.includes(event.target.dataset.id)) {
          id = cartStorage.indexOf(event.target.dataset.id);
          cartStorage.splice(id, 1);
          localStorage.setItem(`teddy`, JSON.stringify(cartStorage));
        }
        window.location.href = "cart.html";
      });
    }

    // --------------------------------------------------------
  });
});

//  ------------vider entierement les produits du localstorage---------

const btnDeleteCart = document.querySelector("#emptyCart");

btnDeleteCart.addEventListener("click", () => {
  localStorage.removeItem("teddy");
  window.location.href = "cart.html";
});

// ----------------------------------------------------

// selection du bouton envoyer
const btnSentForm = document.querySelector("#button-confirm");

btnSentForm.addEventListener("click", () => {
  let nom = document.getElementById("name").value;
  let prenom = document.getElementById("firstname").value;
  let adresse = document.getElementById("adress").value;
  let codePostal = document.getElementById("codepostal").value;
  let ville = document.getElementById("town").value;
  let email = document.getElementById("email").value;

  //------------------ verification du formulaire---------

  const regexnom = /^[A-z\s\-]{2,}$/;
  const regexprenom = /^[A-z\s\-]{2,}$/;
  const regexadresse = /^\w{1,}/;
  const regexzipcode = /^[0-9]{5}$/;
  const regexcity = /^[A-z\-]{1,}/;
  const regexmail = /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}/;

  if (regexnom.test(nom) == false) {
    window.alert(
      "Votre nom n'est pas valide, les caractères autorisés sont : les majuscules, les minuscules, les espaces et les -. Ce champ est requis"
    );
  } else if (regexprenom.test(prenom) == false) {
    window.alert(
      "Votre prénom n'est pas valide, les caractères autorisés sont : les majuscules, les minuscules et les -. Ce champ est requis"
    );
  } else if (regexadresse.test(adresse) == false) {
    window.alert(
      "Votre addresse n'est pas valide, le format est (12 rue de paris). Ce champ est requis"
    );
  } else if (regexzipcode.test(codePostal) == false) {
    window.alert(
      "Votre code postal n'est pas valide, il doit contenire 5 chiffres. Ce champ est requis"
    );
  } else if (regexcity.test(ville) == false) {
    window.alert(
      "Votre ville n'est pas valide, les caractères autorisés sont : Les majuscules, les minuscules et les -. Ce champ est requis"
    );
  } else if (regexmail.test(email) == false) {
    window.alert(
      "Votre email n'est pas valide, le format autaurisé est : mail@mail.fr. Ce champ est requis"
    );
  } else {
    localStorage.removeItem("contact");
    let contact = [nom, prenom, email, adresse, codePostal, ville];
    let JSONcontact = JSON.stringify(contact);
    localStorage.setItem("contact", JSONcontact);
    window.location.href = "order.html";
  }
  // -------------------envoi vers le serveur---------

  fetch("http://localhost:3000/api/teddies/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      contact: {
        firstName: document.querySelector("#firstname").value,
        lastName: document.querySelector("#name").value,
        address: document.querySelector("#adress").value,
        city: document.querySelector("#town").value,
        email: document.querySelector("#email").value,
      },
      products: cartStorage,
    }),
  }).then((data) => {
    data.json().then((order) => {
      localStorage.setItem("orderId", order.orderId);
    });
  });
  // -------------------------------------------------------------
  // fermeture de mon btnSentForm.addEventListener("click"
});

// // ---------------enregistrer les valeurs du formulaire------
const recoveryLocalStorage = localStorage.getItem("formValues");
const recoveryLocalStorageObjet = JSON.parse(recoveryLocalStorage);

document.querySelector("#name").value = recoveryLocalStorageObjet.nom;
document.querySelector("#firstname").value = recoveryLocalStorageObjet.prenom;
document.querySelector("#adress").value = recoveryLocalStorageObjet.adresse;
document.querySelector("#codepostal").value =
  recoveryLocalStorageObjet.codePostal;
document.querySelector("#town").value = recoveryLocalStorageObjet.ville;
document.querySelector("#email").value = recoveryLocalStorageObjet.mail;
