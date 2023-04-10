import Navbar from "../components/Navbar";
import SettingsPanel from "../components/SettingsPanel";
import SearchInputBox from "../components/SearchInputBox";
import Button from "../components/Button";
import Card from "../components/Card";
import "./SettingsDeviceManagement.css";

const SettingsDeviceManagement = () => {

  const deviceDataList = [
    {
      deviceId: 1,
      deviceName: "Home McBook",
      deviceLocation: "Delhi",
      deviceIcon: "../appleDark.png",
      deviceEventList:[
        {
          eventDate: "2020-20-20",
          eventDescription: "Logged in into Keylance account"
        },
        {
          eventDate: "2020-20-20",
          eventDescription: "You created new password for twitter account twitter account"
        }
      ]
    },
    {
      deviceId: 2,
      deviceName: "Samsung Smartphone",
      deviceLocation: "Noida",
      deviceIcon: "../android.png",
      deviceEventList:[
        {
          eventDate: "2020-20-20",
          eventDescription: "Logged in into Keylance account"
        },
        {
          eventDate: "2020-20-20",
          eventDescription: "You created new password for twitter account twitter account"
        }
      ]
    }
  ]

  return (
    <div className="settings-device-management">
      <Navbar navbarType="app"/>
      <div className="apphomeinner1">
        <SettingsPanel activePanel="Device Management" />
        <div className="rightpanel">
          <SearchInputBox />
          <Button buttonType="dark" label="Sync new device"/>
          {deviceDataList.map( deviceData =>
            <Card
              cardType="device"
              key={deviceData.deviceId}
              icon={deviceData.deviceIcon}
              cardLabel={deviceData.deviceName}
              cardLabel2={deviceData.deviceLocation}
              cardBodyData={deviceData.deviceEventList}
              cardButtonVisible={true}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsDeviceManagement;
