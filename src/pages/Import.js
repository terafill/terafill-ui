import Navbar from "../components/Navbar";
import Button from "../components/Button";
import "./Import.css";

const Import = () => {
  return (
    <div className="import">
      <Navbar navbarType="app"/>
      <div className="apphomeinner3">
        <Button
          label="1password"
          buttonBackgroundColor="#fff"
          labelColor="#000"
          iconXSmall="../1passwordicon@2x.png"
          iconXSmallDisplay="unset"
          iconXSmallObjectFit="unset"
          iconXSmallOverflow="hidden"
        />
        <Button
          label="Lastpass"
          iconXSmall="../lastpassimage@2x.png"
          buttonBackgroundColor="#fff"
          labelColor="#000"
          iconXSmallDisplay="unset"
          iconXSmallObjectFit="unset"
          iconXSmallOverflow="hidden"
        />
        <Button
          label="RoboForm"
          iconXSmall="../roboformimage@2x.png"
          buttonBackgroundColor="#fff"
          labelColor="#000"
          iconXSmallDisplay="unset"
          iconXSmallObjectFit="unset"
          iconXSmallOverflow="hidden"
        />
        <Button
          label="iCloud passwords"
          buttonBackgroundColor="#fff"
          labelColor="#000"
          iconXSmall="../iconxsmall50.svg"
          iconXSmallDisplay="unset"
          iconXSmallObjectFit="unset"
          iconXSmallOverflow="hidden"
        />
        <Button
          label="Dashlane"
          buttonBackgroundColor="#fff"
          labelColor="#000"
          iconXSmall="../dashlane.svg"
          iconXSmallDisplay="unset"
          iconXSmallObjectFit="unset"
          iconXSmallOverflow="hidden"
        />
        <Button
          label="Keepass"
          buttonBackgroundColor="#fff"
          labelColor="#000"
          iconXSmall="../keepassimage@2x.png"
          iconXSmallDisplay="unset"
          iconXSmallObjectFit="unset"
          iconXSmallOverflow="hidden"
        />
        <Button
          label="Chrome"
          buttonBackgroundColor="#fff"
          labelColor="#000"
          iconXSmall="../iconxsmall27@2x.png"
          iconXSmallDisplay="unset"
          iconXSmallObjectFit="unset"
          iconXSmallOverflow="hidden"
        />
        <Button
          label="Firefox"
          buttonBackgroundColor="#fff"
          labelColor="#000"
          iconXSmall="../firefox-1@2x.png"
          iconXSmallDisplay="unset"
          iconXSmallObjectFit="unset"
          iconXSmallOverflow="hidden"
        />
        <Button
          label="Keepassxc"
          buttonBackgroundColor="#fff"
          labelColor="#000"
          iconXSmall="../keepassxcimage@2x.png"
          iconXSmallDisplay="unset"
          iconXSmallObjectFit="unset"
          iconXSmallOverflow="hidden"
        />
        <Button
          label="Thycotic "
          buttonBackgroundColor="#fff"
          labelColor="#000"
          iconXSmall="../thycoticimage@2x.png"
          iconXSmallDisplay="unset"
          iconXSmallObjectFit="unset"
          iconXSmallOverflow="hidden"
        />
        <Button
          label="Other"
          buttonBackgroundColor="#fff"
          labelColor="#000"
          iconXSmall="../vector8.svg"
          iconXSmallDisplay="unset"
          iconXSmallObjectFit="unset"
          iconXSmallOverflow="hidden"
        />
      </div>
    </div>
  );
};

export default Import;
