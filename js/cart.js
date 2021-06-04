// declaration de la variable
let cartStorage = localStorage.getItem("teddy");
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
        <p id="price">${teddy.price / 100}.00 € </p>
      </div>
    </div>
    `;
    displayCart.innerHTML = productCart;
  });
});

// -----------------formulaire---------------

const afficherFormulaireHtml = () => {
  // selection du dom pour le positionnement du formulaire
  const positionFormulaire = document.querySelector("#formulaire");
  const structureFormulaire = `
  <p class="contact-information">Vos coordonnées</p>
  <form>

    <label for="nom"> Nom: </label><span id="nomManquant class="champ-manquant"></span>
    <input type="text" name="nom" id="name" required/>

    <label for="prenom"> Prénom: </label><span id="prenomManquant" class="champ-manquant"></span>
    <input type="text" name="prenom" id="firstname" required/>

    <label for="adresse"> Adresse: </label><span id="adressManquant" class="champ-manquant"></span>
    <input type="text" name="adresse" id="adress" required/>

    <label for="code-postal"> Code postal: </label><span id="codepostalManquant" class="champ-manquant"></span>
    <input type="text" name="code-postal" id="code-postal" required"/>
    
    <label for="town"> Ville: </label><span id="townManquant" class="champ-manquant"></span>
    <input type="text" name="ville" id="town" required/>
    
    <label for="email"> Email: </label><span id="emailManquant" class="champ-manquant"></span>
    <input type="text" name="mail" id="email" required/>

  </form>
  <p id="button-confirm">Valider votre panier</p>
  `;
  // injection html
  positionFormulaire.innerHTML = structureFormulaire;
};
// affichage du formulaire
afficherFormulaireHtml();

// selection du bouton envoyer
const btnEnvoyerFormulaire = document.querySelector("#button-confirm");

btnEnvoyerFormulaire.addEventListener("click", () => {
  // recuperation des valeurs du formulaire
  const formulaireValues = {
    nom: document.querySelector("#name").value,
    prenom: document.querySelector("#firstname").value,
    adresse: document.querySelector("#adress").value,
    codePostal: document.querySelector("#code-postal").value,
    ville: document.querySelector("#town").value,
    mail: document.querySelector("#email").value,
  };

  //------------------ validation du formulaire---------
  const textAlert = (value) => {
    return `${value} : chiffre et symbole ne sont pas autorisés \n Ne pas dépasser 20 caractères, minimum 3 caractères`;
  };
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
  // fonction pour indiquer une erreur dans le formulaire
  function dataErreurFormulaire(querySelectorId) {
    console.log(dataErreurFormulaire);
    document.querySelector(`#${querySelectorId}`).textContent = "";
  }
  function messageErreur(querySelectorId) {
    console.log(messageErreur);
    document.querySelector(`#${querySelectorId}`).textContent =
      "Veuillez bien remplir ce champ";
  }

  // controle de la validité du nom
  function nomControle() {
    const leNom = formulaireValues.nom;
    if (regExNomPrenomVille(leNom)) {
      dataErreurFormulaire("nomManquant");
      return true;
    } else {
      messageErreur("nomManquant");
      return false;
    }
  }
  // controle de la validite du prenom
  function prenomControle() {
    const lePrenom = formulaireValues.prenom;
    if (regExNomPrenomVille(lePrenom)) {
      dataErreurFormulaire("prenomManquant");
      return true;
    } else {
      messageErreur("prenomManquant");
      return false;
    }
  }
  // controle de la validite de la ville
  function townControle() {
    const laVille = formulaireValues.ville;
    if (regExNomPrenomVille(laVille)) {
      dataErreurFormulaire("townManquant");
      return true;
    } else {
      messageErreur("townManquant");
      return false;
    }
  }
  // controle de la validité du code postal
  function codePostalControle() {
    const leCodePostal = formulaireValues.codePostal;
    console.log(leCodePostal);
    if (regExCodePostal(leCodePostal)) {
      dataErreurFormulaire("codePostalManquant");
      return true;
    } else {
      messageErreur("codepostalManquant");
      return false;
    }
  }
  // controle de la validité de l'email
  function emailControle() {
    const email = formulaireValues.mail;
    if (regExEmail(email)) {
      dataErreurFormulaire("emailManquant");
      return true;
    } else {
      messageErreur("emailManquant");
      return false;
    }
  }
  // controle de la validité de l'adresse
  function adressControle() {
    const adress = formulaireValues.adress;
    if (regExAdress(adress)) {
      dataErreurFormulaire("adressManquant");
      return true;
    } else {
      messageErreur("adressManquant");
      return false;
    }
  }
  // controle validité formulaire avant envoie dans le localstorage
  if (
    nomControle() &&
    prenomControle() &&
    adressControle() &&
    codePostalControle() &&
    townControle() &&
    emailControle()
  ) {
    // mettre le formulaireValues dans le localStorage
    localStorage.setItem("formulaireValues", JSON.stringify(formulaireValues));
  } else {
    alert("Veuillez remplir le formulaire");
  }
  // -----------------------------------------------------

  // mettre les values du formulaire et les produits selectionnes dans un objet a envoyer au serveur
  const aEnvoyer = {
    cartStorage,
    formulaireValues,
  };
});
