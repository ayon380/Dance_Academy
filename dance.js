const express = require("express")
const path = require("path")
const app = express()
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
const { SocketAddress } = require("net");
const { monitorEventLoopDelay } = require("perf_hooks");
mongoose.connect('mongodb://localhost/JuilliardContacts', { useNewUrlParser: true });
const port = 80

var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    more: String
});

var Contact = mongoose.model('Contact', contactSchema);

app.use('/Exodus', express.static('Exodus'))
app.use(express.urlencoded())
app.set('view engine', 'pug')
app.set('templates', path.join(__dirname, 'templates'))
app.get('/', (req, res) => {
    const params = { 'title': 'AAAAA', 'content': 'ssssss' }
    res.status(200).render('home.pug', params)
})
app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params)
})

app.post('/contact', (req, res) => {
    var mydata = new Contact(req.body);
    mydata.save().then(() =>{
        res.send("This item has been successfully")
        // alert("Form Submitted Successfully")
    }).catch(()=>{
        res.status(400).send("Item was not saved to database")
    });
    // res.status(200).render('contact.pug')
})

    app.listen(port, () => {
        console.log(`The application started succesfully at port ${port}`);
    })