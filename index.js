import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

let postArray = []

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
   res.render('index.ejs', { postArray: postArray});
});

app.post("/submit", (req, res) => {
    console.log(req.body.postTitle);
    console.log(req.body.postText);
    postArray.push({
        title: req.body.postTitle,
        text: req.body.postText,
    });
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
        res.redirect('error.ejs')
    }
})

app.post("/edit-submit", (req, res) => {
    const index = req.body.index;
    const updatedPost = req.body.postText;

    if(index >= 0 && index < postArray.length) {
        postArray[index].title = req.body.postTitle;
        postArray[index].text = req.body.postText;
    res.redirect('/');
    } else {
    res.redirect('error.ejs') 
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