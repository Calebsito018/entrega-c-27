import { cartsManager } from '../managers/carts.manager.js';

// Obtiene todos los carritos
const getAll = async(req,res) =>{
    try {
        const carts = await cartsManager.findAll();
        if(!carts.length){
            return res.status(400).send({message: "Carts not found"})
        }
        return res.status(200).json({ message: "Carts", carts})
    } catch (error) {
        res.status(500).json({error})
    }
}

// Obtiene un carrito por su ID
const getById = async(req,res) =>{
    const {id} = req.params;
    try {
        const cart = await cartsManager.findById(id);
        if (!cart) {
            return res.status(404).send({ message: "Cart not found" });
        }
        return res.status(200).json({ message: "Cart", cart });
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving cart", error: error.message });
    }
}

// Crea un nuevo carrito
const create = async(req,res) =>{
    try {
        const newCart = await cartsManager.createCart(req.body)
        return res.status(200).send({ message: "New cart created", newCart });
    } catch (error) {
        res.status(500).json({error})
    }
}

// Actualiza un carrito por su ID
const updateById = async(req,res) =>{
    const cid = req.params.cid;
    const {products} = req.body;
    try {
        const updatedCart = await cartsManager.updateCartProducts(cid, products);
        return res.status(200).json({ message: "Cart updated successfully", cart: updatedCart });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// Elimina un carrito por su ID
const deleteById = async(req,res) =>{
    const {id} = req.params;
    try {
        const response = await cartsManager.delCart(id)
        return res.status(200).send({ message: "Cart deleted successfully"})
    } catch (error) {
        res.status(500).json({error})
    }
}

// Agrega un producto a un carrito
const addProdToCart = async(req,res) =>{
    const {cid, pid} = req.params;
    try {
        const cart = await cartsManager.addProduct(cid, pid);
        return res.status(200).json({message: "Product added successfully", cart})
    } catch (error) {
        return error
    }
}

// Actualiza un producto dentro de un carrito
const updProdToCart = async(req,res) =>{
    const {cid, pid} = req.params;
    const {quantity} = req.body;
    try {
        const updatedCart = await cartsManager.updateQuantity(cid, pid, quantity);
        return res.status(200).json({ message: "Product quantity updated successfully", cart: updatedCart });
    } catch (error) {
        return  res.status(500),send({error})
    }
}

// Elimina un producto de un carrito
const delProdToCart = async(req,res) =>{
    const {cid, pid} = req.params;
    try {
        const response = await cartsManager.delProduct(cid, pid)
        return res.status(200).send({ message: "Product deleted successfully"})
    } catch (error) {
        return  res.status(500),send({error})
    }
}

export default {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
    addProdToCart,
    updProdToCart,
    delProdToCart,
}