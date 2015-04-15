/* jshint browser: true, jquery: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, strict: true, undef: true, unused: true */
var main = function() {
	"use strict";
	$("#submit").on("click", function() {
		var input_url = $("#url").val();
		$.post("http://localhost:3000/shorten/", {input_url: input_url})		
		.done(function(res) {
		    $("#output_url").empty();
		    var output_url = $("<p>");
		    output_url.text(res);
		    $("#output_url").append(output_url);
		});
	});

	$("#get_top_ten").on("click", function() {
		var urls_list = $("<ol>");
		var item, url_tag;
		$("#top_ten").empty();
		$.getJSON("http://localhost:3000/top_ten", function(res) {
			res.forEach(function(url) {
				item = $("<li>");
				url_tag = $("<a>");
				url_tag.attr("href", url.short_url);
				url_tag.text(url.short_url);
				item.append(url_tag);
				urls_list.append(item.append(" - hits: " + url.hits));
			});
			$("#top_ten").append(urls_list);
		});
	});
};

$(document).ready(main);