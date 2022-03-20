//questions array
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

//link main HTML elements
var headerEl = document.querySelector("#header");
var timeDisplayEl = document.querySelector("#time-display")
var quizEl = document.querySelector("#quiz")

//time remaining
var timer = 60;

//create time remaining counter
var timeRemainingEl = document.createElement("p");
timeRemainingEl.className = "time-remaining"
timeRemainingEl.textContent = timer;
timeDisplayEl.appendChild(timeRemainingEl);

//high scores button
var highScoresEl = document.createElement("p");
highScoresEl.textContent = "View High Scores";
highScoresEl.className = "viewHighScores";
headerEl.appendChild(highScoresEl);

//initial quiz format set up
var titleEl = document.querySelector("#quiz-title")
var orderedListEl = document.createElement("ol");
orderedListEl.className = "orderedListEl";
quizEl.appendChild(orderedListEl);
var paraEl = document.createElement("p");
quizEl.appendChild(paraEl);

//question counter
var i = 0;
var iterator = function() {
    i = i+1;
};

//correct answer tracker
correctResponse = ""

//high score array
var scores = [];

//set up for intro page
var introFormat = function() {
    titleEl.textContent = "Coding Quiz Challenge"
    paraEl.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!"
    var startButtonEl = document.createElement("button");
    startButtonEl.textContent = "Start Quiz";
    startButtonEl.className = "startButtonEl";
    quizEl.appendChild(startButtonEl);
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
    } else if (targetEl.matches(".endButtonEl")) {
        restart();
    } else if (targetEl.matches(".submit")) {
        submitForm();
    } else if (targetEl.matches(".clearScoresButtonEl")) {
        clearScores();
    } else if (targetEl.matches(".backButtonEl")) {
        backButton();
    } else if (targetEl.matches(".viewHighScores")) {
        viewHighScores();
    };
};

//when the quiz button is clicked, clears the introFormat items, starts the timer, and runs the quizUpdate function
var startQuiz = function() {
    var startButtonEl = document.querySelector(".startButtonEl");
    startButtonEl.remove();
    var viewHighScoresEl = document.querySelector(".viewHighScores");
    viewHighScoresEl.remove();
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
    paraEl.textContent = "Correct!"
    setTimeout(quizUpdate, 500);
};

//incorrect answer was selected
var incorrectAnswer = function() {
    paraEl.textContent = "Incorrect!"
    timer = timer-10;
    setTimeout(quizUpdate, 500);
};

//set up for end page
var endFormat = function() {
    orderedListEl.innerHTML = "";
    titleEl.textContent = "All Done!";
    paraEl.textContent = "Your final score is " + timeRemainingEl.textContent;
    //form
    var scoreFormEl = document.createElement("form");
    scoreFormEl.className = "scoreFormEl";
    quizEl.appendChild(scoreFormEl);
    var enterNameEl = document.createElement("input");
    enterNameEl.type = "text";
    enterNameEl.name = "user-name";
    enterNameEl.placeholder = "Enter Your Name";
    enterNameEl.className = "enterNameEl"
    scoreFormEl.appendChild(enterNameEl);
    //submit
    var submitButtonEl = document.createElement("button");
    submitButtonEl.type = "submit";
    submitButtonEl.textContent = "Submit";
    submitButtonEl.className = "submit"
    quizEl.appendChild(submitButtonEl);
}

//restart game
var restart = function() {
    var highScoresEl = document.createElement("p");
    highScoresEl.textContent = "View High Scores";
    highScoresEl.className = "viewHighScores";
    headerEl.appendChild(highScoresEl);
    var clearScoresButtonEl = document.querySelector(".clearScoresButtonEl");
    clearScoresButtonEl.remove();
    var endButtonEl = document.querySelector(".endButtonEl");
    endButtonEl.remove();
    orderedListEl.innerHTML = ""
    timer = 60;
    i = 0;
    timeRemainingEl.textContent = timer;
    introFormat();
};

//submit
var submitForm = function() {
    var userNameInput = document.querySelector("input[name='user-name']").value;
    var userScoreInput = timeRemainingEl.textContent;
    if (!userNameInput) {
        alert("You need to add a username!");
        return false;
    } else {
        var highScoreObj = {
            name: userNameInput,
            score: userScoreInput
        }
        scores.push(highScoreObj);
        uploadScores();
        loadScores();
        scoreBoardScreen();
    }
};

//download scores
var downloadScores = function() {
    var savedScores = localStorage.getItem("scores");
    if (!savedScores) {
        scores = [];
        return false;
    } else {
        scores = [];
        savedScores = JSON.parse(savedScores);
        for (j = 0; j < savedScores.length; j++) {
            var savedScoreObj = {
                name: savedScores[j].name,
                score: savedScores[j].score
            }
            scores.push(savedScoreObj);
        }
    };
};

//load scores
var loadScores = function() {
    titleEl.textContent = "Score Board";
    paraEl.textContent = ""
    if (scores.length === 0) {
        paraEl.textContent = "No scores saved yet!"
    } else {
        for (j = 0; j < scores.length; j++) {
            var item = document.createElement("li");
            item.textContent = scores[j].name + " - " + scores[j].score;
            item.className = "score-list"
            orderedListEl.appendChild(item);
        };
    }
};

//upload scores
var uploadScores = function() {
    localStorage.setItem("scores", JSON.stringify(scores));
};

//clear scores
var clearScores = function() {
    alert("Score history cleared!")
    for (j = 0; j < scores.length; j++) {
        var scoreListEl = document.querySelector(".score-list");
        scoreListEl.remove();
    };
    scores = [];
    uploadScores();
    restart();
}

//try again
var scoreBoardScreen = function() {
    //remove submit form elements
    var enterNameEl = document.querySelector(".enterNameEl");
    enterNameEl.remove();
    var formEl = document.querySelector(".scoreFormEl");
    formEl.remove();
    var submitButtonEl = document.querySelector(".submit");
    submitButtonEl.remove();
    //create new buttons
    var endButtonEl = document.createElement("button");
    endButtonEl.textContent = "Try Again";
    endButtonEl.className = "endButtonEl";
    quizEl.appendChild(endButtonEl);
    var clearScoresButtonEl = document.createElement("button");
    clearScoresButtonEl.textContent = "Clear Scores";
    clearScoresButtonEl.className = "clearScoresButtonEl";
    quizEl.appendChild(clearScoresButtonEl);
};

//load high scores page
var viewHighScores = function() {
    var backButtonEl = document.createElement("button");
    backButtonEl.textContent = "Back";
    backButtonEl.className = "backButtonEl";
    quizEl.appendChild(backButtonEl);
    var viewHighScoresEl = document.querySelector(".viewHighScores");
    viewHighScoresEl.remove();
    var startButtonEl = document.querySelector(".startButtonEl");
    startButtonEl.remove();
    loadScores();
}

var backButton = function () {
    var highScoresEl = document.createElement("p");
    highScoresEl.textContent = "View High Scores";
    highScoresEl.className = "viewHighScores";
    headerEl.appendChild(highScoresEl);
    var backButtonEl = document.querySelector(".backButtonEl");
    backButtonEl.remove();
    if (!scores) {
        return false;
    } else {
        for (j = 0; j < scores.length; j++) {
        var scoreListEl = document.querySelector(".score-list");
        scoreListEl.remove();
        }
    };
    introFormat();
}

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

//add event listener for form submit
quizEl.addEventListener("submit", submitForm);

//add an event listener for the form to enable button functionality
headerEl.addEventListener("click", clickHandler);

downloadScores();
introFormat();