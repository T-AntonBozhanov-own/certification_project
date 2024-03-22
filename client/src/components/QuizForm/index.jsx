import { Field } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'

export const QuizForm = ({handleSubmit, mutators: { push }, isNameFieldDisabled}) =>  (
        <form onSubmit={handleSubmit}> 
            <div>
                <label>Quiz name</label>
                <Field name="name" component="input" placeholder="Quiz name" disabled={isNameFieldDisabled} />
            </div>
            <FieldArray name="questions">
              {({ fields }) =>
                fields.map((name, index) => (
                  <div key={name}>
                    <label>Question. #{index + 1}</label>
                    <Field
                      name={`${name}.question`}
                      component="input"
                      placeholder="Question"
                    />
                    <Field
                      name={`${name}.options`}
                      component="input"
                      placeholder="options"
                    />
                    <Field
                      name={`${name}.correct_answer`}
                      component="input"
                      placeholder="correct answer"
                    />
                    <Field
                      name={`${name}.points`}
                      component="input"
                      placeholder="points"
                    />
                    <span
                      onClick={() => fields.remove(index)}
                      style={{ cursor: 'pointer' }}
                    >
                      ❌
                    </span>
                  </div>
                ))
              }
            </FieldArray>
            <button
                type="button"
                onClick={() => push('questions', undefined)}
              >
                Add Question
              </button>

            <button type='submit'>Submit quiz</button>
        </form>
)

