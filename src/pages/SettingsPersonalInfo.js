import Navbar from "../components/Navbar";
import SettingsPanel from "../components/SettingsPanel";
import Card from "../components/Card";
import "./SettingsPersonalInfo.css";

const SettingsPersonalInfo = () => {

  const userProfile = [
  {
    profileType: "Basic Info",
    profileAttributeList: [
      {
        attributeType: "Name",
        attributeValue: "Lionardo Da Vinci"
      },
      {
        attributeType: "Birthday",
        attributeValue: "15 April 1452"
      },
      {
        attributeType: "Gender",
        attributeValue: "Male"
      }
    ]
  },
  {
    profileType: "Contact Info",
    profileAttributeList: [
      {
        attributeType: "Email",
        attributeValue: "leonardo@keylance.in"
      },
      {
        attributeType: "PhoneNo",
        attributeValue: "00-000-0000"
      },
    ]
  }]

  return (
    <div className="settings-personal-info">
      <Navbar navbarType="app"/>
      <div className="apphomeinner7">
        <SettingsPanel activePanel="Personal Info" />
        <div className="rightpanel5">
          <div className="profileheader">
            <img
              className="iconoirprofile-circle"
              alt=""
              src="../iconoirprofilecircle.svg"
            />
            <b className="welcome-leonardo">Welcome, Leonardo</b>
          </div>
          {userProfile.map( userProfileData =>
            <Card
              cardType="userProfile"
              key={userProfileData.profileType}
              cardLabel={userProfileData.profileType}
              cardBodyData={userProfileData.profileAttributeList}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPersonalInfo;
