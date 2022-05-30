const socket = io();
$("#chatForm").submit(() => {
    socket.emit("message");
    $("#chat-input").val("");
    return false;
});

socket.on("message", (message) => {
    displayMessage(message.content);
});

let displayMessage = (message) => {
    $("#chat").prepend($("<li>").html(message));
};

$(document).ready(() => {
    $("#modal-button").click(() => {
        $(".modal-body").html("");
        $.get("/api/courses", (data) => {
            // let data = results.data;

            if (!data) return;
            data.data.courses.forEach((course) => {
                $(".modal-body").append(
                    `<div>
                        <span class="course-title">
                            ${course.title}
                        </span>
                        <button class='${course.joined ? "joined-button" : "join-button"}' data-id="${course._id}">
                            ${course.joined ? "Joined" : "Join"}
                        </button>
                        <div class="course-description">
                            ${course.description}
                        </div>
                    </div>`
                );
            });

        }).then(() => {
            addJoinButtonListener();
        });
    });
});
let addJoinButtonListener = () => {
    $(".join-button").click((event) => {
        let $button = $(event.target)
        let courseId = $button.data("id");
        $.get(`/api/courses/${courseId}/join`, (data) => {
            // let data = results.data;
            if (data && data.data.success) {
                $button
                    .text("Joined")
                    .addClass("joined-button")
                    .removeClass("join-button");
            } else {
                $button.text("Try again");
            }
        });
    });
}