//dependencies
const express = require("express");
const hbs = require("express-handlebars");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
//create instance of express
const app = express();

//handlebars setup
app.engine("hbs", hbs({
  extname: "hbs",
  defaultLayout: "layout",
  layoutsDir: __dirname + "/views/layouts",
  partialsDir: __dirname + "/views/partials"
}));

//set engine to view our hbs templates
app.set("view engine", "hbs");

//CSS
app.use("/css", express.static(__dirname + "/public/css"));
const jsonParser = bodyParser.json();

//////// ********** Routes ********** \\\\\\\\\\
app.get("/", (req, res)=>{

  res.render("home");

})


//create instance of port
const PORT = process.env.PORT || 3000;
//server listener
app.listen(PORT, ()=>{
  console.log(`App running on port ${PORT}`);
})
