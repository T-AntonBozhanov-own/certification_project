import {LoginPage} from '../components/LoginPage'

export const ProtectedRoute = ({path, element}) => {
    const user = useSelector((state) => state.user);
  
    return user.isLoggedIn ? <Route path={path} element={element} /> : <Route path="/login" element={<LoginPage />} />;
  }