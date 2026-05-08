async function mostrarProductos() {
    const respuesta = await fetch('/productos');
    const productos = await respuesta.json();
    const lista = document.getElementById('listaProductos');
    lista.innerHTML = '';

    productos.forEach(producto => {
        lista.innerHTML += `
            <li>
                ${producto.nombre} - $${producto.precio}
            </li>
        `;
    });
}