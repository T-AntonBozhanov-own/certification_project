import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const FETCH_ACTION = 'user/fetchUser'

export const login = createAsyncThunk(
  FETCH_ACTION,
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/login', user)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  },
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
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
  },
})

export default userSlice.reducer
