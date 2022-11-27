const express = require("express")
const bodyParser = require("body-parser")
const cors = require('cors');


const app = express()


app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', require('./routes/Routes'))


app.listen(5000, () => {
    console.log("listeniing at port:5000")
}) 