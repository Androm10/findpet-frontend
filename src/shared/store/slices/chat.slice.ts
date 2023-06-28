import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatEntity } from 'core/entities/chat.entity';
import { MessageEntity } from 'core/entities/message.entity';

interface ChatState {
  chats: ChatEntity[];
}

const initialState: ChatState = {
  chats: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChats(state, action: PayloadAction<ChatEntity[]>) {
      state.chats = action.payload;
    },
  },
});

export const chatReducer = chatSlice.reducer;
export const chatActions = chatSlice.actions;
