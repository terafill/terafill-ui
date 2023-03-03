import Button from "../components/Button";
import "./SharingCardItem2.css";

const SharingCardItem2 = ({ label }) => {
  return (
    <div className="carditem4">
      <label className="label40">{label}</label>
      <Button
        label="Change Password"
        buttonDerivativeBaseOverflow="unset"
        buttonRootBackgroundColor="transparent"
        buttonRootBoxShadow="unset"
        labelColor="#3f9bf1"
        iconXSmall="../iconxsmall@2x.png"
      />
      <Button
        label="Recovery kit"
        buttonDerivativeBaseOverflow="unset"
        buttonRootBackgroundColor="transparent"
        buttonRootBoxShadow="unset"
        labelColor="#3f9bf1"
        iconXSmall="../iconxsmall@2x.png"
      />
    </div>
  );
};

export default SharingCardItem2;
