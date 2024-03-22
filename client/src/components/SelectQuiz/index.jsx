import style from './selectQuiz.module.css'
import {Link} from 'react-router-dom'

export const SelectQuiz = ({quizes = [], selectQuiz, editQuiz, removeQuiz}) => {
    return (
        <div className={style.container}>
            <Link to={{pathname: "/quiz"}}>Add new quiz</Link>
            <div>
                <span>Please select quiz</span>
                <div className={style.quiz_list}>
                    {quizes.map(item => (
                        <div>
                            <button key={item.name} className={style.quiz_button} onClick={() => selectQuiz(item.name)}>{item.name}</button>
                            <button onClick={() => editQuiz(item.name)} style={{ cursor: 'pointer' }}>Edit</button>
                            <button onClick={() => removeQuiz(item.name)} style={{ cursor: 'pointer' }}>❌</button>
                        </div>))}
                </div>
            </div>    
        </div>
    )
}