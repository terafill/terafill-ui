import Navbar from "../components/Navbar";
import Button from "../components/Button";
import "./HelpSupport.css";

const HelpSupport = () => {
  return (
    <div className="relative bg-background-light-gray w-full h-[720px] flex flex-col items-center justify-center">
      <Navbar navbarType="app"/>
      <div className="self-stretch flex-1 relative bg-font-light overflow-hidden flex flex-row items-center justify-center gap-8">
        <Button
          label="Request a feature"
          buttonType="light"
          buttonClassName="gap-[8px] px-8 py-4"
          icon="../iconxsmall21@2x.png"
          iconClassName="relative w-6 h-6 shrink-0"
        />
        <Button
          label="Submit a bug"
          buttonType="light"
          buttonClassName="gap-[8px] px-8 py-4"
          icon="../iconxsmall21@2x.png"
          iconClassName="relative w-6 h-6 shrink-0"
        />
        <Button
          label="Contact customer care"
          buttonType="light"
          buttonClassName="gap-[8px] px-8 py-4"
          icon="../iconxsmall21@2x.png"
          iconClassName="relative w-6 h-6 shrink-0"
        />
      </div>
    </div>
  );
};

export default HelpSupport;
