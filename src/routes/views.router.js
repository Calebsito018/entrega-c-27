import { Router } from "express";
import {cartsManager} from '../managers/carts.manager.js';
import { productManager } from '../managers/products.manager.js';

const router = Router();

// Middleware para verificar la sesión, si no existe manda a login
const checkSession = (req, res, next) => {
    if (!req.session.user && !req.user) {
        return res.redirect('/login');
    }
    next();
};
// Middleware para verificar rol de admin, si no es manda a vista de productos
const checkAdmin = (req, res, next) =>{
    if(req.session.user.rol !== "admin"){
        return res.redirect('/view/products');
    }
    next();
}
// obtener todos los productos o con limit(por defecto trae 10 productos)
router.get("/", checkSession, async(req, res)=> {
    const limit = req.query.limit;
        if(limit && isNaN(limit) || limit <= 0){
        return res.send({ message: "Invalid limit. Must be an integer"});
    }
    try {
        const { info } = await productManager.findAll({limit});
        if (!info.payload.length) {
            return res.status(404).send({ message: "Products not found" });
        }
        res.render("home", { products: info.payload });
    } catch (error) {
        res.status(500).json({error});
    }
})
//obtener todos los productos con handlebars
router.get("/realtimeproducts",checkSession, checkAdmin, async(req, res)=>{
    try {
        const { info } = await productManager.findAll({});
        if (!info.payload.length) {
            return res.status(404).send({ message: "Real-time Products not found" });
        }
        res.render("realTimeProducts", { products: info.payload });
    } catch (error) {
        res.status(500).json({error});
    }
})
//mostrar producto por id
router.get("/product/:pid", async(req, res)=>{
    const {pid} = req.params;
    try {
        const product = await productManager.findById(pid);
        if(!product){
            return res.status(404).send({ message: "Product not found"});
        };
        res.status(200).render("home", {product});
    } catch (error) {
        res.status(500).json({error});
    }
})
// para mostrar todos los productos con paginacion
router.get("/view/products", checkSession, async (req, res) => {
    const page = req.query.page || 1;
    const limit = 5;
    const userByGithub = req.user ? req.user.toObject() : null; // Convierte el resultado a un objeto plano por error en handlebars
    const user = req.session.user;
    const userToShow = userByGithub ? userByGithub: user
    try {
        const productsData = await productManager.findAll({ page, limit });
        const showAdminButton = user && user.rol === 'admin'; //si rol es admin mando info para handlebars
        res.render('productsView', { 
            products: productsData.info.payload, 
            pagination: productsData.info, 
            user:userToShow,
            onlyAdmin: showAdminButton });
    } catch (error) {
        res.status(500).send({ error });
    }
});
//para mostrar los productos de un carrito en especifico
router.get("/view/carts/:cid", async (req, res) => {
    const {cid} = req.params
    try {
        const cart = await cartsManager.findById(cid);
        if (!cart) {
            return res.status(404).send("Cart not found");
        }
        res.render("cartView", { cart });
    } catch (error) {
        res.status(500).send({error});
    }
})



//  --- sessions ---
const publicAcces = (req,res,next) =>{
    if(req.session.user) return res.redirect('/view/products');
    next();
}
const privateAcces = (req,res,next)=>{
    if(!req.session.user) return res.redirect('/login');
    next();
}

router.get('/register', publicAcces, (req,res)=>{
    try {
        res.render('register')
    } catch (error) {
        res.status(500).send({error});
    }
})

router.get('/login', publicAcces, (req,res)=>{
    try {
        res.render('login')
    } catch (error) {
        res.status(500).send({error});
    }
})

router.get('/profile', privateAcces ,(req,res)=>{
    try {
        res.render('profile',{
            user: req.session.user
        })
    } catch (error) {
        res.status(500).send({error});
    }
})

export default router
