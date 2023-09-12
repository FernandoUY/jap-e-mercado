// Función que trae el producto según la id del producto
async function fetchProduct() {
    // Buscamos la id de la categoría en localStorage
    const productId = localStorage.getItem("productId");
  
    // Intentamos traer la respuesta de la API
    try {
      const response = await fetch(
        `https://japceibal.github.io/emercado-api/products/${productId}.json`
      );
      // Si la respuesta es distinto de ok lanzamos un error
      if (!response.ok) throw new Error("Error al traer los datos");
      const data = await response.json();
      // En caso de que todo salga bien, retornamos la respuesta de la API
      return data;
    } catch (error) {
      // Si al traer los datos hay algún error lo mostramos por consola
      console.error("Ocurrio un error: ", error);
    }
  }


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
    const commentsResponse = await fetch(`https://japceibal.github.io/emercado-api/products_comments/${productID}.json`);

    if (!commentsResponse.ok) {
      throw new Error(`Error al traer comentarios del producto ${productID}. Código de estado: ${commentsResponse.status}`);
    }

    const commentsData = await commentsResponse.json();
    return commentsData;
  } catch (error) {
    console.error("Ocurrió un error al obtener los comentarios: ", error);
    return []; // Retorna una lista vacía en caso de error
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
