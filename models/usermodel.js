const mongoose = require('mongoose')

const userschema = mongoose.Schema({
	username:{
		type:String,
		required:true,
        unique: true,
        min:4,
        max:15
	},
	name:{
		type:String,
		required:true,
        unique: false,
        min:5,
        max:30
	},
	email:{
		type:String,
		required:true,
        unique: false,
        min:5,
        max:30
	},
	password:{
		type:String,
		required:true,
        unique: true,
        min:8,
        max:200
    },
    created:{
        type:String,
        required: true,

    },
    info:{
        type:String,
        required:true,
        unique:false
    }

});

module.exports = mongoose.model('userdata', userschema);