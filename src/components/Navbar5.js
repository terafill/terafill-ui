import { useMemo } from "react";
import "./Navbar5.css";

const Navbar5 = ({ rightNavBarPadding }) => {
  const rightNavBarStyle = useMemo(() => {
    return {
      padding: rightNavBarPadding,
    };
  }, [rightNavBarPadding]);

  return (
    <div className="navbar1" id="navbar">
      <div className="leftnavbar1">
        <div className="betalogo2">
          <img className="subtract-icon2" alt="" src="../subtract.svg" />
          <div className="keylance2">Keylance</div>
        </div>
        <div className="menuitems1">
          <button className="buttonderivativebase2">
            <button className="buttonroot2">
              <img className="iconxsmall2" alt="" src="../iconxsmall@2x.png" />
              <div className="label2">Products</div>
            </button>
          </button>
          <button className="buttonderivativebase2">
            <button className="buttonroot2">
              <img className="iconxsmall2" alt="" src="../iconxsmall@2x.png" />
              <div className="label2">Whitepaper</div>
            </button>
          </button>
          <button className="buttonderivativebase2">
            <button className="buttonroot2">
              <img className="iconxsmall2" alt="" src="../iconxsmall@2x.png" />
              <div className="label2">{`Download `}</div>
            </button>
          </button>
        </div>
      </div>
      <button className="rightnavbar1" style={rightNavBarStyle}>
        <button className="buttonderivativebase2">
          <button className="buttonroot2">
            <img className="iconxsmall2" alt="" src="../iconxsmall@2x.png" />
            <div className="label2">Login</div>
          </button>
        </button>
        <div className="buttonderivativebase6">
          <button className="buttonroot6">
            <img className="iconxsmall2" alt="" src="../iconxsmall@2x.png" />
            <div className="label6">Sign Up</div>
          </button>
        </div>
      </button>
    </div>
  );
};

export default Navbar5;
