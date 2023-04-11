import Navbar from "../../components/Navbar";
import SettingsPanel from "../../components/SettingsPanel";
import Card from "../../components/Card";

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
      <div className="self-stretch flex-1 bg-font-light overflow-hidden flex flex-col py-16 px-40 items-center justify-center gap-[64px] z-[0]">
        {userSecurity.map( userSecurityData =>
          <Card
            cardType="userSecurity"
            key={userSecurityData.securityType}
            cardLabel={userSecurityData.securityType}
            cardBodyData={userSecurityData.securityAttributeList}
          />
        )}
      </div>
  );
};

export default SettingsSecurity;
