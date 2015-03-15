#!/usr/bin/env node
/* jshint node: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, strict: true, undef: true, unused: true */

"use strict";

var http = require("http"),
    server,
    resp = {},
    possible_outcomes = ["rock", "paper", "scissors","spock", "lizard"],
    s_outcome,  // randomly generated response of the server
    c_outcome;

// initialize the counters for wins, losses and ties
resp.outcome = "";
resp.wins = 0;
resp.losses = 0;
resp.ties = 0;

var generate_response = function () {
	return possible_outcomes[Math.floor(Math.random()*5)];
};

server = http.createServer(function (req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});

    if (req.method === "POST" && possible_outcomes.indexOf(req.url.split("/")[2]) > -1) {
    	s_outcome = generate_response();
    	switch (req.url) {
    		case "/play/rock":
    			if (s_outcome === "lizard" || s_outcome === "scissors") {
    				// player wins
    				c_outcome = "win";
    			} else if (s_outcome === "paper" || s_outcome === "spock") {
    				// player loses
    				c_outcome = "lose";
    			} else if (s_outcome === "rock") {
    				// it's a tie
    				c_outcome = "tie";
    			}
    			break;
    		case "/play/paper":
    			if (s_outcome === "rock" || s_outcome === "spock") {
    				c_outcome = "win";
    			} else if (s_outcome === "scissors" || s_outcome === "lizard") {
    				c_outcome = "lose";
    			} else if (s_outcome === "paper") {
    				c_outcome = "tie";
    			}
    			break;
    		case "/play/scissors":
    			if (s_outcome === "paper" || s_outcome === "lizard") {
    				c_outcome = "win";
    			} else if (s_outcome === "rock" || s_outcome === "spock") {
    				c_outcome = "lose";
    			} else if (s_outcome === "scissors") {
    				c_outcome = "tie";
    			}
    			break;
    		case "/play/spock":
    			if (s_outcome === "rock" || s_outcome === "scissors") {
    				c_outcome = "win";
    			} else if (s_outcome === "paper" || s_outcome === "lizard") {
    				c_outcome = "lose";
    			} else if (s_outcome === "spock") {
    				c_outcome = "tie";
    			}
    			break;
    		case "/play/lizard":
    			if (s_outcome === "paper" || s_outcome === "spock") {
    				c_outcome = "win";
    			} else if (s_outcome === "scissors" || s_outcome === "rock") {
    				c_outcome = "lose";
    			} else if (s_outcome === "lizard") {
    				c_outcome = "tie";
    			}
    			break;
    	}
    	console.log("Response generated from the server : " + s_outcome);

    	resp.outcome = c_outcome;

    	if (c_outcome === "win") {
    		resp.wins = resp.wins + 1;
    	} else if (c_outcome === "lose") {
    		resp.losses = resp.losses + 1;
    	} else {
    		resp.ties = resp.ties + 1;
    	}

    	res.write(JSON.stringify(resp));
    } else {
    	res.write("invalid method or url");
    }
    
    res.write("\n");
    res.end();
});

server.listen(3000);

console.log("Server running on port 3000");