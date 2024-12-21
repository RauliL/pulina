import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type UIState = {
  currentChannel?: string;
  showChannelList: boolean;
  showUserList: boolean;
};

const initialState: Readonly<UIState> = {
  showChannelList: false,
  showUserList: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setCurrentChannel: (state, action: PayloadAction<string>) => {
      state.currentChannel = action.payload;
    },

    toggleChannelList: (state) => {
      state.showChannelList = !state.showChannelList;
    },

    toggleUserList: (state) => {
      state.showUserList = !state.showUserList;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type === "client/onChannelInfo",
      (
        state,
        { payload: { channel } }: PayloadAction<{ channel: string }>,
      ) => {
        state.currentChannel = channel;
      },
    );
  },
});
