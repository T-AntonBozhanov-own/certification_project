import style from './header.module.css' 
import MainLogo from '../../assets/logo.png'
import { useSelector, useDispatch } from 'react-redux' 
import {logout} from '../../reducers/userReducer'
 
export const Header = () => {
    const {data: {name}} = useSelector((state) => state.user)
    const dispatch = useDispatch()


   return (<div className={style.container}>
        <div className={style.logo}>
            <img src={MainLogo} alt="Logo"/>
        </div>
        <div className={style.username}>
            {`Hello ${name}`}
            <button className={style.logout} onClick={() => dispatch(logout())}>Logout</button>
        </div>
    </div>)
}

