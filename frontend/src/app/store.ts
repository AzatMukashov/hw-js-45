import { configureStore } from "@reduxjs/toolkit";
import MessagesReducer from "../features/messagesSlice.ts";

export const store = configureStore({
  reducer: {
    messages: MessagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
