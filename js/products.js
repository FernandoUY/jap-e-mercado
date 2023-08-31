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

    const Buscador = document.getElementById("Buscador"); //traemos el buscador

    Buscador.addEventListener("input", function () {
      const busquedaUser = Buscador.value.toLowerCase(); //se obtiene lo que el usuario escribe y de pasa a minusculas
      const productosFiltrados = data.products.filter(product =>
        product.name.toLowerCase().includes(busquedaUser) ||
        product.description.toLowerCase().includes(busquedaUser)
      ); //buscamos en el nombre y la descripcion lo que se ingresa en el bucador

      container.innerHTML = ""; // Limpia los productos anteriores

      productosFiltrados.map(product => {  //se modifico esta parte para que muestre los productos filtrados
        container.innerHTML += `
      <div class="card mt-3 mx-auto" style="max-width: 80%">
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

    // Mostrar todos los productos al cargar la página
    Buscador.dispatchEvent(new Event("input"));
  });
