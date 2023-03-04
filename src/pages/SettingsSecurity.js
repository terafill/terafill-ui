import Navbar from "../components/Navbar";
import SettingsPanel from "../components/SettingsPanel";
import Card from "../components/Card";
import "./SettingsSecurity.css";

const userSecurity = [
  {
    securityType: "Email",
    securityAttributeList: [
      {
        attributeType: "Primary Email",
        attributeValue: "leonardo@keylance.in"
      },
      {
        attributeType: "Recovery Email",
        attributeValue: "leo2@keylance.io"
      },
    ]
  },
  {
    securityType: "Password & Encryption Keys",
    securityAttributeList: [
      {
        attributeType: "Master Password",
        attributeValue: null
      },
      {
        attributeType: "Encryption Key 1",
        attributeValue: null
      },
    ]
  }]

const SettingsSecurity = () => {
  return (
    <div className="settings-security">
      <Navbar navbarType="app"/>
      <div className="apphomeinner6">
        <SettingsPanel activePanel="Security" />
        <div className="rightpanel4">
          {userSecurity.map( userSecurityData =>
            <Card
              cardType="userSecurity"
              key={userSecurityData.securityType}
              cardLabel={userSecurityData.securityType}
              cardBodyData={userSecurityData.securityAttributeList}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsSecurity;
