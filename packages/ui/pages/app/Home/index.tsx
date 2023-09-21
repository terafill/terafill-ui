import { Suspense } from 'react';

import { UpdateIcon } from '@radix-ui/react-icons';
import { useTokenExpiration } from 'lib/utils/tokenTools';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

// import Navbar from 'components/layout/Navbar';

import AddVaultItemPopup from './AddVaultItemPopup';
import AddVaultPopup from './AddVaultPopup';
import DeleteVaultPopup from './DeleteVaultPopup';
import EditVaultPopup from './EditVaultPopup';
// import NavigationPanel from './NavigationPanel';
import SideNavbar from './SideNavbar';

const AppHome = ({ CLIENT_ENV = 'WEB' }) => {
    useTokenExpiration();

    return (
        <div className='flex h-screen w-screen flex-col items-stretch justify-start'>
            {/* <Navbar navbarType='app' /> */}
            <div className='flex h-full flex-row items-stretch border-t' id='app-screen'>
                {CLIENT_ENV === 'WEB' ? (
                    <Suspense
                        fallback={
                            <div className='flex w-full flex-col items-center justify-center text-white'>
                                <UpdateIcon className='mr-2 flex h-6 w-6 animate-spin flex-col items-center justify-center' />
                            </div>
                        }
                    >
                        <SideNavbar />
                    </Suspense>
                ) : null}
                <div
                    className='flex flex-1 flex-row items-stretch overflow-hidden'
                    id='apphome-inner'
                >
                    <Toaster
                        position='bottom-right'
                        reverseOrder={false}
                        toastOptions={{
                            duration: 5000,
                            style: {
                                background: '#000000',
                                color: '#fff',
                                border: '1px solid #1F2937',
                            },
                        }}
                    />

                    <AddVaultItemPopup />
                    <EditVaultPopup />
                    <AddVaultPopup />
                    <DeleteVaultPopup defaultVault={null} />

                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AppHome;
