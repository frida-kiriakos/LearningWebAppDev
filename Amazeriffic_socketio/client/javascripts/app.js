/* jshint browser: true, jquery: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, strict: true, undef: true, unused: true */
var main = function (toDoObjects) {
    "use strict";
    console.log("SANITY CHECK");
    var socket = io.connect("http://localhost:3000");

    var toDos = toDoObjects.map(function (toDo) {
          // we'll just return the description
          // of this toDoObject
          return toDo.description;
    });

    $(".tabs a span").toArray().forEach(function (element) {
        var $element = $(element);

        // create a click handler for this element
        $element.on("click", function () {
            var $content,
                $input,
                $button,
                i;

            $(".tabs a span").removeClass("active");
            $element.addClass("active");
            $("main .content").empty();

            if ($element.parent().is(":nth-child(1)")) {
                $content = $("<ul>");
                for (i = toDos.length-1; i >= 0; i--) {
                    $content.append($("<li>").text(toDos[i]));
                }
                socket.on("todo_added_server", function (data) {
                    console.log("data received from server: " + data);
                    ($("<li>").text(data.description)).prependTo($content);
                    toDos.push(data.description);
                });
                
            } else if ($element.parent().is(":nth-child(2)")) {
                $content = $("<ul>");
                toDos.forEach(function (todo) {
                    $content.append($("<li>").text(todo));
                });

                socket.on("todo_added_server", function (data) {
                    console.log("data received from server: " + data);
                    $content.append($("<li>").text(data.description));
                    toDos.push(data.description);

                });
                

            } else if ($element.parent().is(":nth-child(3)")) {
                var tags = [];
                

                toDoObjects.forEach(function (toDo) {
                    toDo.tags.forEach(function (tag) {
                        if (tags.indexOf(tag) === -1) {
                            tags.push(tag);
                        }
                    });
                });
                console.log(tags);

                var tagObjects = tags.map(function (tag) {
                    var toDosWithTag = [];

                    toDoObjects.forEach(function (toDo) {
                        if (toDo.tags.indexOf(tag) !== -1) {
                            toDosWithTag.push(toDo.description);
                        }
                    });

                    return { "name": tag, "toDos": toDosWithTag };
                });

                tagObjects.forEach(function (tag) {
                    var $tagName = $("<h3>").text(tag.name),
                        $content = $("<ul>");
                    $content.attr("id", tag.name);


                    tag.toDos.forEach(function (description) {
                        var $li = $("<li>").text(description);
                        $content.append($li);
                    });

                    $("main .content").append($tagName);
                    $("main .content").append($content);
                    // $("#"+tag.name).append($content);
                });

                socket.on("todo_added_server", function (data) {
                    console.log("data received from server: " + data.description);
                    console.log("new todo tags : " + data.tags);
                    data.tags.forEach(function (tag) {
                        if (tags.indexOf(tag) > -1) {
                            $("#"+tag).append($("<li>").text(data.description));
                        } else {
                            var $list = $("<ul>"),
                                $item = $("<li>").text(data.description);    

                            $list.attr("id", tag);
                            $list.append($item);
                            $("main .content").append($("<h3>").text(tag));
                            $("main .content").append($list);
                        }

                    });
                    
                    toDoObjects.push(data);
                });

            } else if ($element.parent().is(":nth-child(4)")) {
                var $inputLabel = $("<p>").text("Description: "),
                    $tagInput = $("<input>").addClass("tags"),
                    $tagLabel = $("<p>").text("Tags: ");
                $input = $("<input>").addClass("description");
                $button = $("<span>").text("+");

                $button.on("click", function () {
                    var description = $input.val(),
                        tags = $tagInput.val().split(","),
                        newToDo = {"description": description, "tags": tags};

                    $.post("todos", newToDo, function (result) {
                        console.log(result);

                        //toDoObjects.push(newToDo);
                        toDoObjects = result;

                        // update toDos
                        toDos = toDoObjects.map(function (toDo) {
                            return toDo.description;
                        });
                        $input.val("");
                        $tagInput.val("");
                    });

                    
                    socket.emit("todo_added", newToDo);                    
                });

                $content = $("<div>").append($inputLabel)
                                     .append($input)
                                     .append($tagLabel)
                                     .append($tagInput)
                                     .append($button);
            }

            $("main .content").append($content);
            return false;
        });
    });

    $(".tabs a:first-child span").trigger("click");
};

$(document).ready(function () {
    "use strict";
    $.getJSON("todos.json", function (toDoObjects) {
        main(toDoObjects);
    });
    // listen on the event and call main again
});
