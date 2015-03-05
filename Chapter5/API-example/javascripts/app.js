/* jshint browser: true, jquery: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, strict: true, undef: true, unused: true */
var main = function () {
    "use strict";
    $("#submit").on("click", function() {
    	var gender;
    	if ($("#select-gender").val() === "male") {
    		gender = "male";
    	} else if ($("#select-gender").val() === "female") {
    		gender = "female";
    	}
    	
    	$.ajax({
			url: "http://api.randomuser.me",
			dataType: "json",
			data: {gender: gender, nat: "us"},
			success: function(data){
				data.results.forEach(function (item) {
					var user = item.user;
					var $profile = $("<ul>");
					$profile.append($("<li>").text("Name: " + user.name.first + " " + user.name.last));
					$profile.append($("<li>").text("contact me at: " + user.email));
					$profile.append($("<li>").text("Phone number: " + user.cell));
					$profile.append($("<li>").text("address: " + user.location.street + " " + user.location.city + " " + user.location.state));
					$("main .profile").append($profile);
					$("main .profile").append($("<img alt='"+user.picture.medium+"'>").attr("src", user.picture.medium));

				});				
			}
		});
	});
};

$(document).ready(main);
