import Navbar from "../components/Navbar";
import Button from "../components/Button";
import "./Import.css";

const Import = () => {

  const importList = [

    {"label": "1passoword",
    "image": "../1passwordicon@2x.png"},
    {"label": "Lastpass",
    "image": "../lastpassimage@2x.png"},
    {"label": "RoboForm",
    "image": "../roboformimage@2x.png"},
    {"label": "iCloud passwords",
    "image": "../apple.svg"},
    {"label": "Dashlane",
    "image": "../dashlane.svg"},
    {"label": "Keepass",
    "image": "../keepassimage@2x.png"},
    {"label": "Chrome",
    "image": "../chrome@2x.png"},
    {"label": "Firefox",
    "image": "../firefox-1@2x.png"},
    {"label": "Keepassxc",
    "image": "../keepassxcimage@2x.png"},
    {"label": "Thycotic",
    "image": "../thycoticimage@2x.png"},
    {"label": "Other",
    "image": "../chevronRight.svg"},
  ];

  return (
    <div className="import">
      <Navbar navbarType="app"/>
      <div className="apphomeinner3">
      {
        importList.map(
          importItem =>
          <Button
            label={importItem.label}
            iconXSmall={importItem.image}
            buttonType="light"
            iconXSmallDisplay="unset"
        />)
      }
      </div>
    </div>
  );
};

export default Import;
