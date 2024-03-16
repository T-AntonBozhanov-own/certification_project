import { Header } from "../Header"
import { Question } from "../Question"
import { Options } from "../Options"
import style from './homePage.module.css'
import {useSelector, useDispatch} from 'react-redux'
import { useEffect } from "react"
import {getQuizes, selectQuiz, setAnswer, setBackToSelectQuizes, getQuizResult} from '../../reducers/quizReducer'
import { SelectQuiz } from "../SelectQuiz"

export const HomePage = () => {
    const quiz = useSelector((state) => {
       return state.quizes
    });

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getQuizes())
    }, [])

    const handleSelectQuiz = (name) => {
        dispatch(selectQuiz(name))
    }

    const getActiveQuiz = () => {
        const selectedQuiz = quiz.data.find(item => item.name === quiz.activeQuiz)

        return selectedQuiz
    }

    const handleOptionSelect = (answer) => {
        dispatch(setAnswer(answer))
    }

    const handleBackToQuizes = () => {
        dispatch(setBackToSelectQuizes())
    }

    useEffect(() => {
        if(quiz?.answers.length === getActiveQuiz()?.questions?.length && quiz.isFetchingResult) {
            dispatch(getQuizResult({
                name: quiz.activeQuiz,
                answers: quiz.answers
            }))
        }
    }, [quiz, getActiveQuiz])
  
    return quiz ? (<div className={style.container}>
                <Header/>
                    {quiz?.activeQuiz ? 
                      <>
                        {
                            (quiz?.answers.length === getActiveQuiz()?.questions?.length) ?
                                <div>
                                    <span>{`Your result is ${quiz?.quizResult?.result ?? 0}`}</span>
                                    <button onClick={handleBackToQuizes}>Back for select quiz</button>
                                </div> :
                                <>
                                    <div className={style.content}>
                                        <Question 
                                            question={getActiveQuiz()?.questions[quiz?.answers.length]?.question ?? []} 
                                            title={`${quiz?.answers.length + 1}/${getActiveQuiz()?.questions?.length ?? 0}`}
                                        />
                                        <Options options={getActiveQuiz()?.questions[quiz?.answers.length].options} onOptionSelect={handleOptionSelect}/>
                                    </div>
                                </> 
                        } 
                       </> : <SelectQuiz quizes={quiz.data} selectQuiz={handleSelectQuiz} />
                    }
            </div>): null
   
}