import Button from "../components/Button";
import "./SettingsPanel.css";

const SettingsPanel = () => {
  return (
    <nav className="leftpanel1">
      <Button
        label="Personal Info"
        buttonDerivativeBaseOverflow="unset"
        buttonBackgroundColor="transparent"
        buttonBoxShadow="unset"
        labelColor="#3f9bf1"
        iconXSmall="../iconxsmall@2x.png"
      />
      <Button
        label="Security"
        buttonDerivativeBaseOverflow="unset"
        buttonBackgroundColor="transparent"
        buttonBoxShadow="unset"
        labelColor="#3f9bf1"
        iconXSmall="../iconxsmall27@2x.png"
      />
      <Button
        label="Sharing"
        buttonDerivativeBaseOverflow="unset"
        buttonBackgroundColor="transparent"
        buttonBoxShadow="unset"
        labelColor="#3f9bf1"
        iconXSmall="../iconxsmall@2x.png"
      />
      <Button
        label="Device Management"
        buttonDerivativeBaseOverflow="unset"
        buttonBackgroundColor="#eee"
        buttonBoxShadow="0px 0px 4px rgba(0, 0, 0, 0.25) inset"
        labelColor="#3f9bf1"
        iconXSmall="../iconxsmall@2x.png"
      />
    </nav>
  );
};

export default SettingsPanel;
