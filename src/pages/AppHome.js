import Navbar from "../components/Navbar";
import PasswordItem from "../components/PasswordItem";
import Button from "../components/Button";
import { useTokenExpiration } from '../components/TokenTools';
import "./AppHome.css";
import { NavLink, Outlet, useParams, useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";


import axios from 'axios';
import Cookies from 'js-cookie';


// const passwordDataList = [
//     {
//       id: 1,
//       passwordAppName: "Netflix",
//       passwordUserName: "ram@keyelance.in",
//       icon: "../netflix2.png",
//       website: "netflix.com",
//     },
//     {
//       id: 2,
//       passwordAppName: "Facebook",
//       passwordUserName: "ram123",
//       icon: "../facebook2.png",
//       website: "facebook.com",
//     },
//     {
//       id: 3,
//       passwordAppName: "Twitter",
//       passwordUserName: "leo@3423",
//       icon: "../twitter3.png",
//       website: "twitter.com",
//     },
//     {
//       id: 4,
//       passwordAppName: "LinkedIn",
//       passwordUserName: "leo@3423",
//       icon: "../linkedin.png",
//       website: "linkedin.com",
//     },
//     {
//       id: 5,
//       passwordAppName: "Pinterest",
//       passwordUserName: "leo@3423",
//       icon: "../pinterest.png",
//       website: "pinterest.com",
//     },
//     {
//       id: 6,
//       passwordAppName: "Google",
//       passwordUserName: "leo@3423",
//       icon: "../google.png",
//       website: "google.com",
//     },
//     {
//       id: 7,
//       passwordAppName: "Paypal",
//       passwordUserName: "leo@3423",
//       icon: "../paypal.png",
//       website: "paypal.com",
//     },
//     {
//       id: 8,
//       passwordAppName: "Reddit",
//       passwordUserName: "leo@3423",
//       icon: "../reddit.png",
//       website: "reddit.com",
//     },
//     {
//       id: 9,
//       passwordAppName: "Skype",
//       passwordUserName: "leo@3423",
//       icon: "../skype.png",
//       website: "skype.com",
//     },
//     {
//       id: 10,
//       passwordAppName: "Yahoo",
//       passwordUserName: "leo@3423",
//       icon: "../yahoo.png",
//       website: "yahoo.com",
//     },
// ]

async function getVaults(){
  //   var data = JSON.stringify({
  //   email: userData.email,
  //   master_password: userData.password
  // });

  console.log(`http://localhost:8000/api/v1/users/me/vaults/`);

  var config = {
    method: 'get',
    url: `http://localhost:8000/api/v1/users/me/vaults/`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${Cookies.get("accessToken")}`
    }
  };

  try {
    let response = await axios(config);
    return response.data
  } catch (error) {
    console.log(error);
  }

  return null;

}

async function getVaultItems(vault_id){
  console.log(`http://localhost:8000/api/v1/users/me/vaults/${vault_id}/items/`);

  var config = {
    method: 'get',
    url: `http://localhost:8000/api/v1/users/me/vaults/${vault_id}/items/`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${Cookies.get("accessToken")}`
    }
  };

  let default_vault_id = null;

  try {
    let response = await axios(config);
    return response.data
  } catch (error) {
    console.log(error);
  }
}

export async function passwordDataListLoader(){

  const vaults = await getVaults();
  const default_vault = vaults[0];
  const vault_id = default_vault.id;
  const vault_items = await getVaultItems(vault_id);
  console.log("vault_items", vault_items);

  return vault_items;
}


// export async function itemDataLoader({ params }) {
//   console.log(`http://localhost:8000/api/v1/users/me/vaults/${vault_id}/items/`);

//   var config = {
//     method: 'get',
//     url: `http://localhost:8000/api/v1/users/me/vaults/${vault_id}/items/`,
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//       'Authorization': `Bearer ${Cookies.get("accessToken")}`
//     }
//   };

//   let default_vault_id = null;

//   try {
//     let response = await axios(config);
//     return response.data
//   } catch (error) {
//     console.log(error);
//   }
// }

export const PasswordPanelIndex = () => {
  return (
    <div className="self-stretch flex-1 overflow-hidden flex flex-col py-[32px] px-[16px] h-1/1 items-center justify-center z-[0] text-4xl">
      <h1>Good Morning!</h1>
    </div>
  );
}


export const PasswordPanel = () => {

  const [itemData, setItemData] = useState({
    icon : "../subtract1.svg",
    title: "yo",
    username: "ko",
    website: "mo.com",
    password: ""
  });

  const [ passwordDataList ] = useOutletContext();
  const { id } = useParams();

  console.log(id, passwordDataList);

  useEffect(()=>{
    for(let i=0;i<passwordDataList.length;i+=1){
      if(id === passwordDataList[i].id){
        setItemData(prevItem=>({
            ...prevItem,
            title : passwordDataList[i].title,
            username : passwordDataList[i].username,
            website : passwordDataList[i].website,
            password: passwordDataList[i].password
          })
        );
      }
    }
  }, [ passwordDataList ]);


  return (
    <div className="self-stretch flex-1 overflow-hidden flex flex-col py-[32px] px-[16px] h-1/1 items-center justify-between z-[0]" id="right-panel">
      <div className="grid grid-cols-2 grid-rows-4 items-center justify-center justify-items-center gap-4">
        <div className="self-stretch flex-1" id="iconframe">
          <img className="w-[88px] h-[88px] overflow-hidden object-cover" alt="" src={itemData.icon} />
        </div>
        <h4 className="[border:none] flex self-stretch flex-1 relative text-4xl leading-[120%] font-bold font-inherit flex items-center">{itemData.title}</h4>
        <label className="text-center font-medium">USERNAME</label>
        <input
          className="[border:none] flex text-[23.04px] bg-[transparent] rounded-3xs w-2/3 overflow-hidden flex-row py-0.5 px-[7px] box-border items-center justify-center"
          type="text"
          value={itemData.username}
          placeholder="Username"
        />
        <label className="text-center font-medium">PASSWORD</label>
        <input
          className="[border:none] flex text-[23.04px] bg-[transparent] rounded-3xs w-2/3 overflow-hidden flex-row py-0.5 px-[7px] box-border items-center justify-center"
          type="password"
          value={itemData.password}
          placeholder="Password" />
        <label className="text-center font-medium">WEBSITE</label>
        <input
          className="[border:none] flex text-[23.04px] bg-[transparent] rounded-3xs w-2/3 overflow-hidden flex-row py-0.5 px-[7px] box-border items-center justify-center "
          type="text"
          value={itemData.website}
          placeholder="Website"
        />
      </div>
      <Button
        label="View in dashboard"
        icon="../new-window.svg"
        iconPosition="right"
        buttonClassName="flex flex-row items-center gap-2"
      />
  </div>
  );
}


const AppHome = () => {

  const [passwordDataList, setPasswordDataList] = useState([]);

  useTokenExpiration();

  useEffect(() => {
    async function loadData() {
      const data = await passwordDataListLoader();
      setPasswordDataList(data);
    }
    loadData();
  }, []);


  return (
    // <div className="apphome">
      <div className="relative w-full h-screen flex flex-col items-center justify-center text-left">
      <Navbar navbarType="app"/>
      <div className="self-stretch flex-1 overflow-hidden flex flex-row items-center justify-center" id="apphome-inner">
        <div className="self-stretch shadow-[1px_0px_4px_rgba(0,_0,_0,_0.25)] w-3/12 flex flex-col grow-0 shrink-0 items-center justify-start relative z-[1]" id="left-panel">
          <div className="self-stretch overflow-hidden flex flex-col p-2 items-center justify-center z-[0] border-[1px]">
          <input
            className="[border:none] rounded-lg px-2 py-2 flex text-[23.04px] bg-gray-200 w-full overflow-hidden flex-row items-center justify-center"
            type="text"
            placeholder=" 🔎 Quick Search"
          />
          </div>
          <div className="self-stretch flex-1 overflow-y-auto px-2 py-2 flex flex-col items-center justify-start z-[1] border-[2px] border-solid" id="item-list">
          {
           passwordDataList.map( passwordData =>
            <NavLink
              to={`${passwordData.id}`}
              key={passwordData.id}
              className={({ isActive }) => isActive? "bg-gray-200 mt-1 mb-1 px-[16px] rounded-lg hover:bg-gray-200": "mt-1 mb-1 px-[16px] rounded-lg hover:bg-gray-100"}
            >
              <PasswordItem
                key={passwordData.id}
                icon = "../subtract1.svg"
                // icon={passwordData.icon}
                appName={passwordData.title}
                userName={passwordData.username}
              />
            </NavLink>
           )
          }
          </div>
          <Button
            buttonType="blue"
            icon="/icbaselineplus.svg"
            buttonClassName="absolute bottom-[1.2rem] right-[1.2rem] h-[3rem] w-[3rem] z-[100] rounded-[rem]"
          />
        </div>
        <Outlet context={[ passwordDataList ]}/>
      </div>
    </div>
  );
};

export default AppHome;
