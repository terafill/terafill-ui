import React, { Fragment } from 'react';

import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { CheckIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

function VaultSelectionMenu({
    vaultListView,
    selectedVault,
    setSelectedVault,
}: {
    vaultListView: VaultList;
    selectedVault: string;
    setSelectedVault: (e) => void;
}) {
    const navigate = useNavigate();

    return (
        <Listbox
            value={selectedVault}
            onChange={(e) => {
                setSelectedVault(e);
                navigate('/app/home/');
            }}
        >
            {({ open }) => (
                <>
                    {vaultListView && selectedVault && vaultListView[selectedVault] ? (
                        <div className='my-2 w-11/12'>
                            <Listbox.Button className='relative flex w-full rounded-md bg-gray-800 py-1.5 pl-3 pr-1.5 text-left text-gray-300 shadow-sm sm:text-sm sm:leading-6'>
                                <span className='block flex-1 truncate'>
                                    {vaultListView[selectedVault].name}
                                </span>
                                <span className='flex-0 pointer-events-none inset-y-0 flex items-center'>
                                    <ChevronUpDownIcon
                                        className='h-5 w-5 text-gray-400'
                                        aria-hidden='true'
                                    />
                                </span>
                            </Listbox.Button>

                            <Transition
                                show={open}
                                as={Fragment}
                                leave='transition ease-in duration-100'
                                leaveFrom='opacity-100'
                                leaveTo='opacity-0'
                            >
                                <Listbox.Options className='absolute z-10 mt-1 max-h-60 w-11/12 cursor-pointer overflow-auto rounded-md bg-gray-800 py-1 shadow-lg focus:outline-none sm:text-sm'>
                                    {
                                        //eslint-disable-next-line
                                        Object.entries(vaultListView).map(([vaultId, vault]) => (
                                            <Listbox.Option
                                                key={vault.id}
                                                className={({ active }) =>
                                                    classNames(
                                                        active
                                                            ? 'text-gray-150 bg-gray-700'
                                                            : 'text-gray-400',
                                                        'relative select-none py-2 pl-3 pr-9',
                                                    )
                                                }
                                                value={vault.id}
                                            >
                                                {({ selectedVault, active }) => (
                                                    <>
                                                        <span
                                                            className={classNames(
                                                                selectedVault
                                                                    ? 'font-semibold'
                                                                    : 'font-normal',
                                                                'block truncate',
                                                            )}
                                                        >
                                                            {vault.name}
                                                        </span>

                                                        {selectedVault ? (
                                                            <span
                                                                className={classNames(
                                                                    active
                                                                        ? 'text-white'
                                                                        : 'text-indigo-600',
                                                                    'absolute inset-y-0 right-0 flex items-center pr-4',
                                                                )}
                                                            >
                                                                <CheckIcon
                                                                    className='h-5 w-5'
                                                                    aria-hidden='true'
                                                                />
                                                            </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        ))
                                    }
                                </Listbox.Options>
                            </Transition>
                        </div>
                    ) : (
                        ''
                    )}
                </>
            )}
        </Listbox>
    );
}

export default VaultSelectionMenu;