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
var timeDisplayEl = document.querySelector("#time-display");
var quizEl = document.querySelector("#quiz");

//time remaining
var timer = 60;

//create time remaining counter
var timeRemainingEl = document.createElement("p");
timeRemainingEl.className = "time-remaining"
timeRemainingEl.textContent = timer;
timeDisplayEl.appendChild(timeRemainingEl);

//initial quiz format set up
var titleEl = document.querySelector("#quiz-title");
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
correctResponse = "";

//saved scores array
var scores = [];

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
    } else if (targetEl.matches(".viewSavedScores")) {
        viewSavedScores();
    };
};

//create buttons
var viewScores = function() {
    var savedScoresEl = document.createElement("p");
    savedScoresEl.textContent = "View Saved Scores";
    savedScoresEl.className = "viewSavedScores";
    headerEl.appendChild(savedScoresEl);
};

//delete buttons
var delViewScores = function() {
    var viewSavedScoresEl = document.querySelector(".viewSavedScores");
    viewSavedScoresEl.remove();
};

var delStartBtn = function() {
    var startButtonEl = document.querySelector(".startButtonEl");
    startButtonEl.remove();
};

//set up for intro page
var introFormat = function() {
    //title and text
    titleEl.textContent = "Coding Quiz Challenge";
    paraEl.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    //generate start button
    var startButtonEl = document.createElement("button");
    startButtonEl.textContent = "Start Quiz";
    startButtonEl.className = "startButtonEl";
    quizEl.appendChild(startButtonEl);
};

//when the quiz button is clicked, clear the introFormat items, start the timer, and run the quizUpdate function
var startQuiz = function() {
    //remove start button and option to view saved scores
    delStartBtn();
    delViewScores();
    //run quizUpdate and start countdown
    quizUpdate();
    var subtract = setInterval( function() {
        timer--;
        timeRemainingEl.textContent = timer;
        //clears interval when seconds/questions run out and prevents negative scores from being generated
        if (timer <= 0 || i > questions.length) {
            if (timer < 0) {
                timeRemainingEl.textContent = 0;
            }
            clearInterval(subtract);
            endFormat();}
        }, 1000
    );
};

//update the quiz information
var quizUpdate = function() {
    //assign properties from questions array to quiz elements
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
    //update quiz elements
    orderedListEl.innerHTML = "";
    titleEl.textContent = "All Done!";
    paraEl.textContent = "Your final score is " + timeRemainingEl.textContent;
    //username form element
    var scoreFormEl = document.createElement("form");
    scoreFormEl.className = "scoreFormEl";
    quizEl.appendChild(scoreFormEl);
    var enterNameEl = document.createElement("input");
    enterNameEl.type = "text";
    enterNameEl.name = "user-name";
    enterNameEl.placeholder = "Enter Your Name";
    enterNameEl.className = "enterNameEl"
    scoreFormEl.appendChild(enterNameEl);
    //submit button
    var submitButtonEl = document.createElement("button");
    submitButtonEl.type = "submit";
    submitButtonEl.textContent = "Submit";
    submitButtonEl.className = "submit"
    quizEl.appendChild(submitButtonEl);
};

//load saved scores page
var viewSavedScores = function() {
    //button to go back to home page
    var backButtonEl = document.createElement("button");
    backButtonEl.textContent = "Back";
    backButtonEl.className = "backButtonEl";
    quizEl.appendChild(backButtonEl);
    //remove the view saved scores and start quiz button before loading scores
    delViewScores();
    delStartBtn();
    loadScores();
};

//load scores
var loadScores = function() {
    //set content of quiz elements
    titleEl.textContent = "Score Board";
    paraEl.textContent = "";
    //if no scores saved, generate message, if scores have been saved, create list elements from scores array
    if (scores.length === 0) {
        paraEl.textContent = "No scores saved yet!";
    } else {
        for (j = 0; j < scores.length; j++) {
            var item = document.createElement("li");
            item.textContent = scores[j].name + " - " + scores[j].score;
            item.className = "score-list";
            orderedListEl.appendChild(item);
        };
    };
};


//submit
var submitForm = function() {
    //generate an object out of username and score
    var userNameInput = document.querySelector("input[name='user-name']").value;
    var userScoreInput = timeRemainingEl.textContent;
    //if no username, prompt entry, otherwise, add object to end of scores array, before saving in localStorage
    if (!userNameInput) {
        alert("You need to add a username!");
        return false;
    } else {
        var savedScoreObj = {
            name: userNameInput,
            score: userScoreInput
        };
        scores.push(savedScoreObj);
        uploadScores();
        loadScores();
        scoreBoardScreen();
    }
};

//restart game
var restart = function() {
    //generate the view saved scores element again
    viewScores();
    var endButtonEl = document.querySelector(".endButtonEl");
    endButtonEl.remove();
    var clearScoresButtonEl = document.querySelector(".clearScoresButtonEl");
    clearScoresButtonEl.remove();
    //reset all quiz elements and counters before running start function
    orderedListEl.innerHTML = "";
    timer = 60;
    i = 0;
    timeRemainingEl.textContent = timer;
    introFormat();
};

//delete submit form and generate new buttons
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

//back to home screen
var backButton = function () {
    //create the view saved scores button again
    viewScores();
    //remove the back and clear score buttons
    var backButtonEl = document.querySelector(".backButtonEl");
    backButtonEl.remove();
    //clear the list of saved scores on the screen
    if (!scores) {
        return false;
    } else {
        for (j = 0; j < scores.length; j++) {
        var scoreListEl = document.querySelector(".score-list");
        scoreListEl.remove();
        }
    };
    introFormat();
};

//clear scores
var clearScores = function() {
    var clear = window.confirm("Are you sure you want to clear score history?");
    if (!clear) {
        return false;
    } else {
        alert("Score history cleared!");
        //clear the list of saved scores on the screen
        for (j = 0; j < scores.length; j++) {
            var scoreListEl = document.querySelector(".score-list");
            scoreListEl.remove();
        };
        //set the scores array to be empty and update localStorage with blank array before restarting
        scores = [];
        uploadScores();
        restart();
    }
};

//upload scores
var uploadScores = function() {
    localStorage.setItem("scores", JSON.stringify(scores));
};

//download scores
var downloadScores = function() {
    //retrieve scores from localStorage
    var savedScores = localStorage.getItem("scores");
    //for every element in the localStorage array, change the retrieved string into an object and save to the scores array
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
            };
            scores.push(savedScoreObj);
        };
    };
};

//add an event listener for the form to enable button functionality
quizEl.addEventListener("click", clickHandler);

//add event listener for form submit
quizEl.addEventListener("submit", submitForm);

//add an event listener for the form to enable button functionality
headerEl.addEventListener("click", clickHandler);

downloadScores();
viewScores();
introFormat();