"use strict";

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */


 const DbService = require("moleculer-db");
 const MongooseAdapter = require("moleculer-db-adapter-mongoose");
 const User = require("./models/user.model");
 const mongoose = require("mongoose");


module.exports = {
	name: "saveData",
	mixins: [DbService],
    adapter: new MongooseAdapter("mongodb://mongo/user-info", { useUnifiedTopology: true }),
    model: User,
	/**
	 * Settings
	 */
	settings: {

	},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {

		addUser: {
			params: {
				username: "string",
				email: "string",
				age: "number"
			},
			async handler(ctx) {
				let { username, email, age } = ctx.params
				let filter = { username }
				let res = await this.adapter.model.findOne(filter)
				if(res) {
					return false;
				} else {
					await this.adapter.insert({ username, email, age })
				}
				return true
			}
		},

		findUser: {
			params: {
				username: "string"
			},
			async handler(ctx) {
				let filter = { username: ctx.params.username }
				let res = await this.adapter.model.findOne(filter)
				if(res) {
					return res
				}
				return false
			}
		},

		updateUser: {
			params: {
				username: "string",
				newUsername: "string",
				newEmail: "string",
				newAge: "number"
			},
			async handler(ctx) {
				let filter = { username: ctx.params.username }
				let { newUsername, newEmail, newAge } = ctx.params
				let res = await this.adapter.model.findOneAndUpdate(filter, {username: newUsername, email: newEmail, age: newAge})
				if(res) {
					return true
				} 
				return false
			}
		},

		deleteUser: {
			params: {
				username: "string"
			}, 
			async handler(ctx) {
				let { username } = ctx.params
				let res = await this.adapter.model.findOne({username})
				if(res) {
					await this.adapter.model.deleteOne({username})
					return true
				} 
				return false
			}
		}
	},

	/**
	 * Events
	 */
	events: {	
	},

	/**
	 * Methods
	 */
	methods: {

	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {

	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {
		
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	}
};
