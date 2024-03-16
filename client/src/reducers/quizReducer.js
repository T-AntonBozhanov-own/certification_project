import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const FETCH_ACTION = 'quiz/fetchQuizes'
export const GET_RESULT_ACTION = 'quiz/getQuizResult'

export const getQuizes = createAsyncThunk(
  FETCH_ACTION,
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        'http://localhost:3001/api/quiz', { withCredentials: true })
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  },
)

export const getQuizResult = createAsyncThunk(
  GET_RESULT_ACTION,
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/quiz', data, { withCredentials: true })
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
    isFetching: false,
    activeQuiz: null,
    answers: [],
    quizResult: null,
    isFetchingResult: true
  },
  reducers: {
    selectQuiz(state, action) {
      state.activeQuiz = action.payload
    },
    setAnswer(state, action) {
      state.answers = state.answers.concat(action.payload)
    },
    setBackToSelectQuizes(state) {
      state.answers = []
      state.activeQuiz = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getQuizes.pending, (state) => {
      state.data = []
      state.isFetching = true
    })
    builder.addCase(getQuizes.fulfilled, (state, { payload }) => {
      state.data = payload
      state.isFetching = false
    })
    builder.addCase(getQuizes.rejected, (state, action) => {
      state.data = []
      state.isFetching = false
    })
    builder.addCase(getQuizResult.pending, (state) => {
      state.quizResult = null
      state.isFetchingResult = false
    })
    builder.addCase(getQuizResult.fulfilled, (state, { payload }) => {
      state.quizResult = payload
      state.isFetchingResult = false
    })
    builder.addCase(getQuizResult.rejected, (state, action) => {
      state.quizResult = null
      state.isFetchingResult = false
    })
  },
})

const { actions, reducer } = quizSlice
export const { selectQuiz, setAnswer, setBackToSelectQuizes } = actions;
export default reducer
