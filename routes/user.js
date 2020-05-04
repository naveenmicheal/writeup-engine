const express = require('express')
const router = express.Router()
const Joi = require('@hapi/joi');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const usermodel = require('../models/usermodel');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();

const rounds = 5;

// JOI validation
const schema = Joi.object().keys({
    username:Joi.string().min(3).max(100).trim().required(),
    name:Joi.string().min(2).max(100).trim().required(),
    email:Joi.string().min(2).trim().max(500).required(),
    password:Joi.string().min(2).trim().max(800).required(),
    info:Joi.string().min(2).trim().max(500).required(),
    created:Joi.string().required()
});



router.post('/signup', (req, res) => {

	bcrypt.hash(req.body.password, rounds, (err, hash) => {x
		const new_user = {
			username: req.body.username,
			name: req.body.name,
			email: req.body.email,
			password: hash,
			// created: req.body.created,
			created: new Date().toString(),
			info: req.connection.remoteAddress
		}
		const validate = schema.validate(new_user)
		if (validate.error == null) {
			const new_user_obj = new usermodel(new_user)
			new_user_obj.save((err, result) => {
				if (err) {
					res.json({
						status: "Given infomation already exists"
					})
				} 
				else
				{
					res.json(result)
				}
			})
		}
		else
		 {
			res.json(validate.error)
		}
	})
});


router.post('/login',(req,res)=>{
	let inemail = req.body.email;
	let inpass = req.body.password;
	usermodel.findOne({'email':inemail},(err,result)=>{
		if(result){
				console.log(result)
				bcrypt.compare(inpass, result['password'], function(passerr, passres) {
    			// passres ? res.json(passres) : res.json(passerr) 
    			if(passres){
    				// res.status(200).json("Password is ok, DONE")
    				console.log("Password is ok")
    				jwt.sign({
    					id:result['_id'],
    					email: result['email']
    				},process.env.JWT_SECRET,
    				{
    					expiresIn:'10h'
    				},
    				(err,token)=>{
    					if(err){
    						res.json(err)
    					}
    					else{
    						console.log(token)
    						res.json({status:token})
    					}
    				})
    				
    				
    				
    			}
    			else{
    				res.status(401).json("Password is wrong")
    			}
		});
		}
		else{
			res.status(401).json({status:"Email is wrong"})
		}
	 
	})
	
})

// router.put('/:id',(req,res)=>{
// 	const new_post = {
// 		title:req.body.title,
// 		authorname:req.body.authorname,
// 		authorid:req.body.authorid,
// 		threadid:req.body.threadid
// 	};
// 	// console.log((req.params.id).toString())

// 	let arg = (req.params.id).toString()
// 	const validate = schema.validate(new_post)

// 	if(validate.error == null){
// 		postmodel.update({threadid:{$eq: arg}},new_post,(err,result)=>{
// 			if(err){
// 				res.json({err})
// 			}
// 			else{
// 				res.json(result)
// 			}
// 		})

// 		// postmodel.find({threadid:{$eq : "278"}},(err,resp)=>{
// 		// 	err ? res.json(err) : res.json(resp)
// 		// })

// 		// postmodel.update({"278":"278"},{$set:{new_post}},(err,result)=>{
// 		// 	err ? res.json(err) : res.json(result)
// 		// })
// 	}
// 	else{																			
// 		res.json(validate.error)
// 		}
// });

// router.delete('/:id',(req,res)=>{
// 	let input_id = (req.params.id).toString()
// 	postmodel.deleteOne({threadid:input_id},(err,result)=>{
// 		if(err){
// 			res.json(err)
// 		}
// 		else{
// 			res.json(result)
// 		}
// 	})
// })



module.exports = router