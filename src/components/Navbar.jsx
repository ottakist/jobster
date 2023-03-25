import React, { useState } from 'react';
import Wrapper from '../assets/wrappers/Navbar';
import {
  FaAlignLeft,
  FaUserCircle,
  FaCaretDown,
  FaCaretUp,
} from 'react-icons/fa';
import Logo from './Logo';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, toggleSidebar } from '../features/user/userSlice';
const Navbar = () => {
  const { user } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const [showLogout, setShowLogout] = useState(false);
  return (
    <Wrapper>
      <div className='nav-center'>
        <button
          className='toggle-btn'
          type='button'
          onClick={() => dispatch(toggleSidebar())}
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className='logo-text'>dashboard</h3>
        </div>
        <div className='btn-container'>
          <button
            type='button'
            className='btn'
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {`${user.name}`}
            {!showLogout ? <FaCaretDown /> : <FaCaretUp />}
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button
              type='button'
              className='dropdown-btn'
              onClick={() => dispatch(logoutUser('Logging out...'))}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
