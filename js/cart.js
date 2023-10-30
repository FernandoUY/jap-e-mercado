let userCart = JSON.parse(localStorage.getItem("userCart")) || {
  user: 25801,
  articles: [],
};

document.addEventListener("DOMContentLoaded", async function () {
  const shippingType = document.querySelectorAll("input[name='shipping-type']");
  shippingType.forEach((inp) => {
    inp.addEventListener("change", function () {
      calculateTotals();
    });
  });
  const cartData = await getJSONData(CART_INFO_URL + "25801.json");
  saveArticleToLocalStorage(cartData.data.articles[0]);
  showArticles();
  calculateTotals();
});

function showArticles() {
  const cartArticles = document.querySelector("#cart-articles");

  cartArticles.innerHTML = "";

  userCart.articles.forEach((article) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><img src="${article.image}" width="128" alt="${article.name}"></td>
      <td>${article.name}</td>
      <td>${article.currency} ${article.unitCost}</td>
      <td><input type="number" name="count" min="1" max="10" class="form-control" onchange="updateArticleCount(${
        article.id
      }, this.value)" value="${article.count}" /></td>
      <td>USD ${
        article.currency === "UYU"
          ? (article.unitCost / 40) * article.count
          : article.unitCost * article.count
      }</td>
      <td><button class="btn btn-danger" onclick="deleteArticle(${
        article.id
      })"><i class="fa fa-trash"></i></button></td>
    `;

    cartArticles.appendChild(tr);
  });
}

function deleteArticle(articleId) {
  userCart.articles = userCart.articles.filter(
    (article) => article.id !== articleId
  );
  saveUserCartToLocalStorage(userCart);
  calculateTotals();
  showArticles();
}

function saveArticleToLocalStorage(article) {
  const isArticleInCart = userCart.articles.some(
    (art) => art.id === article.id
  );
  if (!isArticleInCart) {
    userCart.articles.push(article);
  }
  localStorage.setItem("userCart", JSON.stringify(userCart));
}

function saveUserCartToLocalStorage() {
  localStorage.setItem("userCart", JSON.stringify(userCart));
}

function updateArticleCount(articleId, newCount) {
  userCart.articles = userCart.articles.map((article) => {
    if (article.id === articleId) {
      article.count = newCount;
    }
    return article;
  });
  saveUserCartToLocalStorage();
  calculateTotals();
  showArticles();
}

function calculateTotals() {
  // Seleccionamos los elementos del DOM
  const subtotalEl = document.querySelector("#subtotal");
  const shippingEl = document.querySelector("#envio");
  const totalEl = document.querySelector("#total");

  // Calcular el subtotal
  const subtotal = userCart.articles.reduce((acc, article) => {
    if (article.currency === "UYU") {
      return acc + (article.unitCost / 40) * article.count;
    }

    return acc + article.unitCost * article.count;
  }, 0);

  // Calcular el envío
  const selectedShippingType = document.querySelector(
    'input[name="shipping-type"]:checked'
  ).value;

  let shippingCost = 0;

  switch (selectedShippingType) {
    case "standard":
      shippingCost = subtotal * 0.05;
      break;
    case "express":
      shippingCost = subtotal * 0.07;
      break;
    case "premium":
      shippingCost = subtotal * 0.15;
      break;
  }

  // Calcular el total
  const total = subtotal + shippingCost;

  // Mostrar los resultados
  subtotalEl.innerHTML = `USD ${subtotal}`;
  shippingEl.innerHTML = `USD ${shippingCost}`;
  totalEl.innerHTML = `USD ${total}`;
}
