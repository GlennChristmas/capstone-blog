import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

let postArray = []
var currentDate = new Date();
var currentYear = currentDate.getFullYear();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
   res.render('index.ejs', { postArray: postArray,
                             currentYear: currentYear});
});

app.post("/submit", (req, res) => {
    console.log(req.body.postTitle);
    console.log(req.body.postText);

    if((req.body.postTitle.length == 0) || (req.body.postText.length == 0)){
        console.log("User has attempted to enter a blank blog post, resetting page.")
    } else {
        postArray.push({
            title: req.body.postTitle,
            text: req.body.postText
        }
    )};
    console.log(postArray);
    res.render('index.ejs', { postArray: postArray });
})

app.post("/edit", (req, res) => {
    const index = req.body.index;
    if(index >= 0 && index < postArray.length) {
        const post = postArray[index];

        res.render('edit.ejs', 
        { postTitle: post.title,
          postText: post.text,
          index: index});
    } else {
        res.render('error.ejs')
    }
})

app.post("/edit-submit", (req, res) => {
    const index = req.body.index;
    const updatedTitle = req.body.postTitle;
    const updatedText = req.body.postText;

    if(index >= 0 && index < postArray.length && updatedTitle.length > 0 && updatedText.length > 0) {
        postArray[index].title = req.body.postTitle;
        postArray[index].text = req.body.postText;
    res.redirect('/');
    } else {
        res.render('error.ejs')
    }
})

app.post("/delete", (req, res) => {
    const index = req.body.index;
    if(index >= 0 && index < postArray.length) {
        postArray.splice(index,1);
    } else {
        res.redirect('error.ejs')
    }
    res.render('index.ejs', { postArray: postArray});
})

app.listen(3000, () => {
   console.log('Server is running on port 3000');
});