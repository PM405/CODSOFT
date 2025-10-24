const quizContainer = document.getElementById('quiz-container');
const categorySelection = document.getElementById('category-selection');
const categorySelect = document.getElementById('category-select');
const startBtn = document.getElementById('start-btn');

const loadingEl = document.getElementById('loading');
const quizContent = document.getElementById('quiz-content');
const questionNumberEl = document.getElementById('question-number');
const questionEl = document.getElementById('question');
const answersEl = document.querySelector('.answers');
const nextBtn = document.getElementById('next-btn');
const scoreContainer = document.getElementById('score-container');
const reloadBtn = document.getElementById('reload-btn');

let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

// Decode HTML entities from API data
function decodeHTML(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

async function fetchQuizQuestions(categoryId) {
    try {
        loadingEl.style.display = 'block';
        quizContent.style.display = 'none';
        categorySelection.style.display = 'none';

        // Fetch 10 questions from selected category, multiple choice only
        const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${categoryId}&type=multiple`);
        const data = await response.json();
        if (data.response_code !== 0) {
            throw new Error('Failed to fetch questions from API');
        }
        questions = data.results.map(q => {
            const answers = [...q.incorrect_answers];
            answers.push(q.correct_answer);
            shuffleArray(answers);
            return {
                question: decodeHTML(q.question),
                correct_answer: decodeHTML(q.correct_answer),
                answers: answers.map(a => decodeHTML(a))
            };
        });
        loadingEl.style.display = 'none';
        quizContent.style.display = 'block';
        currentQuestionIndex = 0;
        score = 0;
        selectedAnswer = null;
        showQuestion();
    } catch (error) {
        loadingEl.style.display = 'none';
        quizContainer.innerHTML = '<p style="color:#fa5252;font-size: 1.2rem;">Failed to load quiz questions. Please try refreshing the page.</p>';
        console.error(error);
    }
}

function clearSelection() {
    selectedAnswer = null;
    nextBtn.disabled = true;
    Array.from(answersEl.children).forEach(li => {
        li.classList.remove('selected');
        li.style.pointerEvents = 'auto';
    });
}

function showQuestion() {
    clearSelection();
    const currentQuestion = questions[currentQuestionIndex];
    questionNumberEl.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    questionEl.textContent = currentQuestion.question;
    answersEl.innerHTML = '';
    currentQuestion.answers.forEach(answer => {
        const li = document.createElement('li');
        li.textContent = answer;
        li.tabIndex = 0;
        li.setAttribute('role', 'button');
        li.addEventListener('click', () => selectAnswer(li, answer));
        li.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectAnswer(li, answer);
            }
        });
        answersEl.appendChild(li);
    });
}

function selectAnswer(element, answer) {
    
    selectedAnswer = answer;


    Array.from(answersEl.children).forEach(li => {
        li.classList.remove('selected');
    });

    // naye clicked option ko 'selected' karo
    element.classList.add('selected');

    // Next button enable
    nextBtn.disabled = false;
}

function showScore() {
    questionNumberEl.style.display = 'none';
    questionEl.style.display = 'none';
    answersEl.style.display = 'none';
    nextBtn.style.display = 'none';
    scoreContainer.style.display = 'block';
    reloadBtn.style.display = 'inline-block';

    scoreContainer.textContent = `Your Score: ${score} / ${questions.length}`;
}

// Handle next button click
nextBtn.addEventListener('click', () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correct_answer) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length) {
        showScore();
    } else {
        showQuestion();
    }
});

// Handle reload button click - restart quiz with category selection
reloadBtn.addEventListener('click', () => {
    // Reset UI and show category selection
    categorySelection.style.display = 'block';
    quizContent.style.display = 'none';
    scoreContainer.style.display = 'none';
    reloadBtn.style.display = 'none';
    questionNumberEl.style.display = '';
    questionEl.style.display = '';
    answersEl.style.display = '';
    nextBtn.style.display = '';
    nextBtn.disabled = true;
    categorySelect.value = '';
    startBtn.disabled = true;
});

categorySelect.addEventListener('change', () => {
    startBtn.disabled = categorySelect.value === '';
});

startBtn.addEventListener('click', () => {
    if (categorySelect.value) {
        fetchQuizQuestions(categorySelect.value);
    }
});
