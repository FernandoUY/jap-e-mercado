const currency = "USD";
document.addEventListener("DOMContentLoaded", async () => {
  const { data } = await getJSONData(CART_INFO_URL + "25801.json");
  const articles = JSON.parse(localStorage.getItem("userCart"))?.articles;
  showProductRow(data.articles);
  showProductRow(articles);

  // se crea evento de cambio de cantidad
  const quantityInputs = document.querySelectorAll(".quantity-input");
  quantityInputs.forEach((input) => {
    input.addEventListener("change", updateProductTotal);
  });

  // se calcula el precio total inicial
  calculateTotalPrice();
});

function showProductRow(products) {
  const tBody = document.querySelector(".table-group-divider");
  products.forEach((product) => {
    const { name, image, unitCost, count } = product;

    tBody.innerHTML += `
    <tr>
      <th scope="row"><img src="${image}" class="d-none d-sm-block" width="128" /></th>
      <td>${name}</td>
      <td class="unit-cost" data-unit-cost="${unitCost}">${currency} ${unitCost.toFixed(2)}</td>
      <td class="col-1"><input type="number" class="form-control quantity-input" min="1" max="10" value="${count}" /></td>
      <td class="subtotal">${currency} ${(unitCost * count).toFixed(2)}</td>
    </tr>
    `;
  });
}

function updateProductTotal() {
  const productRows = document.querySelectorAll(".table-group-divider tr");
  let totalPrice = 0;

  productRows.forEach((row) => {
    const quantityInput = row.querySelector(".quantity-input");
    const unitCostCell = row.querySelector(".unit-cost");
    const subtotalCell = row.querySelector(".subtotal");

    const quantity = parseInt(quantityInput.value);

    // se comprueba que unitCostCell es válido antes de acceder a dataset
    if (unitCostCell) {
      const unitCost = parseFloat(unitCostCell.dataset.unitCost);
      const subtotal = quantity * unitCost;
      subtotalCell.textContent = `${currency} ${subtotal.toFixed(2)}`;
      totalPrice += subtotal;
    }
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

function showCartProducts() {
  const productsArr = JSON.parse(localStorage.getItem("userCart"));
  const tBody = document.querySelector(".table-group-divider");

  productsArr.forEach((product) => {
    tBody.innerHTML += `
    <tr>
      <th scope="row"><img src="${
        product.image
      }" class="d-none d-sm-block" width="128" /></th>
      <td>${product.name}</td>
      <td class="unit-cost" data-unit-cost="${product.cost}">${
      product.currency
    } ${product.cost.toFixed(2)}</td>
      <td class="col-1"><input type="number" class="form-control quantity-input" min="1" max="10" value="4" /></td>
      <td class="subtotal">${product.currency} ${(
      product.cost * product.count
    ).toFixed(2)}</td>
    </tr>
    `;
  });
}
