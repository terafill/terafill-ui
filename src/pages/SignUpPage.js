import React from 'react';
import { NavLink, Outlet, useParams, useLoaderData } from "react-router-dom";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';

import axios from "axios";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

import Button from "../components/Button";
import Navbar from "../components/Navbar";
import Errors, { SuccessAlert } from "../components/Alerts";
import { generateSecretKey, storeAuthData } from "../utils/security";
import { initateSignupProcess, completeSignupProcess } from "../data/auth";

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

  const [stepIdx, steps, stepForward, stepBackward, userData, setUserData] = useOutletContext();
  const navigate = useNavigate();
  const [errorList, setErrorList] = useState([]);
  const [isErrorListVisible, setErrorListVisibility] = useState(false);

  const passwordRef = useRef(null);
  const passwordRepeatRef = useRef(null);

  const createAccountAction = (e) => {
      e.preventDefault();
      setErrorListVisibility(false);
      if(passwordRef.current.value != passwordRepeatRef.current.value){
        setErrorList(["Passwords don't match!"]);
        setErrorListVisibility(prevState => (true));
      }
      else{
      initateSignupProcess(userData.email).then(function (response) {
          console.log(response)
          stepForward();
          navigate("email-confirmation");
        })
        .catch(function (error) {
          console.log(error);
          if (error.response.status === 409){
            console.error("There is a conflict.")
            setErrorList([`User with email id: ${userData.email} is already registered.`]);
            setErrorListVisibility(true);
          }
          else if (error.response.data.hasOwnProperty('detail')){
            const error_msg = error.response.data.detail;
            console.error(error_msg);
            setErrorList([error_msg]);
            setErrorListVisibility(true);
          }
          else{
            setErrorList([`Something went wrong: ${error}.`]);
            setErrorListVisibility(true);
          }
        });
      }
  }

  return (
      <form
        className="bg-white w-2/3 rounded-xl shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] overflow-hidden flex flex-col py-8 px-32 items-center justify-center gap-[16px]"
          onSubmit={createAccountAction}
          >
        <h4 className="m-0 relative text-3xl leading-[120%] font-bold text-black text-center">Create Account</h4>

        <span className="relative w-2/3 flex-auto flex flex-row justify-center gap-2" id="name">
          <div className="relative w-full" id="first-name">
            <label
              htmlFor="firstName"
              className="absolute rounded -top-3 left-1 inline-block bg-white px-1 text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="w-full rounded-md px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-100 sm:text-sm sm:leading-6"
              placeholder="Jane"
              onChange={ (e) =>{setUserData(prevState => ({...prevState, firstName: e.target.value}))} }
              value={userData.firstName}
              required
              title="Please enter first name"
            />
          </div>

          <div className="relative w-full"  id="last-name">
            <label
              htmlFor="lastName"
              className="absolute rounded -top-3 left-1 inline-block bg-white px-1 text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="w-full rounded-md px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-100 sm:text-sm sm:leading-6"
              placeholder="Smith"
              value={userData.lastName}
              onChange={ (e) =>{setUserData(prevState => ({...prevState, lastName: e.target.value}))} }
            />
          </div>
        </span>

        <div className="relative w-2/3">
          <label
            htmlFor="email"
            className="absolute rounded -top-3 left-1 inline-block bg-white px-1 text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full rounded-md px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-100 sm:text-sm sm:leading-6"
            placeholder="jane@example.com"
            value={userData.email}
            onChange={ (e) =>{setUserData(prevState => ({...prevState, email: e.target.value}))} }
            required
            title="Please enter email"
          />
        </div>

{/*        <div className="relative w-2/3">
          <label htmlFor="location" className="absolute rounded -top-3 left-1 inline-block bg-white px-1 text-sm font-medium text-gray-700">
            Country
          </label>
          <select
            id="location"
            name="location"
            className="w-full bg-white rounded-md px-2 py-2.5 shadow-sm text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 appearance-none" // Add the appearance-none class
            // defaultValue="Canada"
            value={userData.country}
            onChange={ (e) =>{setUserData(prevState => ({...prevState, country: e.target.value}))} }
          >
            {
            countries.map((country) =>
              <option key={country} value={country}>
                {country}
              </option>
              )
            }
          </select>
          <div className="absolute top-0 right-0 h-full pr-3 flex items-center pointer-events-none">
            <ChevronDownIcon className="h-4 w-4 text-gray-500" />
          </div>
        </div>*/}

{/*        <h6 className="m-0 relative text-xl leading-[120%] font-bold text-black text-center">
          Create your master password
        </h6>*/}
        <div className="relative w-2/3">
          <label
            htmlFor="password"
            className="absolute rounded -top-3 left-1 inline-block bg-white px-1 text-sm font-medium text-gray-700"
          >
            Master Password
          </label>
          <input
            ref={passwordRef}
            type="password"
            name="password"
            id="password"
            className="w-full rounded-md px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-100 sm:text-sm sm:leading-6"
            placeholder="*********"
            onChange={ (e) =>{setUserData(prevState => ({...prevState, password: e.target.value}))} }

            required
          />
        </div>
        <div className="relative w-2/3">
          <label
            htmlFor="name"
            className="absolute rounded -top-3 left-1 inline-block bg-white px-1 text-sm font-medium text-gray-700"
          >
            Re-enter Master Password
          </label>
          <input
            ref={passwordRepeatRef}
            type="password"
            name="passwordRepeat"
            id="passwordRepeat"
            className="w-full rounded-md px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-100 sm:text-sm sm:leading-6"
            placeholder="*********"
            required
          />
        </div>
        <p className="m-0 relative text-md text-red-500 font-bold text-center flex items-center justify-center w-[538px] h-12 shrink-0">
          Note: Memorise this password and keep it safe.
        </p>

        { isErrorListVisible &&
          <Errors
            errorList={errorList}
            showAlert={isErrorListVisible}
            setAlertVisibilty={setErrorListVisibility}
            />
        }

        <Button
          id="submit-button"
          buttonType="dark"
          label="Create Account"
          type="submit"
          />

      </form>
  )
}

