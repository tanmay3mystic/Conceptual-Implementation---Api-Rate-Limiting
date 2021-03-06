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
const middleWare = (req, res, next) => {
    if (req.url.startsWith("/api/posts")) {
        let max = req.query.max;
        req.query.max = Number(max) < 21 ? Number(max) : 10;
    }
    next();
}
//get posts

let apiCalls = 0;
let initialMax = null;

app.get("/api/posts", (req, res) => {
    if (apiCalls >= 5) {
        res.status(429).send({ message: "Exceed Number of API Calls" });
        return;
    }

    const parsedMax = Number(req.query.max || 10);
    const max = parsedMax > 20 ? 10 : parsedMax;
    let finalMax = max

    if (initialMax != null) finalMax = Math.min(finalMax, initialMax);


    const resArr = posts.filter((itm, idx) => idx < finalMax)
    res.send(resArr);


    if (initialMax === null) {
        apiCalls++;
        initialMax = max;
        setTimeout(() => {
            apiCalls = 0;
            initialMax = null;
        }, 30 * 1000);
    } else {
        apiCalls++;
    }

})


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
