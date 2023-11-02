import { cartModel } from '../models/carts.model.js';

class CartsManager {

    //para buscar todos los carritos
    async findAll() {
        try {
            const carts = await cartModel.find({});
            return carts;
        } catch (error) {
            return error;
        }
    }
    //muestra un carrito en especifico por id
    async findById(id) {
        try {
            const cart = await cartModel.findById(id).populate('products.product').lean();
            return cart;
        } catch (error) {
            return error;
        }
    }

    async createCart(obj) {
        try {
            const newCart = await cartModel.create(obj);
            return newCart;
        } catch (error) {
            return error;
        }
    }

    async addProduct(cid, pid) {
        try {
            const cart = await cartModel.findById(cid);
            if (!cart) {
                return console.log("Cart not found");
            }
            const productExists = cart.products.some(p => p.product.equals(pid));
            if (!productExists) {
                cart.products.push({ product: pid, quantity: 1 });
            } else {
                const product = cart.products.find(p => p.product.equals(pid));
                product.quantity++;
            }
            const updateCart = await cart.save();
            return updateCart;
        } catch (error) {
            return error;
        }
    }

    async updateCartProducts(cid, newProducts) {
        try {
            const cart = await cartModel.findById(cid);
            if (!cart) {
                throw new Error("Cart not found");
            }
            cart.products = newProducts;
            await cart.save();
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async updateQuantity(cartId, productId, newQuantity) {
        try {
            const cart = await cartModel.findById(cartId);
            if (!cart) {
                throw new Error("Cart not found");
            }
            const product = cart.products.find(productObj => productObj.product.toString() === productId);
            if (!product) {
                throw new Error("Product not found in the cart");
            }
            product.quantity = newQuantity;
            await cart.save();
            return cart;
        } catch (error) {
            return error;
        }
    }

    async delCart(id) {
        try {
            const response = await cartModel.findByIdAndDelete(id);
            return response;
        } catch (error) {
            return error;
        }
    }

    async delProduct(cid, pid) {
        try {
            const cart = await cartModel.findById(cid);
            if (!cart) {
                throw new Error("Cart not found");
            }
            cart.products = cart.products.filter(product => !product.product.equals(pid));
            await cart.save();
            return cart;
        } catch (error) {
            return error;
        }
    }
}

export const cartsManager = new CartsManager();
