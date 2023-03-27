import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAllJobsThunk, getStatsThunk } from './allJobsThunk';

const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};
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
export const getAllJobs = createAsyncThunk(
  'allJobs/getJobs',
  async (_, thunkAPI) => getAllJobsThunk(thunkAPI)
);
export const getStats = createAsyncThunk(
  'allJobs/getStats',
  async (_, thunkAPI) => getStatsThunk('/jobs/stats', thunkAPI)
);

const allJobsSlice = createSlice({
  name: 'allJobs',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearFilters: (state) => {
      return {
        ...state,
        ...initialFiltersState,
      };
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    clearJobsState:()=> initialState
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
        state.numOfPages = payload.numOfPages;
      }),
      builder.addCase(getAllJobs.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      }),
      // getStats
      builder.addCase(getStats.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(getStats.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.stats = payload.defaultStats;
        state.monthlyApplications = payload.monthlyApplications;
      }),
      builder.addCase(getStats.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});
export const {
  handleChange,
  clearFilters,
  showLoading,
  hideLoading,
  changePage,
  clearJobsState,
} = allJobsSlice.actions;
export default allJobsSlice.reducer;
