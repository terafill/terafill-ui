import React, { useState, useEffect, useRef } from 'react';

import {
  Outlet,
  useNavigate,
  useOutletContext,
} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import { initateSignupProcess, completeSignupProcess } from '../data/auth';
import { storeAuthData } from '../utils/security';

const countries = [
  'India',
  'China',
  'United States',
  'Indonesia',
  'Pakistan',
  'Brazil',
  'Nigeria',
  'Bangladesh',
  'Russia',
  'Mexico',
  'Japan',
  'Ethiopia',
  'Philippines',
  'Egypt',
  'Vietnam',
  'DR Congo',
  'Turkey',
  'Iran',
  'Germany',
  'Thailand',
];

export const CreateAccountForm = () => {
  const [userData, setUserData, setStepStatus] = useOutletContext();
  const navigate = useNavigate();

  const passwordRef = useRef(null);
  const passwordRepeatRef = useRef(null);

  useEffect(()=>{
    setStepStatus({
      1: "current",
      2: "upcoming"
    });
  }, []);

  const createAccountAction = async (e) =>{
    e.preventDefault();
    if (passwordRef.current.value != passwordRepeatRef.current.value) {
      toast.error("Passwords don't match!");
    } else {

      const {error} = await initateSignupProcess(userData.email);

      if (error){toast.error(error);}
      else {
        navigate('email-confirmation');
      }
    }
  };

  return (
    <form
      className='bg-white w-2/3 rounded-xl shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] overflow-hidden flex flex-col py-8 px-32 items-center justify-center gap-[16px]'
      onSubmit={createAccountAction}
    >
      <ToastContainer style={{ zIndex: 9999 }} />
      <h4 className='m-0 relative text-3xl leading-[120%] font-bold text-black text-center'>
        Create Account
      </h4>

      <span className='relative w-2/3 flex-auto flex flex-row justify-center gap-2' id='name'>
        <div className='relative w-full' id='first-name'>
          <label
            htmlFor='firstName'
            className='absolute rounded -top-3 left-1 inline-block bg-white px-1 text-sm font-medium text-gray-700'
          >
            First Name
          </label>
          <input
            type='text'
            name='firstName'
            id='firstName'
            className='w-full rounded-md px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-100 sm:text-sm sm:leading-6'
            placeholder='Jane'
            onChange={(e) => {
              setUserData((prevState) => ({ ...prevState, firstName: e.target.value }));
            }}
            value={userData.firstName}
            required
            title='Please enter first name'
          />
        </div>

        <div className='relative w-full' id='last-name'>
          <label
            htmlFor='lastName'
            className='absolute rounded -top-3 left-1 inline-block bg-white px-1 text-sm font-medium text-gray-700'
          >
            Last Name
          </label>
          <input
            type='text'
            name='lastName'
            id='lastName'
            className='w-full rounded-md px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-100 sm:text-sm sm:leading-6'
            placeholder='Smith'
            value={userData.lastName}
            onChange={(e) => {
              setUserData((prevState) => ({ ...prevState, lastName: e.target.value }));
            }}
          />
        </div>
      </span>

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
          value={userData.email}
          onChange={(e) => {
            setUserData((prevState) => ({ ...prevState, email: e.target.value }));
          }}
          required
          title='Please enter email'
        />
      </div>
      <div className='relative w-2/3'>
        <label
          htmlFor='password'
          className='absolute rounded -top-3 left-1 inline-block bg-white px-1 text-sm font-medium text-gray-700'
        >
          Master Password
        </label>
        <input
          ref={passwordRef}
          type='password'
          name='password'
          id='password'
          className='w-full rounded-md px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-100 sm:text-sm sm:leading-6'
          placeholder='*********'
          onChange={(e) => {
            setUserData((prevState) => ({ ...prevState, password: e.target.value }));
          }}
          required
        />
      </div>
      <div className='relative w-2/3'>
        <label
          htmlFor='name'
          className='absolute rounded -top-3 left-1 inline-block bg-white px-1 text-sm font-medium text-gray-700'
        >
          Re-enter Master Password
        </label>
        <input
          ref={passwordRepeatRef}
          type='password'
          name='passwordRepeat'
          id='passwordRepeat'
          className='w-full rounded-md px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-100 sm:text-sm sm:leading-6'
          placeholder='*********'
          required
        />
      </div>
      <p className='m-0 relative text-md text-red-500 font-bold text-center flex items-center justify-center w-[538px] h-12 shrink-0'>
        Note: Memorise this password and keep it safe.
      </p>
      <Button id='submit-button' buttonType='dark' label='Create Account' type='submit' />
    </form>
  );
};

