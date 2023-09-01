let container = document.getElementById("container");
let catName = document.getElementById("catName");
let data = {};

  

// Función que trae los productos según la id de la categoría
async function fetchProducts() {
  // Buscamos la id de la categoría en localStorage
  const catID = localStorage.getItem("catID");

  // Intentamos traer la respuesta de la API
  try {
    const response = await fetch(
      `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`
    );
    const data = await response.json();
    // En caso de que todo salga bien, retornamos la respuesta de la API
    return data;
  } catch (error) {
    // Si al traer los datos hay algún error lo mostramos por consola
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  // Le asignamos a data la respuesta de la API
  data = await fetchProducts();
  // Ponemos el nombre de la categoría según lo que nos devuelve la API
  catName.textContent = data.catName;

  // Traemos el buscador
  const buscador = document.getElementById("buscador");

  buscador.addEventListener("input", function () {
    // Se obtiene lo que el usuario escribe y de pasa a minusculas
    const busquedaUser = buscador.value.toLowerCase();

    // Buscamos en el nombre y la descripcion lo que se ingresa en el bucador
    const productosFiltrados = data.products.filter(
      (product) =>
        product.name.toLowerCase().includes(busquedaUser) ||
        product.description.toLowerCase().includes(busquedaUser)
    );

    // Limpia los productos anteriores
    container.innerHTML = "";

    productosFiltrados.map((product) => {
      // Se modifico esta parte para que muestre los productos filtrados
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
        `;
    });
  });

  // Mostrar todos los productos al cargar la página
  buscador.dispatchEvent(new Event("input"));
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
  const max = document.getElementById("rangeFilterCountMax").value;
  const min = document.getElementById("rangeFilterCountMin").value;
  const filterProducts = arrayProductos.products.filter((product) => {
    //* utilizando cada elemento(productos) del array,me retorna los elementos (productos) filtrados
    return product.cost >= min && product.cost <= max;
  });
  return filterProducts;
}
const filter = document.getElementById("rangeFilterCount");
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
const up = document.getElementById("sortAsc");
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
const down = document.getElementById("sortDesc");
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
const sold = document.getElementById("sortByCount");
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
  document.getElementById("rangeFilterCountMax").value = "";
  document.getElementById("rangeFilterCountMin").value = "";
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


