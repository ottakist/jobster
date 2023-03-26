import { logoutUser } from '../user/userSlice';
import customFetch from '../../utils/axios';
import authHeader from '../../utils/authHeader';

export const getAllJobsThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.get(url, authHeader(thunkAPI));
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const getStatsThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.get(url, authHeader(thunkAPI));
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
