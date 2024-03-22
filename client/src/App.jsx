import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'

/**
 * Importing other components
 */
import {HomePage} from './components/HomePage'
import {LoginPage} from './components/LoginPage'
import {QuizPage} from './components/QuizPage'
import customHistory from './utils/browserHistory';
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from './reducers/userReducer'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
  }, [])

  return (
    <HistoryRouter history={customHistory}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/quiz" element={<QuizPage />} />
        </Routes>
    </HistoryRouter>
  );
}

export default App
