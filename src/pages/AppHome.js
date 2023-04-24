import { useEffect, useState, useRef } from "react";

import { NavLink, Outlet, useParams, useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import Navbar from "../components/Navbar";
import PasswordItem from "../components/PasswordItem";
import Button from "../components/Button";
import { useTokenExpiration } from '../components/TokenTools';
import { getDefaultVaultItems, updateVaultItem } from '../data';
import "./AppHome.css";

export const ItemPanelIndex = () => {
  return (
    <div className="self-stretch flex-1 overflow-hidden flex flex-col py-[32px] px-[16px] h-1/1 items-center justify-center z-[0] text-4xl">
      <h1>Good Morning!</h1>
    </div>
  );
}

export const ItemPanel = () => {

  const [itemData, setItemData] = useState({
    icon : "../subtract1.svg",
    title: "yo",
    username: "ko",
    website: "mo.com",
    password: ""
  });

  const [itemFormDisabled, setItemFormDisability] = useState(true);
  const [showPassword, setPasswordVisibility] = useState(false);

  const [ itemDataList ] = useOutletContext();
  const { id } = useParams();
  // const default_vault_id = getDefaultVaultId();

  useEffect(()=>{
    for(let i=0;i<itemDataList.length;i+=1){
      if(id === itemDataList[i].id){
        setItemData(prevItem=>({
            ...prevItem,
            title : itemDataList[i].title,
            username : itemDataList[i].username,
            website : itemDataList[i].website,
            password: itemDataList[i].password
          })
        );
      }
    }
  }, [ itemDataList ]);


  return (
    <div className="self-stretch flex-1 overflow-hidden flex flex-col py-[32px] px-[16px] h-1/1 items-center justify-between z-[0]" id="right-panel">
      <div className="self-end flex flex-row">
        <Button
          onClick={() => {
            if(!itemFormDisabled){
              updateVaultItem(id, itemData.title, itemData.website, itemData.password, itemData.username);
            }
            setItemFormDisability(!itemFormDisabled);
          }}
          label={itemFormDisabled?"Edit":"Save"}
          buttonType="link"
          buttonClassName="relative top-[0rem] right-[0rem] z-[100]"
          labelClassName="text-xl"
        />
        <Button
          label="Share"
          buttonType="link"
          buttonClassName="relative top-[0rem] right-[0rem] z-[100]"
          labelClassName="text-xl"
        />
      </div>
      <div className="grid grid-cols-2 grid-rows-4 items-center justify-center justify-items-center gap-4">
        <div className="self-stretch flex-1" id="iconframe">
          <img className="w-[88px] h-[88px] overflow-hidden object-cover" alt="" src={itemData.icon} />
        </div>
        <input
          className={`flex self-stretch flex-1 relative rounded-lg w-8/12 text-5xl font-medium bg-[transparent] rounded-3xs w-11/12 overflow-hidden flex-row py-0.5 px-[7px] box-border items-center justify-center ${itemFormDisabled ? '' : 'border-2 border-blue-100 bg-blue-50 bg-opacity-40'}`}
          value={itemData.title}
          placeholder="title"
          onChange={(e)=>{setItemData(prevItem=>({...prevItem, title: e.target.value}))}}
          disabled={itemFormDisabled}
        />
        <label className="text-center font-medium">USERNAME</label>
        <input
          className={`flex text-[23.04px] bg-[transparent] rounded w-8/12 overflow-hidden flex-row py-0.5 px-[7px] box-border items-center justify-center ${itemFormDisabled ? '' : 'border-2 border-blue-100 bg-blue-50 bg-opacity-40'}`}
          type="text"
          value={itemData.username}
          placeholder="Username"
          onChange={(e)=>{setItemData(prevItem=>({...prevItem, username: e.target.value}))}}
          disabled={itemFormDisabled}
        />
        <label className="text-center font-medium">PASSWORD</label>
        <div className="w-8/12 flex-1 flex flex-row box-border items-stretch justify-items-stretch">
          <input
            className={`w-full flex text-[23.04px] bg-[transparent] rounded overflow-hidden flex-row py-0.5 px-[7px] box-border items-center justify-center ${itemFormDisabled ? '' : 'border-2 border-blue-100 bg-blue-50 bg-opacity-40'}`}
            type={showPassword?"text":"password"}
            value={itemData.password}
            placeholder="Password"
            onChange={(e)=>{setItemData(prevItem=>({...prevItem, password: e.target.value}))}}
            disabled={itemFormDisabled}
            />
            <button
              className="relative inset-y-0 right-0 pl-3 text-gray-500 hover:text-gray-800"
              onClick={() => setPasswordVisibility(!showPassword)}
            >
              {showPassword ? (
                <AiFillEyeInvisible className="w-5 h-5" aria-hidden="true" />
              ) : (
                <AiFillEye className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>

        <label className="text-center font-medium">WEBSITE</label>
        <input
          className={`flex text-[23.04px] bg-[transparent] rounded w-8/12 overflow-hidden flex-row py-0.5 px-[7px] box-border items-center justify-center ${itemFormDisabled ? '' : 'border-2 border-blue-100 bg-blue-50 bg-opacity-40'}`}
          type="text"
          value={itemData.website}
          placeholder="Website"
          onChange={(e)=>{setItemData(prevItem=>({...prevItem, website: e.target.value}))}}
          disabled={itemFormDisabled}
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

  const [itemDataList, setItemDataList] = useState([]);
  const shouldLoad = useRef(true);

  useTokenExpiration();

  useEffect(() => {
    if(shouldLoad.current){
      (async () => {
        console.log("Data loading!")
        const data = await getDefaultVaultItems();
        setItemDataList(data);
      })();
      shouldLoad.current = false;
    }
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
           itemDataList.map( itemData =>
            <NavLink
              to={`${itemData.id}`}
              key={itemData.id}
              className={({ isActive }) => isActive? "bg-gray-200 mt-1 mb-1 px-[16px] rounded-lg hover:bg-gray-200": "mt-1 mb-1 px-[16px] rounded-lg hover:bg-gray-100"}
            >
              <PasswordItem
                key={itemData.id}
                icon = "../subtract1.svg"
                // icon={itemData.icon}
                appName={itemData.title}
                userName={itemData.username}
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
        <Outlet context={[ itemDataList ]}/>
      </div>
    </div>
  );
};

export default AppHome;
