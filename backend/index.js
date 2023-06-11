const connectToMongo = require("./db")
var cors = require('cors')
const express = require('express')
connectToMongo();
const app = express()
const port = 5500
app.use(cors())
app.use(express.json())

// Available Routes
app.use('/api/auth', require("./Routes/auth"))
app.use('/api/notes', require("./Routes/notes"))

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})