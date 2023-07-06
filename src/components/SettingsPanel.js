import React from 'react';
import Button from '../components/Button';
import { NavLink } from 'react-router-dom';

const SettingsPanel = ({ activeSettingsPanel, setActiveSettingsPanel }) => {
  const extraBoxShadow = '0px 0px 4px rgba(0, 0, 0, 0.25) inset';
  return (
    <nav className='self-stretch bg-white bg-font-light shadow-[2px_4px_4px_rgba(0,_0,_0,_0.25)] overflow-hidden flex flex-col py-0 px-4 items-center justify-center gap-[64px] z-[1]'>
      <NavLink to='' onClick={() => setActiveSettingsPanel('Personal Info')}>
        <Button
          buttonType='panel'
          label='Personal Info'
          buttonClassName={`${activeSettingsPanel == 'Personal Info' ? 'bg-gray-100' : ''}`}
        />
      </NavLink>
      <NavLink to='security' onClick={() => setActiveSettingsPanel('Security')}>
        <Button
          buttonType='panel'
          label='Security'
          buttonClassName={`${activeSettingsPanel == 'Security' ? 'bg-gray-100' : ''}`}
        />
      </NavLink>
      <NavLink to='sharing/by-user' onClick={() => setActiveSettingsPanel('Sharing')}>
        <Button
          buttonType='panel'
          label='Sharing'
          buttonClassName={`${activeSettingsPanel == 'Sharing' ? 'bg-gray-100' : ''}`}
        />
      </NavLink>
      <NavLink to='device-management' onClick={() => setActiveSettingsPanel('Device Management')}>
        <Button
          buttonType='panel'
          label='Device Management'
          buttonClassName={`${activeSettingsPanel == 'Device Management' ? 'bg-gray-100' : ''}`}
        />
      </NavLink>
    </nav>
  );
};

export default SettingsPanel;
