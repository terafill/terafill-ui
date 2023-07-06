import Navbar from '../../components/Navbar';
import SettingsPanel from '../../components/SettingsPanel';
import Button from '../../components/Button';
import Card from '../../components/Card';

import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export const SettingsSharingByUser = () => {
  const userDataList = [
    {
      id: 1,
      userName: 'Ram Kumar',
      userEmailName: 'ram@example.com',
      passwordList: [
        {
          passwordAppName: 'Netflix',
          passwordUserName: 'leonardo@keylance.in',
        },
        {
          passwordAppName: 'Facebook',
          passwordUserName: 'leo42',
        },
      ],
    },
    {
      id: 2,
      userName: 'Karan Sharma',
      userEmailName: 'karan@example.com',
      passwordList: [
        {
          passwordAppName: 'Netflix',
          passwordUserName: 'leonardo@keylance.in',
        },
        {
          passwordAppName: 'Facebook',
          passwordUserName: 'leo42',
        },
      ],
    },
  ];

  return (
    <>
      {userDataList.map((userData) => (
        <Card
          cardType='user'
          key={userData.id}
          cardLabel={userData.userName}
          cardLabel2={userData.userEmailName}
          cardBodyData={userData.passwordList}
        />
      ))}
    </>
  );
};

export const SettingsSharingByPassword = () => {
  const passwordDataList = [
    {
      id: 1,
      passwordAppName: 'Netflix',
      passwordUserName: 'leonardo@keylance.in',
      passwordIcon: '/netflix2.png',
      userList: [
        {
          userName: 'Ram Kumar',
          userEmail: 'ram@example.com',
        },
        {
          userName: 'Karan Sharma',
          userEmail: 'karan@example.com',
        },
      ],
    },
    {
      id: 2,
      passwordAppName: 'Facebook',
      passwordUserName: 'leo42',
      passwordIcon: '/facebook2.png',
      userList: [
        {
          userName: 'Ram Kumar',
          userEmail: 'ram@example.com',
        },
        {
          userName: 'Karan Sharma',
          userEmail: 'karan@example.com',
        },
      ],
    },
    {
      id: 3,
      passwordAppName: 'Twitter',
      passwordUserName: 'davinci.leo123123',
      passwordIcon: '/twitter3.png',
      userList: [
        {
          userName: 'Ram Kumar',
          userEmail: 'ram@example.com',
        },
        {
          userName: 'Karan Sharma',
          userEmail: 'karan@example.com',
        },
      ],
    },
  ];

  return (
    <>
      {passwordDataList.map((passwordData) => (
        <Card
          cardType='password'
          key={passwordData.id}
          icon={passwordData.passwordIcon}
          cardLabel={passwordData.passwordAppName}
          cardLabel2={passwordData.passwordUserName}
          cardBodyData={passwordData.userList}
        />
      ))}
    </>
  );
};

const SettingsSharing = () => {
  const [activeSharingPanel, setActiveSharingPanel] = useState('By User');

  return (
    <div className='self-stretch flex-1 overflow-y-auto flex flex-col py-8 px-40 items-center justify-start gap-[32px] z-[0]'>
      <input
        className={
          '[border:none] px-4 py-2 flex text-[23.04px] bg-gray-200 rounded-xl h- 100 h-[4rem] w-2/3 flex-row items-center justify-center'
        }
        type='text'
        placeholder=' 🔎 Quick Search'
      />
      <b className='relative leading-[120%]'>Group By</b>
      <nav className='flex flex-row items-start justify-start gap-[4px]'>
        <NavLink to='by-user' onClick={() => setActiveSharingPanel('By User')}>
          <Button
            buttonType='panel'
            label='By User'
            buttonClassName={`${activeSharingPanel == 'By User' ? 'bg-gray-100' : ''}`}
          />
        </NavLink>
        <NavLink to='by-password' onClick={() => setActiveSharingPanel('By Password')}>
          <Button
            buttonType='panel'
            label='By Password'
            buttonClassName={`${activeSharingPanel == 'By Password' ? 'bg-gray-100' : ''}`}
          />
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default SettingsSharing;
