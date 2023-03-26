import React from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../assets/wrappers/SearchContainer';
import FormRowSelect from './FormRowSelect';
import FormRow from './FormRow';
import { handleChange, clearFilters } from '../features/allJobs/allJobsSlice';
const SearchContainer = () => {
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((store) => store.allJobs);
  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };
  return (
    <Wrapper>
      <form className='form'>
        <h3>Search form</h3>

        <div className='form-center'>
          <FormRow
            type='text'
            name='search'
            value={search}
            handleChange={handleInput}
          />

          <FormRowSelect
            labelText={'Status'}
            name='searchStatus'
            value={searchStatus}
            handleChange={handleInput}
            list={['all', ...statusOptions]}
          />

          <FormRowSelect
            labelText='Type'
            name='searchType'
            value={searchType}
            handleChange={handleInput}
            list={['all', ...jobTypeOptions]}
          />
          <FormRowSelect
            labelText='Sort'
            name='sort'
            value={sort}
            handleChange={handleInput}
            list={[...sortOptions]}
          />

          {/* btn container */}
          <div className='btn-container'>
            <button
              type='button'
              className='btn btn-block btn-danger'
              onClick={() => dispatch(clearFilters())}
            >
              clear
            </button>
            {/* <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button> */}
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
