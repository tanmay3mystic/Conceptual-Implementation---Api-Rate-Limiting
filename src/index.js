const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

const posts = require("./initialData.js");

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here
const middleWare = (req,res,next)=>{
    if(req.url.startsWith("/api/posts")){
        let {max}=req.query;
        req.query.max = Number(max)<21?Number(max):10;
    }
    next();
}
app.use(middleWare);
//get posts

let apiCalls = 0;
let finalMax = 100;

app.get("/api/posts",(req,res)=>{
    
    const timeOut = setTimeout(()=>{
        apiCalls = 0
        finalMax = 100 ; 
    },30*1000);

    let {max}=req.query;
    finalMax = Math.min(finalMax,max);
    if(apiCalls>=5){
        res.status(429).send({message: "Exceed Number of API Calls"});
        apiCalls++;
    }
    else{
        let arr = posts.filter((obj,idx)=>idx<finalMax);
        res.send(arr);
        apiCalls++;
    }

})


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
