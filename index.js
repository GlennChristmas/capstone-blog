import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

let postArray = []

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
   res.render('index.ejs');
});

app.post("/submit", (req, res) => {
    console.log(req.body.postText);
    postArray.push(req.body.postText);
    console.log(postArray);
    res.render('index.ejs', { postArray: postArray });
})

app.listen(3000, () => {
   console.log('Server is running on port 3000');
});