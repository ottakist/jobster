import React, { useState } from 'react';
import Logo from '../components/logo';
import Wrapper from '../assets/wrappers/RegisterPage';
import FormRow from '../components/FormRow';
import { toast } from 'react-toastify';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error('Please Fill Out All Fields');
      return;
    }
  };
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {!values.isMember && (
          <FormRow
            type={'text'}
            name={'name'}
            value={values.name}
            handleChange={handleChange}
            labelText={'Name'}
          />
        )}
        <FormRow
          type={'email'}
          name={'email'}
          value={values.email}
          handleChange={handleChange}
          labelText={'email'}
        />
        <FormRow
          type={'password'}
          name={'password'}
          value={values.password}
          handleChange={handleChange}
          labelText={'password'}
        />

        <button type='submit' className='btn btn-block'>
          submit
        </button>
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}

          <button type='button' onClick={toggleMember} className='member-btn'>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
