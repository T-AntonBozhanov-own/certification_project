import styles from './loginPage.module.css'

export const SignUpComponent = ({handleSubmitSignup, isSignUpSuccess}) => (
    <div>
        <span>User SignUp</span>
        <form className={styles.form} onSubmit={handleSubmitSignup}>
            <input
                name='username'
                placeholder='username'
            />
            <input
                name='password'
                type='password'
                placeholder='password'
            />
            <button type='submit'>SignUp</button>
        </form>{
            isSignUpSuccess ? <span data-testid='successBage'>Now you can login with your username and password</span> : null}
    </div>

)