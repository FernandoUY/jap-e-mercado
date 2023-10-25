let articles = [];

document.addEventListener("DOMContentLoaded", async () => {
  // Realizamos una petición a la URL donde se encuentra el carrito de compras del usuario con id 25801 y guardamos data un una variable
  const userCart = await getJSONData(CART_INFO_URL + "25801.json");
  articles = userCart.data.articles;

  getArticlesFromLocalStorage().forEach(article => articles.push(article))

  showProductRow(articles);

  // se crea evento de cambio de cantidad
  const quantityInputs = document.querySelectorAll("input[type='number']");
  quantityInputs.forEach((input) => {
    input.addEventListener("change", updateProductTotal);
  });

  // se calcula el precio total inicial
  calculateSubTotalPrice();
  
});

function showProductRow(products) {
  const tBody = document.querySelector(".table-group-divider");

  tBody.innerHTML = ""

  products.forEach((product) => {
    const { id, name, currency, image, unitCost, count } = product;
    let subtotal = (unitCost * count).toFixed(1);
    if (currency === "UYU") {
      subtotal = ((unitCost / 40) * count).toFixed(1);
    }

    tBody.innerHTML += `
    <tr>
      <th scope="row"><img src="${image}" class="d-none d-sm-block" width="128" /></th>
      <td>${name}</td>
      <td class="unit-cost">${currency} ${unitCost.toFixed(1)}</td>
      <td class="col-1"><input type="number" class="form-control quantity-input" min="1" max="10" value="${count}" /></td>
      <td class="subtotal">${currency} ${subtotal}</td>
      <td>
        <button class="btn" onclick="deleteArticle(${id})">
          <i class="fa fa-trash" style="color: red;"></i>
        </button>
      </td>
    </tr>
    `;
  });
}

function updateProductTotal(event) {
  let totalPrice = 0;
  const productRows = document.querySelectorAll(".table-group-divider tr");

  productRows.forEach((row) => {
    const quantityInput = row.querySelector(".quantity-input");
    const unitCostCell = row.querySelector(".unit-cost");
    const subtotalCell = row.querySelector(".subtotal");

    const quantity = parseInt(quantityInput.value);
    const unitCost = parseFloat(
      unitCostCell.textContent.split(" ")[1].trim()
    );
    const currency = unitCostCell.textContent.split(" ")[0];
    let subtotal = quantity * unitCost;
    if (currency === "UYU") {
      subtotal = (unitCost / 40) * quantity
    }
    subtotalCell.textContent = `USD ${subtotal.toFixed(2)}`;
    totalPrice += subtotal
  });

  // se actualiza el precio total general
  const totalGeneral = document.getElementById("total-general");
  totalGeneral.textContent = `USD ${totalPrice}`;
}

function calculateSubTotalPrice() {
  const productRows = document.querySelectorAll(".table-group-divider tr");
  let totalPrice = 0;

  productRows.forEach((row) => {
    const subtotalCell = row.querySelector(".subtotal");
    let subtotal = parseFloat(
      subtotalCell.textContent.split(" ")[1]
    );
    const currency = subtotalCell.textContent.split(" ")[0];
    if (currency === "UYU") {
      subtotal = subtotal / 40;
    }
    totalPrice += subtotal;
  });

  // Actualizar el precio total general
  const totalGeneral = document.getElementById("total-general");
  totalGeneral.textContent = `USD ${totalPrice}`;
}

function getArticlesFromLocalStorage() {
  return JSON.parse(localStorage.getItem("userCart"))?.articles || []
}

function addArticlesToLocalStorage() {
  localStorage.setItem("userCart", JSON.stringify(articles));
}

function deleteArticle(id) {
  articles = articles.filter(article => article.id !== id)
  showProductRow(articles)
  const quantityInputs = document.querySelectorAll("input[type='number']");
  quantityInputs.forEach((input) => {
    input.addEventListener("change", updateProductTotal);
  });
  calculateSubTotalPrice()
  addArticlesToLocalStorage()
}

document.addEventListener('DOMContentLoaded', function () {
    let paymentMethodRadios = document.querySelectorAll('input[name="paymentMethod"]');
    let cardNumberInput = document.getElementById('cardNumber');
    let securityCodeInput = document.getElementById('securityCode');
    let expirationDateInput = document.getElementById('expirationDate');
    let accountNumberInput = document.getElementById('accountNumber');

    // Función para habilitar o deshabilitar campos según la selección
    function toggleFields() {
        if (paymentMethodRadios[0].checked) {
            cardNumberInput.disabled = false;
            securityCodeInput.disabled = false;
            expirationDateInput.disabled = false;
            accountNumberInput.disabled = true;
        } else if (paymentMethodRadios[1].checked) {
            cardNumberInput.disabled = true;
            securityCodeInput.disabled = true;
            expirationDateInput.disabled = true;
            accountNumberInput.disabled = false;
        }
    }

    // Escuchar cambios en la opción de forma de pago
    paymentMethodRadios.forEach(function (radio) {
        radio.addEventListener('change', toggleFields);
    })})


function DetectPriceEnvio(){
  //Valor del list del tipo de envio
  let tipeEnvio = document.getElementById("TipoDeEnvio").value;
  
  //Variables de envio
  const subtotalCell = document.getElementById("total-general");
  const costoEnvio = document.getElementById("costoEnvio");
  const totalFinal = document.getElementById("totalFinal");

  const subtotal = parseFloat(
    subtotalCell.textContent.split(" ")[1]
  );

  let CostoFinal = 0

  if(tipeEnvio === "Premium 2 a 5 días (15%)"){
    CostoFinal = subtotal * 0.15

    costoEnvio.innerText = CostoFinal.toFixed(1)

    totalFinal.innerText = (CostoFinal + subtotal).toFixed(1)

  }
  else if(tipeEnvio === "Express 5 a 8 días (7%)"){
    CostoFinal = subtotal * 0.07

    costoEnvio.innerText = CostoFinal.toFixed(1)

    totalFinal.innerText = (CostoFinal + subtotal).toFixed(1)

    

  }
  else if(tipeEnvio === "Standard 12 a 15 días (5%)"){
    CostoFinal = subtotal * 0.05

    costoEnvio.innerText = CostoFinal.toFixed(1)

    totalFinal.innerText = (CostoFinal + subtotal).toFixed(1)

  }
  else{
    
    costoEnvio.innerText = CostoFinal.toFixed(1)
  }
}

let tipeEnvio = document.getElementById("TipoDeEnvio")

tipeEnvio.addEventListener("change", function(){
  DetectPriceEnvio()
})