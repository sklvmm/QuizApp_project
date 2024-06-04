//We create an array with all the questions data (questions, answers, correct answer)
const questions = [
    {
        question: "Τι ειναι η χημεια?",
        answers: [
            { text: "Επιστημη", correct: false},
            { text: "Γααααματα", correct: true},
            { text: "Τεχνη", correct: false},
            { text: "SCIENCE BIITCH", correct: false}
        ] 
    },
    {
        question: "Υπαρχει ο ρατσισμος?",
        answers: [
            { text: "Φυσικα", correct: false},
            { text: "Ο ρατσισμος δεν υπαρχει", correct: true},
            { text: "Δεν ειμαι ρατσιστης, εχω μαυρους φιλους!", correct: false},
            { text: "Ο χιτλερ δεν εκανε τιποτα κακο", correct: false}
        ] 
    },
    {
        question: "Οταν λουζεσαι ιδρωνεις?",
        answers: [
            { text: "Μονο τα καλοκαρια", correct: false},
            { text: "Δεν λουζομαι ποτε", correct: false},
            { text: "Δεν ιδρωνω ποτε", correct: false},
            { text: "Οχι, αλλα οταν γαμιεμαι κουνιεμαι", correct: true}
        ] 
    },
    {
        question: "Ο Γιαννης θα φτασει τα 33?",
        answers: [
            { text: "Ο Γιαννης θα ζησει για παντα μπρο", correct: true},
            { text: "Οριακα", correct: false},
            { text: "Απορω πως ειναι ακομα ζωντανος", correct: false},
            { text: "Ουτε τα 31 δεν θα φτασει", correct: false}
        ] 
    }
];

//We link our html elements to js variables
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

//we decalre variables for question index and score
let currentQuestionIndex = 0;
let score = 0;

//A function to reset the quiz
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
//A function to display the questions
function showQuestion(){
    //We reset the question state before displaying the new one
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    //We set the h2 question html element to display the No of the question + question title
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    //We generate a button for each answer that exists in our array 
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        //When we click an answer run selectAnswer()
        button.addEventListener("click", selectAnswer);
    });
}
//A function to reset the state of our question -> Removes all the answer buttons
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }

}
//A function to select an answer -> display correct answer & disable all answer buttons & show the "next" button
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    //If answer is correct add the "correct" class to the button element and add to the score
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    //if answer is incorrect add the incorrect class to the button element  
    else{     

        selectedBtn.classList.add("incorrect");
    }
    //Display the correct answer (by adding the .correct class to that button element)
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        //Disable all answer buttons
        button.disabled = true;
    });
    //display the next button when an answer is selected
    nextButton.style.display = "block";
  
}
//event listener for clicks of Next button (display next question or show score)
nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
//Function to display the next question or display the score when Next is pressed 
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
//Function to display the score
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play again!";
    nextButton.style.display = "block";
}


startQuiz();