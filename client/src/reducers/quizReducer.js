import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ROUTES } from '../constants/apiRoutes'

export const FETCH_ACTION = 'quiz/fetchQuizes'
export const GET_RESULT_ACTION = 'quiz/getQuizResult'
export const ADD_NEW_QUIZ_ACTION = 'quiz/addNewQuiz'
export const EDIT_QUIZ_ACTION = 'quiz/editQuiz'

export const getQuizes = createAsyncThunk(
  FETCH_ACTION,
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        ROUTES.QUIZ._, { withCredentials: true })
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
        ROUTES.USER.GET_RESULT, data, { withCredentials: true })
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  },
)

export const addNewQuiz = createAsyncThunk(
  ADD_NEW_QUIZ_ACTION,
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        ROUTES.QUIZ.ADD, data, { withCredentials: true })
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  },
)

export const editQuiz = createAsyncThunk(
  EDIT_QUIZ_ACTION,
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        ROUTES.QUIZ.EDIT, data, { withCredentials: true })
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
    isFetchingResult: true,
    isQuizSubmitted: false
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
      state.isQuizSubmitted = false,
      state.quizResult = null,
      state.isFetchingResult = true
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
    builder.addCase(addNewQuiz.fulfilled, (state, { payload }) => {
      state.data = [
        ...state.data,
        payload
      ]
      state.isQuizSubmitted = true
    })
    builder.addCase(addNewQuiz.rejected, (state, action) => {
      state.isQuizSubmitted = false
    })
    builder.addCase(editQuiz.fulfilled, (state, { payload }) => {
      state.data = [
        ...(state.data.filter(item => item !== payload.name)),
        payload
      ]
      state.isQuizSubmitted = true
    })
    builder.addCase(editQuiz.rejected, (state, action) => {
      state.isQuizSubmitted = false
    })
  },
})

const { actions, reducer } = quizSlice
export const { selectQuiz, setAnswer, setBackToSelectQuizes } = actions;
export default reducer
