// Contenedor donde mostramos los productos y nombre de la categoría
let container = document.getElementById("container");
let catName = document.getElementById("catName");

const priceRangeForm = document.getElementById("priceRangeForm");
const clearPriceRangeBtn = document.getElementById("clearRangeFilter");
const sortAscBtn = document.getElementById("sortAsc");
const sortDescBtn = document.getElementById("sortDesc");
const sortSoldCountBtn = document.getElementById("sortByCount");
const searchInp = document.getElementById("search");

// Criterios
const SortCriteria = {
  ASC_BY_PRICE: "ASC",
  DESC_BY_PRICE: "DESC",
  BY_SOLD_COUNT: "Cant.",
};

let productsArray = [];
let filteredProductsArr = [];

document.addEventListener("DOMContentLoaded", async function () {
  const productsResponse = await fetchProducts();

  productsArray = productsResponse.products;
  filteredProductsArr = productsArray;

  showProductsList();

  // Ponemos el nombre de la categoría según lo que nos devuelve la API
  catName.textContent = productsResponse.catName;

  // Definimos los enventos click en los botones para ordenar los productos
  sortAscBtn.addEventListener("click", () =>
    sortProducts(SortCriteria.ASC_BY_PRICE)
  );

  sortDescBtn.addEventListener("click", () =>
    sortProducts(SortCriteria.DESC_BY_PRICE)
  );

  sortSoldCountBtn.addEventListener("click", () =>
    sortProducts(SortCriteria.BY_SOLD_COUNT)
  );

  // Definimos el evento input para la barra de búsqueda y filtramos según el valor ingresado
  searchInp.addEventListener("input", (event) => {
    const { value } = event.target;
    filterProductsByTerm(value.trim());
  });

  // Definimos el evento al enviar el formulario filtra según el rango de precio definido
  priceRangeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let [minPrice, maxPrice] = event.target;
    minPrice = parseFloat(minPrice.value);
    maxPrice = parseFloat(maxPrice.value);
    if (!isNaN(minPrice) || !isNaN(maxPrice)) {
      filterProductsByPrice(minPrice, maxPrice);
    }
  });

  // Definimo
  clearPriceRangeBtn.addEventListener("click", () => {
    document.getElementById("priceRangeMin").value = "";
    document.getElementById("priceRangeMax").value = "";
    filteredProductsArr = productsArray;
    showProductsList();
  });
});

async function fetchProducts() {
  const catID = localStorage.getItem("catID");

  try {
    const response = await fetch(
      `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`
    );
    // Si la respuesta es distinto de ok lanzamos un error
    if (!response.ok) throw new Error("Error al traer los datos");
    const data = await response.json();
    return data;
  } catch (error) {
    // Si al traer los datos hay algún error lo mostramos por consola
    console.error("Ocurrio un error: ", error);
  }
}

// Función que ordena los productos según el criterio que le pasamos por parámetro
function sortProducts(sortCriteria) {
  switch (sortCriteria) {
    case SortCriteria.ASC_BY_PRICE:
      result = filteredProductsArr.sort((a, b) => a.cost - b.cost);
      break;

    case SortCriteria.DESC_BY_PRICE:
      result = filteredProductsArr.sort((a, b) => b.cost - a.cost);
      break;

    case SortCriteria.BY_SOLD_COUNT:
      result = filteredProductsArr.sort((a, b) => b.soldCount - a.soldCount);
      break;

    default:
      break;
  }
  showProductsList();
}

// Filtra los productos según el nombre o la descripción del producto y lo muestra en la lista de productos
function filterProductsByTerm(searchTerm) {
  searchTerm = searchTerm.toLowerCase();

  filteredProductsArr = productsArray.filter((product) => {
    const productName = product.name.toLowerCase();
    const productDescription = product.description.toLowerCase();
    return (
      productName.includes(searchTerm) ||
      productDescription.includes(searchTerm)
    );
  });

  showProductsList();
}

// Filtra productos según su precio y muestra la lista de productos filtrados
function filterProductsByPrice(minPrice, maxPrice) {
  filteredProductsArr = productsArray.filter((product) => {
    if (!minPrice) {
      return product.cost <= maxPrice;
    }
    if (!maxPrice) {
      return product.cost >= minPrice;
    }
    return product.cost >= minPrice && product.cost <= maxPrice;
  });

  showProductsList();
}

// Función que recorre un array de productos y los agrega a la lista de productos, si no hay ninguno muestra un mensaje
function showProductsList() {
  container.innerHTML = "";
  if (filteredProductsArr.length === 0) {
    container.innerHTML = "<p>No se encontraron productos.</p>";
    return;
  }
  container.innerHTML += `
    <p class="text-muted">Cantidad de productos encontrados: ${filteredProductsArr.length}</p>
  `;
  filteredProductsArr.forEach((product) => showProduct(product));
}

// Función que sirve para estructurar un producto
function showProduct(product) {
  container.innerHTML += `
    <div onclick=setProductId(${product.id}) class="card mt-3 mx-auto list-group list-group-item-action cursor-active">
      <div class="row g-0">
        <div class="col-md-4">
          <img src=${product.image} class="img-fluid rounded-start h-100 object-fit-cover" alt="${product.name}" />
        </div>
        <div class="col-md-8 p-2">
          <div class="card-body">
            <div class="d-flex">
              <h4 class="w-100 px-2 card-title">${product.name}</h4>
              <small class="flex-shrink-1 px-2">${product.soldCount} vendidos</small>
            </div>
            <p class="card-text">
              ${product.description}
            </p>
            <h5 class="text-end">Precio: ${product.currency} ${product.cost}</h5>
          </div>
        </div>
      </div>
    </div>
    `;
}

// Función que guarda la id del producto en localStorage y redirige a la pagina de información de producto
function setProductId(id) {
  localStorage.setItem("productId", id);
  window.location = "product-info.html";
}
