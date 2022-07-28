import express from "express";
const app = express()
import routes from "./routes/index.js"
let port =  8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', routes)

app.use((req, res) => {
    res.status(400).json({ error: -2, descripcion: "Ruta no implementada" })
})

app.listen(port, err => {
    err ? console.log(`Se produjo un error al iniciar el servidor ${ err }`) :
    console.log(`El servidor esta escuchando el puerto ${port}`);
})