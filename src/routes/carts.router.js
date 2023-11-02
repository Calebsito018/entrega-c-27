import { Router } from "express";
import CartController from '../controllers/carts.controller.js'

const router = Router();

//Rutas para caritos
router.get('/', CartController.getAll);
router.get('/:cid', CartController.getById);
router.post('/', CartController.create);
router.put('/:cid', CartController.updateById);
router.delete('/:cid', CartController.deleteById);
router.post('/:cid/products/:pid', CartController.addProdToCart);
router.put('/:cid/products/:pid', CartController.updProdToCart);
router.delete('/:cid/products/:pid', CartController.delProdToCart);

export default router