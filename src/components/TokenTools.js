import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import axios from 'axios';

export function cleanupUserSession(navigate){
    Cookies.remove('accessToken');
    Cookies.remove('idToken');
    Cookies.remove('refreshToken');
    navigate('/login');
    console.log("Session cleaned up!");
}

export async function isUserSessionValid(){
    const tokenCookie = Cookies.get('accessToken');
    if (!tokenCookie) {
      return false;
    }

    const decodedToken = jwt_decode(tokenCookie);
    const expirationTime = decodedToken.exp * 1000;
    const currentTime = new Date().getTime();

    if (expirationTime < currentTime) {
      return false
    }

    try {
      const response = await axios.get(`http://localhost:8000/api/v1/auth/status?token=${tokenCookie}`);
      console.log(response);
      if (response.data.logged_in) {
        console.log("User is logged in!");
        return true;
      } else {
        console.log("User is logged out!");
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
}

export async function checkUserSession(navigate) {
  const data = await isUserSessionValid();
  if(!await isUserSessionValid()){
    cleanupUserSession(navigate);
  }
}


export function useTokenExpiration() {
  const navigate = useNavigate();

  useEffect(() => {
    checkUserSession(navigate);
    const intervalId = setInterval(() => {
      checkUserSession(navigate);
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);
}
