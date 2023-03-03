import "./MenuItem.css";

const MenuItem = ({ menuItem, openSignoutPopup }) => {
  return (
    <button className="menuitem" onClick={openSignoutPopup}>
      <b className="menu-item">{menuItem}</b>
    </button>
  );
};

export default MenuItem;
