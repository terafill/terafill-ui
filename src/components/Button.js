import { useMemo } from "react";

const Button = ({
  buttonType,
  buttonClassName,
  onClick,
  label,
  labelDisplay,
  labelClassName,
  icon,
  iconDisplay,
  iconPosition="left",
  iconClassName,
}) => {

  const buttonTypeClassMap = {
    dark: "bg-black text-white font-medium text-base py-1 px-3 rounded-lg shadow-md hover:bg-gray-800 focus:outline-none transition-all",
    panel: "text-blue-400 font-medium text-base py-1 px-3 rounded-lg hover:bg-gray-200 focus:outline-none transition-all",
    link: "text-blue-400 font-medium text-base py-1 px-3 rounded-lg hover:bg-blue-50 focus:outline-none transition-all",
    red: "bg-red-500 text-white font-medium text-base py-1 px-3 rounded-lg shadow-md hover:bg-red-600 focus:outline-none transition-all",
    blue: "",
    light: "bg-white text-black font-medium text-base py-1 px-3 rounded-lg shadow-all-direction hover:bg-gray-200 focus:outline-none transition-all flex flex-row items-center justify-center gap-[8px]",
    lightOutlined: "",
  }

  const labelTypeClassMap = {
    dark: "cursor-pointer",
    panel: "cursor-pointer",
    link: "cursor-pointer",
    red: "cursor-pointer",
    blue: "cursor-pointer",
    light: "cursor-pointer",
    lightOutlined: "cursor-pointer",
  }

  const iconTypeClassMap = {
    dark: "",
    panel: "",
    link: "",
    red: "",
    blue: "",
    light: "",
    lightOutlined: "",
  }

  if (buttonType == undefined || buttonType == null){
    buttonType = "dark";
  }

  return (
      <button
        className={`${buttonClassName} ${buttonTypeClassMap[buttonType]}`}
        onClick={onClick}
        >
        {iconPosition==="left"?<img
          className={`${iconTypeClassMap[buttonType]} ${iconClassName}`}
          alt=""
          src={icon}
        />: ""}
        {label && <label className={`${labelTypeClassMap[buttonType]} ${labelClassName}`}>
          {label}
        </label>}
        {iconPosition==="right"?<img
          className={`${iconTypeClassMap[buttonType]} ${iconClassName}`}
          alt=""
          src={icon}
        />: ""}
      </button>
  );
};

export default Button;
