import React, { useState, useEffect, useRef } from 'react';

import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Button from '../../components/Button';
import Navbar from '../../components/Navbar';
import { initateSignupProcess, completeSignupProcess } from '../../data/auth';
import { storeAuthData } from '../../utils/security';

// const countries = [
//   'India',
//   'China',
//   'United States',
//   'Indonesia',
//   'Pakistan',
//   'Brazil',
//   'Nigeria',
//   'Bangladesh',
//   'Russia',
//   'Mexico',
//   'Japan',
//   'Ethiopia',
//   'Philippines',
//   'Egypt',
//   'Vietnam',
//   'DR Congo',
//   'Turkey',
//   'Iran',
//   'Germany',
//   'Thailand',
// ];

export const CreateAccountForm = () => {
  // eslint-disable-next-line
  const [userData, setUserData, setStepStatus]: any = useOutletContext();
  const navigate = useNavigate();

  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordRepeatRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setStepStatus({
      1: 'current',
      2: 'upcoming',
    });
  }, []);

  const createAccountAction = async (e) => {
    e.preventDefault();
    if (
      passwordRef.current?.value &&
      passwordRef.current?.value != passwordRepeatRef.current?.value
    ) {
      toast.error("Passwords don't match!");
    } else {
      const { error } = await initateSignupProcess(userData.email);

      if (error) {
        toast.error(error);
      } else {
        navigate('email-confirmation');
      }
    }
  };

  return (
    <form
      className='flex w-2/3 flex-col items-center justify-center gap-[16px] overflow-hidden rounded-xl bg-white px-32 py-8 shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)]'
      onSubmit={createAccountAction}
    >
      <ToastContainer style={{ zIndex: 9999 }} />
      <h4 className='relative m-0 text-center text-3xl font-bold leading-[120%] text-black'>
        Create Account
      </h4>

      <span className='relative flex w-2/3 flex-auto flex-row justify-center gap-2' id='name'>
        <div className='relative w-full' id='first-name'>
          <label
            htmlFor='firstName'
            className='absolute -top-3 left-1 inline-block rounded bg-white px-1 text-sm font-medium text-gray-700'
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
            className='absolute -top-3 left-1 inline-block rounded bg-white px-1 text-sm font-medium text-gray-700'
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
          className='absolute -top-3 left-1 inline-block rounded bg-white px-1 text-sm font-medium text-gray-700'
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
          className='absolute -top-3 left-1 inline-block rounded bg-white px-1 text-sm font-medium text-gray-700'
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
          className='absolute -top-3 left-1 inline-block rounded bg-white px-1 text-sm font-medium text-gray-700'
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
      <p className='text-md relative m-0 flex h-12 w-[538px] shrink-0 items-center justify-center text-center font-bold text-red-500'>
        Note: Memorise this password and keep it safe.
      </p>
      <Button id='submit-button' buttonType='dark' label='Create Account' type='submit' />
    </form>
  );
};

