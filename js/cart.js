let articles = [];
const currency = "USD";

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
  calculateTotalPrice();
});

function showProductRow(products) {
  const tBody = document.querySelector(".table-group-divider");

  tBody.innerHTML = ""

  products.forEach((product) => {
    const { id, name, image, unitCost, count } = product;
    const subtotal = (unitCost * count).toFixed(2);

    tBody.innerHTML += `
    <tr>
      <th scope="row"><img src="${image}" class="d-none d-sm-block" width="128" /></th>
      <td>${name}</td>
      <td class="unit-cost">${currency} ${unitCost.toFixed(2)}</td>
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
      unitCostCell.textContent.split("USD")[1].trim()
    );
    const subtotal = quantity * unitCost;
    subtotalCell.textContent = `${currency} ${subtotal.toFixed(2)}`;
    totalPrice += subtotal;
  });

  // se actualiza el precio total general
  const totalGeneral = document.getElementById("total-general");
  totalGeneral.textContent = `${currency} ${totalPrice.toFixed(2)}`;
}

function calculateTotalPrice() {
  const productRows = document.querySelectorAll(".table-group-divider tr");
  let totalPrice = 0;

  productRows.forEach((row) => {
    const subtotalCell = row.querySelector(".subtotal");
    const subtotal = parseFloat(
      subtotalCell.textContent.replace(`${currency} `, "")
    );
    totalPrice += subtotal;
  });

  // Actualizar el precio total general
  const totalGeneral = document.getElementById("total-general");
  totalGeneral.textContent = `${currency} ${totalPrice.toFixed(2)}`;
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
  calculateTotalPrice()
  addArticlesToLocalStorage()
}
