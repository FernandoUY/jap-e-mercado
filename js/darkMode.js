let bttDark = document.getElementById("darkchek")


bttDark.addEventListener('change', function(){

    if(bttDark.checked){
        
        TemaMode("False", "white", "ligth", "album py-5 bg-light", "darkweb")

    }
    else{

        TemaMode("True", "dark", "darkweb", "album py-5", "ligth")

    }
    
})


document.addEventListener("DOMContentLoaded", function(){

    let valorDark = localStorage.getItem("dark")

    if(valorDark == "True"){
        TemaMode("True", "dark", "darkweb", "album py-5", "ligth")
    }else{
        TemaMode("False", "white", "ligth", "album py-5 bg-light", "darkweb")
    }
    


})


function changeColorDiv(color){
    let divCard = document.getElementsByClassName("card mb-4 shadow-sm custom-card cursor-active")

    
    for (let index = 0; index < divCard.length; index++) {
        
        divCard[index].className = `card mb-4 shadow-sm custom-card cursor-active bg-${color}`
    }

}


function TemaMode(bool, color, tyClasBody, tyClasDiv, ClasBody){
    localStorage.setItem("dark", bool)
    let clasBody = document.getElementsByClassName(ClasBody)[0]
    let  divdark = document.getElementById("divDark") 

    changeColorDiv(color)

    if(divdark !== null){
        divdark.className = tyClasDiv
    }
    
    clasBody.className = tyClasBody

}