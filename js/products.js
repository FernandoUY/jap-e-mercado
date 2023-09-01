let container = document.getElementById("container");
let catName = document.getElementById("catName");
let data = {};

document.addEventListener("DOMContentLoaded", () => {
  // Si en el localStorage no tenemos un item que se llame token redirigimos la pagina a el login.html
  if (!localStorage.getItem("token")) {
    window.location = "login.html";
  } else {
    // Si existe un token entonces ponemos una opción de cerrar sesión en la barra de navegación
    document.getElementById("dropdown").innerHTML += `
    <ul class="dropdown-menu dropdown-menu-dark">
      <li><a class="dropdown-item" href="/signout.html">Cerrar sesión</a></li>
    </ul>
    `;
  }
});

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
  const buscador = document.getElementById("Buscador");

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
});
