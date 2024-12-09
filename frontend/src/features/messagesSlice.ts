import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axiosAPI from "../axiosApi.ts";

export interface Message {
    id: string;
    author: string;
    message: string;
    datetime: string;
}
interface MessagesState {
    messages: Message[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}
const initialState: MessagesState = {
    messages: [],
    status: 'idle',
    error: null,
};
export const fetchMessages = createAsyncThunk<Message[]>('messages/fetchMessages', async () => {
    const response = await axiosAPI.get('/messages');
    return response.data;
});

export const sendMessage = createAsyncThunk<Message, {author: string; message: string}>(
    'messages/sendMessage', async (newMessage) => {
    const response = await axiosAPI.post('/messages', newMessage);
    return response.data;
});

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchMessages.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMessages.fulfilled, (state, action: PayloadAction<Message[]>) => {
                state.status = 'succeeded';
                state.messages = action.payload;
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            })
            .addCase(sendMessage.fulfilled, (state, action: PayloadAction<Message>) => {
                state.messages.push(action.payload);
            });
    },
});

export default messagesSlice.reducer;