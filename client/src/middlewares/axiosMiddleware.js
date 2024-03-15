import axios from 'axios'
import broeserHistory from '../utils/browserHistory'

export const axiosMiddleware = (store) => (next) => (action) => {
  console.log('action:', action)
  setInterceptors(store)

  return next(action)
}

export const setInterceptors = (store) => {
  if (!store) {
    return
  }

  axios.interceptors.response.use(
    function (response) {
      console.log('response', response)
      console.log('inside interceptors', store.getState())
      return response
    },
    function (error) {
      console.log('error', error)
      console.log('inside interceptors - error', store.getState())
      broeserHistory.replace('/login')
      return Promise.reject(error)
    }
  )
}
