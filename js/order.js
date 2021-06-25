var cartStorage = localStorage.getItem("teddy");

// ---------affichage nom et prenom du client ------

// -------------------------------------------------

// -------affichage référence commande-------------
function addConfirmOrder() {
  const confirmId = localStorage.getItem("orderId");
  const textConfirm = document.getElementById("orderId");

  textConfirm.textContent = confirmId;
}
//-----------------------------------------

// --------- bouton retour à l'accueil---------
function resetPageConf() {
  let btnCancel = document.getElementById("returnAccueil");
  btnCancel.addEventListener("click", () => {
    localStorage.clear();
  });
}
//----------------------------------
addConfirmOrder();
resetPageConf();
