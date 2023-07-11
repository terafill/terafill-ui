import React, { useState, useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import { loginUser } from '../data/auth';
import { storeAuthData } from '../utils/security';

const LoginPage = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem('email');
  const [userData, setUserData] = useState({ email: email || '', password: '' });
  const [refreshLogin, setRefreshLogin] = useState(false);
  const shouldLoad = useRef(true);

  useEffect(() => {
    if (shouldLoad.current) {
      if (email) {
        setRefreshLogin(true);
      }
      shouldLoad.current = false;
    }
  }, []);

  const attemptLogin = async (e) => {
    e.preventDefault();
    const { response, error } = await loginUser(userData.email, userData.password);
    if (error) {
      toast.error(error);
    } else {
      storeAuthData(userData.email, userData.password, response.key_wrapping_key);
      toast.success('Login successful');
      navigate('/app/home');
    }
  };

  return (
    <div className='bg-gray-100 w-screen h-screen flex flex-col items-center justify-center'>
      <Navbar navbarType='login' />
      <div className='self-stretch flex-1 overflow-hidden flex flex-col items-center justify-center'>
        <form
          className='bg-white w-1/2 rounded-xl shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] overflow-hidden flex flex-col py-16 px-16 items-center justify-center gap-[32px]'
          onSubmit={attemptLogin}
        >
          <ToastContainer />
          <h4 className='m-0 relative text-3xl leading-[120%] font-bold text-black text-center'>
            Welcome
          </h4>

          <div className='relative w-2/3'>
            <label
              htmlFor='email'
              className='absolute rounded -top-3 left-1 inline-block bg-white px-1 text-sm font-medium text-gray-700'
            >
              Email
            </label>
            <input
              type='email'
              name='email'
              id='email'
              className='w-full rounded-md px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-100 sm:text-sm sm:leading-6'
              placeholder='jane@example.com'
              onChange={(e) => {
                setUserData((prevState) => ({ ...prevState, email: e.target.value }));
              }}
              value={userData.email}
              required
              disabled={refreshLogin ? true : false}
            />
          </div>

          <div className='relative w-2/3'>
            <label
              htmlFor='password'
              className='absolute rounded -top-3 left-1 inline-block bg-white px-1 text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <input
              type='password'
              name='password'
              id='password'
              className='w-full rounded-md px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-100 sm:text-sm sm:leading-6'
              placeholder='*********'
              onChange={(e) => {
                setUserData((prevState) => ({ ...prevState, password: e.target.value }));
              }}
              value={userData.password}
              required
            />
          </div>
          <Button buttonType='dark' label='Submit' type='submit' />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
