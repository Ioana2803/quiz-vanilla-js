class QuizView {

  constructor(quizData, quizContainerElem, scoreResultDisplay) {
    this.quizData = quizData;

    this.quizContainerElem = quizContainerElem;
    this.scoreResultDisplay = scoreResultDisplay;
  }


  renderQuiz(){
    this.quizContainerElem.innerHTML = "";
    //
    for (let i = 0; i < this.quizData.length; i++) {
      this.renderQuizItem(i, this.quizData[i]);
    }
  }


  renderQuizItem(index, quizItem){
    // the row div
    let row = document.createElement("div");
    row.className = "row";
    this.quizContainerElem.appendChild(row);

    // the col div
    let col = document.createElement("div");
    col.className = "col";
    row.appendChild(col);

    // the question
    let question = document.createElement("h6");
    question.innerText = (index + 1) + ". " + quizItem.question;
    col.appendChild(question);

    // the answer ul
    let list = document.createElement("ul");
    list.className = "quiz-answers";
    col.appendChild(list);

    for (let i = 0; i < quizItem.answers.length; i++) {
      let listItem = document.createElement("li");
      list.appendChild(listItem);

      let input = document.createElement("input");
      input.type = "radio";
      input.name = "answer-" + index;
      input.className = "quiz-answer answer-" + index;
      // adding data attributes: data-question-index(saving the question index)
      input.dataset.questionIndex = index;
      // adding data attributes: data-answer-index(saving the answer index)
      input.dataset.answerIndex = i;
      listItem.appendChild(input);

      let text = document.createTextNode(quizItem.answers[i].text);
      listItem.appendChild(text);
    }
  }


  displayScore(score){
    this.scoreResultDisplay.innerText = score;
  }


  displayFinalResults(correctAnswers, userAnswers){
    let questionsUl = document.querySelectorAll(".quiz-answers");

    this.displayCorrectAnswers(questionsUl, correctAnswers);
    this.displayInvalidAnswers(questionsUl, correctAnswers, userAnswers);
  }


  displayCorrectAnswers(questionsUl, correctAnswersIndexes){
    for (let i = 0; i < questionsUl.length; i++) {
      let correctAnswerIndex = correctAnswersIndexes[i];
      let answerLi = questionsUl[i].childNodes[correctAnswerIndex];
      answerLi.classList.add("alert", "alert-success");
      // answerLi.classList.add('text-success');
    }
  }


  displayInvalidAnswers(questionUl, correctAnswers, userAnswers){
    this.unmarkInvalidAnswers();

    for (var i = 0; i < userAnswers.length; i++) {
      if (userAnswers[i] !== correctAnswers[i] && userAnswers[i] !== null) {
        let invalidAnswerIndex = userAnswers[i];
        let answerLi = questionUl[i].childNodes[invalidAnswerIndex];
        answerLi.classList.add("text-danger");
      }
    }
  }


  unmarkInvalidAnswers(){
    let answerLi = document.querySelectorAll(".text-danger");
    for (var i = 0; i < answerLi.length; i++) {
      answerLi[i].classList.remove("text-danger");
    }
  }
}
