var cartStorage = localStorage.getItem("teddy");

if (cartStorage == null) {
  cartStorage = [];
} else {
  cartStorage = JSON.parse(cartStorage);
}
// selection de l'id où je vais injecter le code html
const displayCart = document.querySelector("#myCart");
var productCart = "";
const promises = cartStorage.map((id) => {
  return fetch("http://localhost:3000/api/teddies/" + id).then((response) => {
    return response.json();
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

// -----------------afficher prix total --------------------------

// -----------------------------------------------------------

//  ------------vider entierement les produits du localstorage---------

const btnDeleteCart = document.querySelector("#emptyCart");

btnDeleteCart.addEventListener("click", () => {
  localStorage.removeItem("teddy");
  window.location.href = "cart.html";
});

// ----------------------------------------------------

// -----------------formulaire---------------

const displayFormHtml = () => {
  // selection du dom pour le positionnement du formulaire
  const positionForm = document.querySelector("#myForm");
  const structureForm = `
  <p class="contact-information">Vos coordonnées</p>
  <form>

    <label for="nom"> Nom: </label><span id="nomManquant" class="champ-manquant"></span>
    <input type="text" name="nom" id="name"/>

    <label for="prenom"> Prénom: </label><span id="prenomManquant" class="champ-manquant"></span>
    <input type="text" name="prenom" id="firstname"/>

    <label for="adresse"> Adresse: </label><span id="adresseManquant" class="champ-manquant"></span>
    <input type="text" name="adresse" id="adress"/>

    <label for="code-postal"> Code postal: </label><span id="codePostalManquant" class="champ-manquant"></span>
    <input type="text" name="code-postal" id="codepostal"/>
    
    <label for="town"> Ville: </label><span id="townManquant" class="champ-manquant"></span>
    <input type="text" name="ville" id="town" />
    
    <label for="email"> Email: </label><span id="emailManquant" class="champ-manquant"></span>
    <input type="text" name="mail" id="email" />

  </form>
  <p id="button-confirm"><a href="order.html">Valider votre panier</a></p>
  `;
  // injection html
  positionForm.innerHTML = structureForm;
};
// affichage du formulaire
displayFormHtml();

// selection du bouton envoyer
const btnSentForm = document.querySelector("#button-confirm");

btnSentForm.addEventListener("click", () => {
  // recuperation des valeurs du formulaire
  const formValues = {
    nom: document.querySelector("#name").value,
    prenom: document.querySelector("#firstname").value,
    adresse: document.querySelector("#adress").value,
    codePostal: document.querySelector("#codepostal").value,
    ville: document.querySelector("#town").value,
    mail: document.querySelector("#email").value,
  };

  //------------------ verification du formulaire---------

  const regExNomPrenomVille = (value) => {
    return /^[A-Za-z\s]{3,20}$/.test(value);
  };
  const regExCodePostal = (value) => {
    return /^[0-9]{5}$/.test(value);
  };
  const regExEmail = (value) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
  };
  const regExAdress = (value) => {
    return /^[A-Za-z0-9\s]{5,50}$/.test(value);
  };

  // ------controle de la validité du nom
  function nameControl() {
    const leNom = formValues.nom;
    if (regExNomPrenomVille(leNom)) {
      document.querySelector("#nomManquant").textContent = "";
      return true;
    } else {
      document.querySelector("#nomManquant").textContent =
        "Veuillez bien remplir ce champ";
      return false;
    }
  }
  // ---------controle de la validite du prenom
  function firstNameControl() {
    const lePrenom = formValues.prenom;
    if (regExNomPrenomVille(lePrenom)) {
      document.querySelector("#prenomManquant").textContent = "";
      return true;
    } else {
      document.querySelector("#prenomManquant").textContent =
        "Veuillez bien remplir ce champ";
      return false;
    }
  }
  // controle de la validite de la ville
  function townControl() {
    const laVille = formValues.ville;
    if (regExNomPrenomVille(laVille)) {
      document.querySelector("#townManquant").textContent = "";
      return true;
    } else {
      document.querySelector("#townManquant").textContent =
        "Veuillez bien remplir ce champ";
      return false;
    }
  }
  // controle de la validité du code postal
  function postalCodeControl() {
    const leCodePostal = formValues.codePostal;
    if (regExCodePostal(leCodePostal)) {
      document.querySelector("#codePostalManquant").textContent = "";
      return true;
    } else {
      document.querySelector("#codePostalManquant").textContent =
        "Ce champ doit uniquement contenir un nombre à 5 chiffres";
      return false;
    }
  }
  // controle de la validité de l'adresse
  function adressControle() {
    const adress = formValues.adress;
    if (regExAdress(adress)) {
      document.querySelector("#adresseManquant").textContent = "";
      return true;
    } else {
      document.querySelector("#adresseManquant").textContent =
        "Veuillez bien remplir ce champ";
      return false;
    }
  }
  // controle de la validité de l'email
  function emailControle() {
    const email = formValues.mail;
    if (regExEmail(email)) {
      document.querySelector("#emailManquant").textContent = "";
      return true;
    } else {
      document.querySelector("#emailManquant").textContent =
        "Ce champ doit être au format d'une adresse mail valide";
      return false;
    }
  }

  // controle validité formulaire avant envoie dans le localstorage
  if (
    nameControl() &&
    firstNameControl() &&
    adressControle() &&
    postalCodeControl() &&
    townControl() &&
    emailControle()
  ) {
    // mettre le formValues dans le localStorage
    localStorage.setItem("formValues", JSON.stringify(formValues));
  } else {
    alert("formulaire non valide");
  }
  const aEnvoyer = {
    cartStorage,
    formValues,
  };
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
  })
    .then((data) => {
      data.json().then((order) => {
        localStorage.setItem("orderId", order.orderId);
      });
    })

    .catch((err) => console.log(err));
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
