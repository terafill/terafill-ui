import Navbar from "../components/Navbar";
import SearchInputBox2 from "../components/SearchInputBox2";
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
    <div className="rightpanel1">
      <h1>Good Morning!</h1>
    </div>
  );
}


export const PasswordPanel = () => {

  const { passwordData } = useLoaderData();
  const { icon, passwordAppName, passwordUserName, website } = passwordData;

  return (
    <div className="rightpanel1">
      <div className="titlebar">
        <div className="iconframe">
          <img className="icon" alt="" src={icon} />
        </div>
        <h4 className="passwordAppName">{passwordAppName}</h4>
      </div>
      <div className="dataTable">
        <label className="dataRowLabel">USERNAME</label>
        <input
          className="inputbox"
          type="text"
          value={passwordUserName}
          placeholder="Username"
        />
        <label className="dataRowLabel">PASSWORD</label>
        <input
          className="inputbox"
          type="password"
          value="Password"
          placeholder="Password" />
        <label className="dataRowLabel">WEBSITE</label>
        <input
          className="inputbox"
          type="text"
          value={website}
          placeholder="Website"
        />
      </div>
      <Button
        label="View in dashboard"
        iconXSmall="../new-window.svg"
        iconXSmallDisplay="unset"
        iconPosition="right"
      />
  </div>
  );
}


const AppHome = () => {
  return (
    <div className="apphome">
      <Navbar navbarType="app"/>
      <div className="apphomeinner2">
        <div className="leftpanel">
          <div className="searchbar">
            <SearchInputBox2 />
          </div>
          <div className="itemlist">
          {
           passwordDataList.map( passwordData =>
            <NavLink
              to={`${passwordData.id}`}
              key={passwordData.id}
              style={{ textDecoration: 'none' }}
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
            iconXSmallDisplay="unset"
            iconXSmall="../icbaselineplus.svg"
            labelDisplay="none"
            buttonType="add"
            buttonPosition="absolute"
            buttonRight="24px"
            buttonBottom="24px"
            buttonZIndex="3"
            buttonPadding="var(--padding-2xs) var(--padding-2xs)"
          />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AppHome;
