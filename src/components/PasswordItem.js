const PasswordItem = ({
  icon,
  appName,
  userName,
}) => {
  return (
    <button className="cursor-pointer rounded-lg [border:none] overflow-hidden flex flex-row items-center justify-start">
      <img className="relative w-[40px] h-[40px] shrink-0 overflow-hidden object-cover" alt="" src={icon} />
      <div className="flex flex-col text-left px-[8px] py-[8px]">
        <label className="cursor-pointer relative text-xl tracking-[0.03em] font-bold w-[230px] h-[23px] shrink-0 truncate overflow-hidden line-clamp-2">{appName}</label>
        <label className="cursor-pointer relative text-base tracking-[0.03em] w-[230px] h-[23px] shrink-0 truncate overflow-hidden line-clamp-2">{userName}</label>
      </div>
    </button>
  );
};

export default PasswordItem;
