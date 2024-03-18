import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const LOGIN_ACTION = 'user/login'
export const LOGOUT_ACTION = 'user/logout'
export const SIGNUP_ACTION = 'user/signup'
export const FETCH_USER_ACTION = 'user/fetchUser'
import browserHistory from '../utils/browserHistory'
import { ROUTES } from '../constants/apiRoutes'

export const login = createAsyncThunk(
  LOGIN_ACTION,
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(
        ROUTES.LOGIN._, user, { withCredentials: true })
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message})
    }
  },
)

export const signUp = createAsyncThunk(
  SIGNUP_ACTION,
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(
        ROUTES.PERSON._, user, { withCredentials: true })
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  },
)

export const getUser = createAsyncThunk(
  FETCH_USER_ACTION,
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        ROUTES.USER._, { withCredentials: true })
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  },
)

export const logout = createAsyncThunk(
  LOGOUT_ACTION,
  async (_, thunkAPI) => {
    try {
      const response = await axios.delete(
        ROUTES.LOGIN._, { withCredentials: true })
      browserHistory.replace('/login')
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  },
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: true,
    isFetching: false,
    data: {},
    isSignUpSuccess: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.data = {}
      state.isFetching = true
    })
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.data = payload
      state.isLoggedIn = true
      state.isFetching = false
    })
    builder.addCase(login.rejected, (state, action) => {
      state.data = {}
      state.isLoggedIn = false
      state.isFetching = false
    })
    builder.addCase(getUser.pending, (state) => {
      state.data = {}
      state.isFetching = true
    })
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.data = payload
      state.isLoggedIn = false
      state.isFetching = false
    })
    builder.addCase(getUser.rejected, (state, action) => {
      state.data = {}
      state.isLoggedIn = false
      state.isFetching = false
    })
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.data = {}
      state.isSignUpSuccess = true
    })
    builder.addCase(signUp.rejected, (state, action) => {
      state.data = {}
      state.isSignUpSuccess = false
    })
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoggedIn = false
      state.isFetching = false
      state.data = {}
      state.isSignUpSuccess = false
    })
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoggedIn = false
      state.isFetching = false
      state.data = {}
      state.isSignUpSuccess = false
    })
  },
})

const { actions, reducer } = userSlice
export default reducer