export const EmailConfirmationForm = () => {
  // eslint-disable-next-line no-unused-vars
  const [userData, setUserData, setStepStatus] = useOutletContext();
  const navigate = useNavigate();

  const pinInputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const [pinState, setPinState] = useState(['', '', '', '', '', '']);
  const [pinIdx, setPinIdx] = useState(0);

  const submitButtonRef = useRef(null);

  useEffect(()=>{
    setStepStatus({
      1: "completed",
      2: "current"
    });
  }, []);

  useEffect(() => {
    pinInputRefs[pinIdx].current.focus();
  }, [pinIdx]);

  const handleFocus = (e, index) => {
    if (pinIdx != index) {
      setPinIdx(index);
    } else {
      // Do nothing
    }
  };

  const handleKeyDown = (e) => {
    const { key } = e;
    let tempPin = [...pinState];
    if (e.keyCode === 37 || e.keyCode === 8) {
      if (e.keyCode === 8) {
        tempPin[pinIdx] = '';
        setPinState(tempPin);
      }
      setPinIdx((pinIdx) => Math.max(0, pinIdx - 1));
    } else if (e.keyCode === 39) {
      setPinIdx((pinIdx) => Math.min(pinIdx + 1, pinInputRefs.length - 1));
    } else if (event.keyCode >= 48 && event.keyCode <= 57) {
      tempPin[pinIdx] = key[0];
      setPinState(tempPin);
      setPinIdx((pinIdx) => Math.min(pinIdx + 1, pinInputRefs.length - 1));
    }
  };

  const handleOnPaste = (e) => {
    const text = e.clipboardData.getData('Text');
    let textIdx = 0;
    let curPinIdx = pinIdx;
    let tempPin = [...pinState];
    while (textIdx < text.length && curPinIdx < pinInputRefs.length) {
      let char = text[textIdx];
      if (char >= '0' && char <= '9') {
        tempPin[curPinIdx] = char;
        textIdx += 1;
        curPinIdx += 1;
      } else {
        textIdx += 1;
      }
    }
    setPinState(tempPin);

    if (curPinIdx != pinIdx) {
      setPinIdx(Math.min(curPinIdx, pinInputRefs.length - 1));
    }
  };

  const signupConfirmationAction = async (e) => {
    e.preventDefault();
    const verification_code = [...pinState].join('');

    const {error} = await completeSignupProcess(
      userData.email,
      userData.password,
      verification_code,
      userData.firstName,
      userData.lastName,
    )
    if (error){toast.error(error);}
    else{
      storeAuthData(userData.email);
      toast.success("Signup successful");
      navigate('/login')
    }
  };

  return (
    <form
      className='bg-white rounded-xl shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] overflow-hidden flex flex-col py-8 px-32 items-center justify-center gap-[32px]'
      onSubmit={signupConfirmationAction}
    >
      <ToastContainer style={{ zIndex: 9999 }}/>
      <h4 className='m-0 relative text-4xl leading-[120%] font-bold text-black text-center'>
        Verify your email address
      </h4>
      <p className='m-0 relative text-xl text-background-dark text-center flex items-center w-[538px] h-12 shrink-0'>
        <span className='w-full'>
          <span>Enter verification code sent to email address</span>
          <b> {userData.email}</b>
        </span>
      </p>
      <div className='w-full flex flex-row justify-evenly'>
        {pinInputRefs.map((_, index) => (
          <input
            key={index}
            type='number'
            ref={pinInputRefs[index]}
            name={`pin-${index}`}
            id={`pin-${index}`}
            value={pinState[index]}
            maxLength={1}
            className='h-[4rem] w-[4rem] rounded-md px-2 py-2 overflow-hidden resize-none appearance-none text-3xl text-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400'
            placeholder='0'
            onKeyDown={handleKeyDown}
            // onChange={(e)=>{console.log(`Change ${e.target.value}, id: ${event.target.id}`);}}
            onFocus={(e) => handleFocus(e, index)}
            onPaste={handleOnPaste}
            required
          />
        ))}
      </div>
      <div className='flex flex-col items-center justify-center'>
        <Button
          buttonType='link'
          label='Re-send verification code'
          onClick={() => {
            setPinState(['', '', '', '', '', '']);
            const { error } = initateSignupProcess(userData.email)
            if(error){toast.error(error);}
            else{
              toast.success("Verification code sent successfully!");
            }
          }}
          type='reset'
        />
        <Button
          buttonType='link'
          label='Change email address'
          onClick={() => { navigate('/signup'); }}
        />
      </div>
      <div className='flex flex-row items-center justify-center gap-[16px]'>
        <Button id='submit-button' ref={submitButtonRef} label='Submit' type='submit' />
      </div>
    </form>
  );
};

const steps = {
  1: { id: 'Step 1', name: 'Create Account', to: ''},
  2: { id: 'Step 2', name: 'Email Confirmation', to: 'email-confirmation'},
};

const SignUpPage = () => {

  const [stepStatus, setStepStatus] = useState({
    1: 'current',
    2: 'upcoming',
  });

  const [userData, setUserData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    country: countries[0],
    password: '',
  });

  return (
    <div className='bg-gray-100 w-screen h-screen flex flex-col items-center justify-center'>
      <Navbar navbarType='signup' />
      <div className='self-stretch flex-1 overflow-hidden flex flex-col items-center justify-center'>
        <nav aria-label='Progress' className='w-2/3 mb-4'>
          <ol role='list' className='space-y-4 md:flex md:space-x-16 md:space-y-0'>
            {
              // eslint-disable-next-line no-unused-vars
              Object.entries(steps).map(([idx, step]) => (
              <li key={step.name} className='md:flex-1'>
                {stepStatus[idx] === 'completed' ? (
                  <span className='flex flex-col items-center py-2 border-t-4 rounded-lg bg-gray-200'>
                    <span className='text-sm font-medium text-black'>{step.name}</span>
                  </span>
                ) : stepStatus[idx] === 'current' ? (
                  <span className='flex flex-col items-center items-center py-2 border-black border-t-4 bg-gray-200 rounded-lg'>
                    <span className='text-sm font-medium text-black'>{step.name}</span>
                  </span>
                ) : (
                  <span className='flex flex-col items-center border-gray-200 py-2 border-t-4 rounded-lg'>
                    <span className='text-sm font-medium text-gray-500'>{step.name}</span>
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <Outlet context={[userData, setUserData, setStepStatus]} />
      </div>
    </div>
  );
};

export default SignUpPage;
