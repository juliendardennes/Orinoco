// -------affichage référence commande-------------
function addConfirmOrder() {
  const confirmId = localStorage.getItem("orderId");
  const textConfirm = document.getElementById("orderId");

  textConfirm.textContent = confirmId;
}
//-----------------------------------------

// -------affichage prix total de la commande--------

function addConfirmPrice() {
  const confirmPrice = localStorage.getItem("price");
  const priceConfirm = document.getElementById("total__order");

  priceConfirm.textContent = confirmPrice;
}

// --------------------------------------------------

// --------- bouton retour à l'accueil---------
function resetPageConf() {
  let btnCancel = document.getElementById("returnAccueil");
  btnCancel.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "index.html";
  });
}
//----------------------------------
addConfirmPrice();
addConfirmOrder();
resetPageConf();
