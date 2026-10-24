const questions = [
    {
        question: "Which of the following is a JavaScript data type?",
        options: ["Boolean", "Float", "Character", "Integer"],
        answer: "Boolean"
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        options: ["<script>", "<javascript>", "<js>", "<scripting>"],
        answer: "<script>"
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        options: ["msg('Hello World');", "alertBox('Hello World');", "alert('Hello World');", "msgBox('Hello World');"],
        answer: "alert('Hello World');"
    },
    {
        question: "Which company developed JavaScript?",
        options: ["Netscape", "Bell Labs", "Sun Microsystems", "Microsoft"],
        answer: "Netscape"
    },
    {
        question: "Which symbol is used for single-line comments in JavaScript?",
        options: ["/*", "//", "<!--", "#"],
        answer: "//"
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        options: ["var colors = (1:'red', 2:'green')", "var colors = ['red', 'green', 'blue']", "var colors = 'red', 'green', 'blue'", "var colors = 1 = ('red'), 2 = ('green')"],
        answer: "var colors = ['red', 'green', 'blue']"
    },
    {
        question: "How do you call a function named 'myFunction'?",
        options: ["call myFunction()", "myFunction()", "call function myFunction()", "Run.myFunction()"],
        answer: "myFunction()"
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        options: ["onchange", "onmouseover", "onclick", "onmouseclick"],
        answer: "onclick"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const quizContainer = document.getElementById("quiz");

function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        let currentQ = questions[currentQuestionIndex];

        quizContainer.innerHTML = `
            <h2>Question ${currentQuestionIndex + 1} of ${questions.length}</h2>
            <p><strong>${currentQ.question}</strong></p>
            <div id="options-container"></div>
            <button id="next-btn" onclick="nextQuestion()">Next Question</button>
        `;

        let optionsContainer = document.getElementById("options-container");

        currentQ.options.forEach(option => {
            let button = document.createElement("button");
            button.innerText = option;
            button.classList.add("option-btn");
            button.onclick = () => selectOption(button, option, currentQ.answer);
            optionsContainer.appendChild(button);
        });
    } else {
        showScoreScreen();
    }
}

function selectOption(selectedButton, selectedOption, correctAnswer) {
    let allButtons = document.querySelectorAll(".option-btn");
    
    // Disable all option buttons after one selection
    allButtons.forEach(btn => btn.disabled = true);

    if (selectedOption === correctAnswer) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");
        // Reveal correct answer
        allButtons.forEach(btn => {
            if (btn.innerText === correctAnswer) {
                btn.classList.add("correct");
            }
        });
    }

    // Show the 'Next Question' button
    document.getElementById("next-btn").style.display = "block";
}

function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

function showScoreScreen() {
    let feedback = "";
    if (score === 8) {
        feedback = "Excellent job! Perfect score!";
    } else if (score >= 5) {
        feedback = "Good work! You have a solid understanding.";
    } else {
        feedback = "Keep practicing to improve your JavaScript skills!";
    }

    quizContainer.innerHTML = `
        <div class="score-screen">
            <h2>Quiz Completed!</h2>
            <p>You scored ${score} out of 8</p>
            <p><strong>${feedback}</strong></p>
            <button id="restart-btn" style="display: block;" onclick="restartQuiz()">Restart Quiz</button>
        </div>
    `;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
}

// Initial call to load the first question
loadQuestion();