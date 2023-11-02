const addToCart = (productId) => {
    //!  No encuentro manera de guardar el id del carrito en una variable
    //! por lo tanto la tengo que agregar manualmente
    const cid = "64fbcdedb44971b566ceab05"

    fetch(`http://localhost:8080/api/carts/${cid}/products/${productId}`, {
        method: 'POST',
    })
        .then(response => {
            if (response.status === 200) {
                alert('Producto agregado al carrito 64fbcdedb44971b566ceab05');
            } else {
                alert('Error al agregar el producto al carrito');
            }
        })
        .catch(error => {
            console.log(error);
        });
}