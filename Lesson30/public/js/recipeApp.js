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
    const socket = io();

    $("#chatForm").submit(() => {
        let text = $("#chat-input").val()
        let userName = $("#chat-user-name").val()
        let userId = $("#chat-user-id").val();
        socket.emit("message", {
            content: text,
            userName: userName,
            userId: userId
        });

        $("#chat-input").val("");
        return false;
    });

    socket.on("load all messages", (data) => {
        data.forEach(message => {
            displayMessage(message);
        });
    });

    socket.on("message", (message) => {
        displayMessage(message);
    });

    socket.on("user disconnected", () => {
        displayMessage({
            userName: "Notice",
            content: "User left the chat"
        });
    });

    let displayMessage = (message) => {
        $("#chat").prepend($("<li>").html(`
            <strong class="message ${getCurrentUserClass(message.user)}">
                ${message.userName}
            </strong>: ${message.content}
            `)
        );
    };

    let getCurrentUserClass = (id) => {
        let userId = $("#chat-user-id").val();
        return userId === id ? "current-user" : "";
    };
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