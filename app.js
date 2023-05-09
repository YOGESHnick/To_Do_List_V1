const express = require('express');
const bodyParser = require('body-parser');

const app = express();
let items=["buy","cook","eat"];
let workItems=[];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));// inorder to use static files like styles.css-> such files must be in a folder "public"
app.set('view engine', 'ejs');  //to use templating

app.get("/",function(req,res)
{
    let today = new Date();
    let currDay = today.getDay();
    let options={
        weekday:"long",
        day:"numeric",
        month:"long"
    }
    let day=today.toLocaleString("en-US",options); //formatting the date format 
    res.render('list', {listTitle: day,newListItems: items } ); //templating
});

app.post("/",function(req,res)
{
    var item=req.body.newItem;

    if(req.body==="work")
    {
        workItems.push(item);
        res.redirect("/work");
    }
    else
    {
    console.log(item);
    items.push(item);
    res.redirect("/");
    }
    
})


app.get("/work",function(req,res)
{
    res.render('list',{listTitle:"Work List",newListItems:workItems})
});

app.post("/work",function(req,res)
{
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});



app.get("/about",function(req,res)
{
    res.render("about");
});


app.listen(3000,function()
{
    console.log("Server started at port 3000");
});