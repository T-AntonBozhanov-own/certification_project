import { QuizForm } from "../QuizForm"
import { Form } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import {useDispatch, useSelector} from 'react-redux'
import { addNewQuiz, setBackToSelectQuizes, editQuiz } from "../../reducers/quizReducer"
import { useNavigate, useLocation } from "react-router-dom";
import {useEffect, useState} from 'react'

export const QuizPage = () => {
    const [defaultValues, setDefaultValues] = useState(null)
    const navigate = useNavigate()
    const location = useLocation();

    const quiz = useSelector((state) => {
        return state.quizes
     });
    const dispatch = useDispatch()
    const onSubmit = (data) => dispatch(defaultValues ? editQuiz(data) : addNewQuiz(data))

    useEffect(() => {
        if(quiz.isQuizSubmitted) {
            navigate('/')
            dispatch(setBackToSelectQuizes())
        }
    }, [quiz.isQuizSubmitted]);

    useEffect(() => {
        const quizToEdit = quiz?.data?.find(item => item?.name === location?.state?.name)
        if(quizToEdit) {
            setDefaultValues({
                ...quizToEdit,
                questions: quizToEdit.questions.map(item => ({...item, options: item.options.join(',')}))
            })
        }
    }, [location.state])

    return (
        <div>
            <Form
                onSubmit={onSubmit}
                mutators={{
                    ...arrayMutators
                  }}
                initialValues={defaultValues}  
                render={({
                    handleSubmit,
                    form: {mutators},
                }) => (<QuizForm 
                        handleSubmit={handleSubmit}
                        mutators={mutators}
                        isNameFieldDisabled={Boolean(defaultValues)}
                    />)}  
            />
        </div>
    )
}