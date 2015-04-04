#!/usr/bin/env node
/* jshint node: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, strict: true, undef: true, unused: true */

"use strict";
var express = require("express"),
    http = require("http"),
    app = express();

var redis = require("redis"),
	redis_client;

var bases = require("bases"),
	inc,
	new_key,
	base_url,
	input_url,
	output_url;

var bodyParser = require("body-parser");

redis_client = redis.createClient();

// initialize the value for the next key, I relied on the ruby and python scripts in professor Avery repo to help me with ke generation
redis_client.set("next", 10*Math.pow(36,3));

app.use(express.static(__dirname + "/client"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/top_ten", function(req,res) {
	redis_client.zrevrange("urls", 0, 9, "WITHSCORES", function(err, top_ten) {
		console.log(top_ten);
		return res.json(top_ten);
	});	
});

app.post("/shorten", function(req,res) {
	input_url = req.body.input_url;
	base_url = "http://" + req.hostname + ":3000/";

	if (input_url.indexOf(base_url) > -1) {
		// shortened url is entered, retrieve the equivalent long url
		redis_client.get("short:"+input_url, function(err, value) {
			return res.json(value);
		});
	} else {
		// long url is entered, check if it has already been shortened, if it hasn't, shorten it
		redis_client.exists("long:" + input_url, function(err, reply) {
			if (reply === 1) {
				redis_client.get("long:"+input_url, function(err, value) {
					return res.json(value);
				});
			} else {
				inc = Math.floor(Math.random()*10);
				redis_client.incrby("next", inc, function(err,value) {
					new_key = bases.toBase36(value);
					output_url = base_url + new_key;
					redis_client.set("long:"+input_url, output_url);
					redis_client.set("short:"+output_url, input_url);
					return res.json(output_url);
				});
			}
		});
	}

});

app.get("/:key", function(req, res) {
	base_url = "http://" + req.hostname + ":3000/";
	input_url = base_url + req.params.key;
	redis_client.exists("short:" + input_url, function(err, reply) {
		if (reply === 1) {
			redis_client.get("short:"+input_url, function(err, value) {
				// add the url to the set and increment its hits
				redis_client.zincrby("urls", 1, input_url);
				return res.redirect(value);
			});
		} else { 
			return res.json("invalid url");
		}
	});

});

http.createServer(app).listen(3000);

console.log("Server running on port 3000");