#!/usr/bin/env node
/* jshint node: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, strict: true, undef: true, unused: true */
"use strict";
var express = require("express"),
    http = require("http"),
    // import the mongoose library
    mongoose = require("mongoose"),
    app = express();
    http = require("http");
    server = http.createServer(app);
    socketIO = require("socket.io");
    io = socketIO(server);


app.use(express.static(__dirname + "/client"));
app.use(express.bodyParser());

// connect to the amazeriffic data store in mongo
mongoose.connect('mongodb://localhost/amazeriffic');

// This is our mongoose model for todos
var ToDoSchema = mongoose.Schema({
    description: String,
    tags: [ String ]
});

var ToDo = mongoose.model("ToDo", ToDoSchema);

app.get("/todos.json", function (req, res) {
    ToDo.find({}, function (err, toDos) {
		res.json(toDos);
    });
});

app.post("/todos", function (req, res) {
    console.log(req.body);
    var newToDo = new ToDo({"description":req.body.description, "tags":req.body.tags});
    
    newToDo.save(function (err, result) {
		if (err !== null) {
		    // the element did not get saved!
		    console.log(err);
		    res.send("ERROR");
		} else {
		    // our client expects *all* of the todo items to be returned, so we'll do
		    // an additional request to maintain compatibility
		    ToDo.find({}, function (err, result) {
			if (err !== null) {
			    // the element did not get saved!
			    res.send("ERROR");
			}
			res.json(result);
		    });
		}
    });
});

io.sockets.on("connection", function (socket) {
	socket.on("todo_added", function (data) {
		console.log( "data received from client: " + data.description);
		socket.broadcast.emit("todo_added_server", data);
	});
});

server.listen(3000);
console.log("listening on port 3000");

