"use strict";

let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = new Schema({
	username: {
		type: String,
		unique: true,
		index: true,
		required: "Please fill in a username",
		trim: true
	},
	email: {
		type: String,
		trim: true,
		unique: true,
		index: true,
		lowercase: true,
		required: "Please fill in an email"
	},
	age: {
        type: Number,
        trim: true,
        required: "Please fill in an age"
    }
});

module.exports = mongoose.model("User", UserSchema);