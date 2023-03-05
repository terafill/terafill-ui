import "./PasswordItem.css";

const PasswordItem = ({
  icon,
  appName,
  userName,
}) => {
  return (
    <button className="passwordItem">
      <img className="icon2" alt="" src={icon} />
      <div className="passwordData">
        <label className="appName">{appName}</label>
        <label className="userName">{userName}</label>
      </div>
    </button>
  );
};

export default PasswordItem;
