// $("h1").addClass("styles styless");
// $("button").addClass("style");
// $("h1").text("Good Bye");
// $("button").html("<em>Submit</em>");
// $("a").attr("href", "https://www.facebook.com");

// // click Function

// // $("button").click(function () {
// //   $("body").css("backgroundColor", "teal");
// //   $("h1").text("YOU CLICKED");
// //   $("h1").css("color", "red");
// //   $("a").text("");
// // });

// //Key Press Function

// $("body").keypress((e) => {
//   $("h1").text(e.target.value);
//   $("a").remove("");
//   $("button").remove("");
// });

// $("input").addClass("size");

// //On MouseOver Function

// $("h1").on("mouseover", () => {
//   $("body").css("backgroundColor", "orange");
//   $("h1").text("");
//   $("button").css("display", "none");
//   $("input").addClass("newInput");
// });

// // $("h1").append("<button>New</button>");
// // $("h1").prepend("<button>New</button>");

// //Toggle Function

// $("button").click(() => $("h1").slideToggle());

// //Animation

// $("button").on("click", () => {
//   $("h1").animate({ margin: "20%", opacity: 0.5 });
// });

// //blur

// // $("button").on("click", function () {
// //   $("h1").blur();
// // });

//Game

//STEP 1

const buttonColours = ["red", "green", "yellow", "blue"];

var gamePattern = [];

//STEP 2

var started = false;
var level = 0;

$(document).keypress(() => {
  if (!started) {
    $("h1").text("LEVEL" + " " + level);
    newSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    $("body").addClass("success");
    setTimeout(() => {
      $("body").removeClass("success");
    }, 300);
    nextSequence();
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 10);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 300);
    $("h1").html("Game Over, <small>Press Any Key to Start Again</small> ");
    Over();
  }
}

function newSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("LEVEL" + " " + level);

  const randomNumber = Math.trunc(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

//STEP 3

var userClickedPattern = [];

$(".btn").on("click", function () {
  const userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  console.log(userChosenColour + " " + "truuuu");
  checkAnswer(userClickedPattern.length - 1);
});

//STEP 4
function playSound(name) {
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//STEP 5

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(() => $("#" + currentColor).removeClass("pressed"), 1000);
}

//STEP 6

function Over() {
  level = 0;
  gamePattern = [];
  started = false;
}
