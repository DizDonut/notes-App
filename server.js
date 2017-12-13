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

/*
  Get Routes
*/
app.get("/", (req, res)=>{

  fetch("http://localhost:3004/messages")
    .then(response => {
      response.json().then(json =>{
        res.render("home", {
          articles: json
        })
      })
    })
    .catch(error =>{
      console.log(error);
    })

})

app.get("/add_note", (req, res)=>{
  res.render("add_note");
})

app.get("/edit_note/:id", (req, res) => {

  fetch(`http://localhost:3004/messages/${req.params.id}`)
    .then(response => {
      response.json().then(json => {
        res.render("edit_note", {
          articles: json
        });
      })
    })
})

/*
  Post Routes
*/
app.post("/api/add_note", jsonParser, (req, res)=>{

  fetch("http://localhost:3004/messages",{
    method: "POST",
    body: JSON.stringify(req.body),
    headers:{
      "Content-Type": "application/json"
    }
  }).then((response)=>{
    res.status(200).send();
  })

})

/*
  Delete Routes
*/
app.delete("/api/delete/:id", (req, res)=>{
  const id = req.params.id;
  fetch(`http://localhost:3004/messages/${id}`,{
    method: "DELETE"
  }).then(response => {
    res.status(200).send();
  })
})

/*
  Update Routes
*/
app.patch("/api/edit_note/:id", jsonParser, (req, res) => {

  const id = req.params.id;
  fetch(`http://localhost:3004/messages/${id}`,{
    method: "PATCH",
    body: JSON.stringify(req.body),
    headers:{
      "Content-Type": "application/json"
    }
  }).then(response => {
    res.status(200).send();
  })
  
})

//create instance of port
const PORT = process.env.PORT || 3000;
//server listener
app.listen(PORT, ()=>{
  console.log(`App running on port ${PORT}`);
})
