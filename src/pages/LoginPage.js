import Button from "../components/Button";
import Navbar from "../components/Navbar";
import { NavLink, Outlet, useParams, useLoaderData } from "react-router-dom";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';

import axios from 'axios';
import Cookies from 'js-cookie';
import { ChevronDownIcon } from "@heroicons/react/24/solid";

import Errors from "../components/Alerts";
import { loginUser, storeAuthData, deriveEncryptionKey, fetchDecryptedData } from "../data/auth";


const LoginPage = () => {

    const navigate = useNavigate();
    const [userData, setUserData] = useState({email:'', password:''});
    const [errorList, setErrorList] = useState([]);
    const [isErrorListVisible, setErrorListVisibility] = useState(false);
    const [refreshLogin, setRefreshLogin] = useState(false)
    const shouldLoad = useRef(true);

    useEffect(()=>{
      if(shouldLoad.current){
        const csdek = localStorage.getItem("csdek");
        if (csdek){
          const csdek_derived = deriveEncryptionKey(csdek, "SHA-256");
          const secret_key = fetchDecryptedData('secretKey', csdek, csdek_derived);
          const email = fetchDecryptedData('email', csdek, csdek_derived);
          setUserData(prevState=>({
            ...prevState,
            email: email,
            secretKey: secret_key,
          }));
          setRefreshLogin(true);
        }
        shouldLoad.current = false;
      }
    }, [])

    return (
    <div className="bg-gray-100 w-screen h-screen flex flex-col items-center justify-center">
      <Navbar navbarType="login"/>
      <div className="self-stretch flex-1 overflow-hidden flex flex-col items-center justify-center">
     <form
      className="bg-white w-2/3 rounded-xl shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] overflow-hidden flex flex-col py-8 px-32 items-center justify-center gap-[32px]"
      onSubmit={(e)=>{
        e.preventDefault();
        setErrorListVisibility(prevState => (false));
        loginUser(userData.email, userData.password, userData.secretKey).then(function (response) {
              storeAuthData(
                userData.email,
                userData.password,
                userData.secretKey,
                response.data.csdek);
              setUserData(prevState=>({...prevState, csdek: response.data.csdek}))
              navigate("/app-home");
            })
            .catch(function (error) {
              console.log(error);
              if (error.response.data.hasOwnProperty('detail')){
                const error_msg = error.response.data.detail;
                console.log(error_msg);
                setErrorList([error_msg]);
              }
              else{
                setErrorList([`Something went wrong: ${error}.`]);
              }
              setErrorListVisibility(prevState => (true));
            });
      }}
      >
        <h4 className="m-0 relative text-3xl leading-[120%] font-bold text-black text-center">Welcome</h4>

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
            onChange={ (e) =>{setUserData(prevState => ({...prevState, email: e.target.value}))} }
            value={userData.email}
            required
            disabled={refreshLogin?true:false}
          />
        </div>

        <div className="relative w-2/3">
          <label
            htmlFor="password"
            className="absolute rounded -top-3 left-1 inline-block bg-white px-1 text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full rounded-md px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-100 sm:text-sm sm:leading-6"
            placeholder="*********"
            onChange={ (e) =>{setUserData(prevState => ({...prevState, password: e.target.value}))} }
            value={userData.password}
            required
          />
        </div>
        <div className="relative w-2/3">
          <label
            htmlFor="email"
            className="absolute rounded -top-3 left-1 inline-block bg-white px-1 text-sm font-medium text-gray-700"
          >
            Secret Key
          </label>
          <input
            type="password"
            name="secret-key"
            id="secret-key"
            className="w-full rounded-md px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-100 sm:text-sm sm:leading-6"
            placeholder="Enter Secret key"
            onChange={ (e) =>{setUserData(prevState => ({...prevState, secretKey: e.target.value}))} }
            value={userData.secretKey}
            required
            disabled={refreshLogin?true:false}
          />
        </div>
        { isErrorListVisible &&
          <Errors
            errorList={errorList}
            showAlert={isErrorListVisible}
            setAlertVisibilty={setErrorListVisibility}
            />
        }

        <Button buttonType="dark" label="Submit" type="submit"/>

      </form>
      </div>
    </div>
    );
}

export default LoginPage;