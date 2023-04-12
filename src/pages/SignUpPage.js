import Button from "../components/Button";
import Navbar from "../components/Navbar";
import { NavLink, Outlet, useParams, useLoaderData } from "react-router-dom";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';

import { ChevronDownIcon } from "@heroicons/react/24/solid";


export const CreateAccountForm = () => {

  const [stepIdx, steps, stepForward, stepBackward] = useOutletContext();

  return (
      <form className="bg-white w-2/3 rounded-xl shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] overflow-hidden flex flex-col py-8 px-32 items-center justify-center gap-[32px]">
        <h4 className="m-0 relative text-3xl leading-[120%] font-bold text-black text-center">Create Account</h4>

        <div className="relative w-2/3">
          <label
            htmlFor="name"
            className="absolute rounded -top-3 left-1 inline-block bg-white px-1 text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="w-full rounded-md px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-100 sm:text-sm sm:leading-6"
            placeholder="Jane Smith"
          />
        </div>
        <div className="relative w-2/3">
          <label
            htmlFor="name"
            className="absolute rounded -top-3 left-1 inline-block bg-white px-1 text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="w-full rounded-md px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-100 sm:text-sm sm:leading-6"
            placeholder="jane@example.com"
          />
        </div>

        <div className="relative w-2/3">
          <label htmlFor="location" className="absolute rounded -top-3 left-1 inline-block bg-white px-1 text-sm font-medium text-gray-700">
            Country
          </label>
          <select
            id="location"
            name="location"
            className="w-full bg-white rounded-md px-2 py-2.5 shadow-sm text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 appearance-none" // Add the appearance-none class
            defaultValue="Canada"
          >
            <option>United States</option>
            <option>Canada</option>
            <option>Mexico</option>
            <option>India</option>
          </select>
          <div className="absolute top-0 right-0 h-full pr-3 flex items-center pointer-events-none">
            <ChevronDownIcon className="h-4 w-4 text-gray-500" />
          </div>
        </div>

        <NavLink to="email-confirmation" onClick={stepForward}> <Button buttonType="dark" label="Create Account"/> </NavLink>

      </form>
  )
}

export const EmailConfirmationForm = () => {
  const [stepIdx, steps, stepForward, stepBackward] = useOutletContext();

  const pinInputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handleInput = (e, index) => {
    const { value } = e.target;
    if (value.length === 1 && index < pinInputRefs.length - 1) {
      pinInputRefs[index + 1].current.focus();
    }
  };

  return (
      <form className="bg-white rounded-xl shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] overflow-hidden flex flex-col py-8 px-32 items-center justify-center gap-[32px]">
        <h4 className="m-0 relative text-4xl leading-[120%] font-bold text-black text-center">Verify your email address</h4>
        <p className="m-0 relative text-xl text-background-dark text-center flex items-center w-[538px] h-12 shrink-0">
          <span className="w-full">
            <span>
              Enter verification code sent to email address
            </span>
            <b> harshitsaini@keylance.in</b>
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
                maxLength="1"
                className="h-[4rem] w-[4rem] rounded-md px-2 py-2 overflow-hidden resize-none appearance-none text-3xl text-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                placeholder="0"
                onInput={(e) => handleInput(e, index)}
              />
            ))
          }
        </div>
        <div className="flex flex-col items-center justify-center">
            <Button buttonType="link" label="Re-send verification code" />
            <NavLink to="/signup" onClick={stepBackward} ><Button buttonType="link" label="Change email address" /></NavLink>
        </div>
        <div className="flex flex-row items-center justify-center gap-[16px]">
          <NavLink to="/signup/create-password" onClick={stepForward}><Button  label="Submit"/></NavLink>
        </div>
      </form>
  )
}

export const CreatePasswordForm = () => {
  const [stepIdx, steps, stepForward, stepBackward] = useOutletContext();
  return (
      <form className="bg-white rounded-xl shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] overflow-hidden flex flex-col py-8 px-32 items-center justify-center gap-[32px]">
        <h4 className="m-0 relative text-4xl leading-[120%] font-bold text-black text-center">
          Create your master password
        </h4>
        <div className="relative w-2/3">
          <label
            htmlFor="name"
            className="absolute rounded -top-3 left-1 inline-block bg-white px-1 text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            name="name"
            id="name"
            className="w-full rounded-md px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-100 sm:text-sm sm:leading-6"
            placeholder="*********"
          />
        </div>
        <div className="relative w-2/3">
          <label
            htmlFor="name"
            className="absolute rounded -top-3 left-1 inline-block bg-white px-1 text-sm font-medium text-gray-700"
          >
            Re-enter Password
          </label>
          <input
            type="password"
            name="name"
            id="name"
            className="w-full rounded-md px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-100 sm:text-sm sm:leading-6"
            placeholder="*********"
          />
        </div>
        <p className="m-0 relative text-1xl text-red-500 font-bold text-center flex items-center justify-center w-[538px] h-12 shrink-0">
          Note: Memorise this password and keep it safe.
        </p>
        <div className="flex flex-row items-center justify-center gap-[32px]">
          <NavLink to="/signup/recovery-kit" onClick={stepForward}><Button buttonType="dark"  label="Submit"/> </ NavLink>
        </div>
      </form>
    )
}



export const RecoveryKitForm = () => {
  const navigate = useNavigate();
  return (
        <form className="bg-white rounded-xl shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] overflow-hidden flex flex-col py-8 px-32 items-center justify-center gap-[32px]">
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
              type="texd"
              name="name"
              id="name"
              value="pall-brau-cump-cub-SPIY-stif-def-hoff"
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
            <Button buttonType="dark" label="Finish Setup" onClick={()=>navigate("/app-home")}/>
          </div>
        </form>
  );
};

const SignUpPage = () => {

  const [stepIdx, setStepIdx] = useState(1);

  const [steps, setSteps] = useState({
    1: { id: 'Step 1', name: 'Create Account', to: '', status: 'current' },
    2: { id: 'Step 2', name: 'Email Confirmation', to: 'email-confirmation', status: 'upcoming' },
    3: { id: 'Step 3', name: 'Create Password', to: 'create-password', status: 'upcoming' },
    4: { id: 'Step 4', name: 'Finish Setup', to: 'recovery-kit', status: 'upcoming' },
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
      <nav aria-label="Progress" className="">
        <ol role="list" className="space-y-4 md:flex md:space-x-16 md:space-y-0">
          {Object.entries(steps).map(([ newStepIdx, step ]) => (
            <li key={step.name} className="md:flex-1">
              {step.status === 'completed' ? (
                <span
                  className="flex flex-col border-l-4 border-black py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                >
                  <span className="text-sm font-medium text-black">{step.name}</span>
                </span>
              ) : step.status === 'current' ? (
                <span
                  className="flex flex-col border-l-4 border-black py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                >
                  <span className="text-sm font-medium text-black">{step.name}</span>
                </span>
              ) : (
                <span
                  className="flex flex-col border-l-4 border-gray-200 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                >
                  <span className="text-sm font-medium text-gray-500">{step.name}</span>
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <Outlet context={[stepIdx, steps, stepForward, stepBackward]}/>
      </div>
    </div>
  );
};

export default SignUpPage;