export const EmailConfirmationForm = () => {
  const [stepIdx, steps, stepForward, stepBackward, userData, setUserData] = useOutletContext();
  const navigate = useNavigate();
  const [isSuccessAlertVisible, setSuccessAlertVisibility] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const [isErrorListVisible, setErrorListVisibility] = useState(false);

  const pinInputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const [pinState, setPinState] = useState(['','','','','','']);
  const [pinIdx, setPinIdx] = useState(0);

  const submitButtonRef = useRef(null);

  useEffect(()=>{
    pinInputRefs[pinIdx].current.focus();
  }, [pinIdx])

  useEffect(()=>{
    console.log(pinState);
    // for(let i=0;i<pinInputRefs.length;i+=1){
    //   console.log(pinInputRefs[i].current.value);
    // }
  }, [pinState])

  const handleFocus = (e, index) => {
      if(pinIdx!=index){
        setPinIdx(index);
      }
      else{
        // Do nothing
      }
  }

  const handleKeyDown = (e) => {
    const { key } = e;
    let tempPin = [...pinState];
    if (e.keyCode === 37 || e.keyCode === 8){
      if (e.keyCode === 8){
        tempPin[pinIdx] = '';
        setPinState(tempPin);
        // setPinState(prevItems => [...prevItems.slice(0, pinIdx), '', ...prevItems.slice(pinIdx + 1)]);

      }
      // setPinIdx(pinIdx=>(pinIdx - 1 + pinInputRefs.length)%pinInputRefs.length);
      setPinIdx(pinIdx=>Math.max(0, pinIdx - 1));
    }
    else if (e.keyCode === 39){
      // setPinIdx(pinIdx=>(pinIdx + 1)%pinInputRefs.length);
      setPinIdx(pinIdx=>Math.min(pinIdx + 1, pinInputRefs.length-1));
    }
    else if (event.keyCode >= 48 && event.keyCode <= 57){
        tempPin[pinIdx] = key[0];
        setPinState(tempPin);
      // setPinState(prevItems => [...prevItems.slice(0, pinIdx), key[0], ...prevItems.slice(pinIdx + 1)]);
      // setPinIdx(pinIdx=>(pinIdx + 1)%pinInputRefs.length);
      setPinIdx(pinIdx=>Math.min(pinIdx + 1, pinInputRefs.length-1));
    }
  }

  const handleOnPaste = (e) => {
    const text = e.clipboardData.getData('Text')
    let textIdx = 0;
    let curPinIdx = pinIdx;
    let tempPin = [...pinState];
    while(textIdx<text.length && curPinIdx<pinInputRefs.length){
      let char = text[textIdx];
      if (char >='0' && char <= '9'){
        tempPin[curPinIdx] = char;
        textIdx+=1;
        curPinIdx+=1;
      }else{
        textIdx+=1;
      }
    }
    setPinState(tempPin);

    if (curPinIdx!=pinIdx){
      setPinIdx(Math.min(curPinIdx, pinInputRefs.length-1));
    }
  }

  const signupConfirmationAction = (e)=>{
    e.preventDefault();
    setErrorListVisibility(false);
    setSuccessAlertVisibility(false);
    const secret_key = generateSecretKey();
    const verification_code = [...pinState].join('');
    setUserData(prevState=>({...prevState, secretKey: secret_key}))

    completeSignupProcess(
      userData.email,
      userData.password,
      verification_code,
      userData.firstName,
      userData.lastName
      ).then(function (response) {
        storeAuthData(userData.email);
        // setUserData(prevState=>({...prevState, csdek: response.data.csdek}))
        // stepForward();
        // navigate("/signup/recovery-kit");
        navigate("/login");
      })
      .catch(function (error) {
        console.log(error);
        if (error.hasOwnProperty('response') && error.response.data.hasOwnProperty('detail')){
          const error_msg = error.response.data.detail;
          console.log(error_msg);
          setErrorList([error_msg]);
        }
        else{
          setErrorList([`Something went wrong: ${error}.`]);
        }
        setErrorListVisibility(true);
      });
  }

  return (
      <form
        className="bg-white rounded-xl shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] overflow-hidden flex flex-col py-8 px-32 items-center justify-center gap-[32px]"
          onSubmit={signupConfirmationAction}
      >
        <h4 className="m-0 relative text-4xl leading-[120%] font-bold text-black text-center">Verify your email address</h4>
        <p className="m-0 relative text-xl text-background-dark text-center flex items-center w-[538px] h-12 shrink-0">
          <span className="w-full">
            <span>
              Enter verification code sent to email address
            </span>
            <b> {userData.email}</b>
          </span>
        </p>
        <div className="w-full flex flex-row justify-evenly">
          {
            pinInputRefs.map((_, index)=>(
              <input
                key={index}
                type="number"
                ref={pinInputRefs[index]}
                name={`pin-${index}`}
                id={`pin-${index}`}
                value={pinState[index]}
                maxLength={1}
                className="h-[4rem] w-[4rem] rounded-md px-2 py-2 overflow-hidden resize-none appearance-none text-3xl text-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                placeholder="0"
                onKeyDown={handleKeyDown}
                // onChange={(e)=>{console.log(`Change ${e.target.value}, id: ${event.target.id}`);}}
                onFocus={(e)=>handleFocus(e, index)}
                onPaste={handleOnPaste}
                required
              />
            ))
          }
        </div>
        <div className="flex flex-col items-center justify-center">
            <Button
              buttonType="link"
              label="Re-send verification code"
              onClick={()=>{
                setPinState(['','','','','','']);
                setSuccessAlertVisibility(false);
                initateSignupProcess(userData.email).then(function (response) {
                    setSuccessAlertVisibility(true);
                  })
                  .catch(function (error) {
                    console.log(error);
                    if (error.response.status === 409){
                      console.log("There is a conflict.")
                      alert("There is a conflict.");
                      // setErrorList([`User with email id: ${userData.email} is already registered.`]);
                      // setErrorListVisibility(true);
                    }
                    alert(error.response);
                  });
              }}
              type="reset"
              />
            <Button
              buttonType="link"
              label="Change email address"
              onClick={
                ()=>{navigate("/signup");stepBackward();}
              }/>
        </div>
        { isSuccessAlertVisible &&
          <SuccessAlert
            alertList={["New Verification code is sent to email!"]}
            showAlert={isSuccessAlertVisible}
            setAlertVisibilty={setSuccessAlertVisibility}
            />
        }
        { isErrorListVisible &&
          <Errors
            errorList={errorList}
            showAlert={isErrorListVisible}
            setAlertVisibilty={setErrorListVisibility}
            />
        }
        <div className="flex flex-row items-center justify-center gap-[16px]">
            <Button
              id="submit-button"
              ref={submitButtonRef}
              label="Submit"
              type="submit"
            />
        </div>
      </form>
  )
}

