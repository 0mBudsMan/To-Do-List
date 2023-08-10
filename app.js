//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const user = require("./User");
const List = require("./listSchema");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

mongoose.connect('mongodb://127.0.0.1:27017/todolist');

const item1 = new user({
  name: "Welcome to your todolist"
});
const item2 = new user({
  name: "Hit the + button for adding a new item"
});
const item3 = new user({
  name: "Delete"
});
const defaultItems = [item1, item2, item3];







app.get("/", function (req, res) {
  user.find({}, function (err, result) {
    if (result.length === 0) {
      user.insertMany(defaultItems, function (err) {
        if (err) console.log(err);
        else console.log("Saved successfully to databse");
      })
    }
    else{
    res.render("list", { listTitle: "Today", newListItems: result });} 
  });


});



app.post("/", function (req, res) {

  const item = req.body.newItem;
  const itemAdd = new user({
    name: item
  });
  itemAdd.save();
  res.redirect("/");
});

app.post("/delete", function(req,res){
  async function remove(){
    await user.deleteOne({_id: req.body.checkbox});
    console.log("Removed");
    res.redirect("/");
  }
  remove();
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.get("/about", function (req, res) {
  res.render("about");
});



app.get("/:customName", function(req,res){
 // console.log(req.params.customName);
  List.findOne({name: req.params.customName}, function(err, foundList){
    /*if(!err){
      if(!foundList){
        const leest = new List({
          name: req.params.customName,
          items: defaultItems
        })
        leest.save();
        res.redirect("/" + req.params.customName);
      }

    }
    else{
      console.log(foundList);
      res.render("list", {listTitle: foundList.name, newListItems: foundList.items})
    }*/
    if(foundList){ console.log(foundList);  res.render("list", {listTitle: foundList.name, newListItems: foundList.items}) }
    else{ const leest = new List({
      name: req.params.customName,
      items: defaultItems
    })
    leest.save();
    res.redirect("/" + req.params.customName);}
  })
 /* const leest = new List({
    name: req.params.customName,
    items: defaultItems
  })
  leest.save();
  List.findOne({name: req.params.customName}, function(err, found){
   console.log(found.name);
  })*/
})

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
