import { useState } from 'react';

import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/20/solid';

export default function WarningAlert() {
    const [visible, setVisible] = useState(true);

    return (
        visible && (
            <div className='fixed left-0 right-0 top-4 z-50 mx-auto max-w-4xl rounded-md bg-yellow-50 p-2 opacity-90'>
                <div className='flex justify-center'>
                    <div className='flex'>
                        <ExclamationTriangleIcon
                            className='h-5 w-5 text-yellow-400'
                            aria-hidden='true'
                        />
                    </div>
                    <div className='ml-3'>
                        <h3 className='text-sm font-medium text-yellow-800'>
                            Warning! This project this highly experimental and data senstive. Don't
                            store your real passwords.
                        </h3>
                    </div>
                    <div
                        className='ml-4 flex ring-1 ring-yellow-700'
                        onClick={() => setVisible(false)}
                    >
                        <XMarkIcon className='h-5 w-5 text-yellow-700' aria-hidden='true' />
                    </div>
                </div>
            </div>
        )
    );
}
