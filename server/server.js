const express = require('express');
const mongoose = require('mongoose');
const postRoute = require('./routes/post');

const app = express();

mongoose.connect('mongodb+srv://rezwan:rezwan@cluster0.8ydox.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
        .then(()=> console.log('database in connected'))
        .catch(err => console.log(err));

//route middlewere
app.use('/api', postRoute);

app.listen(8080, ()=>{
    console.log('server is running in port 8080');
})