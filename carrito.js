// Recuperar el carrito del almacenamiento local
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];



// Muestra los productos en el carrito
const mostrarCarrito = () => {
    const lista = document.getElementById("lista-carrito");
    lista.innerHTML = "";

    if (carrito.length === 0) {
        lista.innerHTML = '<p>Tu carrito está vacio</p>';
        actualizarResumen();
        return;
    }


const conteo = carrito.reduce((acc, prod) => {
  acc[prod.nombre] = (acc[prod.nombre] || 0) + 1;
  return acc;
}, {});
const precio = carrito.reduce((acc, prod) => {
  acc[prod.nombre] = prod.precio;
  return acc;
}, {});
console.log(conteo)
console.log(precio)
const dict_as_array = Object.keys(conteo).map(nombre => ({
        nombre: nombre,
        value: conteo[nombre]
    })); //paso el diccionario a lista para poder recorrer
console.log(dict_as_array);


    dict_as_array.forEach((item, indice) => {
        const producto = document.createElement("article");
        producto.classList.add("producto");
        producto.innerHTML = `
            <h2>${item.nombre}</h2>
	    <p class="cantidad">cantidad: ${conteo[item.nombre]}</p>
            <p class="precio">precio unitario: $${precio[item.nombre]}</p>
            <p class="precio">precio total: $${precio[item.nombre]*conteo[item.nombre]}</p>
            <button onclick="eliminarDelCarrito(${indice})">Eliminar</button>
        `;
        lista.appendChild(producto);
    });

    actualizarResumen();
};

// Actualiza el resumen del carrito
const actualizarResumen = () => {
    const totalProductos = document.getElementById("total-productos");
    const importeTotal = document.getElementById("importe-total");

    const total = carrito.reduce((acc, item) => acc + item.precio, 0);
    totalProductos.textContent = carrito.length;
    importeTotal.textContent = total.toFixed(2);

    const botonCompra = document.querySelector("button[onclick='realizarCompra()']");
    const resumenCarrito = document.getElementById("resumen-carrito");
    resumenCarrito.appendChild(botonCompra);
};

// Elimina un producto del carrito
const eliminarDelCarrito = (indice) => {
    carrito.splice(indice, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
};

// Simula la compra
const realizarCompra = () => {
    if (carrito.length !== 0){ 
      alert("Compra realizada con éxito");
      localStorage.removeItem("carrito");
      window.location.href = "index.html";
      return
    }
    alert("Debe agregar items para poder continuar")
    return
};

// Inicializa el carrito al cargar la página
mostrarCarrito();
