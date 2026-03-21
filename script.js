const quizData = [
    {
        type: "mcq",
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    },
    {
        type: "mcq",
        question: "Which language is used for web?",
        options: ["Python", "Java", "HTML", "C++"],
        answer: "HTML"
    },
    {
        type: "fill",
        question: "Fill in the blank: Java is ___ language.",
        answer: "programming"
    }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const fillBlankEl = document.getElementById("fillBlank");
const resultBox = document.getElementById("result-box");
const quizBox = document.getElementById("quiz-box");
const scoreEl = document.getElementById("score");

function loadQuestion() {
    let q = quizData[currentQuestion];
    questionEl.innerText = q.question;

    optionsEl.innerHTML = "";
    fillBlankEl.style.display = "none";

    if (q.type === "mcq") {
        q.options.forEach(option => {
            let btn = document.createElement("button");
            btn.innerText = option;
            btn.onclick = () => selectAnswer(option);
            optionsEl.appendChild(btn);
        });
    } else if (q.type === "fill") {
        fillBlankEl.style.display = "block";
    }
}

function selectAnswer(selected) {
    if (selected === quizData[currentQuestion].answer) {
        score++;
    }
    nextQuestion();
}

function nextQuestion() {
    let q = quizData[currentQuestion];

    if (q.type === "fill") {
        let userAnswer = fillBlankEl.value.trim().toLowerCase();
        if (userAnswer === q.answer.toLowerCase()) {
            score++;
        }
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizBox.classList.add("hidden");
    resultBox.classList.remove("hidden");
    scoreEl.innerText = score + " / " + quizData.length;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    quizBox.classList.remove("hidden");
    resultBox.classList.add("hidden");
    loadQuestion();
}

loadQuestion();