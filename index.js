
// funcion para actualizar el contador del carrito
const actualizarContador = ()=>{
    //cambiamos el contenido del HTML con el ID contador-carrito
    document.getElementById("contador-carrito").textContent = carrito.length

}

// Recuperar el carrito del almacenamiento local
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
actualizarContador()

console.log(carrito)

const agregarAlcarrito = (nombre,precio) =>{
    //agregar el producto como un objeto al carrito
    carrito.push({nombre,precio})
    localStorage.setItem("carrito",JSON.stringify(carrito))
    // actualizar el contador visual del carrito
    actualizarContador()
    // muestra un alerta de confirmacion
    alert(`Agregaste : ${nombre} al carrito`)
}


// Guarda el contenido del carrito en el almacenamiento local antes de cerrar la pagina

window.addEventListener("beforeunload",()=>{
localStorage.setItem("carrito",JSON.stringify(carrito))
});

