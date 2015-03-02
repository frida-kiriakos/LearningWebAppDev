/* jshint browser: true, jquery: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, strict: true, undef: true, unused: true */

var output, result, i;

var fuzzbuzz_1 = function() {
	"use strict";
	$(".output").empty();
	for(i = 1; i <= 100; i = i + 1) {
		if (i % 3 === 0 && i % 5 === 0) {
			result = "FizzBuzz";
		} else if (i % 5 === 0) {
			result = "Buzz";
		} else if (i % 3 === 0) {
			result = "Fizz";
		} else {
			result = i;
		}
		output = $("<p>").text(result);
		$(".output").append(output);
	}
};

var fuzzbuzz_2 = function(start, end) {
	"use strict";
	$(".output").empty();
	for(i = start; i <= end; i = i + 1) {
		if (i % 3 === 0 && i % 5 === 0) {
			result = "FizzBuzz";
		} else if (i % 5 === 0) {
			result = "Buzz";
		} else if (i % 3 === 0) {
			result = "Fizz";
		} else {
			result = i;
		}
		output = $("<p>").text(result);
		$(".output").append(output);
	}
};

var fizzbuzz_3 = function(arr) {
	"use strict";
	$(".output").empty();
	for(i = 0; i < arr.length; i = i + 1) {
		if (arr[i] % 3 === 0 && arr[i] % 5 === 0) {
			result = "FizzBuzz";
		} else if (arr[i] % 5 === 0) {
			result = "Buzz";
		} else if (arr[i] % 3 === 0) {
			result = "Fizz";
		} else {
			result = arr[i];
		}
		output = $("<p>").text(result);
		$(".output").append(output);
	}
};

var fizzbuzz_4 = function(obj) {
	"use strict";
	$(".output").empty();
	for(i = 1; i <= 100; i = i + 1) {
		if (i % 3 === 0 && i % 5 === 0) {
			result = obj.divisibleByThree + obj.divisibleByFive;
		} else if (i % 5 === 0) {
			result = obj.divisibleByFive;
		} else if (i % 3 === 0) {
			result = obj.divisibleByThree;
		} else {
			result = i;
		}
		output = $("<p>").text(result);
		$(".output").append(output);
	}
};

var fizzbuzz_5 = function(arr,obj) {
	"use strict";
	$(".output").empty();
	for(i = 0; i < arr.length; i = i + 1) {
		if (arr[i] % 3 === 0 && arr[i] % 5 === 0) {
			result = obj.divisibleByThree + obj.divisibleByFive;
		} else if (arr[i] % 5 === 0) {
			result = obj.divisibleByFive;
		} else if (arr[i] % 3 === 0) {
			result = obj.divisibleByThree;
		} else {
			result = arr[i];
		}
		output = $("<p>").text(result);
		$(".output").append(output);
	}
};

var main = function() {
	"use strict";
	$("#submit").on("click", function() {
		console.log($("#select-function").val());
		switch ($("#select-function").val()) {
			case "1":
				fuzzbuzz_1();
				break;
			case "2":
				fuzzbuzz_2(200,300);
				break;
			case "3":
				fizzbuzz_3([101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115]);
				break;
			case "4":
				fizzbuzz_4({ divisibleByThree: "foo", divisibleByFive: "bar"});
				break;
			case "5":
				fizzbuzz_5([101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115], { divisibleByThree: "foo", divisibleByFive: "bar"});
				break;

		}
	});
	
	
	
};

$(document).ready(main);