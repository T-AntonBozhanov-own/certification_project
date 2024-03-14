import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const FETCH_ACTION = 'quiz/fetchQuizes'

export const getQuizes = createAsyncThunk(
  FETCH_ACTION,
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        'http://localhost:3001/api/quiz')
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  },
)

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    data: [],
    isFetching: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getQuizes.pending, (state) => {
      state.data = {}
      state.isFetching = true
    })
    builder.addCase(getQuizes.fulfilled, (state, { payload }) => {
      state.data = payload
      state.isFetching = false
    })
    builder.addCase(getQuizes.rejected, (state, action) => {
      state.data = {}
      state.isFetching = false
    })
  },
})

export default quizSlice.reducer