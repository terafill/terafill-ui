import "./LinkButton.css";

const LinkButton = ({ iconXSmall, label }) => {
  return (
    <a className="buttonderivativebase1">
      <button className="buttonroot1">
        <img className="iconxsmall1" alt="" src={iconXSmall} />
        <div className="label1">{label}</div>
      </button>
    </a>
  );
};

export default LinkButton;
