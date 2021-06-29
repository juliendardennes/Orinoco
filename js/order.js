var cartStorage = localStorage.getItem("teddy");

// -------affichage référence commande-------------
function addConfirmOrder() {
  const confirmId = localStorage.getItem("orderId");
  const textConfirm = document.getElementById("orderId");

  textConfirm.textContent = confirmId;
}
//-----------------------------------------

// --------- bouton retour à l'accueil---------
function returnPageHome() {
  let btnCancel = document.getElementById("returnHome");
  btnCancel.addEventListener("click", () => {
    localStorage.clear();
  });
}
//----------------------------------
addConfirmOrder();
returnPageHome();
