var userClickedPattern = [];

var buttons = ["red","blue","green", "yellow"];

// initialise gamePattern array that doesn't have any element members 
var gamePattern = [];

//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

//Create a new variable called level and start at level 0.
var level = 0;

//Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
    if (!started) {
  
//The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });


$(".btn").click(function () { 
    //Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
        var userChosenColor = $(this).attr("id");
    
    //Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
        userClickedPattern.push(userChosenColor);
        
    //In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played.
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length-1);  
    });

    function checkAnswer(currentLevel) {
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            if (userClickedPattern.length === gamePattern.length) {
                setTimeout(function() {
                    userClickedPattern = [];
                    nextSequence();
                }, 1000);
            }
        } else {
    // If the user's pattern doesn't match the game pattern
            playSound("wrong");
            $("body").addClass("game-over");
            $("#level-title").text("Game Over, Press Any Key to Restart");
          
            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);
          
            startOver();
        }
    }   

function nextSequence (){
    userClickedPattern = []; 

    //Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
    level++;

    //Inside nextSequence(), update the h1 with this change in the value of level.
    $("#level-title").text("Level " + level);

    //generate random number from 0-3 and store it in variable randomNumber 
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttons[randomNumber];
//add random chosen color into gamePattern array 
    gamePattern.push(randomChosenColor);
//use jQuery to select the button with the same id as the random chosen color; 
    $('#'+ randomChosenColor).fadeOut(100).fadeIn(100);
//play the audio when the randomchosencolor selected
    playSound(randomChosenColor);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColor) {

//Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
    $("#" + currentColor).addClass("pressed");
  
//use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

  function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}


