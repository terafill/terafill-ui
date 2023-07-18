import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Settings from './pages/settings/Settings';
import SettingsDeviceManagement from './pages/settings/SettingsDeviceManagement';
import SettingsPersonalInfo from './pages/settings/SettingsPersonalInfo';
import SettingsSecurity from './pages/settings/SettingsSecurity';
import SettingsSharing, {
  SettingsSharingByUser,
  SettingsSharingByPassword,
} from './pages/settings/SettingsSharing';

const router = createBrowserRouter([
  {
    path: '/settings',
    element: <Settings />,
    children: [
      {
        index: true,
        element: <SettingsPersonalInfo />,
      },
      {
        path: 'security',
        element: <SettingsSecurity />,
      },
      {
        path: 'sharing',
        element: <SettingsSharing />,
        children: [
          {
            index: true,
            path: 'by-password',
            element: <SettingsSharingByPassword />,
          },
          {
            path: 'by-user',
            element: <SettingsSharingByUser />,
          },
        ],
      },
      {
        path: 'device-management',
        element: <SettingsDeviceManagement />,
      },
    ],
  },
]);
