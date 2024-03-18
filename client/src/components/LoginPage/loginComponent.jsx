import styles from './loginPage.module.css'

export const LoginComponent = ({handleSubmitLogin}) => ( 
    <>
        <span>User login</span>
        <form className={styles.form} onSubmit={handleSubmitLogin}>
            <input
                name='username'
                placeholder='username'
            />
            <input
                name='password'
                type='password'
                placeholder='password'
            />
            <button type='submit'>Login</button>
        </form>
    </>
)