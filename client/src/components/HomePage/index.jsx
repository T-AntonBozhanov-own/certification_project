import { Header } from "../Header"
import { Question } from "../Question"
import { Options } from "../Options"
import style from './homePage.module.css'
import { Navigate } from "react-router-dom"
import {useSelector, useDispatch} from 'react-redux'
import { useEffect } from "react"
import {getQuizes} from '../../reducers/quizReducer'

export const HomePage = () => {
    const quiz = useSelector((state) => state.quiz);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getQuizes())
    }, [])
    
    const questionsLength = quiz?.data?.[0]?.questions?.length ?? 0
  
    return (<div className={style.container}>
                <Header/>
                <div className={style.content}>
                    <Question question={'question'} title={`${quiz?.activeQuestion}/${questionsLength}`}/>
                    <Options />
                </div> 
            </div>)
   
}