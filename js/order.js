var cartStorage = localStorage.getItem("teddy");
let totalPrice = 0;

// -------affichage référence commande-------------
function addConfirmOrder() {
  const confirmId = localStorage.getItem("orderId");
  const textConfirm = document.getElementById("orderId");

  textConfirm.textContent = confirmId;
}
//-----------------------------------------
// ---------- affichage prix total ----------
if (cartStorage == null) {
  cartStorage = [];
} else {
  cartStorage = JSON.parse(cartStorage);
}

const promises = cartStorage.map((id) => {
  return fetch("http://localhost:3000/api/teddies/" + id).then((response) => {
    return response.json();
  });
});
Promise.all(promises).then((data) => {
  data.forEach((teddy) => {
    // -----------------afficher prix total --------------------------
    totalPrice += teddy.price;
    document.getElementById("totalPrice").innerHTML =
      totalPrice / 100 + " .00 €";
  });
});

// -------------------------------------------
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
