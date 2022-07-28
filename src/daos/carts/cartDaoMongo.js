import MongoContainer from "../../containers/mongoContainer.js"
import productos from "../../models/products.js"

class CartDaoMongo extends MongoContainer {
    constructor() {
        super("carritos", {
            timestamp: { type: String, required: true },
            products: { type: Array, required: true }
        })
    }

    cartExists = async (id) => {
        try {
            const carts = await this.collection.find()
            const i = carts.filter(cart => cart._doc._id.toString() === id)
            return (i.length !== 0)
        } catch (error) {
            console.log(error)
        }
    }

    getProductsInCart = async (req, res) => {
        try {
            if (!await this.cartExists(req.params.id)) return res.status(404).json({ error: "Carrito no encontrado" })
            const productsInCart = await this.collection.find({ _id: req.params.id }, { _id: 0, products: 1 })
            res.json(productsInCart[0].products)
        } catch (error) {
            console.log(error)
        }
    }

    addProductToCart = async (req, res) => {
        try {
            if (!await this.cartExists(req.params.id)) return res.status(404).json({ error: "Carrito no encontrado" })
            const p = await productos.find({ _id: req.body.id_prod })
            const productsInCart = await this.collection.find({ _id: { $eq: req.params.id } }, { _id: 0, products: 1 })
            const arrayProd = [ p[0],...productsInCart[0].products ]
            await this.collection.updateOne({_id: req.params.id}, {$set: { products: arrayProd }})
            console.log('Producto insertado!')
        } catch (error) {
            console.log(error)
        }
    }

    deleteProductInCart = async (req, res) => {
        try {
            if (!await this.cartExists(req.params.id)) return res.status(404).json({ error: "Carrito no encontrado" })
            const productsInCart = await this.collection.find({ _id: { $eq: req.params.id } }, { _id: 0, products: 1 })
            const arrayProd = productsInCart[0].products.filter(prod => prod._id === req.params.id_prod)
            await this.collection.updateOne({_id: req.params.id}, {$set: { products: arrayProd }})
            console.log('se elimino el producto')
        } catch (error) {
            console.log(error)
        }
    }

}

export default CartDaoMongo