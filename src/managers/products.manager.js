import { productsModel } from "../models/products.model.js";

class ProductManager{
    // Obtiene todos los productos con opciones de paginación y filtrado
    async findAll(obj){
        const {limit = 10, page = 1, sortPrice, ...query} = obj;
        if (isNaN(page) || page <= 0) {
            throw new Error("PAGE_INVALID");
        }
        if(isNaN(limit) || limit <= 0) {
            throw new Error("LIMIT_INVALID");
        }
        try {
            const result = await productsModel.paginate(query, {limit, page, sort:{price:sortPrice},lean:true})
            const info ={
                count: result.totalDocs,
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink: result.hasPrevPage
                ?`http://localhost:8080/products?page=${result.prevPage}`
                :null,
                nextLink: result.hasNextPage
                ? `http://localhost:8080/products?page=${result.nextPage}`
                :null,
                payload: result.docs,
            }
            return {info}
        } catch (error) {
            return error
        }
    }
    // Obtiene un producto por su ID
    async findById(id){
        try {
            const product = await productsModel.findById(id).lean();
            return product
        } catch (error) {
            return error
        }
    }
    // Busca un producto por el campo 'code' en la base de datos|
    async findOneByCode(code) {
        try {
            const product = await productsModel.findOne({ code });
            return product;
        } catch (error) {
            throw error;
        }
    }
    // Crea un nuevo producto
    async create(obj){
        try {
            const newProduct = await productsModel.create(obj);
            return newProduct
        } catch (error) {
            error
        }
    }
    // Actualiza un producto por su ID 
    async updateById(id, obj){
        try {
            const response = await productsModel.findByIdAndUpdate(id, {...obj}, { new: true })
            return response
        } catch (error) {
            return error
        }
    }
    // Elimina un producto por su ID
    async deleteById(id){
        try {
            const response = await productsModel.findByIdAndDelete(id);
            return response
        } catch (error) {
            return error
        }
    }
}

export const productManager = new ProductManager();