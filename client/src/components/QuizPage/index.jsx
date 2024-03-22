import { QuizForm } from "../QuizForm"
import { Form } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import {useDispatch, useSelector} from 'react-redux'
import { addNewQuiz, setBackToSelectQuizes } from "../../reducers/quizReducer"
import { useNavigate } from "react-router-dom";
import {useEffect} from 'react'

export const QuizPage = () => {
    const navigate = useNavigate()
    const quiz = useSelector((state) => {
        return state.quizes
     });
    const dispatch = useDispatch()
    const onSubmit = (data) => dispatch(addNewQuiz(data))

    useEffect(() => {
        if(quiz.isQuestSubmitted) {
            navigate('/')
            dispatch(setBackToSelectQuizes())
        }
    }, [quiz.isQuestSubmitted]);

    return (
        <div>
            <Form
                onSubmit={onSubmit}
                mutators={{
                    ...arrayMutators
                  }}
                render={({
                    handleSubmit,
                    form: {mutators},
                    pristine,
                    submitting,
                    values
                }) => (<QuizForm 
                        handleSubmit={handleSubmit}
                        mutators={mutators}
                    />)}  
            />
        </div>
    )
}