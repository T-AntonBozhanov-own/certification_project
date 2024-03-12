import { Header } from "../Header"
import { Question } from "../Question"
import { Options } from "../Options"
import style from './homePage.module.css'

export const HomePage = () => (
    <div className={style.container}>
        <Header/>
        <div className={style.content}>
            <Question question={'question'} title={'9/10'}/>
            <Options />
        </div>
    </div>
)