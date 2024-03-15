import {onLogin} from '../../services/personService'
import styles from './loginPage.module.css'
import { useSelector, useDispatch } from 'react-redux'
import {login} from '../../reducers/userReducer'
import {Navigate, redirect} from 'react-router-dom'
import { useEffect } from 'react'


export const LoginPage = () => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        debugger
        if(user.isLoggedIn) {
            redirect('/')
        }
    }, [user.isLoggedIn])

    const handleSubmit = (e) => {
        e.preventDefault()

        const user = {
            username: e.target.username.value,
            password: e.target.password.value
        }
        dispatch(login(user))
    }

    return (
        user.isLoggedIn ? 
            <Navigate to="/" replace /> :
             <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        name='username'
                        placeholder='username'
                    />
                    <input
                        name='password'
                        type='password'
                        placeholder='password'
                    />
                    <button type='submit'>Delete</button>
                </form>
            </div>
    )
}