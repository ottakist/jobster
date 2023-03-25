import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAllJobsThunk } from './allJobsThunk';

const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};
export const getAllJobs = createAsyncThunk(
  'allJobs/getJobs',
  async (_, thunkAPI) => getAllJobsThunk('/jobs', thunkAPI)
);
const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

const allJobsSlice = createSlice({
  name: 'allJobs',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      console.log(name, value);
      state[name] = value;
    },
    clearValues: () => {
      return {
        ...initialState,
      };
    },
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    // getJobs
    builder.addCase(getAllJobs.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(getAllJobs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.jobs = payload.jobs;
        state.totalJobs = payload.totalJobs;
        // state.numOfPages = payload.numOfPages
      }),
      builder.addCase(getAllJobs.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});
export const { handleChange, clearValues,showLoading, hideLoading } =
  allJobsSlice.actions;
export default allJobsSlice.reducer;
