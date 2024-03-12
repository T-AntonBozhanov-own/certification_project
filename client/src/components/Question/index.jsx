import style from './question.module.css'

export const Question = ({question, title}) => (
    <div className={style.container}>
        <div className={style.count}>{title}</div>
        <div className={style.question}>{question}</div>
    </div>
)