export const RecoveryKitForm = () => {

  const [stepIdx, steps, stepForward, stepBackward, userData, setUserData] = useOutletContext();

  const navigate = useNavigate();
  return (
        <form
          className="bg-white rounded-xl shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] overflow-hidden flex flex-col py-8 px-32 items-center justify-center gap-[32px]"
          onSubmit={()=>navigate("/app-home")}
        >
          <h4 className="m-0 relative text-4xl leading-[120%] font-bold text-black text-center">
            Download account recovery kit
          </h4>
          <div className="relative w-full flex flex-row gap-2">
            <label
              htmlFor="name"
              className="absolute rounded -top-3 left-1 inline-block bg-white px-1 text-sm font-medium text-gray-700"
            >
              Security Key
            </label>
            <input
              type="text"
              name="skey"
              id="skey"
              value={userData.secretKey}
              className="w-full rounded-md px-2 py-2 text-lg font-medium text-gray-900 text-center shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-100"
            />
            <Button
              label="COPY"
              buttonType="light"
            />
          </div>
          <p className="m-0 relative text-1xl text-red-500 font-bold text-center flex items-center w-[538px] h-[78px] shrink-0">
            Note: Copy this secret key and keep it somewhere safe. It can help you
            recover your account in case you lose your master password.
          </p>
          <div className="flex flex-row py-4 px-0 items-start justify-start gap-[32px]">
            <Button buttonType="dark" label="Download Kit"/>
            <Button buttonType="dark" label="Finish Setup" id="submit-button" type="submit"/>
          </div>
        </form>
  );
};

