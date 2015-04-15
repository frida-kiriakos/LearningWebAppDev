#!/usr/bin/env node
/* jshint node: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, strict: true, undef: true, unused: true */

"use strict";
var express = require("express"),
    http = require("http"),
    app = express();

var bases = require("bases"),
	inc,
	new_key,
	base_url,
	input_url,
	output_url,
	new_url;

var bodyParser = require("body-parser");

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/url_shortener");

// define a collection and a model for urls
var Url = mongoose.model("urls", {long_url: String, short_url: String, hits: Number});

// define a collection and a model to store keys, needed for storing the initil next key.
var Key = mongoose.model("keys", {name: String, value: Number});

var next_key;

// initialize the value for the next key if it wasn't already initialized, I relied on the ruby and python scripts in professor Avery repo to help me with key generation

Key.findOne({name: "next"}, {value: 1, _id: 0}).exec(function(err, key) {
	if (err) {
		console.log("an error occurred: " + err);
	} else if (key) {
		// doing nothing
	} else {
		next_key = new Key({name: "next", value: 10*Math.pow(36,3)});
		next_key.save();
	}
});

app.use(express.static(__dirname + "/client"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/top_ten", function(req,res) {
	Url
	.find()
	.limit(10)
	.sort({hits: -1})
	.exec(function(err, top_ten) {
		if (err) {
			console.log("an error occurred: " + err);
			return res.json("an error occurred");
		} else {
			return res.json(top_ten);
		}
	});
});

app.post("/shorten", function(req,res) {
	input_url = req.body.input_url;
	base_url = "http://" + req.hostname + ":3000/";

	if (input_url.indexOf(base_url) > -1) {
		// shortened url is entered, retrieve the equivalent long url
		Url.findOne({short_url: input_url}).exec(function(err, url) {
			if (err) {
				console.log("an error occurred: " + err);
				return res.json("an error occurred");
			} else {
				return res.json(url.long_url);
			}
		});
	} else {
		// long url is entered, check if it has already been shortened, if it hasn't, shorten it

		Url.findOne({long_url: input_url}).exec(function(err, url) {
			if (err) {
				console.log("an error occurred: " + err);
				return res.json("an error occurred.");
			} else if (url) {
				return res.json(url.short_url);
			} else {
				// the url is a new one, shorten it
				inc = Math.floor(Math.random()*10);

				Key.findOne({name: "next"}, {value: 1, _id: 0}).exec(function(err, key) {
					if (err) {
						console.log("an error occurred: " + err);
					} else {
						new_key = bases.toBase36(key.value + inc);
						output_url = base_url + new_key;
						new_url = new Url({long_url: input_url, short_url: output_url, hits: 0});
						new_url.save();
						return res.json(output_url);
					}					
				});				
			}
		});		
	}

});

app.get("/:key", function(req, res) {
	base_url = "http://" + req.hostname + ":3000/";
	input_url = base_url + req.params.key;

	Url.findOne({short_url: input_url}).exec(function(err, url) {
		if (err) {
			console.log("an error occurred: " + err);
			return res.json("an error occurred.");
		} else if (url) {
			// increment the number of hits for the url and redirect to the original one
			url.hits += 1;
			url.save();
			return res.redirect(url.long_url);
		} else {
			// url not found
			return res.json("invalid url");
		}
	});
});

http.createServer(app).listen(3000);

console.log("Server running on port 3000");