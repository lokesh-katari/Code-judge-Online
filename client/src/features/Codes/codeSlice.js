import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  error: null,
  loading: false,
  output: "",
  message: "",
};
export const compileCode = createAsyncThunk(
  "code/compile",
  async ({ code, language }) => {
    // console.log(`this is userRegister${myform}`);
    const { data } = await axios.post(
      "http://localhost:5000/api/v1/compile",
      { code, language },
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
    },
    [compileCode.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default codeSlice.reducer;
