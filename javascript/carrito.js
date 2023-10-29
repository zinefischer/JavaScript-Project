
// CARRITO
const botonConfirmar = document.querySelector("#carrito-confirmar");
const carritoVacio = document.querySelector("#empty-cart");
const btnConfirmar = document.querySelector("#confirmar-compra");
const btnCart = document.querySelector("#btn-cart");
const btnCerrarCarrito = document.querySelector("#close-cart");
const subtotal = document.querySelector("#subtotal-carrito");
let btnEliminar = document.querySelectorAll(".producto-eliminar-carrito");

// MOSTRAR PRODUCTOS EN CARRITO
const cargarProductosCarrito = () => {
    if (productosPedidos && productosPedidos.length > 0) {

        carritoVacio.classList.add("disabled");
        botonConfirmar.classList.remove("disabled");
        btnConfirmar.classList.remove("disabled");
        subtotal.classList.remove("disabled");

        contenedorCarrito.innerHTML = "";

        productosPedidos.forEach(producto => {

            const div = document.createElement("div");
            div.classList.add("producto-carrito");
            div.innerHTML = `
            <img class="producto-imagen-carrito" src="${producto.imagen}" alt="${producto.titulo}">
            <div>
                <small>TITULO</small>
                <h3>${producto.titulo}</h3>
            </div>
            <div class="producto-cantidad-carrito">
                <small>Cantidad</small>
                <p>${producto.cantidad}</p>
            </div>
            <div class="producto-precio-carrito">
                <small>Precio</small>
                <p>$${producto.precio}</p>
            </div>
            <div>
                <small>Subtotal</small>
                <p>$${producto.cantidad * producto.precio}</p>
            </div>
            <button class="producto-eliminar-carrito"><img src="./assets/images/iconos/trash.png"
                    alt="Eliminar">
            </button>
            `;

            contenedorCarrito.append(div);
        })

        botonesEliminar();
        actualizarTotal();

    } else {

        carritoVacio.classList.remove("disabled");
        botonConfirmar.classList.add("disabled");
        btnConfirmar.classList.add("disabled");
        subtotal.classList.add("disabled");

        contenedorCarrito.innerHTML = "";
    }
}


//ACTUALIZAR BOTONES ELIMINAR
const botonesEliminar = () => {
    btnEliminar = document.querySelectorAll(".producto-eliminar-carrito");

    // ELIMINAR PRODUCTOS CARRITO
    btnEliminar.forEach(boton => {
        boton.addEventListener("click", (e) => {

            // PERSONALIZACION
            Toastify({
                text: "Producto eliminado",
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

            const idBoton = e.currentTarget.id;
            const index = productosPedidos.findIndex(producto => producto.id === idBoton);

            productosPedidos.splice(index, 1);
            cargarProductosCarrito();
            actualizarCantidadCarrito();
        });
    });
}

//BOTON CONFIRMAR
btnConfirmar.addEventListener("click", () => {

    contenedorCarrito.innerHTML = "";

    carritoVacio.classList.remove("disabled");
    botonConfirmar.classList.add("disabled");
    btnConfirmar.classList.add("disabled");
    subtotal.classList.add("disabled");

    Swal.fire({
        showConfirmButton: false,
        timer: 1500,
        icon: "success",
        title: "Su compra ha sido efectuada con éxito",
        text: "Muchas gracias por su compra",
        color: "white",
        background: "#706C61",
        borderRadius: "2rem",
        customClass: {
            popup: 'border-radius-0'
        }
    })
})

// ACTUALIZAR TOTAL CARRITO
const actualizarTotal = () => {
    const totalCalculado = productosPedidos.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
    guardarCarritoStorage(productosPedidos);
}

// ACTUALIZO CANTIDAD DEL CARRITO
const actualizarCantidadCarrito = () => {
    let num = productosPedidos.reduce((acc, producto) => acc + producto.cantidad, 0)
    carritoCantidad.innerHTML = num;
}

// LOCAL STORAGE
const guardarCarritoStorage = (productosPedidos) => {
    localStorage.setItem('carrito', JSON.stringify(productosPedidos));
};

const obtenerCarritoStorage = () => {
    return JSON.parse(localStorage.getItem('carrito'));
};

const cargarCarrito = () => {
    productosPedidos = obtenerCarritoStorage();
    cargarProductosCarrito(productosPedidos);
    actualizarTotal(productosPedidos);
    actualizarCantidadCarrito(productosPedidos);
}

