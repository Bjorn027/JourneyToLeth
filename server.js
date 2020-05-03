const PORT_NUMBER = 8888
const express = require("express")
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))




app.set('port', (process.env.PORT || 5000));

app.set('view engine', 'ejs');

app.set('views', __dirname + '/views');


app.listen(PORT_NUMBER, () =>{
    console.log("server running on port: " + PORT_NUMBER)
})


app.use(express.static("public"))

app.get("/", (req, res) =>{
    res.render("index")

})

