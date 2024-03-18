import style from './header.module.css' 
import MainLogo from '../../assets/logo.png'

export const HeaderComponent = ({name, handleClick}) => (
    <div className={style.container}>
        <div className={style.logo}>
            <img src={MainLogo} alt="Logo"/>
        </div>
        <div className={style.username}>
            {`Hello ${name}`}
            <button className={style.logout} onClick={handleClick}>Logout</button>
        </div>
    </div>
)