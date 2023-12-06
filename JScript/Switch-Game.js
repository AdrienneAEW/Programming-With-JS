//Triva Questions Credit to: Mentimeter.com - https://www.mentimeter.com/blog/audience-energizers/55-free-trivia-and-fun-quiz-question-templates
const currentQuestion = document.querySelector("#sg-question")
const currentAnswers = document.getElementsByClassName("sg-choice")
const questionContainer = document.getElementById("sg-choice-container")
const statusContainer = document.getElementById("game-status")
const questionIndicators = document.getElementById("sg-question-indicators")
const questionIndicator = document.getElementsByClassName("sg-question-indicator")

//Users can choose an icon
let gameIcons = document.getElementsByClassName("sg-player-icon");
const gameIcon = document.getElementById("user-icon");
let spacerElements = document.getElementsByClassName("icon-spacer");
const iconContainer = document.getElementsByClassName("icon-container")[0];
const changeIconBtn = document.getElementsByClassName("sg-icon-btn")[0];
const startGameBtn = document.getElementsByClassName("sg-start-btn")[0];

let iconOrder = 5;
let spacerBefore = 4;
let spacerAfter = 5;
let correctAnswers = 0;
let questionLimit = 0;
let questionInd, answerInd, oldQuestion, userAnswer
let viewAnswers = [];
let pickedAnswers = [];
let pickedQuestions = [];

function clearFade() {
    gameIcon.classList.remove("icon-fade-out")
}
function iconFade() {
   gameIcon.classList.add("icon-fade-out")
}

function playerIcon(element) {
    alert("You chose the " + element.getAttribute("aria-label") + " icon.")
    iconContainer.style.display = "none";
    gameIcon.style.opacity = "1";
    gameIcon.innerText = element.innerText;
        
    setTimeout(function() {
        for (let i = 0; i < questionIndicator.length; i++) {
            questionIndicator[i].style.opacity = "1";}},1600)
    
    changeIconBtn.removeAttribute("disabled")
    startGameBtn.removeAttribute("disabled")
    changeIconBtn.style.opacity = "1"
    startGameBtn.style.opacity = "1"
    startGame()
}


function changeIcon() {
    alert("Where is the userIcon located.")
    spacerContainer.style.display = "grid"
}
const sgQuestions = [
    {question: "What is the most common surname in the United States?",
        correctAnswer: "Smith",
        answer1: "Jones",
        answer2: "Williams",
        answers: function () {
            return this.correctAnswer + "," + this.answer1 + "," + this.answer2
        }
    },
    {question: "How many ghosts chase Pac-Man at the start of each game?",
        correctAnswer: "4",
        answer1: "3",
        answer2: "5",
        answers: function () {
            return this.correctAnswer + "," + this.answer1 + "," + this.answer2
        }
    },
    {question: "What character have both Robert Downey Jr. and Benedict Cumberbatch played?",
        correctAnswer: "Sherlock Holmes",
        answer1: "Charlie Chaplin",
        answer2: "Stephen Hawking",
        answers: function () {
            return this.correctAnswer + "," + this.answer1 + "," + this.answer2
        }
    },
    {question: "What is the highest-rated film on IMD as of January 1st, 2022?",
        correctAnswer: "The Shawshank Redemption",
        answer1: "Titanic",
        answer2: "E.T.",
        answers: function () {
            return this.correctAnswer + "," + this.answer1 + "," + this.answer2
        }
    },
    {question: "What is a group of pandas known as?",
        correctAnswer: "An Embarrassment",
        answer1: "A Mob",
        answer2: "A Murder",
        answers: function () {
            return this.correctAnswer + "," + this.answer1 + "," + this.answer2
        }
    },
    {question: "Aureolin is a shade of what color?",
        correctAnswer: "Yellow",
        answer1: "Red",
        answer2: "Brown",
        answers: function () {
            return this.correctAnswer + "," + this.answer1 + "," + this.answer2
        }      
    },
    {question: "Which planet in the Milky Way is the hottest?",
        correctAnswer: "Venus",
        answer1: "Mars",
        answer2: "Mecury",
        answers: function () {
            return this.correctAnswer + "," + this.answer1 + "," + this.answer2
        }      
    },
    {question: "What company was initially known as \"Blue Ribbon Sports\"?",
        correctAnswer: "Nike",
        answer1: "Converse",
        answer2: "Vans",
        answers: function () {
            return this.correctAnswer + "," + this.answer1 + "," + this.answer2
        }      
    },
    {question: "How many bones do we have in an ear?",
        correctAnswer: "3",
        answer1: "7",
        answer2: "5",
        answers: function () {
            return this.correctAnswer + "," + this.answer1 + "," + this.answer2
        }      
    },
    {question: "Who discovered that the earth revolves around the sun?",
        correctAnswer: "Nicolaus Copernicus",
        answer1: "Tycho Brahe",
        answer2: "Galileo Galilei",
        answers: function () {
            return this.correctAnswer + "," + this.answer1 + "," + this.answer2
        }      
    },
    {question: "What is a group of crows called?",
        correctAnswer: "A Murder",
        answer1: "A Hobo",
        answer2: "A Suite",
        answers: function () {
            return this.correctAnswer + "," + this.answer1 + "," + this.answer2
        }      
    },
    {question: "How many hearts does an octopus have?",
        correctAnswer: "3",
        answer1: "8",
        answer2: "12",
        answers: function () {
            return this.correctAnswer + "," + this.answer1 + "," + this.answer2
        }      
    },
    {question: "On what continent would you find the world’s largest desert?",
        correctAnswer: "Antarctica",
        answer1: "Australia",
        answer2: "Africa",
        answers: function () {
            return this.correctAnswer + "," + this.answer1 + "," + this.answer2
        }      
    },
    {question: "Where did sushi originate?",
        correctAnswer: "China",
        answer1: "Taiwan",
        answer2: "Mongolia",
        answers: function () {
            return this.correctAnswer + "," + this.answer1 + "," + this.answer2
        }      
    },
    {question: "What is the only continent with land in all four hemispheres?",
        correctAnswer: "Africa",
        answer1: "Asia",
        answer2: "North America",
        answers: function () {
            return this.correctAnswer + "," + this.answer1 + "," + this.answer2
        }      
    }
]

