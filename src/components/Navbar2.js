import "./Navbar2.css";

const Navbar2 = () => {
  return (
    <div className="navbar2">
      <div className="leftnavbar2">
        <div className="betalogo3">
          <img className="subtract-icon3" alt="" src="../subtract.svg" />
          <div className="keylance3">Keylance</div>
        </div>
        <div className="menuitems2">
          <button className="buttonderivativebase7">
            <button className="buttonroot7">
              <img className="iconxsmall7" alt="" src="../iconxsmall@2x.png" />
              <div className="label8">Products</div>
            </button>
          </button>
          <button className="buttonderivativebase7">
            <button className="buttonroot7">
              <img className="iconxsmall7" alt="" src="../iconxsmall@2x.png" />
              <div className="label8">Whitepaper</div>
            </button>
          </button>
          <button className="buttonderivativebase7">
            <button className="buttonroot7">
              <img className="iconxsmall7" alt="" src="../iconxsmall@2x.png" />
              <div className="label8">{`Download `}</div>
            </button>
          </button>
        </div>
      </div>
      <div className="rightnavbar2">
        <div className="buttonderivativebase10">
          <button className="buttonroot10">
            <img className="iconxsmall10" alt="" src="../iconxsmall18.svg" />
            <div className="label11">Label</div>
          </button>
        </div>
        <div className="buttonderivativebase10">
          <button className="buttonroot10">
            <div className="iconxsmall11">
              <img className="vector-icon3" alt="" src="../vector3.svg" />
            </div>
            <div className="label11">Label</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar2;
