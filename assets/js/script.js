//add questions to an array
var questions = [{
    question: "Commonly used data types do NOT include:",
    choices: ["Strings", "Booleans", "Alerts", "Numbers"],
    correct: "Alerts"
}, {
    question: "The condition in an if/else statement is enclosed in:",
    choices: ["Quotes", "Parentheses", "Curly Brackets", "Square Brackets"],
    correct: "Parentheses"
}, {
    question: "Arrays in JavaScript can be used to store",
    choices: ["Numbers and Strings", "Other Arrays", "Booleans", "All of the Above"],
    correct: "All of the Above"
}, {
    question: "String values must be enclosed within __________ when being assigned to variables",
    choices: ["Commas", "Curly Brackets", "Quotes", "Parentheses"],
    correct: "Quotes"
}, {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "Terminal Bash", "for loops", "console.log"],
    correct: "console.log"
}];

// UNCOMMENT FOR ORIGINAL TEST CODE
// var testEl = document.querySelector("#test");
// var mainEl = document.querySelector("#main");
// var testEvent = function() {
//     window.alert("this is a test!");
// }
// testEl.addEventListener("click", testEvent);

// var secondTestElContainer = document.createElement("div")
// secondTestElContainer.className = "style-test"
// var secondTestEl = document.createElement("p");
// secondTestEl.textContent = "testing";
// secondTestElContainer.appendChild(secondTestEl);
// mainEl.appendChild(secondTestElContainer);

//when time runs out, a form field needs to be generated and that data stored in localStorage
//view high scores button in header should have an on click event listener
//add class values to all dynamically created html elements in order to be styled

//link HTML elements
var bodyEl = document.querySelector("#body");
var headerEl = document.querySelector("#header");
var mainEl = document.querySelector("#main");
bodyEl.appendChild(headerEl);
bodyEl.appendChild(mainEl);

//time remaining
var timer = 60;

//header elements
var highScoresEl = document.createElement("p");
highScoresEl.textContent = "View High Scores";
headerEl.appendChild(highScoresEl);
//create small div for time remaining counter
var timeDisplayEl = document.createElement("div");
headerEl.appendChild(timeDisplayEl);
var timerEl = document.createElement("p");
timeDisplayEl.textContent = "Time Remaining: ";
headerEl.appendChild(timerEl);
var timeRemainingEl = document.createElement("p");
timeRemainingEl.textContent = timer;
timeDisplayEl.appendChild(timeRemainingEl);

//quiz div element
var quizEl = document.createElement("div");
mainEl.appendChild(quizEl);

//initial quiz format set up
var titleEl = document.createElement("h1");
var orderedListEl = document.createElement("ol");
var paraEl = document.createElement("p");
orderedListEl.className = "orderedListEl";
quizEl.appendChild(titleEl);
quizEl.appendChild(orderedListEl);
quizEl.appendChild(paraEl);

//question counter
var i = 0;
var iterator = function() {
    i = i+1;
};

//correct answer tracker
correctResponse = ""

//set up for intro page
var introFormat = function() {
    titleEl.textContent = "Coding Quiz Challenge"
    paraEl.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!"
    var startButtonEl = document.createElement("button");
    startButtonEl.textContent = "Start Quiz";
    startButtonEl.className = "startButtonEl";
    quizEl.appendChild(startButtonEl);
}

//set up for end page
var endFormat = function() {
    orderedListEl.innerHTML = "";
    titleEl.textContent = "All Done!";
    paraEl.textContent = "Your final score is " + timeRemainingEl.textContent;
    //form
    var scoreFormEl = document.createElement("form");
    quizEl.appendChild(scoreFormEl);
    var enterNameEl = document.createElement("input");
    enterNameEl.type = "text";
    enterNameEl.name = "user-name";
    enterNameEl.placeholder = "Enter Your Name";
    scoreFormEl.appendChild(enterNameEl);
    //submit
    var submitButtonEl = document.createElement("button");
    submitButtonEl.type = "submit";
    submitButtonEl.textContent = "Submit";
    submitButtonEl.className = "submit"
    quizEl.appendChild(submitButtonEl);
    // //button
    // var endButtonEl = document.createElement("button");
    // endButtonEl.textContent = "Try Again";
    // endButtonEl.className = "endButtonEl";
    // quizEl.appendChild(endButtonEl);
}

//add a clickHandler function that redirects all functions based on what was clicked
var clickHandler = function(event) {
    var targetEl = event.target;
    if (targetEl.matches(".startButtonEl")) {
        startQuiz();
    } else if (targetEl.textContent === correctResponse) {
        correctAnswer();
    } else if (targetEl.className === ".listEl" && targetEl.textContent !== correctResponse) {
        incorrectAnswer();
    } else if (targetEl.matches(".submit")) {
        submitForm();
    } else if (targetEl.matches(".endButtonEl")) {
        restart();
    }
};

//add a startQuiz function that executes when the quiz button is clicked that clears the introFormat items, starts the timer, and runs the formUpdate function
var startQuiz = function() {
    var startButtonEl = document.querySelector(".startButtonEl");
    startButtonEl.remove();
    quizUpdate();
    //timer countdown
    var subtract = setInterval( function() {
        timer--;
        timeRemainingEl.textContent = timer;
        if (timer <= 0 || i > questions.length) {
            clearInterval(subtract)
            endFormat();}
        }, 1000
    );
};

//correct answer was selected
var correctAnswer = function() {
    paraEl.textContent = "correct!"
    setTimeout(quizUpdate, 500);
};

//incorrect answer was selected
var incorrectAnswer = function() {
    paraEl.textContent = "incorrect!"
    timer = timer-10;
    setTimeout(quizUpdate, 500);
};

// //try again
var restart = function() {
    var endButtonEl = document.querySelector(".endButtonEl");
    endButtonEl.remove();
    timer = 60;
    i = 0;
    timeRemainingEl.textContent = timer;
    introFormat();
};

//submit your high score
var submitForm = function(event) {
    var userNameInput = document.querySelector("input[name='user-name']").value;
    var userScoreInput = timeRemainingEl.textContent;
    if (!userNameInput) {
        alert("You need to add your username!");
        return false;
    }
    var highScoreObj = {
        name: userNameInput,
        score: userScoreInput
    }
    localStorage.setItem("scores", JSON.stringify(highScoreObj));
};

//update the quiz information
var quizUpdate = function() {
    if (i < questions.length) {
        titleEl.textContent = questions[i].question;
        paraEl.textContent = "";
        arrayToList();
        correctChoice();
        iterator();
    } else if (i === questions.length) {
        iterator();
    };
};

//an ol is composed of li items, so create an li item and use array at index j to assign the text value of each li item
var arrayToList = function(){
    //reset orderedListEl
    orderedListEl.innerHTML = "";
    //for the length of the choices array of the question in the questions array at the current value of i, create an li element and assign it to the ol element
    for (j = 0; j < questions[i].choices.length; j++) {
        var item = document.createElement("li");
        item.textContent = questions[i].choices[j];
        item.className = ".listEl";
        orderedListEl.appendChild(item);
    };
};

//update correct answer in each question
var correctChoice = function() {
    if (i < questions.length) {
        correctResponse = questions[i].correct;
    };
};

//add an event listener for the form to enable button functionality
quizEl.addEventListener("click", clickHandler);

introFormat();