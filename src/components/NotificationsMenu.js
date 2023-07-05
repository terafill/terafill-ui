import React from 'react';
import { memo } from "react";
import { MenuItem } from "../components/Menu";

const NotificationsMenu = memo(({ onClose }) => {
  return (
    <div className="relative shadow-[0px_0px_4px_rgba(0,_0,_0,_0.25)] rounded-md bg-white overflow-hidden flex flex-col items-center justify-center max-w-full max-h-full">
      <div className="px-2 py-2 w-[232px] overflow-hidden flex flex-col items-center justify-center gap-2">
        <MenuItem menuItem="Netflix password updated" />
        <MenuItem menuItem="Account login detected from new device" />
        <MenuItem menuItem="Multiple Passwords deleted " />
      </div>
    </div>
  );
});

export default NotificationsMenu;
