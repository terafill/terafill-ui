import React from 'react';
export const MenuItem = ({ menuItem, onClick }: { menuItem: string; onClick: (e) => void }) => {
    return (
        <button
            className='bg-font-light box-border flex h-8 shrink-0 cursor-pointer flex-row items-center justify-center self-stretch rounded p-2 [border:none] hover:bg-gray-100'
            onClick={onClick}
        >
            <b className='font-label-xlarge-bold text-background-dark relative flex flex-1 items-center justify-center self-stretch text-center text-xs'>
                {menuItem}
            </b>
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
