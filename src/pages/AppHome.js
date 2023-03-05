import Navbar from "../components/Navbar";
import SearchInputBox2 from "../components/SearchInputBox2";
import PasswordItem from "../components/PasswordItem";
import Button from "../components/Button";
import "./AppHome.css";


const PasswordPanel = ({
  icon,
  passwordAppName,
  passwordUserName,
  website
}) => {

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
        defaultValue={passwordUserName}
        placeholder="Username"
      />
      <label className="dataRowLabel">PASSWORD</label>
      <input
        className="inputbox"
        type="password"
        defaultValue="Password"
        placeholder="Password" />
      <label className="dataRowLabel">WEBSITE</label>
      <input
        className="inputbox"
        type="text"
        defaultValue={website}
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

  const passwordDataList = [
    {
      passwordAppName: "Netflix",
      passwordUserName: "ram@keyelance.in",
      icon: "../netflix2.png",
      website: "netflix.com",
    },
    {
      passwordAppName: "Facebook",
      passwordUserName: "ram123",
      icon: "../facebook2.png",
      website: "facebook.com",
    },
    {
      passwordAppName: "Twitter",
      passwordUserName: "leo@3423",
      icon: "../twitter3.png",
      website: "twitter.com",
    },
    {
      passwordAppName: "LinkedIn",
      passwordUserName: "leo@3423",
      icon: "../linkedin.png",
      website: "linkedin.com",
    },
    {
      passwordAppName: "Pinterest",
      passwordUserName: "leo@3423",
      icon: "../pinterest.png",
      website: "pinterest.com",
    },
    {
      passwordAppName: "Google",
      passwordUserName: "leo@3423",
      icon: "../google.png",
      website: "google.com",
    },
    {
      passwordAppName: "Paypal",
      passwordUserName: "leo@3423",
      icon: "../paypal.png",
      website: "paypal.com",
    },
    {
      passwordAppName: "Reddit",
      passwordUserName: "leo@3423",
      icon: "../reddit.png",
      website: "reddit.com",
    },
    {
      passwordAppName: "Skype",
      passwordUserName: "leo@3423",
      icon: "../skype.png",
      website: "skype.com",
    },
    {
      passwordAppName: "Yahoo",
      passwordUserName: "leo@3423",
      icon: "../yahoo.png",
      website: "yahoo.com",
    },
  ]

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
           passwordDataList.map( (passwordData, index) =>
            <PasswordItem
              key={index}
              icon={passwordData.icon}
              appName={passwordData.passwordAppName}
              userName={passwordData.passwordUserName}
            />
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
        <PasswordPanel
          icon={passwordDataList[0].icon}
          passwordAppName={passwordDataList[0].passwordAppName}
          passwordUserName={passwordDataList[0].passwordUserName}
          website={passwordDataList[0].website}
        />
      </div>
    </div>
  );
};

export default AppHome;
