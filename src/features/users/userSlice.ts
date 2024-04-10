import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../../types';

interface UsersState {
  users: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UsersState = JSON.parse(localStorage.getItem('usersState') || 'null') || {
  users: [],
  status: 'idle',
  error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
  return response.data;
});

export const addUser = createAsyncThunk('users/addUser', async (user: User) => {
  const response = await axios.post<User>('https://jsonplaceholder.typicode.com/users', user);
  return response.data;
});

export const updateUser = createAsyncThunk('users/updateUser', async ({ id, user }: { id: number; user: User }) => {
  const response = await axios.put<User>(`https://jsonplaceholder.typicode.com/users/${id}`, user);
  return response.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id: number) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
  return id;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = 'succeeded';
        state.users = action.payload;
        localStorage.setItem('usersState', JSON.stringify(state));
      })
      .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users.push(action.payload);
        localStorage.setItem('usersState', JSON.stringify(state));
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
          localStorage.setItem('usersState', JSON.stringify(state));
        }
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.users = state.users.filter(user => user.id !== action.payload);
        localStorage.setItem('usersState', JSON.stringify(state));
      });
  },
});

export default usersSlice.reducer;
