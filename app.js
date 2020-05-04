const express = require('express');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const post = require('./routes/post');
const user = require('./routes/user');


const app = express();

app.use(express.json()); 
const port = 5000;

// Mongoose Connection
mongoose.connect('mongodb://localhost/genzclan', 
	{dbName:'genzclan',useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);

let db = mongoose.connection;
db.on('error', ()=>console.log("DB Connection Error"));
db.once('open',()=>console.log('Connction DB Done'));

// Routes
app.use('/post', post)
app.use('/user',user)


app.get('/', (req, res)=>{
	res.json({
		"Name":"Gen-Z-clan",
		"status":"Active"
	})
});

// app.get('/db',(req,res)=>{
// 	postmodel.find({},(err,result)=>{
// 		err ? console.log(err) : console.log(result)
// 	})
// });


console.clear()
app.listen(port,()=>{
	console.log(`App listening on ${port}`)
})