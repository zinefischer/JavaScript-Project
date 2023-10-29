// DECLARO LAS VARIABLES
let productos = [];
const catalogo = document.querySelector("#catalogo");
const botonesMenu = document.querySelectorAll(".btn-menu");
const textoPrincipal = document.querySelector("#texto-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const carritoCantidad = document.querySelector("#carrito-cantidad");
const contenedorCarrito = document.querySelector("#contenedor-carrito")

// FETCH
// PASO DE ARCHIVO JSON A ARRAY PARA PODER TRABAJAR CON ÉL
fetch("stock.json")
    .then((resp) => resp.json())
    .then((data) => {
        productos = data;
        mostrarCatalogo(productos);
    })

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
    actualizarBotones();
}

// FILTRO PARA LOS PRODUCTOS
botonesMenu.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesMenu.forEach(boton => boton.classList.remove("active"));

        e.target.classList.add("active");

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

const productosPedidos = [];

//BOTONES AGREGAR
const actualizarBotones = () => {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(botones => {
        botones.addEventListener('click', (e) => {

            //PERSONALIZACIÓN
            Toastify({
                text: "Producto agregado",
                duration: 1500,
                newWindow: false,
                close: false,
                gravity: "bottom",
                position: "right",
                stopOnFocus: false,
                style: {
                    background: "#4A4A48",
                    borderRadius: "2rem"
                },
                offset: {
                    x: '1.5rem',
                    y: '1.5rem'
                },
            }).showToast();

            const id = e.currentTarget.id;

            const productoAgregado = productos.find(producto => producto.id === id)

            if (productosPedidos.some(producto => producto.id === id)) {
                const productoIndex = productosPedidos.findIndex(producto => producto.id === id)
                productosPedidos[productoIndex].cantidad++;
            } else {
                productoAgregado.cantidad = 1;
                productosPedidos.push(productoAgregado);
            }
            actualizarCantidadCarrito();
            cargarProductosCarrito();
        })
    })
}
