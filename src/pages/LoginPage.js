import Button from "../components/Button";
import Navbar from "../components/Navbar";
import { NavLink, Outlet, useParams, useLoaderData } from "react-router-dom";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';

import { ChevronDownIcon } from "@heroicons/react/24/solid";

const LoginPage = () => {

    const navigate = useNavigate();

    return (
    <div className="bg-gray-100 w-screen h-screen flex flex-col items-center justify-center">
      <Navbar navbarType="login"/>
      <div className="self-stretch flex-1 overflow-hidden flex flex-col items-center justify-center">
     <form className="bg-white w-2/3 rounded-xl shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] overflow-hidden flex flex-col py-8 px-32 items-center justify-center gap-[32px]">
        <h4 className="m-0 relative text-3xl leading-[120%] font-bold text-black text-center">Welcome</h4>

        <div className="relative w-2/3">
          <label
            htmlFor="email"
            className="absolute rounded -top-3 left-1 inline-block bg-white px-1 text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            className="w-full rounded-md px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-100 sm:text-sm sm:leading-6"
            placeholder="jane@example.com"
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
          />
        </div>

        <Button buttonType="dark" label="Submit" onClick={()=>{navigate("/app-home")}}/>

      </form>
      </div>
    </div>
    );
}

export default LoginPage;