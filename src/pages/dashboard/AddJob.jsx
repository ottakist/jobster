import React from 'react';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import FormRow from '../../components/FormRow';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import FormRowSelect from '../../components/FormRowSelect';
import { handleChange, clearValues } from '../../features/job/jobSlice';
import { createJob } from '../../features/job/jobSlice';

const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      toast.error('Please Fill Out All Fields');
      return;
    }
    dispatch(createJob({ position, company, jobLocation, jobType, status }));
  };
  const handleInput = (e) => {
    console.log(e.target.value);
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>

        <div className='form-center'>
          <FormRow
            type='text'
            name='position'
            value={position}
            handleChange={handleInput}
          />

          <FormRow
            type='text'
            name='company'
            value={company}
            handleChange={handleInput}
          />

          <FormRow
            type='text'
            labelText='job location'
            name='jobLocation'
            value={jobLocation}
            handleChange={handleInput}
          />
          {/* job status */}
          <FormRowSelect
            name='status'
            value={status}
            handleChange={handleInput}
            list={statusOptions}
          />
          {/* job type */}
          <FormRowSelect
            name='jobType'
            labelText='job type'
            value={jobType}
            handleChange={handleInput}
            list={jobTypeOptions}
          />
          {/* btn container */}
          <div className='btn-container'>
            <button
              type='button'
              className='btn btn-block clear-btn'
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
