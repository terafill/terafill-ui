import { Suspense } from 'react';

import { UpdateIcon } from '@radix-ui/react-icons';
import { Outlet } from 'react-router-dom';

import NavigationPanel from './NavigationPanel';

const ItemsView = ({ viewType }) => {
    return (
        <div className='flex h-full w-full self-stretch'>
            <NavigationPanel />
            <Suspense
                fallback={
                    <div className='flex w-full flex-col items-center justify-center text-white'>
                        <UpdateIcon className='mr-2 flex h-6 w-6 animate-spin flex-col items-center justify-center' />
                    </div>
                }
            >
                <Outlet context={[]} />
            </Suspense>
        </div>
    );
};

export default ItemsView;
