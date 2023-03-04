import Navbar from "../components/Navbar";
import SearchInputBox2 from "../components/SearchInputBox2";
import PasswordItem from "../components/PasswordItem";
import PasswordItem1 from "../components/PasswordItem1";
import Button from "../components/Button";
import "./AppHome.css";

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
            <PasswordItem />
            <PasswordItem1 rectangle16="../rectangle-16@2x.png" />
            <PasswordItem1 rectangle16="../rectangle-16@2x.png" />
            <PasswordItem1 rectangle16="../rectangle-16@2x.png" />
            <PasswordItem1 rectangle16="../rectangle-16@2x.png" />
            <PasswordItem1 rectangle16="../rectangle-16@2x.png" />
            <PasswordItem1 rectangle16="../rectangle-16@2x.png" />
            <PasswordItem1 rectangle16="../rectangle-16@2x.png" />
            <PasswordItem1 rectangle16="../rectangle-167@2x.png" />
            <PasswordItem1 rectangle16="../rectangle-168@2x.png" />
            <PasswordItem1
              rectangle16="../rectangle-168@2x.png"
              usernameCursor="unset"
              usernameFontWeight="bold"
            />
            <PasswordItem1
              rectangle16="../rectangle-168@2x.png"
              usernameCursor="unset"
              usernameFontWeight="bold"
              appLabelCursor="unset"
              appLabelFontWeight="bold"
            />
            <PasswordItem1
              rectangle16="../rectangle-168@2x.png"
              usernameCursor="unset"
              usernameFontWeight="bold"
              appLabelCursor="unset"
              appLabelFontWeight="bold"
            />
            <PasswordItem1
              rectangle16="../rectangle-168@2x.png"
              usernameCursor="unset"
              usernameFontWeight="bold"
              appLabelCursor="unset"
              appLabelFontWeight="bold"
            />
          </div>
          <Button
            iconXSmallDisplay="unset"
            iconXSmall="../icbaselineplus.svg"
            labelDisplay="none"
            buttonType="add"
          />
        </div>
        <div className="rightpanel1">
          <div className="titlebar">
            <div className="iconframe">
              <img className="icon" alt="" src="../icon3@2x.png" />
            </div>
            <h4 className="netflix">Netflix</h4>
          </div>
          <input
            className="inputbox"
            type="text"
            defaultValue="harshitsaini"
            placeholder="Username"
          />
          <input className="inputbox" type="password" placeholder="Password" />
          <input
            className="inputbox"
            type="text"
            defaultValue="netflix.com"
            placeholder="Website"
          />
          <Button
            label="View in dashboard"
            iconXSmall="../new-window.svg"
            iconXSmallDisplay="unset"
            iconPosition="right"
          />
        </div>
      </div>
    </div>
  );
};

export default AppHome;
