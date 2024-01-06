var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var gamePattern = [];

var level = 1;

var clicks = 0;

var userlength = 0;

$(document).on("keypress", function (e) {

    nextSequence();

});

function nextSequence() {

    userClickedPattern.length = 0;

    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    var sound = new Audio("sounds/" + randomChosenColour + ".mp3")
    sound.play();

}

$(".btn").click(function () {

    var userChosenColour = this.id;

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    clicks = clicks + 1;

    if (gamePattern.length == userClickedPattern.length) {
        console.log(level + " passed");
        checkAnswer(level);
    }

});


function checkAnswer() {
    if (JSON.stringify(userClickedPattern) == JSON.stringify(gamePattern)) {
        level = level + 1;

        setTimeout(function () {
            nextSequence();
        }, 1000)
    }
    else {

        $("h1").text("Game Over, Press Any Key to Restart!");
        gamePattern.length = 0;
        level = 1;

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

    }
}


function playSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);

}
