export const MenuItem = ({ menuItem, onClick }) => {
  return (
    <button className="cursor-pointer rounded [border:none] p-2 bg-font-light self-stretch h-8 shrink-0 flex flex-row box-border items-center justify-center hover:bg-gray-100" onClick={onClick}>
      <b className="self-stretch flex-1 relative text-xs flex font-label-xlarge-bold text-background-dark text-center items-center justify-center">{menuItem}</b>
    </button>
  );
};

// const Menu = () => {

//   return (
//     <>
//     </>
//   );
// };

// export default Menu;
