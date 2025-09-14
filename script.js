const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-button");
const progressBar = document.getElementById("progress");


const quizQuestions = [
  {
    question: "Which law of thermodynamics states that energy cannot be created or destroyed, only transformed?",
    answers: [
      { text: "Zeroth Law", correct: false },
      { text: "First Law", correct: true },
      { text: "Second Law", correct: false },
      { text: "Third Law", correct: false },
    ],
  },
  {
    question: "In an AC circuit, the opposition to the change of current due to inductance is called:?",
    answers: [
      { text: "Resistance", correct: false },
      { text: "Reactance", correct: true },
      { text: "Impedance", correct: false },
      { text: "Capacitance", correct: false },
    ],
  },
  {
    question: "The most commonly used material for road pavement is",
    answers: [
      { text: "Cement concrete", correct: false },
      { text: "Asphalt", correct: true },
      { text: "Timber", correct: false },
      { text: "Brick", correct: false },
    ],
  },
  {
    question: "WWhich data structure uses the principle of FIFO (First-In-First-Out)?",
    answers: [
      { text: "Stack", correct: false },
      { text: "Queue", correct: true },
      { text: "Tree", correct: false },
      { text: "Graph", correct: false },
    ],
  },
  {
    question: "Which of the following is NOT a type of welding process?",
    answers: [
      { text: "MIG Welding", correct: false },
      { text: "TIG Welding", correct: false },
      { text: "Arc Welding", correct: false },
      { text: "Milling", correct: true },
    ],
  },

  {
    question: "Which branch of engineering deals with the design and production of aircraft?",
    answers: [
      { text: "Mechanical Engineering", correct: false },
      { text: "Aeronautical Engineering", correct: true },
      { text: "Civil Engineering", correct: false },
      { text: "Mechatronics", correct: false },
    ],
  },
  {
    question: "Ohm’s law is mathematically expressed as:",
    answers: [
      { text: "V = IR", correct: true },
      { text: "P = VI", correct: false },
      { text: "E = mc²", correct: false },
      { text: "F = ma", correct: false },
    ],
  },
  {
    question: "The unit of measurement for concrete strength is typically given in:",
    answers: [
      { text: "N/m", correct: false },
      { text: "N/mm²", correct: true },
      { text: "N/m²", correct: false },
      { text: "kg", correct: false },
    ],
  },
  {
    question: "Which of the following is a volatile memory?",
    answers: [
      { text: "Hard Disk", correct: false },
      { text: "ROM", correct: false },
      { text: "RAM", correct: true },
      { text: "Flash Memory", correct: false },
    ],
  },
  {
    question: "The device used to convert AC to DC is called a:",
    answers: [
      { text: "Rectifier", correct: true },
      { text: "Inverter", correct: false },
      { text: "Transformer", correct: false },
      { text: "Inductor", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;


totalQuestionsSpan.textContent = quizQuestions.length; 
maxScoreSpan.textContent = quizQuestions.length

// adding event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz(){
  //reset varibles
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0

  startScreen.classList.remove("screen-active");
  startScreen.classList.add("screen");

  quizScreen.classList.remove("screen");
  quizScreen.classList.add("screen-active");


  showQuestion();
}

function showQuestion() {
  answerDisabled = false

  const currentQuestion = quizQuestions[currentQuestionIndex];

  questionText.textContent = currentQuestion.question;

  currentQuestionSpan.textContent = currentQuestionIndex + 1

  const progressPercent = [currentQuestionIndex / quizQuestions.length] * 100
  progressBar.style.width = progressPercent + "%"

  questionText.textContent = currentQuestion.question 

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button")
    button.textContent = answer.text
    button.classList.add("answer-btn")

    button.dataset.correct = answer.correct

    button.addEventListener("click", selectAnswer)

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  if(answerDisabled) return

  answerDisabled = true

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true"

  Array.from(answersContainer.children).forEach(button => {
    if(button.dataset.correct ==="true"){
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  });
  if(isCorrect) {
    score++;
    scoreSpan.textContent = score
  }

  setTimeout(() => {
    currentQuestionIndex++;

    if(currentQuestionIndex < quizQuestions.length){
      showQuestion()
    } else {
      showResults()
    }
  },1000)
}

function showResults() {
  quizScreen.classList.remove("screen-active");
  quizScreen.classList.add("screen");

  resultScreen.classList.remove("screen");
  resultScreen.classList.add("screen-active");

  finalScoreSpan.textContent = score;

  const percentage = (score/quizQuestions.length) * 100

  if(percentage === 100) {
    resultMessage.textContent = "agba scholar";
  } else if (percentage >= 70) {
    resultMessage.textContent = "A+, Not bad!";
  } else if (percentage >= 50) {
    resultMessage.textContent = "It's cool, try dey read though";
  } else {
    resultMessage.textContent = "Go pick up a book, Mr Man";
  }
}

function restartQuiz(){
    window.location.href = "index.html";
}