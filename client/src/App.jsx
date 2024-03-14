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

import About from './components/About'

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<HomePage />} />
          <Route path="/about" element={<About />} />
        </Routes>
    </Router>
  );
}

export default App
