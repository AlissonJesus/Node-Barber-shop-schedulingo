import database from "./src/config/database.js"
import app from "./src/server.js";

app.on('pronto', () => app.listen(process.env.PORT, () => {
    console.log('iniciou')
}))