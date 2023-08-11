import { configureStore } from "@reduxjs/toolkit";

import UserSlice from "../features/User/UserSlice";
import codeSlice from "../features/Codes/codeSlice";

export const store = configureStore({
  reducer: {
    userSlice: UserSlice,
    codeSlice: codeSlice,
  },
});
