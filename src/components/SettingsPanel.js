import Button from "../components/Button";
import "./SettingsPanel.css";

const SettingsPanel = ( { activePanel } ) => {
  const extraBoxShadow = "0px 0px 4px rgba(0, 0, 0, 0.25) inset";
  return (
    <nav className="leftpanel1">
      <Button
        label="Personal Info"
        buttonType="link"
        buttonBoxShadow={activePanel=="Personal Info"?extraBoxShadow:"none"}
      />
      <Button
        label="Security"
        buttonType="link"
        buttonBoxShadow={activePanel=="Security"?extraBoxShadow:"none"}
      />
      <Button
        label="Sharing"
        buttonType="link"
        buttonBoxShadow={activePanel=="Sharing"?extraBoxShadow:"none"}
      />
      <Button
        label="Device Management"
        buttonType="link"
        buttonBoxShadow={activePanel=="Device Management"?extraBoxShadow:"none"}
      />
    </nav>
  );
};

export default SettingsPanel;
