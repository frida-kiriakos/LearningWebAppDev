/* jshint browser: true, jquery: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, strict: true, undef: true, unused: true */
var main = function () {
    "use strict";

    var app = angular.module("simpleApp", []);

    app.controller("comments", function ($scope) {
        $scope.commentsList = ["hello", "this is frida", "and bruna"];
        $scope.addCommentFromInputBox = function () {
           var new_comment = $scope.comment;
           $scope.commentsList.push(new_comment);
           $scope.comment = "";
           return $scope.comment;
        };

        $scope.addCommentKeyPress = function (event) {
            if (event.keyCode === 13) {
                $scope.addCommentFromInputBox();                
            }
        };
    });     
};

$(document).ready(main);
