import Navbar2 from "../components/Navbar2";
import Button from "../components/Button";
import "./Import.css";

const Import = () => {
  return (
    <div className="import">
      <Navbar2 />
      <div className="apphomeinner3">
        <Button
          label="1password"
          buttonRootBackgroundColor="#fff"
          labelColor="#000"
          iconXSmall="../1passwordicon@2x.png"
          iconXSmallDisplay="unset"
          iconXSmallObjectFit="unset"
          iconXSmallOverflow="hidden"
        />
        <Button
          label="Lastpass"
          iconXSmall="../lastpassimage@2x.png"
          buttonRootBackgroundColor="#fff"
          labelColor="#000"
          iconXSmallDisplay="unset"
          iconXSmallObjectFit="unset"
          iconXSmallOverflow="hidden"
        />
        <Button
          label="RoboForm"
          iconXSmall="../roboformimage@2x.png"
          buttonRootBackgroundColor="#fff"
          labelColor="#000"
          iconXSmallDisplay="unset"
          iconXSmallObjectFit="unset"
          iconXSmallOverflow="hidden"
        />
        <Button
          label="iCloud passwords"
          buttonRootBackgroundColor="#fff"
          labelColor="#000"
          iconXSmall="../iconxsmall50.svg"
          iconXSmallDisplay="unset"
          iconXSmallObjectFit="unset"
          iconXSmallOverflow="hidden"
        />
        <Button
          label="Dashlane"
          buttonRootBackgroundColor="#fff"
          labelColor="#000"
          iconXSmall="../dashlane.svg"
          iconXSmallDisplay="unset"
          iconXSmallObjectFit="unset"
          iconXSmallOverflow="hidden"
        />
        <Button
          label="Keepass"
          buttonRootBackgroundColor="#fff"
          labelColor="#000"
          iconXSmall="../keepassimage@2x.png"
          iconXSmallDisplay="unset"
          iconXSmallObjectFit="unset"
          iconXSmallOverflow="hidden"
        />
        <Button
          label="Chrome"
          buttonRootBackgroundColor="#fff"
          labelColor="#000"
          iconXSmall="../iconxsmall27@2x.png"
          iconXSmallDisplay="unset"
          iconXSmallObjectFit="unset"
          iconXSmallOverflow="hidden"
        />
        <Button
          label="Firefox"
          buttonRootBackgroundColor="#fff"
          labelColor="#000"
          iconXSmall="../firefox-1@2x.png"
          iconXSmallDisplay="unset"
          iconXSmallObjectFit="unset"
          iconXSmallOverflow="hidden"
        />
        <Button
          label="Keepassxc"
          buttonRootBackgroundColor="#fff"
          labelColor="#000"
          iconXSmall="../keepassxcimage@2x.png"
          iconXSmallDisplay="unset"
          iconXSmallObjectFit="unset"
          iconXSmallOverflow="hidden"
        />
        <Button
          label="Thycotic "
          buttonRootBackgroundColor="#fff"
          labelColor="#000"
          iconXSmall="../thycoticimage@2x.png"
          iconXSmallDisplay="unset"
          iconXSmallObjectFit="unset"
          iconXSmallOverflow="hidden"
        />
        <Button
          label="Other"
          buttonRootBackgroundColor="#fff"
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
