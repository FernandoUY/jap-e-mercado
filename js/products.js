let container = document.getElementById("container");
let data = {};

async function fetchCars() {
  try {
    const response = await fetch(
      "https://japceibal.github.io/emercado-api/cats_products/101.json"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  data = await fetchCars();
  data.products.map((product) => {
    container.innerHTML += `
    <div class="card mt-3 mx-auto" style="max-width: 80%">
      <div class="row g-0">
        <div class="col-md-4">
          <img src=${product.image} class="img-fluid rounded-start h-100 object-fit-cover" alt="${product.name}" />
        </div>
        <div class="col-md-8 p-2">
          <div class="card-body">
          <small class="position-absolute top-0 end-0 p-4">${product.soldCount} vendidos</small>
            <h5 class="card-title">${product.name} - ${product.currency} ${product.cost}</h5>
            <p class="card-text">
              ${product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
    `;
  });
});
