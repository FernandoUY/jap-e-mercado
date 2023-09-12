// Buscamos la id del producto en localStorage
const productID = localStorage.getItem("productId");

// Función que trae la información del producto según la id del producto
async function fetchProduct(productID) {
  // Intentamos traer la respuesta de la API
  try {
    const response = await fetch(
      `https://japceibal.github.io/emercado-api/products/${productID}.json`
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

document.addEventListener("DOMContentLoaded", async function () {
  const product = await fetchProduct(productID);
  const productComments = await fetchProductComments(productID);
});
