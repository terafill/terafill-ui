import Navbar from "../components/Navbar";
import PasswordItem from "../components/PasswordItem";
import Button from "../components/Button";
import "./AppHome.css";
import { NavLink, Outlet, useParams, useLoaderData } from "react-router-dom";


const passwordDataList = [
    {
      id: 1,
      passwordAppName: "Netflix",
      passwordUserName: "ram@keyelance.in",
      icon: "../netflix2.png",
      website: "netflix.com",
    },
    {
      id: 2,
      passwordAppName: "Facebook",
      passwordUserName: "ram123",
      icon: "../facebook2.png",
      website: "facebook.com",
    },
    {
      id: 3,
      passwordAppName: "Twitter",
      passwordUserName: "leo@3423",
      icon: "../twitter3.png",
      website: "twitter.com",
    },
    {
      id: 4,
      passwordAppName: "LinkedIn",
      passwordUserName: "leo@3423",
      icon: "../linkedin.png",
      website: "linkedin.com",
    },
    {
      id: 5,
      passwordAppName: "Pinterest",
      passwordUserName: "leo@3423",
      icon: "../pinterest.png",
      website: "pinterest.com",
    },
    {
      id: 6,
      passwordAppName: "Google",
      passwordUserName: "leo@3423",
      icon: "../google.png",
      website: "google.com",
    },
    {
      id: 7,
      passwordAppName: "Paypal",
      passwordUserName: "leo@3423",
      icon: "../paypal.png",
      website: "paypal.com",
    },
    {
      id: 8,
      passwordAppName: "Reddit",
      passwordUserName: "leo@3423",
      icon: "../reddit.png",
      website: "reddit.com",
    },
    {
      id: 9,
      passwordAppName: "Skype",
      passwordUserName: "leo@3423",
      icon: "../skype.png",
      website: "skype.com",
    },
    {
      id: 10,
      passwordAppName: "Yahoo",
      passwordUserName: "leo@3423",
      icon: "../yahoo.png",
      website: "yahoo.com",
    },
]

export async function passwordDataLoader({ params }) {

  let item = null;
  let passwordData = null;
  for (let i=0; i<passwordDataList.length;i++) {
    item = passwordDataList[i];
    if(item.id===parseInt(params.id)){
      passwordData = item;
      break;
    }
  }
  return { passwordData };
}

export const PasswordPanelIndex = () => {
  return (
    <div className="self-stretch flex-1 overflow-hidden flex flex-col py-[32px] px-[16px] h-1/1 items-center justify-center z-[0] text-4xl">
      <h1>Good Morning!</h1>
    </div>
  );
}


export const PasswordPanel = () => {

  const { passwordData } = useLoaderData();
  const { icon, passwordAppName, passwordUserName, website } = passwordData;

  return (
    <div className="self-stretch flex-1 overflow-hidden flex flex-col py-[32px] px-[16px] h-1/1 items-center justify-between z-[0]" id="right-panel">
      <div className="grid grid-cols-2 grid-rows-4 items-center justify-center justify-items-center gap-4">
        <div className="self-stretch flex-1" id="iconframe">
          <img className="w-[88px] h-[88px] overflow-hidden object-cover" alt="" src={icon} />
        </div>
        <h4 className="[border:none] flex self-stretch flex-1 relative text-4xl leading-[120%] font-bold font-inherit flex items-center">{passwordAppName}</h4>
        <label className="text-center font-medium">USERNAME</label>
        <input
          className="[border:none] flex text-[23.04px] bg-[transparent] rounded-3xs w-2/3 overflow-hidden flex-row py-0.5 px-[7px] box-border items-center justify-center"
          type="text"
          value={passwordUserName}
          placeholder="Username"
        />
        <label className="text-center font-medium">PASSWORD</label>
        <input
          className="[border:none] flex text-[23.04px] bg-[transparent] rounded-3xs w-2/3 overflow-hidden flex-row py-0.5 px-[7px] box-border items-center justify-center"
          type="password"
          value="Password"
          placeholder="Password" />
        <label className="text-center font-medium">WEBSITE</label>
        <input
          className="[border:none] flex text-[23.04px] bg-[transparent] rounded-3xs w-2/3 overflow-hidden flex-row py-0.5 px-[7px] box-border items-center justify-center "
          type="text"
          value={website}
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
                icon={passwordData.icon}
                appName={passwordData.passwordAppName}
                userName={passwordData.passwordUserName}
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
        <Outlet />
      </div>
    </div>
  );
};

export default AppHome;