const SignUpPage = () => {

  const [userData, setUserData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    country: countries[0],
    password: "",
    // secretKey: null,
  });

  const [stepIdx, setStepIdx] = useState(1);

  const [steps, setSteps] = useState({
    1: { id: 'Step 1', name: 'Create Account', to: '', status: 'current' },
    2: { id: 'Step 2', name: 'Email Confirmation', to: 'email-confirmation', status: 'upcoming' },
    // 3: { id: 'Step 3', name: 'Finish Setup', to: 'recovery-kit', status: 'upcoming' },
  })

  const updateStepIdx = ({ newStepIdx }) => {
    setStepIdx(newStepIdx);
  }

  useEffect(()=>{
    console.log(stepIdx);
  }, [stepIdx])

  useEffect(()=>{
    console.log(steps);
  }, [steps])

  useEffect(()=>{
    console.log(userData);
  }, [userData])

  const stepForward = () => {
    try {
      if (steps[stepIdx].status=="current"){
        const nextIdx = stepIdx+1;
        if(nextIdx<=4){
          setSteps(prevState=>({
            ...prevState,
            [stepIdx]: {...prevState[stepIdx], status: 'completed'},
            [nextIdx]: {...prevState[nextIdx], status: 'current'}
          }));
          setStepIdx(nextIdx);
        }
        else{
          setSteps(prevState=>({
            ...prevState,
            [stepIdx]: {...prevState[stepIdx], status: 'completed'}
          }));
        }
      }
    } catch(error) {
      console.error("Error: ", error)
    }
  }

  const stepBackward = () => {
    const prevIdx = stepIdx-1;
    setSteps(prevState=>({
      ...prevState,
      [stepIdx]: {...prevState[stepIdx], status: 'upcoming'},
      [prevIdx]: {...prevState[prevIdx], status: 'current'}
    }));
    setStepIdx(prevIdx);
  }


  return (
    <div className="bg-gray-100 w-screen h-screen flex flex-col items-center justify-center">
      <Navbar navbarType="signup"/>
      <div className="self-stretch flex-1 overflow-hidden flex flex-col items-center justify-center">
      <nav aria-label="Progress" className="w-2/3 mb-4">
        <ol role="list" className="space-y-4 md:flex md:space-x-16 md:space-y-0">
          {Object.entries(steps).map(([ newStepIdx, step ]) => (
            <li key={step.name} className="md:flex-1">
              {step.status === 'completed' ? (
                <span
                  className="flex flex-col items-center border-l-4 border-black py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                >
                  <span className="text-sm font-medium text-black">{step.name}</span>
                </span>
              ) : step.status === 'current' ? (
                <span
                  className="flex flex-col justify-center items-center border-l-4 border-black py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-4 md:pl-0 md:pt-4 bg-gray-200 rounded-lg"
                >
                  <span className="text-sm font-medium text-black">{step.name}</span>
                </span>
              ) : (
                <span
                  className="flex flex-col items-center border-l-4 border-gray-200 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                >
                  <span className="text-sm font-medium text-gray-500">{step.name}</span>
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <Outlet context={[stepIdx, steps, stepForward, stepBackward, userData, setUserData]}/>
      </div>
    </div>
  );
};

export default SignUpPage;
