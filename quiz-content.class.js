class QuizContent {

  constructor(quizData) {
    this.quizQuestionsPool = quizData;
    this.quizData = [];
    this.resetQuizContent();
  }


  resetQuizContent(){
    this.extractQuizQuestions(5);
    this.initUserAnswers();
    this.score = 0;
    this.scrambleQuizData();
  }


  extractQuizQuestions(questionsNumber){
    let questionsPool = [...this.quizQuestionsPool];

    this.quizData.length = 0;
    for (let i = 0; i < questionsNumber; i++) {
      let randomPos = this.generateRandomElementIndex(questionsPool.length);
      let extract = questionsPool.splice(randomPos, 1);
      this.quizData.push(extract[0]);
    }
  }


  initUserAnswers(){
    this.userAnswers = [];
    for (let i = 0; i < this.quizData.length; i++) {
      this.userAnswers[i] = null;
    }
  }


  generateRandomElementIndex(arrayLength){
    return Math.floor(Math.random() * arrayLength);
  }


  scrambleQuizData(){
    this.scrambleQuizQuestions();
    this.scrambleQuizAnswears();
  }


  scrambleQuizQuestions(){
     // interchange as many times as elements in the array - not really necessary
     for (let i = 0; i < this.quizData.length; i++) {
       let index1 = this.generateRandomElementIndex(this.quizData.length);
       let index2 = this.generateRandomElementIndex(this.quizData.length);
       if (index1 != index2) {
         let aux = this.quizData[index1];
         this.quizData[index1] = this.quizData[index2];
         this.quizData[index2] = aux;
       }
     }
   }


  scrambleQuizAnswears(){
    for (let i = 0; i < this.quizData.length; i++) {
      for (var j = 0; j < this.quizData[i].answers.length * 3; j++) {
        let index1 = this.generateRandomElementIndex(this.quizData[i].answers.length);
        let index2 = this.generateRandomElementIndex(this.quizData[i].answers.length);
        if (index1 != index2) {
          let aux = this.quizData[i].answers[index1];
          this.quizData[i].answers[index1] = this.quizData[i].answers[index2];
          this.quizData[i].answers[index2] = aux;
        }
      }
    }
  }


  setUserAnswer(questionIndex, answerIndex){
    this.userAnswers[questionIndex] = answerIndex;
  }


  evaluateResult(){
    // this.userAnswers[i] = la al catelea raspuns a
    // this.quizData[i].question = intrebarea i
    // this.quizData[i].answers = raspunsurile intrebarii i cu proprietatile "text" si "right"
    // this.quizData[i].answer[j] = raspunsul j la intrebarea i

    let rightAnswers = 0;
    for (let i = 0; i < this.quizData.length; i++) {
      let userAnswersIndex = this.userAnswers[i];
      if(this.userAnswers[i] !== null && this.quizData[i].answers[userAnswersIndex].right === "1"){
        rightAnswers++;
      }
    }

    let score = rightAnswers / this.quizData.length * 100;
    this.score = parseFloat(score.toFixed(2));
  }

  getCorrectAnswersIndexes(){
    let result = [];
    for (let i = 0; i < this.quizData.length; i++) {
      for (let j = 0; j < this.quizData[i].answers.length; j++) {
        if (this.quizData[i].answers[j].right === "1") {
          result.push(j);
          break;
        }
      }
    }
    return result;
  }
}