function resetAnwerArrays() {
    viewAnswers = []
    pickedAnswers = []
    pickedQuestions = []
}

function resetCounters() {
    questionLimit = 0
    correctAnswers = 0
    iconOrder = 5
    spacerAfter = 5
    spacerBefore = 4
}


function newInd(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function newQuestion() {
    /*while (pickedQuestions.length < 13) {
        questionInd = newInd(0, sgQuestions.length);
        if (pickedQuestions.includes(questionInd) == false) pickedQuestions.push(questionInd)
        if (pickedQuestions.length == 12) break
    }

    */
   
    questionInd = newInd(0, sgQuestions.length)   
    if (pickedQuestions.length == 0) {
        pickedQuestions.push(questionInd);
        currentQuestion.innerText = sgQuestions[questionInd].question;
        viewAnswers = []
        viewAnswers = sgQuestions[questionInd].answers().split(",")
    }
    

    while (pickedAnswers.length < 4) {
        answerInd = newInd(0, 3)
        if (pickedAnswers.includes(answerInd) == false) pickedAnswers.push(answerInd)
        if (pickedAnswers.length == 3) break
    }
    
    for (let index = 0; index < currentAnswers.length; index++) {
        currentAnswers[index].innerText = viewAnswers[pickedAnswers[index]]
    }
    questionContainer.style.display = "flex";
    questionContainer.style.opacity = "1";

    oldQuestion = questionInd
    
    
    /*
    console.log("last question id = " + oldQuestion)
    questionInd = newInd(0, sgQuestions.length)
    if (oldQuestion == questionInd) { 
        alert("This question is the same as the last")
        questionInd = newInd(0, sgQuestions.length)
        console.log("new question id is = " + questionInd)
    }
    console.log("Question Index = " + questionInd)
    currentQuestion.innerText = sgQuestions[questionInd].question
    viewAnswers = []
    viewAnswers = sgQuestions[questionInd].answers().split(",")
    pickedAnswers = []

    while (pickedAnswers.length < 4) {
        answerInd = newInd(0, 3)
        if (pickedAnswers.includes(answerInd) == false) pickedAnswers.push(answerInd)
        if (pickedAnswers.length == 3) break
    }
    
    for (let index = 0; index < currentAnswers.length; index++) {
        currentAnswers[index].innerText = viewAnswers[pickedAnswers[index]]
    }

    oldQuestion = questionInd
    console.log("last question id updated to = " + oldQuestion)
    */
    alert("Question ID = " + oldQuestion)
}

function startGame() {
    resetAnwerArrays()
    questionContainer.style.display = "flex";
    questionContainer.style.justifyContent = "space-around";
    newQuestion()   
}

function answerChoice(element) {
    /*userAnswer = element.innerText

    if (sgQuestions[questionInd].correctAnswer == userAnswer) {
        alert(userAnswer + " is the correct answer.")
        iconOrder -= 1
        spacerBefore = iconOrder - 1
        spacerAfter = iconOrder + 1
        spacerElements[0].style.order = iconOrder
        spacerElements[iconOrder].style.order = spacerAfter
        correctAnswers += 1
        
    } else {
        alert(userAnswer + " is the not the correct answer.")
        iconOrder += 1
        if (iconOrder >= 6) {
            iconOrder = 5
            spacerBefore = 4
            spacerAfter = 5
        } else {
            spacerBefore = iconOrder - 1
            spacerAfter = iconOrder + 1
        }
        
        if (correctAnswers !== 0) {
            correctAnswers -= 1
        } 
        
        spacerElements[0].style.order = iconOrder
        spacerElements[spacerBefore].style.order = spacerBefore
    }


    if (questionLimit == 12) {
        alert("You have answered 12 questions a new game will start automatically.")
        resetCounters()
        startGame()
    } else {
        questionLimit += 1
        console.log("Number of questions asked = " + questionLimit)
        newQuestion()      
    }

    if (iconOrder == 1) {
        alert("Congratulations . You have won the game.\n A new game will start automatically.")
        
        resetCounters()
        startGame()
    }
    */
   alert("Sorry. Answer verification is not active.")
}

//Users get 5 questions 
//User moves forward for correct answers and backwards for incorrect answers
//Users get 7 tries to get to number 1 and win game at number one
//Users receive feedback for correct and incorrect answers
//Users receive last questions alert
//Questions have to shuffle
//Game resets afer 7 questions if User hasn't reached 1
