import "./Navbar1.css";

const Navbar1 = () => {
  return (
    <div className="navbar5" id="navbar">
      <div className="leftnavbar5">
        <div className="betalogo6">
          <img className="subtract-icon6" alt="" src="../subtract.svg" />
          <div className="keylance6">Keylance</div>
        </div>
        <div className="menuitems5">
          <div className="buttonderivativebase25">
            <button className="buttonroot26">
              <img className="iconxsmall25" alt="" src="../iconxsmall@2x.png" />
              <div className="label28">Products</div>
            </button>
          </div>
          <div className="buttonderivativebase25">
            <button className="buttonroot26">
              <img className="iconxsmall25" alt="" src="../iconxsmall@2x.png" />
              <div className="label28">Whitepaper</div>
            </button>
          </div>
          <button className="buttonderivativebase27">
            <button className="buttonroot26">
              <img className="iconxsmall25" alt="" src="../iconxsmall@2x.png" />
              <div className="label28">{`Download `}</div>
            </button>
          </button>
        </div>
      </div>
      <button className="rightnavbar5">
        <button className="buttonderivativebase27">
          <button className="buttonroot26">
            <img className="iconxsmall25" alt="" src="../iconxsmall@2x.png" />
            <div className="label28">Login</div>
          </button>
        </button>
        <div className="buttonderivativebase29">
          <button className="buttonroot30">
            <img className="iconxsmall25" alt="" src="../iconxsmall@2x.png" />
            <div className="label32">Sign Up</div>
          </button>
        </div>
      </button>
    </div>
  );
};

export default Navbar1;
