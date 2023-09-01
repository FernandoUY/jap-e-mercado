let container = document.getElementById("container");
let catName = document.getElementById("catName");
let data = {};

document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("token")) {
    window.location = "login.html";
  } else {
    document.getElementById("dropdown").innerHTML += `
    <ul class="dropdown-menu dropdown-menu-dark">
      <li><a class="dropdown-item" href="/signout.html">Cerrar sesión</a></li>
    </ul>
    `;
  }
});

async function fetchProducts() {
  const catID = localStorage.getItem("catID");

  try {
    const response = await fetch(
      `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  data = await fetchProducts();
  catName.textContent = data.catName;
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

async function filterRange() {
  const arrayProductos = await fetchProducts();
  const max = document.getElementById("max").value;
  const min = document.getElementById("min").value;
  const filterProducts = arrayProductos.products.filter((product) => {
    //* utilizando cada elemento(productos) del array,me retorna los elementos (productos) filtrados
    return product.cost >= min && product.cost <= max;
  });
  return filterProducts;
}
const filter = document.getElementById("filterd");
filter.addEventListener("click", async () => {
  container.innerHTML = "";
  console.log(container);
  const filterProducts = await filterRange();
  for (let product of filterProducts) {
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
  }
});
const up = document.getElementById("up");
up.addEventListener("click", async () => {
  const filterup = await fetchProducts();
  const save = filterup.products.sort((a, b) => a.cost - b.cost);
  filterup.products = save;
  console.log(save);
  container.innerHTML = "";
  for (let product of filterup.products) {
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
  }
});
const down = document.getElementById("down");
down.addEventListener("click", async () => {
  const filterdown = await fetchProducts();
  const save = filterdown.products.sort((a, b) => b.cost - a.cost);
  filterdown.products = save;
  console.log(save);
  container.innerHTML = "";
  for (let product of filterdown.products) {
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
  }
});
const sold = document.getElementById("sold");
sold.addEventListener("click", async () => {
  const filtersold = await fetchProducts();
  const save = filtersold.products.sort((a, b) => b.soldCount - a.soldCount);
  filtersold.products = save;
  console.log(save);
  container.innerHTML = "";
  for (let product of filtersold.products) {
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
  }
});
const clear = document.getElementById("clearRangeFilter");
clear.addEventListener("click", async function () {
  document.getElementById("max").value = "";
  document.getElementById("min").value = "";
  data = await fetchProducts();
  catName.textContent = data.catName;
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
