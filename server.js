import express from "express"
import routes from "./src/routes/index.js"

const app = express()

app.use(express.json())
app.use(routes)

app.listen(8080, () => {
    console.log("Servidor iniciou")
})