
// Obtener todos los formularios a los que queremos aplicar estilos de validación de Bootstrap personalizados
    var forms = document.querySelectorAll('.needs-validation')      

      forms.forEach(element => {
        element.addEventListener('submit', function (event) {
            element.classList.add('was-validated')
            event.preventDefault()
            ValidarTipoDeEnvio()
            Val_DatosEnvio()
        })
      });



// Funcion que busca si algun tipo de pago

function ValidarTipoDeEnvio() {
    let paymentMethodRadios = document.querySelectorAll('input[name="paymentMethod"]');
    var nometodopago = document.getElementById("P-nometodopago")
    var BtnmetodPago = document.getElementById("BtnmetodPago")

    if((!(paymentMethodRadios[0].checked)) && (!(paymentMethodRadios[1].checked))){
        
        nometodopago.classList.remove("invisible")
        BtnmetodPago.classList.add("text-danger")
    }
    else if((!(paymentMethodRadios[0].checked)) || (!(paymentMethodRadios[1].checked))){

        nometodopago.classList.add("invisible")
        BtnmetodPago.classList.remove("text-danger")
    }
}

//funcion para avisar que faltan datos en el tipo de pago
function Val_DatosEnvio(){
    let paymentMethodRadios = document.querySelectorAll('input[name="paymentMethod"]');
    let cardNumberInput = document.getElementById('cardNumber');
    let securityCodeInput = document.getElementById('securityCode');
    let expirationDateInput = document.getElementById('expirationDate');
    let accountNumberInput = document.getElementById('accountNumber');
    let metodPago = document.getElementById("MetodPago")
    
    if(paymentMethodRadios[0].checked){
        if(cardNumberInput.value === "" && securityCodeInput.value === "" && expirationDateInput.value === ""){
            metodPago.innerHTML += `<div class="alert alert-danger">
            Faltan datos de tu tarjeta
          </div>`
        }
    }

    if(paymentMethodRadios[1].checked){
        if(accountNumberInput.value === ""){
            metodPago.innerHTML += `<div class="alert alert-danger">
            Faltan datos de tu banco
          </div>`
        }
    }
}