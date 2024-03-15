import style from './header.module.css' 
import MainLogo from '../../assets/logo.png'
import { useSelector } from 'react-redux' 

export const Header = () => {
    const {data: {name}} = useSelector((state) => state.user)

   return (<div className={style.container}>
        <div className={style.logo}>
            <img src={MainLogo} alt="Logo"/>
        </div>
        <div className={style.username}>
            {`Hello ${name}`}
        </div>
    </div>)
}

