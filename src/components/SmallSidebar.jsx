import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Wrapper from '../assets/wrappers/SmallSidebar';
import Logo from './Logo';
import NavLinks from './NavLinks';
import { FaTimes } from 'react-icons/fa';
import { toggleSidebar } from '../features/user/userSlice';
const SmallSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const closeSidebar = () => {
    dispatch(toggleSidebar());
  };
  return (
    <Wrapper>
      <div className={`sidebar-container ${isSidebarOpen && 'show-sidebar'}`}>
        <div className='content'>
          <button className='close-btn' onClick={() => closeSidebar()}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks closeSidebar={closeSidebar}></NavLinks>
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
