import style from './header.module.css' 
import MainLogo from '../../assets/logo.png'

export const Header = () => (
    <div className={style.container}>
        <div className={style.logo}>
            <img src={MainLogo} alt="Logo"/>
        </div>
        <div className={style.actions}>
            <button className={style.login_btn}>Login</button>
            <button className={style.sign_in_btn}>SignUp</button>
        </div>
    </div>
)

