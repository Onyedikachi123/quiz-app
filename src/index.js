import React, { Component } from 'react';
import ReactDOM from "react-dom";
import "./assets/style.css";
import quizService from "./quizService";
import QuestionBox from "./Components/QuestionBox";
import Result from "./Components/Result";


 class QuizApp extends Component {
     // storing the question bank
     state = {
        questionBank: [],
        score: 0,
        responses: 0
     };
     // updating the questions(updating a state variable)
     getQuestions = () => {
         quizService().then(question => {
             this.setState({
                 questionBank: question
             });
         });
     };
     // get the questions
     computeAnswer = (answer, correctAnswer) => {
         if (answer === correctAnswer) {
           this.setState({
               score: this.state.score + 1
           });
         }
     
     this.setState({
         responses: this.state.responses < 5 ? this.state.responses + 1 : 5 
     });
 };
 playAgain = () => {
     this.getQuestions();
     this.setState({
         score: 0,
         responses: 0
     });
 };

    componentDidMount() {
        this.getQuestions();
    }
  render() {
    return (
      <div className="container">
        <div className="title">KnowledgeApp Quiz</div>
        {this.state.questionBank.length > 0 && 
        this.state.responses < 5 &&
        this.state.questionBank.map(
            ({question, answers, correct, questionId}) => 
        (
           <QuestionBox 
           question={question} 
           options={answers} 
           key={questionId}
           selected={answer => this.computeAnswer(answer, correct)}
           />
        )
        )}
        {this.state.responses === 5 ? (<Result score={this.state.score} playAgain={this.playAgain} />) : null}
      </div>
    );
  }
}


ReactDOM.render(<QuizApp />, document.getElementById("root"));
