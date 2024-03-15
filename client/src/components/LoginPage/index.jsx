import {onLogin} from '../../services/personService'
import styles from './loginPage.module.css'
import { useSelector, useDispatch } from 'react-redux'
import {login, signUp} from '../../reducers/userReducer'
import {Navigate, redirect} from 'react-router-dom'
import { useEffect, useState } from 'react'


export const LoginPage = () => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [isShowSignUp, setIsShowSignup] = useState(false)

    useEffect(() => {
        if(user.isLoggedIn) {
            redirect('/')
        }
    }, [user.isLoggedIn])

    const handleSubmitLogin = (e) => {
        e.preventDefault()

        const user = {
            username: e.target.username.value,
            password: e.target.password.value
        }
        dispatch(login(user))
    }

    const handleSubmitSignup = (e) => {
        e.preventDefault()

        const user = {
            username: e.target.username.value,
            password: e.target.password.value
        }
        dispatch(signUp(user))
    }

    return (
        user.isLoggedIn ? 
            <Navigate to="/" replace /> :
             <div className={styles.container}>
                <span>Login</span>
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
                {isShowSignUp ? null : <button onClick={() => setIsShowSignup(true)}>Click here for sign up</button>}
                {isShowSignUp ? <div>
                    <span>SignUp</span>
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
                    </form>
                    {user.isSignUpSuccess ? <span>Now you can login with your username and passwors</span> : null}
                </div> : null}
            </div>
    )
}