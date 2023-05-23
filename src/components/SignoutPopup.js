import { memo } from "react";
import Button from "../components/Button";
import { NavLink } from "react-router-dom";

const SignoutPopup = memo(({ onConfirm, onClose }) => {
  return (
    <div className="bg-white relative rounded-md overflow-hidden px-8 py-8 flex flex-col items-center justify-center gap-4 max-w-full max-h-full">
      <b className="relative flex items-center justify-center shrink-0 text-lg">
        Confirm sign out ?
      </b>
      <div className="self-stretch flex flex-row items-center justify-center gap-4">
        <Button onClick={onConfirm} label="Confirm" />
        <Button onClick={onClose} label="Cancel"/>
      </div>
    </div>
  );
});

export default SignoutPopup;
