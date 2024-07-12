import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUser = createAsyncThunk('user/fetchUser', async (username) => {
  const response = await axios.get(`https://api.github.com/users/${username}`);
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    entity: null,
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.entity = action.payload;
      state.status = 'succeeded';
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export default userSlice.reducer;
