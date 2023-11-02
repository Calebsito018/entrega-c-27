import { productManager } from '../managers/products.manager.js';

// Obtiene todos los productos
const getAll = async(req, res) =>{
    try {
        const products = await productManager.findAll(req.query);
        return res.status(200).json({ message: 'Products found', products });
    } catch (error) {
        if (error.message === 'PAGE_INVALID') {
            return res.status(400).send({ message: 'The entered page value is not valid.' });
        }
        if (error.message === 'LIMIT_INVALID') {
            return res.status(400).send({ message: 'The entered limit value is not valid.' });
        }
        return res.status(500).json({ error });
    }
}

// Obtiene un producto por su ID
const getById = async(req, res) =>{
    const { id } = req.params;
    try {
        const product = await productManager.findById(id);
        if (!product) {
            return res.status(400).send({ message: 'Product not found' });
        }
        return res.status(200).json({ message: 'Product', product });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

// Crea un nuevo producto
const create = async(req, res) =>{
    const { title, description, price, code, stock, category, status = true } = req.body;
    if (!title || !description || !price || !code || !stock || !category) {
        return res.status(400).send({ message: 'All fields are required' });
    }
    const codeExists = await productManager.findOneByCode(code);
    if (codeExists) {
        return res.status(400).send({ message: 'Product with this code already exists' });
    }
    try {
        const newProduct = await productManager.create(req.body);
        return res.status(200).json({ message: 'New Product added', newProduct });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

// Actualiza un producto por su ID
const updateById = async(req, res) =>{
    const { title, description, price, code, stock, category } = req.body;
    if (!title || !description || !price || !code || !stock || !category) {
        return res.status(400).send({ message: 'All fields are required' });
    }
    const { id } = req.params;
    try {
        const response = await productManager.updateById(id, req.body);
        if (!response) {
            return res.status(400).send({ message: 'Product update failed' });
        }
        return res.status(200).json({ message: 'Product updated successfully', response });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

// Elimina un producto por su ID
const deleteById = async(req, res) =>{
    const { id } = req.params;
    try {
        const response = await productManager.deleteById(id);
        return res.status(200).json({ message: 'Product deleted successfully', response });
    } catch (error) {
        return res.status(500).json({ error });
    }
}


export default {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
}