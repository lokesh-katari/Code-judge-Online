import { configureStore } from "@reduxjs/toolkit";

import UserSlice from "../features/User/UserSlice";

export const store = configureStore({
  reducer: {
    userSlice: UserSlice,
  },
});
