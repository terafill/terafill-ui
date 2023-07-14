 /* eslint-disable */
import React, { useEffect, useState, useRef, Fragment } from 'react';

import { Dialog, Listbox, Transition, Menu } from '@headlessui/react';
import {
  ChevronUpDownIcon,
  PencilSquareIcon,
  TrashIcon,
  UserPlusIcon,
  CogIcon,
  SquaresPlusIcon,
} from '@heroicons/react/20/solid';
import { CheckIcon } from '@heroicons/react/24/outline';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import {
  NavLink,
  Outlet,
  useParams,
  useNavigate,
  useOutletContext,
  useLocation,
} from 'react-router-dom';
import MoonLoader from 'react-spinners/MoonLoader';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { useQueries, useQuery, useQueryClient, useMutation, useIsFetching } from "@tanstack/react-query";

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

function MultiVaultDropown({ vaultListView, selectedVault, setSelectedVault, resetSelectedVault }) {

  useEffect(()=>{
    resetSelectedVault();
  }, [vaultListView]);

  return (
    <Listbox value={selectedVault} onChange={setSelectedVault}>
      {({ open }) => (
        <>
          {vaultListView && selectedVault && vaultListView[selectedVault] ? (
            <div className='w-11/12 my-2'>
              <Listbox.Button className='flex relative w-full rounded-md bg-white py-1.5 pl-3 pr-1.5 text-left text-black-700 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none sm:text-sm sm:leading-6'>
                <span className='flex-1 block truncate'>{vaultListView[selectedVault].name}</span>
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
                  {
                    //eslint-disable-next-line
                    Object.entries(vaultListView).map(([vaultId, vault]) => (
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

function EditVaultPopup({ open, setOpen, selectedVault, vaultListView }) {
  const cancelButtonRef = useRef(null);
  const [vaultName, setVaultName] = useState('');
  const [vaultDescription, setVaultDescription] = useState('');

  useEffect(() => {
    if (selectedVault) {
      setVaultName(vaultListView[selectedVault].name);
      setVaultDescription(vaultListView[selectedVault].description);
    }
  }, [selectedVault]);

  const queryClient = useQueryClient();

  const updateVaultMutation = useMutation({
    mutationFn: updateVault
  });

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
                        setVaultName(e.target.value);
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
                        setVaultDescription(e.target.value);
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
                      updateVaultMutation.mutateAsync({
                        vaultId: selectedVault,
                        name: vaultName,
                        description: vaultDescription
                      }, {
                        onSuccess: ()=>{
                          toast.success('Vault updated successfully!');
                          queryClient.invalidateQueries({
                            queries: [
                              {queryKey: ['vaults']}
                            ]
                          });
                        },
                        onError: (error)=>{
                          toast.error(error);
                        }
                      });
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

function AddVaultPopup({ open, setOpen }) {
  const cancelButtonRef = useRef(null);
  const [vaultName, setVaultName] = useState('');
  const [vaultDescription, setVaultDescription] = useState('');

  const queryClient = useQueryClient();

  const addVaultMutation = useMutation({
    mutationFn: addVault
  });

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
                        setVaultName(e.target.value);
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
                        setVaultDescription(e.target.value);
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
                      addVaultMutation.mutateAsync({
                        name: vaultName,
                        description: vaultDescription
                      }, {
                        onSuccess: ()=>{
                          toast.success('Vault added successfully!');
                          queryClient.invalidateQueries({
                            queries: [
                              {queryKey: ['vaults']}
                            ]
                          });
                        },
                        onError: (error)=>{
                          toast.error(error);
                        }
                      });
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

function DeleteVaultPopup({ open, setOpen, selectedVault, vaultListView, resetSelectedVault }) {
  const cancelButtonRef = useRef(null);
  const [vaultName, setVaultName] = useState('');

  useEffect(() => {
    setVaultName('');
  }, [selectedVault]);

  const queryClient = useQueryClient();

  const deleteVaultMutation = useMutation({
    mutationFn: deleteVault
  });

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
                        setVaultName(e.target.value);
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
                        if (vaultName != vaultListView[selectedVault].name) {
                          toast.warn("Vault name doesn't match!");
                          return;
                        }
                        deleteVaultMutation.mutateAsync({
                          vaultId: selectedVault
                        }, {
                          onSuccess: ()=>{
                            toast.success('Vault deleted successfully!');
                            resetSelectedVault();
                            queryClient.invalidateQueries({
                              queries: [
                                {queryKey: ['vaults']}
                              ]
                            });
                          },
                          onError: (error)=>{
                            toast.error(error);
                          }
                        });
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
  const [isDefault, setIsDefault] = useState(false);
  useEffect(() => {
    if (selectedVault != null && vaultList != null) {
      if (vaultList[selectedVault]['isDefault']) {
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
                // console.log('clicked', 'share');
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
          {!isDefault && (
            <div className='py-1'>
              <Menu.Item
                // disabled
                onClick={() => {
                  setOpenDeleteVault(true);
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

  const [itemDataView, setItemDataView] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const [selectedVault, vaultListView] = useOutletContext();

  const queryClient = useQueryClient();

  const itemDataRaw = queryClient.getQueryData(["vaults", selectedVault, "items", id])

  useEffect(()=>{
    if(itemDataRaw){
      const keyWrappingKeyPair = getKeyWrappingKeyPair();
      setItemDataView(decryptedItemData(itemDataRaw, keyWrappingKeyPair));
    }
  }, [itemDataRaw])

  useEffect(() => {
    if (id === 'new') {
      setItemDataView({
        title: '',
        icon: null,
        password: '',
        website: '',
        username: '',
        vaultId: selectedVault,
      });
      setItemFormDisability(false);
      setShareButtonVisible(false);
    } else {
      setItemFormDisability(true);
      setShareButtonVisible(true);
    }
  }, [location]);

  const updateItemData = useMutation({
    mutationFn: updateVaultItem
  });

  const createItemData = useMutation({
    mutationFn: createVaultItem
  });

  const deleteItemData = useMutation({
    mutationFn: deleteVaultItem
  })

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
                await createItemData.mutateAsync(
                  {
                    vaultId: selectedVault,
                    title: itemDataView.title,
                    website: itemDataView.website,
                    password: itemDataView.password,
                    username: itemDataView.username,
                    iek: iek
                  },
                  {
                    onError: (error)=> {
                      toast.error(error);
                    },
                    onSuccess: ()=> {
                      toast.success("Item created!");
                      queryClient.invalidateQueries({
                        queries: [
                          {queryKey: ['vaults', selectedVault, 'items']},
                          ]
                      });
                    }
                  })
                  navigate(`/app/home/${response.data.id}`);
              } else {
                  await updateItemData.mutateAsync(
                    {
                      vaultId: selectedVault,
                      id: id,
                      title: itemDataView.title,
                      website: itemDataView.website,
                      password: itemDataView.password,
                      username: itemDataView.username,
                      iek: itemDataView.iek
                    },
                    {
                      onError: (error)=> {
                        toast.error(error);
                      },
                      onSuccess: ()=> {
                        toast.success("Item updated!");
                        queryClient.invalidateQueries({
                          queries: [
                            // change selectedVault to itemDataView.vaultId
                            {queryKey: ['vaults', selectedVault, 'items']},
                            ]
                        });
                      }
                    })
              }
              setItemUpdating(false);
            }
            setItemFormDisability(!itemFormDisabled);
          }}
          label={itemFormDisabled ? 'Edit' : itemUpdating ? 'Saving' : 'Save'}
          buttonType='link'
          buttonClassName='relative top-[0rem] right-[0rem] z-[100]'
          labelClassName='text-xl'
        >
          <MoonLoader loading={itemUpdating && true} size={15} />
        </Button>
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
              await deleteItemData.mutateAsync(
                {
                  vaultId: selectedVault,
                  id: id,
                },
                {
                  onError: (error)=> {
                    toast.error(error);
                    navigate(-1);
                  },
                  onSuccess: ()=> {
                    toast.success("Item deleted!");
                    queryClient.invalidateQueries({
                      queries: [
                        // change selectedVault to itemDataView.vaultId
                        {queryKey: ['vaults', selectedVault, 'items']},
                        ]
                    });
                    navigate(-1);
                  }
                })
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
            src={itemDataView?.icon ?? null}
          />
        </div>
        <input
          className={`flex self-stretch flex-1 relative rounded-lg w-8/12 text-5xl font-medium bg-[transparent] rounded-3xs w-11/12 overflow-hidden flex-row py-0.5 px-[7px] box-border items-center justify-center ${
            itemFormDisabled ? '' : 'border-2 border-blue-100 bg-blue-50 bg-opacity-40'
          }`}
          value={itemDataView?.title ?? ''}
          placeholder='title'
          onChange={(e) => {
            setItemDataView({...itemDataView, title: e.target.value});
          }}
          disabled={itemFormDisabled}
        />
        <label className='text-center font-medium'>USERNAME</label>
        <input
          className={`flex text-[23.04px] bg-[transparent] rounded w-8/12 overflow-hidden flex-row py-0.5 px-[7px] box-border items-center justify-center ${
            itemFormDisabled ? '' : 'border-2 border-blue-100 bg-blue-50 bg-opacity-40'
          }`}
          type='text'
          value={itemDataView?.username ?? ''}
          placeholder='Username'
          onChange={(e) => {
            setItemDataView({...itemDataView, username: e.target.value});
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
            value={itemDataView?.password ?? ''}
            placeholder='Password'
            onChange={(e) => {
              setItemDataView({...itemDataView, password: e.target.value});
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
          value={itemDataView?.website ?? ''}
          placeholder='Website'
          onChange={(e) => {
            setItemDataView({...itemDataView, website: e.target.value});
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

const decryptedItemData = (itemData, keyWrappingKeyPair) => {
  const iek = keyWrappingKeyPair.private.decrypt(
    itemData.encryptedEncryptionKey,
  );
  return {
    id: itemData.id,
    title: decryptData(itemData.title, iek),
    website: decryptData(itemData.website, iek),
    username: decryptData(itemData.username, iek),
    password: decryptData(itemData.password, iek),
    iek: iek,
    icon: `https://cool-rose-moth.faviconkit.com/${decryptData(itemData.website, iek)}/256`
  }
}

const NavigationPanel = ({
  vaultListView,
  selectedVault,
  setSelectedVault,
  setOpenEditVault,
  setOpenAddVault,
  setOpenDeleteVault,
  resetSelectedVault
}) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [itemDataListView, setItemDataListView] = useState(null);

  const queryClient = useQueryClient();
  const queryState = queryClient.getQueryState(["vaults", selectedVault, "items"]);

  useEffect(()=>{
    const itemListRaw = queryClient.getQueryData(["vaults", selectedVault, "items"]);
    if(itemListRaw){
      const keyWrappingKeyPair = getKeyWrappingKeyPair();
      const itemDataListDecrypted = itemListRaw.map(itemData=>decryptedItemData(itemData, keyWrappingKeyPair));
      setItemDataListView(itemDataListDecrypted);
    }
  }, [selectedVault, queryState])

  return (
    <div
      className='self-stretch shadow-[1px_0px_4px_rgba(0,_0,_0,_0.25)] w-3/12 flex flex-col grow-0 shrink-0 items-center justify-start relative z-[1]'
      id='left-panel'
    >
      <div className='flex w-full items-center justify-around gap-2 px-2' id='vaul-bar'>
        {/*<p className="text-md">Vault</p>*/}
        <MultiVaultDropown
          vaultListView={vaultListView}
          selectedVault={selectedVault}
          setSelectedVault={setSelectedVault}
          resetSelectedVault={resetSelectedVault}
        />
        <VaultSettingsMenu
          vaultListView={vaultListView}
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
        {
          Object.entries(itemDataListView ?? [])
          //eslint-disable-next-line
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
            )
        }
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

  useTokenExpiration();

  const [selectedVault, setSelectedVault] = useState(null);
  const [vaultListView, setVaultListView] = useState(null);
  const location = useLocation();
  const defaultVault = useRef(null);

  const resetSelectedVault = () =>{
    if (selectedVault == null && defaultVault.current) {
      setSelectedVault(defaultVault.current);
    } else if (selectedVault && !vaultListView[selectedVault]){
      setSelectedVault(defaultVault.current);
    }
  };

  useEffect(() => {
    resetSelectedVault();
  }, [vaultListView, location]);


  const queryClient = useQueryClient();

  const createVaultListView = (data)=>{
    if(data){
      var newState = {}
      for(var i=0;i<data.length;i+=1){
        newState[data[i].id] = data[i];
        if(data[i].isDefault){
          defaultVault.current = data[i].id
        }
      }
      return newState;
    } else{
      return null;
    }
  }

  const vaultListRaw = useQuery({
    queryKey: ["vaults"],
    queryFn: async ()=>{
      const data = await getVaults();
      setVaultListView(()=>createVaultListView(data));
      data.map(vaultData=>{
        queryClient.setQueryData(["vaults", vaultData.id], vaultData);
      })
      return data;
    },
    refetchOnWindowFocus: false,
    staleTime: 300000
  })

  useEffect(()=>{
    const data = queryClient.getQueryData(["vaults"])
    setVaultListView(()=>createVaultListView(data));
  }, [])

  const vaultItemsRaw = useQueries({
    queries: (vaultListRaw?.data || [])
    .map(({ id })=>{return {
        queryKey: ["vaults", id, "items"],
        queryFn: async ()=>{
          const data = await getVaultItems(id);
          const keyWrappingKeyPair = getKeyWrappingKeyPair();
          const decryptedItemList = data.map(vaultItem=>{
            queryClient.setQueryData(["vaults", id, "items", vaultItem.id], vaultItem);
            return decryptedItemData(vaultItem, keyWrappingKeyPair);
          })
          return data;
        },
        refetchOnWindowFocus: false,
        staleTime: 300000,
        enabled: !!vaultListRaw.data && !!id,
      }})
  })

  // const deleteVaultState = (vaultId) => {
  //   if (Object.entries(vaultList)[0][0] != vaultId) {
  //     setSelectedVault(Object.entries(vaultList)[0][0]);
  //   } else {
  //     setSelectedVault(Object.entries(vaultList)[1][0]);
  //   }
  //   setVaultList((prevVaultList) => {
  //     const updatedVaultList = {
  //       ...prevVaultList,
  //     };
  //     delete updatedVaultList[vaultId];
  //     return updatedVaultList;
  //   });
  // };

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
            vaultListView={vaultListView}
          />
          <AddVaultPopup
            open={openAddVaultPopup}
            setOpen={setOpenAddVault}
            vaultListView={vaultListView}
          />
          <DeleteVaultPopup
            open={openDeleteVaultPopup}
            setOpen={setOpenDeleteVault}
            selectedVault={selectedVault}
            vaultListView={vaultListView}
            resetSelectedVault={resetSelectedVault}
          />
          <NavigationPanel
            vaultListView={vaultListView}
            selectedVault={selectedVault}
            setSelectedVault={setSelectedVault}
            setOpenEditVault={setOpenEditVault}
            setOpenAddVault={setOpenAddVault}
            setOpenDeleteVault={setOpenDeleteVault}
            resetSelectedVault={resetSelectedVault}
          />
          <Outlet context={[selectedVault, vaultListView]} />
        </div>
      </div>
    </div>
  );
};

export default AppHome;
