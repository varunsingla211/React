import {useCallback, useState} from 'react';
import QUESTIONS from '../questions.js';
import quizCompleteImg from '../assets/quiz-complete.png';
import Question from './Question.jsx';

export default function Quiz() { 
    const [userAnswers, setUserANswers] = useState([]);
    const activeQuestionIndex = userAnswers.length 
    
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;  

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUserANswers((previousUserAnswers) => {
            return [...previousUserAnswers, selectedAnswer];
        });
    }, [activeQuestionIndex]);

    const handleSkipAnswer = useCallback(() => {
        handleSelectAnswer(null)
    }, [handleSelectAnswer])

    if(quizIsComplete){
        return <div id = "summary">
            <img src={quizCompleteImg} alt = "Trophy Icon"/>
            <h2>Quiz Complete</h2>
        </div>
    }

    return <div id = "quiz">
        <Question 
            key={activeQuestionIndex}
            answers={QUESTIONS[activeQuestionIndex].answers}
            onSelectAnswer={handleSelectAnswer}
            onSkipAnswer={handleSkipAnswer}
            index={activeQuestionIndex}
        />
    </div>
}