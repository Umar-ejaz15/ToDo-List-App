const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  fs.readdir('files', (err, files) => {
    res.render('index.ejs', { files: files });
  })
});
app.get('/files/:Postsdata', (req, res) => {
  fs.readFile(`files/${req.params.Postsdata}`, "utf-8", (err, filesdata) => {
    res.render('carddets.ejs', { filename: req.params.Postsdata, filesdata: filesdata });
  })
});


app.post('/create', (req, res) => {
  fs.writeFile(`./files/${req.body.title.split(' ').join(' ')}.txt`, req.body.description, (err) => {

    res.redirect('/')
  })
  // console.log(req.body);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});