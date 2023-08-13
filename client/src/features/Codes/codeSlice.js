import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  error: null,
  loading: false,
  output: "",
  message: "",
  testCasesPassed: [],
};
export const compileCode = createAsyncThunk(
  "code/compile",
  async ({ code, language, id }) => {
    // console.log(`this is userRegister${myform}`);
    const { data } = await axios.post(
      "http://localhost:5000/api/v1/compile",
      { code, language, id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return data;
  }
);
export const submitCode = createAsyncThunk(
  "code/submit",
  async ({ code, language, id }) => {
    // console.log(`this is userRegister${myform}`);
    const { data } = await axios.post(
      "http://localhost:5000/api/v1/problem/submit",
      { code, language, id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return data;
  }
);

const codeSlice = createSlice({
  name: "codeSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [compileCode.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [compileCode.fulfilled]: (state, action) => {
      state.loading = false;
      let parOut = action.payload.output;
      state.output = parOut.replace(/\\n|\\r\\n|<br>/g, "\n");
      state.message = action.payload.msg;
      state.testCasesPassed = action.payload.testCases;
    },
    [compileCode.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [submitCode.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [submitCode.fulfilled]: (state, action) => {
      state.loading = false;
      let parOut = action.payload.output;
      state.output = parOut.replace(/\\n|\\r\\n|<br>/g, "\n");
      state.message = action.payload.msg;
      state.testCasesPassed = action.payload.testCases;
    },
    [submitCode.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default codeSlice.reducer;
