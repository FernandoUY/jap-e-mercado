// Buscamos la id del producto en localStorage
const productID = localStorage.getItem("productId");

  // Cuando carga la página asignamos la respuesta de los comentarios en una variable y mostramos los comentarios
  document.addEventListener("DOMContentLoaded", async function() {
    const comments = await fetchProductComments(productID);
    console.log(comments)
    showComments(comments)
  })

// Función para obtener los comentarios de un producto por su ID
async function fetchProductComments(productID) {
  const response = await getJSONData(`${PRODUCT_INFO_COMMENTS_URL}${productID}.json`);
  if (response.status === "ok") {
    return response.data;
  }
}

//Mostrar los coemntarios en pantalla (de momento sin las estrellitas :(  )
function showComments(comments){
  const divCom = document.getElementById("comm");

  comments.forEach(comment => {
    divCom.innerHTML += 
    `
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
    `
  });


}
