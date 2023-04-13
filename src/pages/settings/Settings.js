import Navbar from "../../components/Navbar";
import SettingsPanel from "../../components/SettingsPanel";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const Settings = () => {

  const [activeSettingsPanel, setActiveSettingsPanel] = useState("Personal Info");

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center text-center text-3xl">
      <Navbar navbarType="app"/>
      <div className="self-stretch flex-1 overflow-hidden flex flex-row items-center justify-center">
        <SettingsPanel activeSettingsPanel={activeSettingsPanel} setActiveSettingsPanel={setActiveSettingsPanel} />
        <Outlet />
      </div>
    </div>
  );
};

export default Settings;