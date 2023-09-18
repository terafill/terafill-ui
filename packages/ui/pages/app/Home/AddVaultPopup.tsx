import React, { useEffect, useState, useRef, Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import { UpdateIcon, CheckCircledIcon } from '@radix-ui/react-icons';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';
import { addVault } from 'lib/api/vault';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { Button2 } from 'components/form/Button';
import { Input } from 'components/form/Input';
import { Textarea } from 'components/form/TextArea';

import { addVaultPopupOpenAtom, selectedVaultAtom } from './store';

export default function AddVaultPopup() {
    const setSelectedVault = useSetAtom(selectedVaultAtom);
    const cancelButtonRef = useRef(null);
    const [vaultName, setVaultName] = useState('');
    const [vaultDescription, setVaultDescription] = useState('');
    const navigate = useNavigate();

    const [open, setOpen] = useAtom(addVaultPopupOpenAtom);

    const queryClient = useQueryClient();

    const addVaultMutation = useMutation({
        mutationFn: addVault,
    });

    const addVaultMutationTrigger = async () => {
        await addVaultMutation.mutateAsync(
            {
                name: vaultName,
                description: vaultDescription,
            },
            {
                onSuccess: (data) => {
                    toast.success('Vault added successfully!');
                    queryClient.setQueryData(['vaults', data.id], data);
                    queryClient.invalidateQueries({
                        queries: [{ queryKey: ['vaults'] }],
                    });
                    console.log(`Vault ${data.name} created.`, data.id);
                    setSelectedVault(data.id);
                    setOpen(false);
                    navigate('/app/home');
                },
                onError: (error) => {
                    toast.error(error);
                },
            },
        );
    };

    useEffect(() => {
        if (open) {
            setVaultName('');
            setVaultDescription('');
            addVaultMutation.reset();
        }
    }, [open]);

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as='div'
                className='relative z-10'
                initialFocus={cancelButtonRef}
                onClose={setOpen}
            >
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div
                        className='fixed inset-0 bg-black bg-opacity-30 transition-opacity'
                        aria-hidden='true'
                    />
                </Transition.Child>

                <div className='fixed inset-0 z-10 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center'>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                            enterTo='opacity-100 translate-y-0 sm:scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        >
                            <Dialog.Panel className='relative flex w-80 transform flex-col items-center justify-center gap-6 overflow-hidden rounded-lg border bg-black p-4 text-left shadow-2xl transition-all'>
                                <div
                                    className='flex w-5/6 flex-col items-center gap-8 text-center'
                                    id='popup-body'
                                >
                                    <Dialog.Title
                                        as='h3'
                                        className='w-full text-base font-semibold leading-6 text-gray-200'
                                    >
                                        Add new vault
                                    </Dialog.Title>
                                    {/* <Dialog.Description>
                                        This will permanently deactivate your account
                                    </Dialog.Description> */}
                                    <div className='relative w-full'>
                                        {/* <label
                                            htmlFor='vaultName'
                                            className='absolute -top-3 left-1 inline-block rounded bg-gray-800 px-1 text-sm font-medium text-gray-400'
                                        >
                                            Name
                                        </label> */}
                                        <Input
                                            type='text'
                                            name='vaultName'
                                            id='vaultName'
                                            className='w-full shadow-sm sm:text-sm sm:leading-6'
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
                                        {/* <label
                                            htmlFor='description'
                                            className='absolute -top-3 left-1 inline-block rounded bg-white px-1 text-sm font-medium text-gray-700'
                                        >
                                            Description
                                        </label> */}
                                        <Textarea
                                            name='vaultDescription'
                                            id='vaultDescription'
                                            className='w-full shadow-sm sm:text-sm sm:leading-6'
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
                                    className='flex w-5/6 flex-row items-center justify-center gap-2'
                                    id='button-group'
                                >
                                    <Button2
                                        variant='secondary'
                                        ref={cancelButtonRef}
                                        onClick={() => setOpen(false)}
                                    >
                                        Cancel
                                    </Button2>
                                    {
                                        //Create-creating-Success button
                                        addVaultMutation.isLoading ? (
                                            <Button2 variant='default' disabled>
                                                <UpdateIcon className='mr-2 h-6 w-6 animate-spin' />
                                                {'Creating'}
                                            </Button2>
                                        ) : addVaultMutation.isSuccess ? (
                                            <Button2
                                                variant='default'
                                                className='font-semibold text-green-600'
                                            >
                                                <CheckCircledIcon className='mr-2 h-6 w-6 text-green-600' />
                                                Success
                                            </Button2>
                                        ) : (
                                            <Button2
                                                variant='default'
                                                onClick={addVaultMutationTrigger}
                                            >
                                                Add
                                            </Button2>
                                        )
                                    }
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
