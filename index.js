
const { log } = require('console');
const express = require('express');
const port = 8888;

const database = require('./config/database');
const crud = require('./models/crud');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded());

app.get('/', (req, res) => {
    crud.find({}).then((record) => {
        return res.render('index', {
            record
        });
    }).catch((err) => {
        console.log(err);
        return false;
    })
})
app.get('/form', (req, res) => {
    return res.render('form');
})
app.post('/add', (req, res) => {
    let book_name = req.body.book_name;
    let book_price = req.body.book_price;
    let book_pages = req.body.book_pages;
    let book_author = req.body.book_author;
    crud.create({ book_name, book_price, book_pages, book_author })
        .then((record) => {
            return res.redirect('/');
        }).catch((err) => {
            console.log(err);
            return false;
        })
})
app.get('/deleterecord', (req, res) => {
    let delid = req.query.id;
    crud.findByIdAndDelete(delid)
        .then((record) => {
            console.log("successfully deleted data");
            return res.redirect('/');
        }).catch((err) => {
            console.log(err);
            return false;
        })
})
app.get('/editrecord',(req,res)=>{
    crud.findById(req.query.id)
    .then((data)=>{
        return res.render('edit',{
            data
        })
    }).catch((err)=>{
        console.log(err);
        return false;
    })
})
app.post('/update',(req,res)=>{
    crud.findByIdAndUpdate(req.body.id,{    
        book_name : req.body.book_name,
        book_price : req.body.book_price,
        book_pages : req.body.book_pages,
        book_author : req.body.book_author,
    })
    .then((rec)=>{
        console.log("All record successfully edited");
        return res.redirect('/');
    }).catch((err)=>{
        console.log(err);   
        return false;
    })
})
app.listen(port, (err) => {
    if (err) {
        console.log("server is not started");
        return false;
    }
    console.log(`server start on port :- ${port}`);
})