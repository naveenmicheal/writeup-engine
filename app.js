const express = require('express');
const mongoose = require('mongoose');
const dot_env = require('dotenv').config()
const Joi = require('@hapi/joi');
const user = require('./routes/user');
const post = require('./routes/post');


const app = express();

app.use(express.json());

const port = 5000;

// Mongoose Connection
mongoose.connect(process.env.DBURI, 
	{dbName:'wrtpegn',useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);


let db = mongoose.connection;
db.on('error', ()=>console.log("DB Connection Error"));
db.once('open',()=>console.log('Connction DB Done'));

// Routes
app.use('/user',user)
app.use('/post', post)



app.get('/', (req, res)=>{
	res.json({
		"Name":"WriteUp-Engine",
		"status":"Active"
	})
});


console.clear()
app.listen(port,()=>{
	console.log(`App listening on ${port}`)
})