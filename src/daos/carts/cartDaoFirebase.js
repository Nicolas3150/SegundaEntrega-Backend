import FirebaseContainer from "../../containers/firebaseContainer.js"
import { db } from '../../containers/firebaseContainer.js'

class CartDaoFirebase extends FirebaseContainer {
    constructor() {
        super("carritos")
    }

    getProductsInCart = async (req, res) => {
        try {
            const document = this.collection.doc(req.params.id)
            const item = await document.get()
            res.json(item.data().products)
        } catch (error) {
            console.log(error)
        }
    }

    addProductToCart = async (req, res) => {
        try {
            const document = this.collection.doc(req.params.id)
            const item = await document.get()

            const productCollection = db.collection("productos")
            const productDocument = productCollection.doc(req.body.id_prod)
            const product = await productDocument.get()


            await document.update({
                timestamp: item.data().timestamp,
                products: [{id: product.id, ...product.data() }, ...item.data().products]
            })
            res.status(201)
            console.log('Producto insertado!')
        } catch (error) {
            console.log(error)
        }
    }

    deleteProductInCart = async (req, res) => {
        try {
            const document = this.collection.doc(req.params.id)
            const item = await document.get()
            await document.update({
                timestamp: item.data().timestamp,
                products: item.data().products.filter(prod => prod.id !== req.params.id_prod)
            })
            res.sendStatus(200)
            console.log('deleted!')
        } catch (error) {
            console.log(error)
        }
    }
}

export default CartDaoFirebase;