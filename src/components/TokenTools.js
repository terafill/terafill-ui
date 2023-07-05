import React from 'react';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';

import { getLoginStatus } from  "../data/auth"

export function cleanupUserSession(navigate=null){
    Cookies.remove('sessionToken');
    Cookies.remove('sessionId');
    localStorage.removeItem("vdek");
    if(navigate){
      navigate('/login');
    }
    console.log("Session cleaned up!");
}

export async function isUserSessionValid(){
  try {
    const response = await getLoginStatus()
    return response.data.loggedIn
  }
  catch(error){
    console.error(error);
    return false
  }
}

export async function checkUserSession(navigate) {
  if(!await isUserSessionValid()){
    console.warn("Not Logged In!");
    cleanupUserSession(navigate);
  }
  else{
    console.warn("Logged In!");
  }
}


export function useTokenExpiration() {
  const shouldCheck = useRef(true);
  const navigate = useNavigate();

  useEffect(() => {
    if(shouldCheck.current){
      checkUserSession(navigate);
      shouldCheck.current = false;
    }
    const intervalId = setInterval(() => {
      checkUserSession(navigate);
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);
}
