import React, { useEffect, useState } from 'react';
import Logo from '../components/Logo';
import Wrapper from '../assets/wrappers/RegisterPage';
import FormRow from '../components/FormRow';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

const Register = () => {
  const [userData, setUserData] = useState(initialState);
  const { user, isLoading } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = userData;
    if (!email || !password || (!isMember && !name)) {
      toast.error('Please Fill Out All Fields');
      return;
    }
    if (!isMember) {
      dispatch(registerUser({ name, email, password }));
      return;
    }
    dispatch(loginUser({ email, password }));
  };
  const toggleMember = () => {
    setUserData({ ...userData, isMember: !userData.isMember });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  }, [user]);
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <h3>{userData.isMember ? 'Login' : 'Register'}</h3>
        {!userData.isMember && (
          <FormRow
            type={'text'}
            name={'name'}
            value={userData.name}
            handleChange={handleChange}
            labelText={'Name'}
          />
        )}
        <FormRow
          type={'email'}
          name={'email'}
          value={userData.email}
          handleChange={handleChange}
          labelText={'email'}
        />
        <FormRow
          type={'password'}
          name={'password'}
          value={userData.password}
          handleChange={handleChange}
          labelText={'password'}
        />

        <button disabled={isLoading} type='submit' className='btn btn-block'>
          {`${isLoading ? 'loading...' : 'submit'}`}
        </button>
        <p>
          {userData.isMember ? 'Not a member yet?' : 'Already a member?'}

          <button type='button' onClick={toggleMember} className='member-btn'>
            {userData.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
