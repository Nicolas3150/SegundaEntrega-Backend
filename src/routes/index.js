import { Router } from "express";
const router = Router();
import { CartDao, ProductDao } from "../daos/index.js"

const cart = new CartDao()
const product = new ProductDao()

let admin = true

router.get('/productos', product.getAll)
router.get('/productos/:id', product.getById)
router.post('/productos', checkIfAdmin, product.create)
router.put('/productos/:id', checkIfAdmin, product.update)
router.delete('/productos/:id', checkIfAdmin, product.delete)

router.post('/carrito', cart.create)
router.delete('/carrito/:id', cart.delete)
router.get('/carrito/:id/productos', cart.getProductsInCart)
router.post('/carrito/:id/productos', cart.addProductToCart)
router.delete('/carrito/:id/productos/:id_prod', cart.deleteProductInCart)


function checkIfAdmin(req, res, next){
    admin ? next() : res.status(401).json({ error: -1, descripcion: "Ruta no autorizada" })
}

export default router;