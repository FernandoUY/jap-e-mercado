// Buscamos la id del producto en localStorage
const productID = localStorage.getItem("productId");


  document.addEventListener("DOMContentLoaded", async function() {
    const product = await fetchProduct();
    console.log(product);

    const comments = await fetchProductComments(product.id);
    console.log("Comentarios del producto:", comments);
  
  SeeCom(comments)
  })




// Función para obtener los comentarios de un producto por su ID
async function fetchProductComments(productID) {
  try {
    const response = await fetch(
      `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`
    );

    if (!response.ok) {
      throw new Error(
        `Error al traer comentarios del producto ${productID}.`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ocurrió un error al obtener los comentarios: ", error);
  }
}


//Mostrar los coemntarios en pantalla (de momento sin las estrellitas :(  )


function SeeCom(DataComm){

  const divCom = document.getElementById("comm");

  DataComm.forEach(element => {
    divCom.innerHTML += 
    `
    <div class="list-group">
    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">${element.user}</h5>
      <small>//aca iria las estrellas</small>
    </div>
    <p> ${element.description} </p>
    <small>${element.dateTime}</small>
    </a>
    
    `
  });


}
