// DECLARO LAS VARIABLES

const catalogo = document.querySelector("#catalogo");
const botonesMenu = document.querySelectorAll(".btn-menu");
const textoPrincipal = document.querySelector("#texto-principal");

// MUESTRO EL CATALOGO DE LA TIENDA

const mostrarCatalogo = (productosFiltrados) => {

    catalogo.innerHTML = "";

    productosFiltrados.forEach(producto => {

        const div = document.createElement("div")
        div.classList.add("producto");
        div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
             <div class="producto-detalles">
                 <h3 class="producto-titulo">${producto.titulo}</h3>
                 <p class="producto-precio">$${producto.precio}</p>
                 <button class="producto-agregar" id ="${producto.id}">Agregar</button>
             </div>   
        `;

        catalogo.append(div)
    })
}

mostrarCatalogo(productos);

// FILTRO PARA LOS PRODUCTOS

botonesMenu.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesMenu.forEach(boton => boton.classList.remove("active"));

        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            textoPrincipal.innerText = productoCategoria.categoria.nombre;
            const btnMenu = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            mostrarCatalogo(btnMenu);
        } else {
            textoPrincipal.innerText = "Todos los productos";
            mostrarCatalogo(productos);
        }
    })
})

// AGREGAR PRODUCTOS AL CARRITO

const botonAgregar = document.querySelectorAll(".producto-agregar");

const carrito = [];

botonAgregar.forEach(boton => {
    boton.addEventListener("click", carritoAgregar)
});

function carritoAgregar(e) {
    const id = e.currentTarget.id;
    const productoEnCarrito = productos.find(producto => producto.id === id);

    if (carrito.some(producto => producto.id === id)) {
        const index = carrito.findIndex(producto => producto.id === id)
        carrito[index].cantidad++;
    } else {
        productoEnCarrito.cantidad = 1;
        carrito.push(productoEnCarrito);
    }

    localStorage.setItem("productos-carrito", JSON.stringify(carrito));
    console.log(carrito)
}