export const EmailConfirmationForm = () => {
  // eslint-disable-next-line
  const [userData, setUserData, setStepStatus]: any = useOutletContext();
  const navigate = useNavigate();

  const pinInputRefs = [
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
  ];

  const [pinState, setPinState] = useState(['', '', '', '', '', '']);
  const [pinIdx, setPinIdx] = useState(0);

  // const submitButtonRef = useRef(null);

  useEffect(() => {
    setStepStatus({
      1: 'completed',
      2: 'current',
    });
  }, []);

  useEffect(() => {
    pinInputRefs[pinIdx].current?.focus();
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
    const tempPin = [...pinState];
    if (e.keyCode === 37 || e.keyCode === 8) {
      if (e.keyCode === 8) {
        tempPin[pinIdx] = '';
        setPinState(tempPin);
      }
      setPinIdx((pinIdx) => Math.max(0, pinIdx - 1));
    } else if (e.keyCode === 39) {
      setPinIdx((pinIdx) => Math.min(pinIdx + 1, pinInputRefs.length - 1));
    } else if (e.keyCode >= 48 && e.keyCode <= 57) {
      tempPin[pinIdx] = key[0];
      setPinState(tempPin);
      setPinIdx((pinIdx) => Math.min(pinIdx + 1, pinInputRefs.length - 1));
    }
  };

  const handleOnPaste = (e) => {
    const text = e.clipboardData.getData('Text');
    let textIdx = 0;
    let curPinIdx = pinIdx;
    const tempPin = [...pinState];
    while (textIdx < text.length && curPinIdx < pinInputRefs.length) {
      const char = text[textIdx];
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
    const verificationCode = [...pinState].join('');

    const { error } = await completeSignupProcess(
      userData.email,
      userData.password,
      verificationCode,
      userData.firstName,
      userData.lastName,
    );
    if (error) {
      toast.error(error);
    } else {
      storeAuthData(userData.email);
      toast.success('Signup successful');
      navigate('/login');
    }
  };

  return (
    <form
      className='flex flex-col items-center justify-center gap-[32px] overflow-hidden rounded-xl bg-white px-32 py-8 shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)]'
      onSubmit={signupConfirmationAction}
    >
      <ToastContainer style={{ zIndex: 9999 }} />
      <h4 className='relative m-0 text-center text-4xl font-bold leading-[120%] text-black'>
        Verify your email address
      </h4>
      <p className='text-background-dark relative m-0 flex h-12 w-[538px] shrink-0 items-center text-center text-xl'>
        <span className='w-full'>
          <span>Enter verification code sent to email address</span>
          <b> {userData.email}</b>
        </span>
      </p>
      <div className='flex w-full flex-row justify-evenly'>
        {pinInputRefs.map((_, index) => (
          <input
            key={index}
            type='number'
            ref={pinInputRefs[index]}
            name={`pin-${index}`}
            id={`pin-${index}`}
            value={pinState[index]}
            maxLength={1}
            className='h-[4rem] w-[4rem] resize-none appearance-none overflow-hidden rounded-md px-2 py-2 text-center text-3xl text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400'
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
          onClick={async () => {
            setPinState(['', '', '', '', '', '']);
            const { error } = await initateSignupProcess(userData.email);
            if (error) {
              toast.error(error);
            } else {
              toast.success('Verification code sent successfully!');
            }
          }}
          type='reset'
        />
        <Button
          buttonType='link'
          label='Change email address'
          onClick={() => {
            navigate('/signup');
          }}
        />
      </div>
      <div className='flex flex-row items-center justify-center gap-[16px]'>
        <Button
          id='submit-button'
          // ref={submitButtonRef}
          label='Submit'
          type='submit'
        />
      </div>
    </form>
  );
};

const steps = {
  1: { id: 'Step 1', name: 'Create Account', to: '' },
  2: { id: 'Step 2', name: 'Email Confirmation', to: 'email-confirmation' },
};

const SignUpPage = () => {
  const [stepStatus, setStepStatus] = useState({
    1: 'current',
    2: 'upcoming',
  });

  interface User {
    email?: string;
    firstName?: string;
    lastName?: string;
    phoneNo?: string;
    birthday?: string;
    gender?: string;
    profileImage?: string | null;
    password?: string;
  }

  const [userData, setUserData] = useState<User>({
    email: '',
    firstName: '',
    lastName: '',
    // country: countries[0],
    password: '',
  });

  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center bg-gray-100'>
      <Navbar navbarType='signup' />
      <div className='flex flex-1 flex-col items-center justify-center self-stretch overflow-hidden'>
        <nav aria-label='Progress' className='mb-4 w-2/3'>
          <ol role='list' className='space-y-4 md:flex md:space-x-16 md:space-y-0'>
            {
              // eslint-disable-next-line no-unused-vars
              Object.entries(steps).map(([idx, step]) => (
                <li key={step.name} className='md:flex-1'>
                  {stepStatus[idx] === 'completed' ? (
                    <span className='flex flex-col items-center rounded-lg border-t-4 bg-gray-200 py-2'>
                      <span className='text-sm font-medium text-black'>{step.name}</span>
                    </span>
                  ) : stepStatus[idx] === 'current' ? (
                    <span className='flex flex-col items-center items-center rounded-lg border-t-4 border-black bg-gray-200 py-2'>
                      <span className='text-sm font-medium text-black'>{step.name}</span>
                    </span>
                  ) : (
                    <span className='flex flex-col items-center rounded-lg border-t-4 border-gray-200 py-2'>
                      <span className='text-sm font-medium text-gray-500'>{step.name}</span>
                    </span>
                  )}
                </li>
              ))
            }
          </ol>
        </nav>
        <Outlet context={[userData, setUserData, setStepStatus]} />
      </div>
    </div>
  );
};

export default SignUpPage;
