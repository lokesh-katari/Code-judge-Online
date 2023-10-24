import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  error: null,
  loading: false,
  output: "",
  message: "",
  testCasesPassed: [],
  processId: "",
};
export const compileCode = createAsyncThunk(
  "code/compile",
  async ({ code, language, id, isOnlineCompiler }) => {
    const { data } = await axios.post(
      "/api/v1/compile",
      { code, language, id, isOnlineCompiler },
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
  reducers: {
    fetchResult: (state, action) => {
      state.output = action.payload.output;
      state.testCasesPassed = action.payload.testCasesPassed;
      state.message = action.payload.msg;
      state.loading = false;
    },
    fetchResultLoading: (state, action) => {
      state.loading = true;
      state.error = null;
      state.processId = "";
    },
    fetchResultRejected: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.processId = "";
    },
  },
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
      state.testCasesPassed = action.payload.testCases ?? [];
    },
    [compileCode.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});
export const {
  fetchResult,
  fetchResultLoading,
  fetchResultRejected,
  submitCode,
} = codeSlice.actions;
export default codeSlice.reducer;

export const fetchResultFunc = (processId) => async (dispatch, getState) => {
  await dispatch(fetchResultLoading());
  const pollInterval = setInterval(async () => {
    console.log(processId);
    console.log("this is process id");
    try {
      let { data } = await axios.get(
        `/api/v1/problem/submit/fetch/${processId}`
      );
      if (data) {
        dispatch(
          fetchResult({
            output: data.result.output,
            testCasesPassed: data.result.testCases,
            msg: data.result.msg,
          })
        );
        clearInterval(pollInterval); // Stop polling after fetching data
      } else {
        fetchResultLoading(true);
      }
    } catch (error) {
      dispatch(fetchResultRejected("error while fetching the data"));
      clearInterval(pollInterval); // Stop polling on error
    }
  }, 500);
};
