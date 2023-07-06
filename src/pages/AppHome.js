import React, { useEffect, useState, useRef , Fragment } from 'react';

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import {
  NavLink,
  Outlet,
  useParams,
  useLoaderData,
  useNavigate,
  useOutletContext,
  useLocation,
} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MoonLoader from 'react-spinners/MoonLoader';
import { v4 as uuidv4 } from 'uuid';
import { Listbox, Transition , Menu } from '@headlessui/react';
import {
  ChevronUpDownIcon,
  ArchiveBoxIcon,
  ArrowRightCircleIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
  HeartIcon,
  PencilSquareIcon,
  TrashIcon,
  UserPlusIcon,
  CogIcon,
  SquaresPlusIcon,
  FolderPlusIcon,
} from '@heroicons/react/20/solid';

import Button from '../components/Button';
import Navbar from '../components/Navbar';
import SideNavbar from '../components/SideNavbar';
import { useTokenExpiration } from '../components/TokenTools';
import { updateVaultItem, createVaultItem, deleteVaultItem } from '../data/item';
import { addVault, getVaults, getVaultItems, updateVault, deleteVault } from '../data/vault';
import { getKeyWrappingKeyPair, decryptData } from '../utils/security';
import './AppHome.css';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function MultiVaultDropown({ vaultList, selectedVault, setSelectedVault }) {
  console.log('MultiVaultDropown.selected', selectedVault, vaultList);

  return (
    <Listbox value={selectedVault} onChange={setSelectedVault}>
      {({ open }) => (
        <>
          {vaultList && selectedVault ? (
            <div className='w-11/12 my-2'>
              <Listbox.Button className='flex relative w-full rounded-md bg-white py-1.5 pl-3 pr-1.5 text-left text-black-700 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none sm:text-sm sm:leading-6'>
                <span className='flex-1 block truncate'>{vaultList[selectedVault].name}</span>
                <span className='flex-0 pointer-events-none inset-y-0 flex items-center'>
                  <ChevronUpDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave='transition ease-in duration-100'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <Listbox.Options className='absolute z-10 mt-1 max-h-60 w-11/12 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm cursor-pointer'>
                  {Object.entries(vaultList).map(([vaultId, vault]) => (
                    <Listbox.Option
                      key={vault.id}
                      className={({ active }) =>
                        classNames(
                          active ? 'bg-gray-100 text-black-900' : 'text-black-700',
                          'relative select-none py-2 pl-3 pr-9',
                        )
                      }
                      value={vault.id}
                    >
                      {({ selectedVault, active }) => (
                        <>
                          <span
                            className={classNames(
                              selectedVault ? 'font-semibold' : 'font-normal',
                              'block truncate',
                            )}
                          >
                            {vault.name}
                          </span>

                          {selectedVault ? (
                            <span
                              className={classNames(
                                active ? 'text-white' : 'text-indigo-600',
                                'absolute inset-y-0 right-0 flex items-center pr-4',
                              )}
                            >
                              <CheckIcon className='h-5 w-5' aria-hidden='true' />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
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

// import { Fragment, useRef, useState } from 'react'
import { Dialog } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';

function EditVaultPopup({ open, setOpen, selectedVault, vaultList, updateVaultState }) {
  const cancelButtonRef = useRef(null);
  const [vaultName, setVaultName] = useState('');
  const [vaultDescription, setVaultDescription] = useState('');

  useEffect(() => {
    if (selectedVault != null) {
      setVaultName(vaultList[selectedVault].name);
      setVaultDescription(vaultList[selectedVault].description);
    }
  }, [selectedVault]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center items-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='flex flex-col w-80 justify-center items-center gap-6 relative transform overflow-hidden rounded-lg bg-white p-4 text-left shadow-2xl transition-all'>
                <div className='flex flex-col w-5/6 items-center gap-8 text-center' id='popup-body'>
                  <Dialog.Title
                    as='h3'
                    className='w-full text-base font-semibold leading-6 text-gray-900'
                  >
                    Edit Vault details
                  </Dialog.Title>
                  <div className='relative w-full'>
                    <label
                      htmlFor='vaultName'
                      className='absolute rounded -top-3 left-1 inline-block bg-white px-1 text-sm font-medium text-gray-700'
                    >
                      Name
                    </label>
                    <input
                      type='text'
                      name='vaultName'
                      id='vaultName'
                      className='w-full rounded-md px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-100 sm:text-sm sm:leading-6'
                      placeholder='Enter vault name'
                      value={vaultName}
                      onChange={(e) => {
                        setVaultName((prevVaultName) => e.target.value);
                      }}
                      required
                      title='Please enter email'
                    />
                  </div>
                  <div className='relative w-full'>
                    <label
                      htmlFor='description'
                      className='absolute rounded -top-3 left-1 inline-block bg-white px-1 text-sm font-medium text-gray-700'
                    >
                      Description
                    </label>
                    <textarea
                      name='vaultDescription'
                      id='vaultDescription'
                      className='w-full rounded-md px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-100 sm:text-sm sm:leading-6'
                      placeholder='Enter Vault description'
                      value={vaultDescription}
                      onChange={(e) => {
                        setVaultDescription((prevVaultDescription) => e.target.value);
                      }}
                      required
                      title='Please enter email'
                    />
                  </div>
                </div>
                <div
                  className='flex flex-row w-5/6 justify-center items-center gap-2'
                  id='button-group'
                >
                  <button
                    type='button'
                    className='mt-3 inline-flex w-2/3 justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0'
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                  <button
                    type='button'
                    className='inline-flex w-2/3 justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2'
                    onClick={async () => {
                      const response = await updateVault(
                        selectedVault,
                        vaultName,
                        vaultDescription,
                      );
                      if (response.status == 200) {
                        updateVaultState(selectedVault, 'name', vaultName);
                        updateVaultState(selectedVault, 'description', vaultDescription);
                        toast.success('Vault updated successfully!');
                      } else {
                        toast.error('Something went wrong!');
                      }
                      setOpen(false);
                    }}
                  >
                    Confirm
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function AddVaultPopup({ open, setOpen, vaultList, addVaultState }) {
  const cancelButtonRef = useRef(null);
  const [vaultName, setVaultName] = useState('');
  const [vaultDescription, setVaultDescription] = useState('');

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center items-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='flex flex-col w-80 justify-center items-center gap-6 relative transform overflow-hidden rounded-lg bg-white p-4 text-left shadow-2xl transition-all'>
                <div className='flex flex-col w-5/6 items-center gap-8 text-center' id='popup-body'>
                  <Dialog.Title
                    as='h3'
                    className='w-full text-base font-semibold leading-6 text-gray-900'
                  >
                    Enter new vault details
                  </Dialog.Title>
                  <div className='relative w-full'>
                    <label
                      htmlFor='vaultName'
                      className='absolute rounded -top-3 left-1 inline-block bg-white px-1 text-sm font-medium text-gray-700'
                    >
                      Name
                    </label>
                    <input
                      type='text'
                      name='vaultName'
                      id='vaultName'
                      className='w-full rounded-md px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-100 sm:text-sm sm:leading-6'
                      placeholder='Enter vault name'
                      value={vaultName}
                      onChange={(e) => {
                        setVaultName((prevVaultName) => e.target.value);
                      }}
                      required
                      title='Please enter email'
                    />
                  </div>
                  <div className='relative w-full'>
                    <label
                      htmlFor='description'
                      className='absolute rounded -top-3 left-1 inline-block bg-white px-1 text-sm font-medium text-gray-700'
                    >
                      Description
                    </label>
                    <textarea
                      name='vaultDescription'
                      id='vaultDescription'
                      className='w-full rounded-md px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-100 sm:text-sm sm:leading-6'
                      placeholder='Enter Vault description'
                      value={vaultDescription}
                      onChange={(e) => {
                        setVaultDescription((prevVaultDescription) => e.target.value);
                      }}
                      required
                      title='Please enter email'
                    />
                  </div>
                </div>
                <div
                  className='flex flex-row w-5/6 justify-center items-center gap-2'
                  id='button-group'
                >
                  <button
                    type='button'
                    className='mt-3 inline-flex w-2/3 justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0'
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                  <button
                    type='button'
                    className='inline-flex w-2/3 justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2'
                    onClick={async () => {
                      const response = await addVault(vaultName, vaultDescription);
                      if (response.status == 200) {
                        addVaultState(response.data);
                        toast.success('New Vault added successfully!');
                      } else {
                        toast.error('Something went wrong!');
                      }
                      setOpen(false);
                    }}
                  >
                    Confirm
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function DeleteVaultPopup({ open, setOpen, selectedVault, vaultList, deleteVaultState }) {
  const cancelButtonRef = useRef(null);
  const [vaultName, setVaultName] = useState('');

  useEffect(() => {
    setVaultName('');
  }, [selectedVault]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center items-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='flex flex-col w-80 justify-center items-center gap-6 relative transform overflow-hidden rounded-lg bg-white p-4 text-left shadow-2xl transition-all'>
                <div className='flex flex-col w-5/6 items-center gap-8 text-center' id='popup-body'>
                  <Dialog.Title
                    as='h3'
                    className='w-full text-base font-semibold leading-6 text-gray-900'
                  >
                    Confirm Vault deletion
                  </Dialog.Title>
                  <div className='relative w-full'>
                    <label
                      htmlFor='vaultName'
                      className='absolute rounded -top-3 left-1 inline-block bg-white px-1 text-sm font-medium text-gray-700'
                    >
                      Confirm vault name
                    </label>
                    <input
                      type='text'
                      name='vaultName'
                      id='vaultName'
                      className='w-full rounded-md px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-100 sm:text-sm sm:leading-6'
                      placeholder='Enter vault name'
                      value={vaultName}
                      onChange={(e) => {
                        setVaultName((prevVaultName) => e.target.value);
                      }}
                      required
                      title='Enter vault name to confirm deletion'
                    />
                  </div>
                  <div
                    className='flex flex-row w-5/6 justify-center items-center gap-2'
                    id='button-group'
                  >
                    <button
                      type='button'
                      className='mt-3 inline-flex w-2/3 justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0'
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                    <button
                      type='button'
                      className='inline-flex w-2/3 justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2'
                      onClick={async () => {
                        if (vaultName != vaultList[selectedVault].name) {
                          toast.warn("Vault name doesn't match!");
                          return;
                        }

                        const response = await deleteVault(selectedVault);
                        if (response.status == 204) {
                          deleteVaultState(selectedVault);
                          toast.success('Vault deleted successfully!');
                        } else {
                          toast.error('Something went wrong!');
                        }
                        setOpen(false);
                      }}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}


function VaultSettingsMenu({
  vaultList,
  selectedVault,
  setOpenEditVault,
  setOpenAddVault,
  setOpenDeleteVault,
}) {
  // console.log("VaultSettingsMenu.is_default", vaultList)
  const [is_default, setIsDefault] = useState(false);
  useEffect(() => {
    if (selectedVault != null && vaultList != null) {
      if (vaultList[selectedVault]['is_default']) {
        setIsDefault(true);
        return;
      }
    }
    setIsDefault(false);
  }, [selectedVault]);

  return (
    <Menu as='div' className='relative inline-block text-left'>
      <div>
        <Menu.Button className='inline-flex w-full justify-center rounded-md bg-white px-2 py-2 text-sm font-normal text-black-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
          <CogIcon className='h-5 w-5 text-gray-800' aria-hidden='true' />
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
        <Menu.Items className='absolute left-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1'>
            <Menu.Item
              onClick={() => {
                setOpenEditVault(true);
                console.log('clicked', 'edit');
              }}
            >
              {({ active }) => (
                <a
                  href='#'
                  className={classNames(
                    active ? 'bg-gray-100 text-black-900' : 'text-black-700',
                    'group flex items-center px-4 py-2 text-sm',
                  )}
                >
                  <PencilSquareIcon
                    className='mr-3 h-5 w-5 text-black-400 group-hover:text-black-500'
                    aria-hidden='true'
                  />
                  Edit vault
                </a>
              )}
            </Menu.Item>
            <Menu.Item onClick={() => setOpenAddVault(true)}>
              {({ active }) => (
                <a
                  href='#'
                  className={classNames(
                    active ? 'bg-gray-100 text-black-900' : 'text-black-700',
                    'group flex items-center px-4 py-2 text-sm',
                  )}
                >
                  <SquaresPlusIcon
                    className='mr-3 h-5 w-5 text-black-400 group-hover:text-black-500'
                    aria-hidden='true'
                  />
                  Add vault
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
          </div>*/}
          <div className='py-1'>
            <Menu.Item
              onClick={() => {
                console.log('clicked', 'share');
              }}
            >
              {({ active }) => (
                <a
                  href='#'
                  className={classNames(
                    active ? 'bg-gray-100 text-black-900' : 'text-black-700',
                    'group flex items-center px-4 py-2 text-sm',
                  )}
                >
                  <UserPlusIcon
                    className='mr-3 h-5 w-5 text-black-400 group-hover:text-black-500'
                    aria-hidden='true'
                  />
                  Share vault
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
          {!is_default && (
            <div className='py-1'>
              <Menu.Item
                disabled
                onClick={() => {
                  setOpenDeleteVault(true);
                  console.log('clicked', 'delete');
                }}
              >
                {({ active }) => (
                  <a
                    href='#'
                    className={classNames(
                      active ? 'bg-gray-100 text-red-900' : 'text-red-700',
                      'group flex items-center px-4 py-2 text-sm',
                    )}
                  >
                    <TrashIcon
                      className='mr-3 h-5 w-5 text-red-400 group-hover:text-red-500'
                      aria-hidden='true'
                    />
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

export const ItemPanelIndex = () => {
  return (
    <div className='self-stretch flex-1 overflow-hidden flex flex-col py-[32px] px-[16px] h-1/1 items-center justify-center z-[0] text-4xl'>
      <h1>Good Morning!</h1>
    </div>
  );
};

export const ItemPanel = () => {
  const { id } = useParams();
  const [itemFormDisabled, setItemFormDisability] = useState(true);
  const [shareButtonVisible, setShareButtonVisible] = useState(true);
  const [showPassword, setPasswordVisibility] = useState(false);
  const [itemUpdating, setItemUpdating] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedVault, itemDataList, updateItem, deleteItem, addItem] = useOutletContext();

  useEffect(() => {
    console.log('id', id);
    if (id === 'new') {
      itemDataList[id] = {
        title: '',
        icon: null,
        password: '',
        website: '',
        username: '',
        vault_id: selectedVault,
      };
      console.log('itemFormDisabled', itemFormDisabled);
      setItemFormDisability((prevState) => false);
      setShareButtonVisible((prevState) => false);
    } else {
      setItemFormDisability((prevState) => true);
      setShareButtonVisible((prevState) => true);
    }
    if (itemDataList[id] === undefined) {
      navigate('/app/home');
    }
  }, [location]);

  return (
    <div
      className='self-stretch flex-1 overflow-hidden flex flex-col py-[32px] px-[16px] h-1/1 items-center justify-between z-[0]'
      id='right-panel'
    >
      {/*      <div className="absolute">
        <ToastContainer />
      </div>*/}
      <div className='self-end flex flex-row'>
        {!itemFormDisabled && !itemUpdating && (
          <Button
            onClick={() => {
              setItemFormDisability(!itemFormDisabled);
              if (id === 'new') {
                // console.log(location.location.state?.previousPath);
                navigate(-1);
              }
            }}
            label='Cancel'
            buttonType='link'
            buttonClassName='relative top-[0rem] right-[0rem] z-[100] hover:bg-red-50'
            labelClassName='text-xl text-red-500'
          />
        )}
        <Button
          onClick={async () => {
            if (!itemFormDisabled) {
              setItemUpdating(true);
              if (id === 'new') {
                const iek = uuidv4();
                const response = await createVaultItem(
                  selectedVault,
                  itemDataList[id].title,
                  itemDataList[id].website,
                  itemDataList[id].password,
                  itemDataList[id].username,
                  iek,
                );
                if (response.status == 200) {
                  addItem(itemDataList[id].vault_id, {
                    ...itemDataList[id],
                    id: response.data.id,
                    iek: iek,
                  });
                  toast.success('Vault item created successfully!');
                  navigate(`/app/home/${response.data.id}`);
                } else {
                  toast.error('Something went wrong!');
                }
              } else {
                const response = await updateVaultItem(
                  itemDataList[id].vault_id,
                  id,
                  itemDataList[id].title,
                  itemDataList[id].website,
                  itemDataList[id].password,
                  itemDataList[id].username,
                );
                if (response.status == 200) {
                  updateItem(
                    itemDataList[id].vault_id,
                    id,
                    'icon',
                    `https://cool-rose-moth.faviconkit.com/${itemDataList[id].website}/256`,
                  );
                  toast.success('Vault item updated successfully!');
                } else {
                  toast.error('Something went wrong!');
                }
              }
              setItemUpdating(false);
            }
            setItemFormDisability(!itemFormDisabled);
          }}
          label={itemFormDisabled ? 'Edit' : itemUpdating ? 'Saving' : 'Save'}
          buttonType='link'
          buttonClassName='relative top-[0rem] right-[0rem] z-[100]'
          labelClassName='text-xl'
          children={<MoonLoader loading={itemUpdating && true} size={15} />}
        />
        {itemFormDisabled && shareButtonVisible && (
          <Button
            label='Share'
            buttonType='link'
            buttonClassName='relative top-[0rem] right-[0rem] z-[100]'
            labelClassName='text-xl'
          />
        )}
        {itemFormDisabled && !itemUpdating && id != 'new' && (
          <Button
            onClick={async () => {
              const response = await deleteVaultItem(selectedVault, id);
              if (response.status == 204) {
                deleteItem(itemDataList[id].vault_id, id);
                toast.success('Vault item deleted successfully!');
                navigate(-1);
              } else {
                toast.error('Something went wrong!');
              }
              navigate(-1);
            }}
            label='Delete'
            buttonType='link'
            buttonClassName='relative top-[0rem] right-[0rem] z-[100] hover:bg-red-50'
            labelClassName='text-xl text-red-500'
          />
        )}
      </div>
      <div className='grid grid-cols-2 grid-rows-4 items-center justify-center justify-items-center gap-4'>
        <div className='self-stretch flex-1' id='iconframe'>
          <img
            className='w-[88px] h-[88px] overflow-hidden object-cover'
            alt=''
            src={itemDataList[id] ? itemDataList[id].icon : null}
          />
        </div>
        <input
          className={`flex self-stretch flex-1 relative rounded-lg w-8/12 text-5xl font-medium bg-[transparent] rounded-3xs w-11/12 overflow-hidden flex-row py-0.5 px-[7px] box-border items-center justify-center ${
            itemFormDisabled ? '' : 'border-2 border-blue-100 bg-blue-50 bg-opacity-40'
          }`}
          value={itemDataList[id] ? itemDataList[id].title : ''}
          placeholder='title'
          onChange={(e) => {
            updateItem(itemDataList[id].vault_id, id, 'title', e.target.value);
          }}
          disabled={itemFormDisabled}
        />
        <label className='text-center font-medium'>USERNAME</label>
        <input
          className={`flex text-[23.04px] bg-[transparent] rounded w-8/12 overflow-hidden flex-row py-0.5 px-[7px] box-border items-center justify-center ${
            itemFormDisabled ? '' : 'border-2 border-blue-100 bg-blue-50 bg-opacity-40'
          }`}
          type='text'
          value={itemDataList[id] ? itemDataList[id].username : ''}
          placeholder='Username'
          onChange={(e) => {
            updateItem(itemDataList[id].vault_id, id, 'username', e.target.value);
          }}
          disabled={itemFormDisabled}
        />
        <label className='text-center font-medium'>PASSWORD</label>
        <div className='w-8/12 flex-1 flex flex-row box-border items-stretch justify-items-stretch'>
          <input
            className={`w-full flex text-[23.04px] bg-[transparent] rounded overflow-hidden flex-row py-0.5 px-[7px] box-border items-center justify-center ${
              itemFormDisabled ? '' : 'border-2 border-blue-100 bg-blue-50 bg-opacity-40'
            }`}
            type={showPassword ? 'text' : 'password'}
            value={itemDataList[id] ? itemDataList[id].password : ''}
            placeholder='Password'
            onChange={(e) => {
              updateItem(itemDataList[id].vault_id, id, 'password', e.target.value);
            }}
            disabled={itemFormDisabled}
          />
          <button
            className='relative inset-y-0 right-0 pl-3 text-gray-500 hover:text-gray-800'
            onClick={() => setPasswordVisibility(!showPassword)}
          >
            {showPassword ? (
              <AiFillEyeInvisible className='w-5 h-5' aria-hidden='true' />
            ) : (
              <AiFillEye className='w-5 h-5' aria-hidden='true' />
            )}
          </button>
        </div>

        <label className='text-center font-medium'>WEBSITE</label>
        <input
          className={`flex text-[23.04px] bg-[transparent] rounded w-8/12 overflow-hidden flex-row py-0.5 px-[7px] box-border items-center justify-center ${
            itemFormDisabled ? '' : 'border-2 border-blue-100 bg-blue-50 bg-opacity-40'
          }`}
          type='text'
          value={itemDataList[id] ? itemDataList[id].website : ''}
          placeholder='Website'
          onChange={(e) => {
            updateItem(itemDataList[id].vault_id, id, 'website', e.target.value);
          }}
          disabled={itemFormDisabled}
        />
      </div>
      <Button
        label='View in dashboard'
        icon='../new-window.svg'
        iconPosition='right'
        buttonClassName='flex flex-row items-center gap-2'
      />
    </div>
  );
};

const NavigationPanel = ({
  itemDataList,
  vaultList,
  selectedVault,
  setSelectedVault,
  setOpenEditVault,
  setOpenAddVault,
  setOpenDeleteVault,
}) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  // useEffect(()=>{

  // }, search)

  console.log('NavigationPanel.itemDataList', itemDataList);

  return (
    <div
      className='self-stretch shadow-[1px_0px_4px_rgba(0,_0,_0,_0.25)] w-3/12 flex flex-col grow-0 shrink-0 items-center justify-start relative z-[1]'
      id='left-panel'
    >
      <div className='flex w-full items-center justify-around gap-2 px-2' id='vaul-bar'>
        {/*<p className="text-md">Vault</p>*/}
        <MultiVaultDropown
          vaultList={vaultList}
          selectedVault={selectedVault}
          setSelectedVault={setSelectedVault}
        />
        <VaultSettingsMenu
          vaultList={vaultList}
          selectedVault={selectedVault}
          setOpenEditVault={setOpenEditVault}
          setOpenAddVault={setOpenAddVault}
          setOpenDeleteVault={setOpenDeleteVault}
        />
      </div>
      <div className='self-stretch overflow-hidden flex flex-col p-2 items-center justify-center z-[0] border-[1px]'>
        <input
          className='[border:none] rounded-lg px-2 py-2 flex text-[23.04px] bg-gray-200 w-full overflow-hidden flex-row items-center justify-center'
          type='text'
          placeholder=' 🔎 Quick Search'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <div
        className='self-stretch flex-1 overflow-y-auto px-2 py-2 flex flex-col items-center justify-start z-[1] border-[2px] border-solid'
        id='item-list'
      >
        {Object.entries(itemDataList)
          .filter(([id, itemData]) => {
            return search.toLowerCase() === ''
              ? true
              : itemData.username.toLowerCase().includes(search) ||
                  itemData.website.toLowerCase().includes(search) ||
                  itemData.title.toLowerCase().includes(search);
          })
          .map(
            ([id, itemData]) =>
              id != 'new' && (
                <NavLink
                  to={`${itemData.id}`}
                  key={itemData.id}
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-gray-200 mt-1 mb-1 px-[16px] rounded-lg hover:bg-gray-200'
                      : 'mt-1 mb-1 px-[16px] rounded-lg hover:bg-gray-100'
                  }
                >
                  <button className='cursor-pointer rounded-lg [border:none] overflow-hidden flex flex-row items-center justify-start'>
                    <img
                      className='relative w-[40px] h-[40px] shrink-0 overflow-hidden object-cover'
                      alt=''
                      src={itemData.icon}
                    />
                    <div className='flex flex-col text-left px-[8px] py-[8px]'>
                      <label className='cursor-pointer relative text-xl tracking-[0.03em] font-bold w-[230px] h-[23px] shrink-0 truncate overflow-hidden line-clamp-2'>
                        {itemData.title}
                      </label>
                      <label className='cursor-pointer relative text-base tracking-[0.03em] w-[230px] h-[23px] shrink-0 truncate overflow-hidden line-clamp-2'>
                        {itemData.username}
                      </label>
                    </div>
                  </button>
                </NavLink>
              ),
          )}
      </div>
      <Button
        buttonType='blue'
        icon='/icbaselineplus.svg'
        buttonClassName='absolute bottom-[1.2rem] right-[1.2rem] h-[3rem] w-[3rem] z-[100] rounded-[rem]'
        onClick={() => navigate('new')}
      />
    </div>
  );
};

const AppHome = () => {
  const navigate = useNavigate();
  const [selectedVault, setSelectedVault] = useState(null);
  const [itemDataList, setItemDataList] = useState({});
  // const [vaultList, setVaultList] = useState({all: {name: "all", id: "all"}});
  const [vaultList, setVaultList] = useState(null);
  const shouldLoad = useRef(true);

  useTokenExpiration();

  useEffect(() => {
    if (shouldLoad.current) {
      (async () => {
        console.log('Vault List loading!');
        const vaultData = await getVaults();
        let morphedVaultData = {};
        for (let idx = 0; idx < vaultData.length; idx += 1) {
          const vault_id = vaultData[idx].id;
          morphedVaultData[vault_id] = { ...vaultData[idx], itemList: {} };

          const vault_items = await getVaultItems(vault_id);
          console.log('useEffect.vault_items', vault_items);
          for (let idx = 0; idx < vault_items.length; idx += 1) {
            const item_id = vault_items[idx].id;
            const key_wrapping_key_pair = getKeyWrappingKeyPair();
            const iek = key_wrapping_key_pair.private.decrypt(
              vault_items[idx].encrypted_encryption_key,
            );
            morphedVaultData[vault_id]['itemList'][item_id] = vault_items[idx];
            morphedVaultData[vault_id]['itemList'][item_id].title = decryptData(
              vault_items[idx].title,
              iek,
            );
            morphedVaultData[vault_id]['itemList'][item_id].website = decryptData(
              vault_items[idx].website,
              iek,
            );
            morphedVaultData[vault_id]['itemList'][item_id].username = decryptData(
              vault_items[idx].username,
              iek,
            );
            morphedVaultData[vault_id]['itemList'][item_id].password = decryptData(
              vault_items[idx].password,
              iek,
            );
            morphedVaultData[vault_id]['itemList'][item_id].iek = iek;
            morphedVaultData[vault_id]['itemList'][
              item_id
            ].icon = `https://cool-rose-moth.faviconkit.com/${vault_items[idx].website}/256`;
          }
        }
        // morphedVaultData["all"] = {name: "all", id: "all"};
        setVaultList(morphedVaultData);
      })();
      shouldLoad.current = false;
    }
  }, []);

  // useEffect(()=>{
  //   console.log("useEffect.vaultList", vaultList);
  // }, [vaultList])

  useEffect(() => {
    console.log('Vault view changed', selectedVault, vaultList);
    if (selectedVault == null && vaultList != null) {
      setSelectedVault(Object.entries(vaultList)[0][0]);
      return;
    }
    if (vaultList == null) {
      return;
    }
    let itemViewData = {};
    if (selectedVault == 'all') {
      Object.entries(vaultList).map(([vaultId, vault]) => {
        if (vaultId != 'all') {
          itemViewData = { ...vault['itemList'], ...itemViewData };
        }
      });
    } else {
      itemViewData = vaultList[selectedVault]['itemList'];
      console.debug('Debug vaultList', vaultList[selectedVault]['itemList']);
    }
    setItemDataList(itemViewData);
  }, [selectedVault, vaultList]);

  useEffect(() => {
    console.log('useEffect.itemDataList', itemDataList);
  }, [itemDataList]);

  const updateItem = (vaultId, itemId, attribute, value) => {
    setVaultList((prevVaultList) => ({
      ...prevVaultList,
      [vaultId]: {
        ...prevVaultList[vaultId],
        itemList: {
          ...prevVaultList[vaultId]['itemList'],
          [itemId]: {
            ...prevVaultList[vaultId]['itemList'][itemId],
            [attribute]: value,
          },
        },
      },
    }));
  };

  const deleteItem = (vaultId, itemId) => {
    console.log('Deletion attempt', vaultId, itemId);
    setVaultList((prevVaultList) => {
      const updatedVaultList = {
        ...prevVaultList,
        [vaultId]: {
          ...prevVaultList[vaultId],
          itemList: {
            ...prevVaultList[vaultId].itemList,
          },
        },
      };

      if (updatedVaultList[vaultId] && updatedVaultList[vaultId].itemList[itemId]) {
        delete updatedVaultList[vaultId].itemList[itemId];
      }

      return updatedVaultList;
    });
  };

  const addItem = (vaultId, itemData) => {
    if (itemData['website']) {
      itemData['icon'] = `https://cool-rose-moth.faviconkit.com/${itemData.website}/256`;
    }
    setVaultList((prevVaultList) => ({
      ...prevVaultList,
      [vaultId]: {
        ...prevVaultList[vaultId],
        itemList: { ...prevVaultList[vaultId]['itemList'], [itemData.id]: itemData },
      },
    }));
    deleteItem(vaultId, 'new');
  };

  const updateVaultState = (vaultId, attribute, value) => {
    setVaultList((prevVaultList) => ({
      ...prevVaultList,
      [vaultId]: {
        ...prevVaultList[vaultId],
        [attribute]: value,
      },
    }));
  };

  const addVaultState = (vaultData) => {
    setVaultList((prevVaultList) => ({
      ...prevVaultList,
      [vaultData.id]: {
        ...vaultData,
        itemList: [],
      },
    }));
  };

  const deleteVaultState = (vaultId) => {
    if (Object.entries(vaultList)[0][0] != vaultId) {
      setSelectedVault(Object.entries(vaultList)[0][0]);
    } else {
      setSelectedVault(Object.entries(vaultList)[1][0]);
    }
    setVaultList((prevVaultList) => {
      const updatedVaultList = {
        ...prevVaultList,
      };
      delete updatedVaultList[vaultId];
      return updatedVaultList;
    });
  };

  const [openEditVaultPopup, setOpenEditVault] = useState(false);
  const [openAddVaultPopup, setOpenAddVault] = useState(false);
  const [openDeleteVaultPopup, setOpenDeleteVault] = useState(false);

  return (
    <div className='w-full h-screen flex flex-col justify-start items-stretch text-left'>
      <Navbar navbarType='app' />
      <div className='h-full flex flex-row items-stretch' id='app-screen'>
        <SideNavbar />
        <div
          className='self-stretch flex-1 overflow-hidden flex flex-row items-center justify-center'
          id='apphome-inner'
        >
          <ToastContainer />
          <EditVaultPopup
            open={openEditVaultPopup}
            setOpen={setOpenEditVault}
            selectedVault={selectedVault}
            vaultList={vaultList}
            updateVaultState={updateVaultState}
          />
          <AddVaultPopup
            open={openAddVaultPopup}
            setOpen={setOpenAddVault}
            vaultList={vaultList}
            addVaultState={addVaultState}
          />
          <DeleteVaultPopup
            open={openDeleteVaultPopup}
            setOpen={setOpenDeleteVault}
            selectedVault={selectedVault}
            vaultList={vaultList}
            deleteVaultState={deleteVaultState}
          />
          <NavigationPanel
            vaultList={vaultList}
            itemDataList={itemDataList}
            selectedVault={selectedVault}
            setSelectedVault={setSelectedVault}
            setOpenEditVault={setOpenEditVault}
            setOpenAddVault={setOpenAddVault}
            setOpenDeleteVault={setOpenDeleteVault}
          />
          <Outlet context={[selectedVault, itemDataList, updateItem, deleteItem, addItem]} />
        </div>
      </div>
    </div>
  );
};

export default AppHome;
