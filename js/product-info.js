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
    <h1>${product.name}</h1>
    <p>${product.description}</p>
    <p>${product.currency} ${product.cost}</p>
    <p>${product.category}</p>
    <p>${product.soldCount} vendidos</p>
  `
}