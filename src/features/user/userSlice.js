import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  registerUserThunk,
  loginUserThunk,
  updateUserThunk,
} from './userThunk';
import {
  getUserFromLocalStorage,
  addUserToLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage';
const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
};
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => registerUserThunk('/auth/register', user, thunkAPI)
);
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, thunkAPI) => loginUserThunk('/auth/login', user, thunkAPI)
);
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user, thunkAPI) => updateUserThunk('/auth/updateUser', user, thunkAPI)
);
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
    },
  },
  extraReducers: (builder) => {
    // register user
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(registerUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        addUserToLocalStorage(user);
        state.user = user;
        toast.success(`Hello ${user.name}`);
      }),
      builder.addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      }),
      // lohin user
      builder.addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        addUserToLocalStorage(user);
        state.user = user;
        toast.success(`Welcome back ${user.name}`);
      }),
      builder.addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
    // update user
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(updateUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        toast.success(`User updated`);
        addUserToLocalStorage(user);
      }),
      builder.addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});
export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer;
