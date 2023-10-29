// MODAL
const modalContenedor = document.querySelector(".modal-contenedor");
const body = document.querySelector(".body");

// ABRIR CARRITO
btnCart.addEventListener("click", () => {
    modalContenedor.classList.add("modal-active")
})

// CERRAR CARRITO
btnCerrarCarrito.addEventListener("click", () => {
    modalContenedor.classList.remove("modal-active")
})

