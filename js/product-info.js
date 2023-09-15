// Buscamos la id del producto en localStorage
const productID = localStorage.getItem("productId");

// Cuando carga la página asignamos la respuesta de los comentarios en una variable y mostramos los comentarios
document.addEventListener("DOMContentLoaded", async function () {
  const productComments = await fetchProductComments(productID);
  const productInfo = await fetchProductInfo(productID)
  showProductComments(productComments);
  showProductInfo(productInfo)
});

// Función para obtener los detalles de un producti por su ID
async function fetchProductInfo(productID) {
  const response = await getJSONData(`${PRODUCT_INFO_URL}${productID}.json`);
  if (response.status === "ok") {
    return response.data;
  }
}

// Función para obtener los comentarios de un producto por su ID
async function fetchProductComments(productID) {
  const response = await getJSONData(
    `${PRODUCT_INFO_COMMENTS_URL}${productID}.json`
  );
  if (response.status === "ok") {
    return response.data;
  }
}

//Mostrar los coemntarios en pantalla (de momento sin las estrellitas :(  )
function showProductComments(comments) {
  const commentsSectionDiv = document.getElementById("comments-section");

  if (!comments.length) {
    commentsSectionDiv.innerHTML += `
      <h4 class="text-muted">Aún no hay comentarios sobre este producto</h4>
    `;
  }
  comments.forEach((comment) => {
    commentsSectionDiv.innerHTML += `
    <div class="list-group list-group-item-action flex-colum align-items-start">
      <div class="list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">${comment.user}</h5>
          <small>//aca iria las estrellas</small>
        </div>
        <p>${comment.description}</p>
        <small>${comment.dateTime}</small>
      </div>
    </div>
    `;
  });
}

function showProductInfo(product) {
  const infoSectionDiv = document.getElementById("info-section");

  infoSectionDiv.innerHTML = `
    <div class="row">
      <div class="col col-md-5">
        <div id="carrouselProduct" class="carousel slide">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#carrouselProduct" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Imagen 1"></button>
            <button type="button" data-bs-target="#carrouselProduct" data-bs-slide-to="1" aria-label="Imagen 2"></button>
            <button type="button" data-bs-target="#carrouselProduct" data-bs-slide-to="2" aria-label="Imagen 3"></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="${product.images[0]}" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="${product.images[1]}" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="${product.images[2]}" class="d-block w-100" alt="...">
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carrouselProduct" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Anterior</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carrouselProduct" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Siguiente</span>
          </button>
        </div>
      </div>
      <div class="col col-md-7 card-body">
        <span class="text-muted">${product.category}</span>
        <div class="d-flex justify-content-between">
          <h3 class="card-title">${product.name}</h3>
          <p><span class="badge bg-info">${product.soldCount} vendidos</span></p>
        </div>
        <p class="card-text">${product.description}</p>
        <div class="row">
          <div class="col"><span class="fw-bold">Precio: </span>${product.currency} ${product.cost}</div>
          <div class="col"></div>
        </div>
      </div>
    </div>
  `
}
// Función para agregar un comentario y mostrarlo en pantalla.

let comentarios = document.getElementById("comments-section");

let button = document.getElementById("comentar")

button.addEventListener("click", () => {
  let comentarios2 = document.getElementById("comentarios1").value
  let div = document.createElement("div");
  div.innerHTML =  `
  <div class="list-group list-group-item-action flex-colum align-items-start">
    <div class="list-group-item list-group-item-action flex-column align-items-start">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">usuario</h5>
        <small>//aca iria las estrellas</small>
      </div>
      <p>${comentarios2}</p>
      <small>tiempo</small>
    </div>
  </div>
  `;
  comentarios.appendChild(div);
});