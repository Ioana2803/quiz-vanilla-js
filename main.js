console.log("yagdyiagwid");

const quizContainer = document.querySelector("#quiz-container");
const scoreResult = document.querySelector("#score-result");
const submitBtn = document.querySelector("#submit-btn");
const resetBtn = document.querySelector("#reset-btn");

let quizContent;
let quizView;

fetch('https://quiz.siit.ro/api/questions')
  .then(response => response.json())
  .then(data => initQuiz(data));

  function initQuiz(quizData){
    console.log(quizData);

    // quiz content is part of MODEL
    quizContent = new QuizContent(quizData);
    console.log(quizContent);

    // quizView is the view
    quizView = new QuizView(quizContent.quizData, quizContainer, scoreResult);
    quizView.renderQuiz();

    //
    selectAnswerBehaviour();
}


// adding click behavior to the radio buttons, setting the selected answer
function selectAnswerBehaviour(){
  let answersRadioBtns = document.querySelectorAll(".quiz-answer");
  for (let i = 0; i < answersRadioBtns.length; i++) {
    answersRadioBtns[i].addEventListener("click", function(){
      let questionIndex = parseInt(answersRadioBtns[i].dataset.questionIndex);
      let answerIndex = parseInt(answersRadioBtns[i].dataset.answerIndex);
      quizContent.setUserAnswer(questionIndex, answerIndex);
    });
  }
}

// quiz Submit
submitBtn.addEventListener("click", function(){
  quizContent.evaluateResult();
  quizView.displayScore(quizContent.score);

  // display the correct answers
  let correctAnswers = quizContent.getCorrectAnswersIndexes();
  console.log(correctAnswers);
  console.log(quizContent);
  quizView.displayFinalResults(correctAnswers, quizContent.userAnswers)

  //quizView.displayCorrectAnswers(correctAnswers);

  // display the invalid answers
  //quizView.displayInvalidAnswers(quizContent.userAnswers, correctAnswers);
});

// quiz reset
resetBtn.addEventListener("click",function(){
  quizContent.resetQuizContent();
  quizView.renderQuiz();
  selectAnswerBehaviour();
});
