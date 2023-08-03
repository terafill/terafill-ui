import React, { memo, FC, ReactNode } from 'react';

interface ButtonProps {
  buttonType?: string;
  buttonClassName?: string;
  onClick?: () => void;
  label: string;
  labelClassName?: string;
  icon?: string;
  iconComponent?: ReactNode;
  iconPosition?: string;
  iconClassName?: string;
  id?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

const Button: FC<React.PropsWithChildren<ButtonProps>> = ({
  buttonType,
  buttonClassName,
  label,
  labelClassName,
  icon,
  iconComponent,
  iconPosition = 'left',
  iconClassName,
  type = 'button',
  ...props
}) => {
  const buttonTypeClassMap = {
    dark: 'bg-black text-white font-medium text-base py-1 px-3 rounded-lg shadow-md hover:bg-gray-800 focus:outline-none transition-all flex flex-row items-center justify-center',
    panel:
      'text-blue-400 font-medium text-base py-1 px-3 rounded-lg hover:bg-gray-200 focus:outline-none transition-all flex flex-row items-center justify-center',
    link: 'text-blue-400 font-medium text-base py-1 px-3 rounded-lg hover:bg-blue-50 focus:outline-none transition-all flex flex-row items-center justify-center',
    red: 'bg-red-500 text-white font-medium text-base py-1 px-3 rounded-lg shadow-md hover:bg-red-600 focus:outline-none transition-all flex flex-row items-center justify-center',
    blue: 'bg-blue-500 text-white font-medium text-base py-1 px-3 rounded-lg shadow-md hover:bg-blue-400 focus:outline-none transition-all flex flex-row items-center justify-center',
    light:
      'bg-white text-black font-medium text-base py-1 px-3 rounded-lg shadow-all-direction hover:bg-gray-300 focus:outline-none transition-all flex flex-row items-center justify-center',
    lightOutlined: '',
  };

  const labelTypeClassMap = {
    dark: 'cursor-pointer',
    panel: 'cursor-pointer',
    link: 'cursor-pointer',
    red: 'cursor-pointer',
    blue: 'cursor-pointer',
    light: 'cursor-pointer',
    lightOutlined: 'cursor-pointer',
  };

  const iconTypeClassMap = {
    dark: '',
    panel: '',
    link: '',
    red: '',
    blue: '',
    light: '',
    lightOutlined: '',
  };

  if (buttonType == undefined || buttonType == null) {
    buttonType = 'dark';
  }
  return (
    <button
      className={`${buttonTypeClassMap[buttonType]} ${buttonClassName}`}
      type={type}
      {...props}
    >
      {props.children}
      {iconPosition === 'left' && (icon || iconComponent) && (
        <span className={`${iconTypeClassMap[buttonType]} ${iconClassName}`}>
          {icon ? <img alt='' src={icon} /> : iconComponent}
        </span>
      )}
      {label && <div className={`${labelTypeClassMap[buttonType]} ${labelClassName}`}>{label}</div>}
      {iconPosition === 'right' && (icon || iconComponent) && (
        <span className={`${iconTypeClassMap[buttonType]} ${iconClassName}`}>
          {icon ? <img alt='' src={icon} /> : iconComponent}
        </span>
      )}
    </button>
  );
};

export default memo(Button);
