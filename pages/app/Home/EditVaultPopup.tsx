import React, { useEffect, useState, useRef, Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import { UpdateIcon, CheckCircledIcon } from '@radix-ui/react-icons';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { Button2 } from 'components/form/Button';
import { Input } from 'components/form/Input';
import { Textarea } from 'components/form/TextArea';
import { updateVault } from 'lib/api/vault';

export default function EditVaultPopup({ open, setOpen, selectedVault }) {
    const cancelButtonRef = useRef(null);
    const queryClient = useQueryClient();
    const vaultData = queryClient.getQueryData(['vaults', selectedVault]);
    const [vaultName, setVaultName] = useState('');
    const [vaultDescription, setVaultDescription] = useState('');

    const updateVaultMutation = useMutation({
        mutationFn: updateVault,
    });

    useEffect(() => {
        if (selectedVault) {
            setVaultName(vaultData?.name ?? '');
            setVaultDescription(vaultData?.description ?? '');
        }
    }, [selectedVault, open]);

    useEffect(() => {
        if (open) {
            updateVaultMutation.reset();
            console.log('Triggered');
        }
    }, [open]);

    const updateVaultMutationTrigger = async () => {
        updateVaultMutation.mutateAsync(
            {
                vaultId: selectedVault,
                name: vaultName,
                description: vaultDescription,
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queries: [{ queryKey: ['vaults'] }],
                    });
                    setOpen(false);
                    toast.success('Vault updated successfully!');
                },
                onError: (error) => {
                    toast.error(error);
                },
            },
        );
    };

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
                    <div className='fixed inset-0 bg-black bg-opacity-20 transition-opacity' />
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
                            <Dialog.Panel className='relative flex w-80 transform flex-col items-center justify-center gap-6 overflow-hidden rounded-lg border-2 bg-black p-4 text-left shadow-2xl ring-gray-400 transition-all'>
                                <div
                                    className='flex w-5/6 flex-col items-center gap-8 text-center'
                                    id='popup-body'
                                >
                                    <Dialog.Title
                                        as='h3'
                                        className='w-full text-base font-semibold leading-6 text-gray-200'
                                    >
                                        Edit vault details
                                    </Dialog.Title>
                                    <div className='relative w-full'>
                                        <label
                                            htmlFor='vaultName'
                                            className='absolute -top-3 left-1 inline-block rounded bg-black px-1 text-sm font-medium text-gray-500'
                                        >
                                            Name
                                        </label>
                                        <Input
                                            type='text'
                                            name='vaultName'
                                            id='vaultName'
                                            className='w-full shadow-sm sm:text-sm sm:leading-6'
                                            // placeholder='Enter vault name'
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
                                            className='absolute -top-3 left-1 inline-block rounded bg-black px-1 text-sm font-medium text-gray-500'
                                        >
                                            Description
                                        </label>
                                        <Textarea
                                            name='vaultDescription'
                                            id='vaultDescription'
                                            className='w-full shadow-sm sm:text-sm sm:leading-6'
                                            // placeholder='Enter Vault description'
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
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </Button2>
                                    {
                                        //update-updating-Success button
                                        updateVaultMutation.isLoading ? (
                                            <Button2 variant='default' disabled>
                                                <UpdateIcon className='mr-2 h-6 w-6 animate-spin' />
                                                {'Updating'}
                                            </Button2>
                                        ) : updateVaultMutation.isSuccess ? (
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
                                                onClick={updateVaultMutationTrigger}
                                            >
                                                Update
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
