import { logoutUser } from '../user/userSlice';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { clearValues } from './jobSlice';
import { showLoading,getAllJobs } from '../allJobs/allJobsSlice';
import authHeader from '../../utils/authHeader';
export const createJobThunk = async (url, job, thunkAPI) => {
  try {
    const response = await customFetch.post(url, job, authHeader(thunkAPI));
    thunkAPI.dispatch(clearValues());
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const deleteJobThunk = async (url, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const response = await customFetch.delete(url, authHeader(thunkAPI));
    thunkAPI.dispatch(getAllJobs());
    return response.data;
  } catch (error) {
   return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const editJobThunk = async (url, job, thunkAPI) => {
  try {
    const response = await customFetch.patch(url, job, authHeader(thunkAPI));
    thunkAPI.dispatch(clearValues());
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
