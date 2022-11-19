var userClickedPattern = [];
var gamePattern = [];
var buttonColours = [
    "red",
    "blue",
    "green",
    "yellow"
];
var level = 0;
var started = false;

$('#level-title').text("Press A Key to Start");

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $('#' + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    $('#level-title').text('Level ' + level);
}

$('.btn').click(function(e) {
    var userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(level);
});

function playSound(name) {
    var audio = new Audio('./sounds/'+name+'.mp3');
    audio.play();
}

function animatePress(currentColour) {
    $('#' + currentColour).addClass('pressed');
    setTimeout(function() {
        $('#' + currentColour).removeClass('pressed');
    }, 100);
}

$(document).on('keypress', function() {
    if (!started) {
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        level++;
        setTimeout(nextSequence, 1000);
    } else {
        console.log('wrong');
    }
}