import { logoutUser } from '../user/userSlice';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import authHeader from '../../utils/authHeader';

export const getAllJobsThunk = async (thunkAPI) => {
  const { page, search, searchStatus, searchType, sort } =
    thunkAPI.getState().allJobs;
  let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
  if (search) {
    url = url + `&search=${search}`;
  }
  try {
    const response = await customFetch.get(url, authHeader(thunkAPI));
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const getStatsThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.get(url, authHeader(thunkAPI));
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
