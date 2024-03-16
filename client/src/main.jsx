import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { axiosMiddleware } from './middlewares/axiosMiddleware.js'

/**
 * Necessary for adding redux toolkit
 */
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

/**
 * Importing reducers
 */
import userReducer from './reducers/userReducer.js'
import quizReducer from './reducers/quizReducer.js'

/**
 * Creating the store w/reducers
 */
const store = configureStore({
  reducer: {
    user: userReducer,
    quizes: quizReducer
  },
  middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(axiosMiddleware)
    },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
