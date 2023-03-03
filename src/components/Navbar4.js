import "./Navbar4.css";

const Navbar4 = () => {
  return (
    <div className="navbar3">
      <div className="leftnavbar3">
        <div className="betalogo4">
          <img className="subtract-icon4" alt="" src="../subtract.svg" />
          <div className="keylance4">Keylance</div>
        </div>
        <div className="menuitems3">
          <div className="buttonderivativebase12">
            <button className="buttonroot13">
              <img className="iconxsmall13" alt="" src="../iconxsmall@2x.png" />
              <div className="label14">Products</div>
            </button>
          </div>
          <div className="buttonderivativebase12">
            <button className="buttonroot13">
              <img className="iconxsmall13" alt="" src="../iconxsmall@2x.png" />
              <div className="label14">Whitepaper</div>
            </button>
          </div>
          <button className="buttonderivativebase14">
            <button className="buttonroot13">
              <img className="iconxsmall13" alt="" src="../iconxsmall@2x.png" />
              <div className="label14">{`Download `}</div>
            </button>
          </button>
        </div>
      </div>
      <div className="rightnavbar3">
        <div className="buttonderivativebase15">
          <button className="buttonroot16">
            <img className="iconxsmall16" alt="" src="../iconxsmall18.svg" />
            <div className="label17">Label</div>
          </button>
        </div>
        <div className="buttonderivativebase15">
          <button className="buttonroot16">
            <div className="iconxsmall17">
              <img className="vector-icon4" alt="" src="../vector3.svg" />
            </div>
            <div className="label17">Label</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar4;
