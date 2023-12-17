import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
   res.render('index.ejs');
});

app.post("/submit", (req, res) => {
    console.log(req.body.postText);
    res.render('index.ejs');
})

app.listen(3000, () => {
   console.log('Server is running on port 3000');
});