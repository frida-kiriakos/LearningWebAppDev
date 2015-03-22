/* jshint browser: true, jquery: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, strict: true, undef: true, unused: true */

var main = function() {
	"use strict";
	$("#submit").on("click", function() {
		var user_choice = $("#play").val();
		$.ajax({
			url: "http://localhost:3000/play/"+user_choice,
			method: "POST",
			success: function(res){
				if (res !== "error") {
					$("main .outcome").empty();
					$("main .outcome").append($("<p>").text("You " + res.outcome + "! The server played: " + res.s_outcome));
					
					$("main .stats").empty();
					var $stats = $("<ul>");
					$stats.append($("<li>").text("wins: " + res.wins));
					$stats.append($("<li>").text("losses: " + res.losses));
					$stats.append($("<li>").text("ties: " + res.ties));
					$("main .stats").append($("<h3>").text("Your Statistics: "));
					$("main .stats").append($stats);
				}
			}
		});
	});
};

$(document).ready(main);