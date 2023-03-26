import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { createJobThunk, deleteJobThunk, editJobThunk } from './jobThunk';
import { showLoading, hideLoading } from '../allJobs/allJobsSlice';
const initialState = {
  isLoading: false,
  position: '',
  company: '',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  isEditing: false,
  editJobId: '',
};
export const createJob = createAsyncThunk(
  'job/createJob',
  async (user, thunkAPI) => createJobThunk('/jobs', user, thunkAPI)
);
export const deleteJob = createAsyncThunk(
  'job/deleteJob',
  async (jobId, thunkAPI) => deleteJobThunk(`/jobs/${jobId}`, thunkAPI)
);
export const editJob = createAsyncThunk(
  'job/editJob',
  async ({ jobId, job }, thunkAPI) =>
    editJobThunk(`/jobs/${jobId}`, job, thunkAPI)
);
const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
      handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => {
      return {
        ...initialState,
      };
    },
    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: (builder) => {
    // createJob
    builder.addCase(createJob.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(createJob.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success(`Job added`);
      }),
      builder.addCase(createJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
    builder.addCase(deleteJob.fulfilled, (state, { payload }) => {
      toast.success(payload);
    });
    builder.addCase(deleteJob.rejected, (state, { payload }) => {
      toast.error(payload);
    });
    builder.addCase(editJob.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editJob.fulfilled, (state) => {
      state.isLoading = false;
      toast.success('Job Modified...');
    });
    builder.addCase(editJob.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    });
  },
});
export const { handleChange, clearValues, setEditJob } = jobSlice.actions;
export default jobSlice.reducer;
