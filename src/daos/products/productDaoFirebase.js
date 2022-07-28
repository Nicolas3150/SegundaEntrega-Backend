import FirebaseContainer from "../../containers/firebaseContainer.js"

class ProductDaoFirebase extends FirebaseContainer{
    constructor(){
        super("productos")
    }
}

export default ProductDaoFirebase;