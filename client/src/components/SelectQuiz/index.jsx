import style from './selectQuiz.module.css'

export const SelectQuiz = ({quizes = [], selectQuiz}) => {
    return (
        <div className={style.container}>
            <span>Please select quiz</span>
            <div className={style.quiz_list}>
                {quizes.map(item => <button key={item.name} className={style.quiz_button} onClick={() => selectQuiz(item.name)}>{item.name}</button>)}
            </div>
        </div>
    )
}