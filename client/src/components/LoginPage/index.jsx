import styles from './loginPage.module.css'
import { useSelector, useDispatch } from 'react-redux'
import {login, signUp} from '../../reducers/userReducer'
import {Navigate, redirect} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { LoginComponent } from './loginComponent'
import { SignUpComponent } from './signUpComponent'


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
                <LoginComponent handleSubmitLogin={handleSubmitLogin}/>
                {isShowSignUp ? null : <button onClick={() => setIsShowSignup(true)}>Click here for sign up</button>}
                {isShowSignUp ? 
                    <SignUpComponent 
                        setIsShowSignup={user.setIsShowSignup} 
                        handleSubmitSignup={handleSubmitSignup}
                    /> : null}
            </div>
    )
}