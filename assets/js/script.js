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

//on page startup, automatically run a function that generates an h1 title, p element, and a button
//when that button is clicked, delete the existing elements, and run a for loop
//when the start button is clicked, a question "form" is dynamically created
//the for loop will pull information from an array that contains multiple arrays, each of its own property
//questions are an h1 heading and multiple choice answers are ordered list items
//the for loop will automatically assign each element with the property values
//the for loop will also update a "correctChoice" variable to have a value of the answer's array index value
//questions have multiple choice answers, so an event listener for "click" needs to be added to the question form
//to check if the answer is correct, the array index value must equal to the correctChoice index value
//on click, when the event.target is correct, display the correct! subheading load the next dynamic set of quesions
//if the event.target is incorrect, display the wrong! subheading and decrease the amount of time left
//when time runs out, a form field needs to be generated and that data stored in localStorage
//view high scores button in header should have an on click event listener
//time countdown needs a setInterval() and display that value every 1000 miliseconds
//after every second, update the value to decrease by one until the value is zero
//add a landing page that has a button that triggers the setTimeout
//add class values to all dynamically created html elements in order to be styled

//link HTML elements first
var mainEl = document.querySelector("#main");

//main div elements
var formEl = document.createElement("div");
mainEl.appendChild(formEl);

//initial quiz format set up
var titleEl = document.createElement("h1");
var paraEl = document.createElement("p");
var listEl = document.createElement("ol");
//start quiz button
var introButtonEl = document.createElement("button");
introButtonEl.textContent = "Start Quiz";
formEl.appendChild(titleEl);
formEl.appendChild(paraEl);
formEl.appendChild(introButtonEl);
formEl.appendChild(listEl);

//turn questions into objects
var qOne = {
    question: "Commonly used data types do NOT include:",
    choices: ["Strings", "Booleans", "Alerts", "Numbers"],
    correct: "" //Alerts
}
var qTwo = {
    question: "The condition in an if/else statement is enclosed in:",
    choices: ["Quotes", "Parentheses", "Curly Brackets", "Square Brackets"],
    correct: "" //Parentheses
}
var qThree = {
    question: "Arrays in JavaScript can be used to store",
    choices: ["Numbers and Strings", "Other Arrays", "Booleans", "All of the Above"],
    correct: "" //All of the Above
}
var qFour = {
    question: "String values must be enclosed within __________ when being assigned to variables",
    choices: ["Commas", "Curly Brackets", "Quotes", "Parentheses"],
    correct: "" //Quotes
}
var qFive = {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "Terminal Bash", "for loops", "console.log"],
    correct: "" //console.log
}
//add question objects to an array
var questions = [qOne, qTwo, qThree, qFour, qFive]

var formUpdate = function() {
    //add code here to remove the button
    for (i = 0; i < questions.length; i++) {
        titleEl.textContent = questions[i].question;
        //a ul is composed of li items, so create an li item and use array at index [i] to assign the text value of each li item
        //for the length of the choices array of the question in the questions array at the index of the iterative loop being run, create an li element and assign it to the ol element
        for (j = 0; j < questions[i].choices.length; j++) {
        var item = document.createElement("li");
        item.textContent = questions[i].choices[j];
        listEl.appendChild(item);
        }
        return;
    }
}


formUpdate();