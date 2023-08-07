import React, { useState, useEffect, useRef, memo } from 'react';

import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Button from '../../components/Button';
import Navbar from '../../components/Navbar';
import { loginUser } from '../../data/auth';
import { storeAuthData } from '../../utils/security';

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
      storeAuthData(userData.email, userData.password, response.keyWrappingKey);
      toast.success('Login successful');
      navigate('/app/home');
    }
  };

  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center bg-gray-100'>
      <Navbar navbarType='login' />
      <div className='flex flex-1 flex-col items-center justify-center self-stretch overflow-hidden'>
        <form
          className='flex w-1/2 flex-col items-center justify-center gap-[32px] overflow-hidden rounded-xl bg-white px-16 py-16 shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)]'
          onSubmit={attemptLogin}
        >
          <ToastContainer />
          <h4 className='relative m-0 text-center text-3xl font-bold leading-[120%] text-black'>
            Welcome
          </h4>

          <div className='relative w-2/3'>
            <label
              htmlFor='email'
              className='absolute -top-3 left-1 inline-block rounded bg-white px-1 text-sm font-medium text-gray-700'
            >
              Email
            </label>
            <input
              type='email'
              name='email'
              id='email'
              data-test='email'
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
              className='absolute -top-3 left-1 inline-block rounded bg-white px-1 text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <input
              type='password'
              name='password'
              id='password'
              data-test='password'
              className='w-full rounded-md px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-100 sm:text-sm sm:leading-6'
              placeholder='*********'
              onChange={(e) => {
                setUserData((prevState) => ({ ...prevState, password: e.target.value }));
              }}
              value={userData.password}
              required
            />
          </div>
          <Button buttonType='dark' label='Submit' type='submit' data-test='submit' />
        </form>
      </div>
    </div>
  );
};

export default memo(LoginPage);
