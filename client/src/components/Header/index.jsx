import { useSelector, useDispatch } from 'react-redux' 
import {logout} from '../../reducers/userReducer'
import { HeaderComponent } from './headerComponent'
 
export const Header = () => {
    const {data: {name}} = useSelector((state) => state.user)
    const dispatch = useDispatch()


   return <HeaderComponent name={name} handleClick={() => dispatch(logout())} />
}

