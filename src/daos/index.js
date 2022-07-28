import dotenv from 'dotenv'
dotenv.config()

let ProductDao
let CartDao

switch (process.env.DATABASE) {
    case "firebase":
        const { default: ProductDaoFirebase } = await import("./products/productDaoFirebase.js")
        const { default: CartDaoFirebase } = await import("./carts/cartDaoFirebase.js")

        ProductDao = ProductDaoFirebase
        CartDao = CartDaoFirebase

        break;
    case "mongo":
        const { default: ProductDaoMongo } = await import("./products/productDaoMongo.js")
        const { default: CartDaoMongo } = await import("./carts/cartDaoMongo.js")

        ProductDao = ProductDaoMongo
        CartDao = CartDaoMongo

        break;
    default:
        break;
}

export { ProductDao, CartDao }
