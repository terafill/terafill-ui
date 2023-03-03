import { useMemo } from "react";
import "./PasswordItem1.css";

const PasswordItem1 = ({
  rectangle16,
  usernameCursor,
  usernameFontWeight,
  appLabelCursor,
  appLabelFontWeight,
}) => {
  const usernameStyle = useMemo(() => {
    return {
      cursor: usernameCursor,
      fontWeight: usernameFontWeight,
    };
  }, [usernameCursor, usernameFontWeight]);

  const appLabelStyle = useMemo(() => {
    return {
      cursor: appLabelCursor,
      fontWeight: appLabelFontWeight,
    };
  }, [appLabelCursor, appLabelFontWeight]);

  return (
    <button className="passworditem1">
      <div className="icon3">
        <img className="icon-child" alt="" src={rectangle16} />
      </div>
      <div className="data2">
        <label className="app-label2" style={appLabelStyle}>
          App Label
        </label>
        <label className="app-label2" style={usernameStyle}>
          username
        </label>
      </div>
    </button>
  );
};

export default PasswordItem1;
