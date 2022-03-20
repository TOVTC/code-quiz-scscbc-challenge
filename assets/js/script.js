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

//if the event.target is incorrect, display the wrong! subheading and decrease the amount of time left
//when time runs out, a form field needs to be generated and that data stored in localStorage
//view high scores button in header should have an on click event listener
//time countdown needs a setInterval() and display that value every 1000 miliseconds
//after every second, update the value to decrease by one until the value is zero
//add a landing page that has a button that triggers the setTimeout
//add class values to all dynamically created html elements in order to be styled

//link HTML elements
var mainEl = document.querySelector("#main");

//main div elements
var quizEl = document.createElement("div");
mainEl.appendChild(quizEl);

//initial quiz format set up
var titleEl = document.createElement("h1");
var orderedListEl = document.createElement("ol");
orderedListEl.className = "orderedListEl";
quizEl.appendChild(titleEl);
quizEl.appendChild(orderedListEl);

//question counter
var i = 0;
var iterator = function() {
    i = i+1;
};

//correct answer
correctResponse = ""

//set up for intro page
var introFormat = function() {
    titleEl.textContent = "Coding Quiz Challenge"
    var startParaEl = document.createElement("p");
    startParaEl.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!"
    startParaEl.className = "startParaEl"
    quizEl.appendChild(startParaEl);
    var startButtonEl = document.createElement("button");
    startButtonEl.textContent = "Start Quiz";
    startButtonEl.className = "startButtonEl";
    quizEl.appendChild(startButtonEl);
}

var endFormat = function() {
    var orderedListEl = document.querySelector(".orderedListEl");
    orderedListEl.remove();
    titleEl.textContent = "All Done!"
    var paraEl = document.createElement("p");
    paraEl.textContent = "Your final score is __________"
    paraEl.className = "paraEl"
    quizEl.appendChild(paraEl);
    var endButtonEl = document.createElement("button");
    endButtonEl.textContent = "Try Again";
    endButtonEl.className = "endButtonEl";
    quizEl.appendChild(endButtonEl);
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
    }
};

//add a startQuiz function that executes when the quiz button is clicked that clears the introFormat items, starts the timer, and runs the formUpdate function
var startQuiz = function() {
    var startButtonEl = document.querySelector(".startButtonEl");
    var paraEl = document.querySelector(".startParaEl");
    startButtonEl.remove();
    paraEl.remove();
    quizUpdate();
};

//correct answer was selected
var correctAnswer = function() {
    console.log("correct!")
    quizUpdate();
}

//incorrect answer was selected
var incorrectAnswer = function() {
    console.log("incorrect!")
    quizUpdate();
}

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

//update the quiz information
var quizUpdate = function() {
    if (i < questions.length) {
        titleEl.textContent = questions[i].question;
        arrayToList();
        correctChoice();
        iterator();
    };
    if (i === questions.length) {
        endFormat();
    };
};

//an ol is composed of li items, so create an li item and use array at index [j] to assign the text value of each li item
var arrayToList = function(){
    //reset orderedListEl
    orderedListEl.innerHTML = "";
    //for the length of the choices array of the question in the questions array at the index of the loop being run, create an li element and assign it to the ol element
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