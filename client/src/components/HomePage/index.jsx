import { Header } from "../Header"
import { Question } from "../Question"
import { Options } from "../Options"
import style from './homePage.module.css'
import { Navigate } from "react-router-dom"
import {useSelector, useDispatch} from 'react-redux'
import { useEffect } from "react"
import {getQuizes} from '../../reducers/quizReducer'

export const HomePage = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getQuizes())
    }, [])
  
    return user.isLoggedIn ? 
        <div className={style.container}>
            <Header/>
            <div className={style.content}>
                <Question question={'question'} title={'9/10'}/>
                <Options />
            </div> 
        </div> : <Navigate to="/login" replace />;
   
}