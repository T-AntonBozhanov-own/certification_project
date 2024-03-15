import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const LOGIN_ACTION = 'user/login'
// export const SET_LOGGED_IN_ACTION = 'user/setIsLoggedIn'
export const FETCH_USER_ACTION = 'user/fetchUser'

export const login = createAsyncThunk(
  LOGIN_ACTION,
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/login', user, { withCredentials: true })
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
        'http://localhost:3001/api/user', { withCredentials: true })
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
      state.isLoggedIn = true
      state.isFetching = false
    })
    builder.addCase(getUser.rejected, (state, action) => {
      state.data = {}
      state.isLoggedIn = false
      state.isFetching = false
    })
  },
})

const { actions, reducer } = userSlice
// export const { setIsLoggedIn } = actions;
export default reducer


