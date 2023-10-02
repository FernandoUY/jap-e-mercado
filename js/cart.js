document.addEventListener("DOMContentLoaded", async () => {
  const { data } = await getJSONData(CART_INFO_URL + "25801.json");
  showProductRow(data.articles);
});

function showProductRow(products) {
  const tBody = document.querySelector(".table-group-divider");
  products.forEach((product) => {
    const { name, image, currency, unitCost, count } = product;

    tBody.innerHTML += `
    <tr>
      <th scope="row"><img src="${image}" height="64" /></th>
      <td>${name}</td>
      <td>${currency} ${unitCost}</td>
      <td class="col-1"><input type="number" id="count" min="1" max="10" class="form-control " value="${count}" /></td>
      <td class="fw-bold">${currency} ${unitCost * count}</td>
    </tr>
    `;
  });
}
