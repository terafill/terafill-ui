import React, { useEffect, useState, Fragment } from 'react';

import { Transition, Menu } from '@headlessui/react';
import {
    PencilSquareIcon,
    UserPlusIcon,
    CogIcon,
    SquaresPlusIcon,
} from '@heroicons/react/20/solid';
import { TrashIcon } from '@radix-ui/react-icons';
import { useAtomValue, useSetAtom } from 'jotai';

import {
    addVaultPopupOpenAtom,
    editVaultPopupOpenAtom,
    deleteVaultPopupOpenAtom,
    selectedVaultAtom,
} from './store';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

function VaultSettingsMenu({ vaultList }) {
    const [isDefault, setIsDefault] = useState(false);
    const selectedVault = useAtomValue(selectedVaultAtom);
    useEffect(() => {
        if (selectedVault != null && vaultList != null) {
            if (vaultList[selectedVault]['isDefault']) {
                setIsDefault(true);
                return;
            }
        }
        setIsDefault(false);
    }, [selectedVault]);

    const setAddVaultPopupOpen = useSetAtom(addVaultPopupOpenAtom);
    const setEditVaultPopupOpen = useSetAtom(editVaultPopupOpenAtom);
    const setDeleteVaultPopupOpen = useSetAtom(deleteVaultPopupOpenAtom);

    return (
        <Menu as='div' className='relative inline-block text-left'>
            <div>
                <Menu.Button className='inline-flex w-full justify-center rounded-md bg-gray-800 px-2 py-2 text-sm font-normal shadow-sm'>
                    <CogIcon className='h-5 w-5 text-gray-300' aria-hidden='true' />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
            >
                <Menu.Items className='absolute left-0 z-10 mt-2 w-64 origin-top-right divide-y divide-black rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    <div className='py-1'>
                        <Menu.Item
                            onClick={() => {
                                setEditVaultPopupOpen(true);
                            }}
                        >
                            {({ active }) => (
                                <a
                                    href='#'
                                    className={classNames(
                                        active ? 'bg-gray-700 text-gray-100' : 'text-gray-400',
                                        'group flex items-center px-4 py-2 text-sm',
                                    )}
                                >
                                    <PencilSquareIcon className='mr-3 h-5 w-5' aria-hidden='true' />
                                    Edit vault
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item onClick={() => setAddVaultPopupOpen(true)}>
                            {({ active }) => (
                                <a
                                    href='#'
                                    className={classNames(
                                        active ? 'bg-gray-700 text-gray-100' : 'text-gray-400',
                                        'group flex items-center px-4 py-2 text-sm',
                                    )}
                                >
                                    <SquaresPlusIcon className='mr-3 h-5 w-5' aria-hidden='true' />
                                    Add vault
                                </a>
                            )}
                        </Menu.Item>
                        {/* <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <DocumentDuplicateIcon
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  Duplicate
                </a>
              )}
            </Menu.Item>*/}
                    </div>
                    {/*   <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <ArchiveBoxIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  Archive
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <ArrowRightCircleIcon
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  Move
                </a>
              )}
            </Menu.Item>
          </div> */}
                    <div className='py-1'>
                        <Menu.Item
                            onClick={() => {
                                // console.log('clicked', 'share');
                            }}
                        >
                            {({ active }) => (
                                <a
                                    href='#'
                                    className={classNames(
                                        active ? 'bg-gray-700 text-gray-100' : 'text-gray-400',
                                        'group flex items-center px-4 py-2 text-sm',
                                    )}
                                >
                                    <UserPlusIcon className='mr-3 h-5 w-5' aria-hidden='true' />
                                    Share vault
                                    <p className='ml-2 rounded-full bg-gray-600 p-1 text-sm text-gray-300'>
                                        coming soon
                                    </p>
                                </a>
                            )}
                        </Menu.Item>
                        {/*            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <HeartIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  Add to favorites
                </a>
              )}
            </Menu.Item>*/}
                    </div>
                    {!isDefault && (
                        <div className='py-1'>
                            <Menu.Item
                                // disabled
                                onClick={() => {
                                    setDeleteVaultPopupOpen(true);
                                }}
                            >
                                {({ active }) => (
                                    <a
                                        href='#'
                                        className={classNames(
                                            active ? 'bg-gray-700 text-red-400' : 'text-red-500',
                                            'group flex items-center px-4 py-2 text-sm',
                                        )}
                                    >
                                        <TrashIcon className='mr-3 h-5 w-5' aria-hidden='true' />
                                        Delete vault
                                    </a>
                                )}
                            </Menu.Item>
                        </div>
                    )}
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

export default VaultSettingsMenu;
