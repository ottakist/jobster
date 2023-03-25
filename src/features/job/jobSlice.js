import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { createJobThunk } from './jobThunk';

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
  },
});
export const { handleChange, clearValues } = jobSlice.actions;
export default jobSlice.reducer;
