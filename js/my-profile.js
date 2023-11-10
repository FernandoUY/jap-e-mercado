
document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("userDetails"));
  
  document.querySelector("#first-name").value = user?.firstName;
  document.querySelector("#second-name").value = user?.secondName;
  document.querySelector("#first-lastname").value = user?.firstLastname;
  document.querySelector("#second-lastname").value = user?.secondLastname;
  document.querySelector("#email").value = user?.email;
  document.querySelector("#phone").value = user?.phone;

});
document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('input-image');
  const image = document.getElementById('profile-image');

  // Cargar la imagen almacenada en el almacenamiento local al cargar la página
  const storedImage = localStorage.getItem('savedImage');
  if (storedImage) {
    image.src = storedImage;
  } else {
    // Si no hay imagen almacenada, mostrar la imagen por defecto
    image.src = 'img/img_perfil.png';
  }

  input.addEventListener('change', function (event) {
    const file = input.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        // Mostrar la imagen seleccionada
        image.src = e.target.result;

        // Guardar la imagen en el almacenamiento local
        localStorage.setItem('savedImage', e.target.result);
      };

      reader.readAsDataURL(file);
    } else {
      // Si el usuario no selecciona una imagen, mostrar la imagen por defecto
      image.src = 'img/img_perfil.png';

      // Eliminar la imagen almacenada en el almacenamiento local
      localStorage.removeItem('savedImage');
    }
  });
});