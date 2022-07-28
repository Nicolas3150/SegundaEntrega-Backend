import admin from "firebase-admin"
import config from "../config.js"

admin.initializeApp({
    credential: admin.credential.cert(config.firebase)
})

export const db = admin.firestore()

class FirebaseContainer {
    constructor(collectionName) {
        this.name = collectionName
        this.collection = db.collection(collectionName)
    }

    // Realizar CRUD (Create, Read, Update, Delete)

    create = async (req, res) => {
        try {
            const item = this.collection.doc();
            this.name === "carritos" ?
                await item.create({ timestamp: Date.now().toString(), products: [] }) :
                await item.create({ timestamp: Date.now().toString(), ...req.body })
            console.log('Item insertado!')
            res.status(201)
        } catch (error) {
            console.log(error)
        }
    }

    getAll = async (req, res) => {
        try {
            const snapshot = await this.collection.get()
            const items = snapshot.docs;
            const response = items.map(item => ({ id: item.id, ...item.data() }))
            res.json(response)
        } catch (error) {
            console.log(error)
        }
    }

    getById = async (req, res) => {
        try {
            const document = this.collection.doc(req.params.id)
            const item = await document.get()
            console.log('carrito: ', { id: item.id, ...item.data() })
            res.json([{ id: item.id, ...item.data() }])
        } catch (error) {
            console.log(error)
        }
    }

    update = async (req, res) => {
        try {
            const document = this.collection.doc(req.params.id)
            await document.update({ ...req.body })
            res.sendStatus(200)
        } catch (error) {
            console.log(error)
        }
    }

    delete = async (req, res) => {
        try {
            const document = this.collection.doc(req.params.id)
            await document.delete()
            res.sendStatus(200)
        } catch (error) {
            console.log(error)
        }
    }
}

export default FirebaseContainer;