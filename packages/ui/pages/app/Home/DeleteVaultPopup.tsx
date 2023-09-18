import React, { useEffect, useState, useRef, Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import { UpdateIcon, CheckCircledIcon } from '@radix-ui/react-icons';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { deleteVault } from 'lib/api/vault';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { Button2 } from 'components/form/Button';
import { Input } from 'components/form/Input';

import { deleteVaultPopupOpenAtom, selectedVaultAtom } from './store';

export default function DeleteVaultPopup({ defaultVault }: { defaultVault: string }) {
    const [open, setOpen] = useAtom(deleteVaultPopupOpenAtom);
    const [selectedVault, setSelectedVault] = useAtom(selectedVaultAtom);

    const cancelButtonRef = useRef<HTMLButtonElement | null>(null);
    const [vaultName, setVaultName] = useState<string>('');
    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const vaultData: Vault | undefined | null = queryClient.getQueryData(['vaults', selectedVault]);

    const deleteVaultMutation = useMutation({
        mutationFn: deleteVault,
    });

    const deleteVaultMutationTrigger = async () => {
        if (vaultName != vaultData?.name) {
            console.log('vaultName match', vaultName, vaultData?.name);
            toast.remove();
            toast.error("Vault name doesn't match!", {
                icon: <ExclamationTriangleIcon height={'30px'} width={'30px'} color='yellow' />,
            });
            return;
        }
        deleteVaultMutation.mutateAsync(
            {
                vaultId: selectedVault,
            },
            {
                onSuccess: () => {
                    toast.remove();
                    toast.success('Vault deleted successfully!');
                    queryClient.invalidateQueries(['vaults']);
                    setSelectedVault(defaultVault);
                    setOpen(false);
                    navigate('/app/home');
                },
                onError: (error: unknown) => {
                    toast.remove();
                    if (error instanceof Error) {
                        toast.error(error.message);
                    } else {
                        // Handle other cases if necessary, or use a default error message
                        toast.error('An error occurred');
                    }
                },
            },
        );
    };

    useEffect(() => {
        setVaultName('');
    }, [selectedVault]);

    useEffect(() => {
        if (open) {
            setVaultName('');
            deleteVaultMutation.reset();
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
                    <div className='fixed inset-0 bg-black bg-opacity-30 transition-opacity' />
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
                                        Confirm vault deletion
                                    </Dialog.Title>
                                    <div className='relative w-full'>
                                        <label
                                            htmlFor='vaultName'
                                            className='absolute -top-3 left-1 inline-block rounded bg-black px-1 text-sm font-medium text-gray-500'
                                        >
                                            Confirm vault name
                                        </label>
                                        <Input
                                            type='text'
                                            name='vaultName'
                                            id='vaultName'
                                            className='shadow-smsm:text-sm w-full sm:leading-6'
                                            // placeholder='Enter vault name'
                                            value={vaultName}
                                            onChange={(e) => {
                                                setVaultName(e.target.value);
                                            }}
                                            required
                                            title='Enter vault name to confirm deletion'
                                        />
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
                                            //delete-deleting-Success button
                                            deleteVaultMutation.isLoading ? (
                                                <Button2 variant='default' disabled>
                                                    <UpdateIcon className='mr-2 h-6 w-6 animate-spin' />
                                                    {'Deleting'}
                                                </Button2>
                                            ) : deleteVaultMutation.isSuccess ? (
                                                <Button2
                                                    variant='default'
                                                    className='font-semibold text-green-600'
                                                >
                                                    <CheckCircledIcon className='mr-2 h-6 w-6 text-green-600' />
                                                    Success
                                                </Button2>
                                            ) : (
                                                <Button2
                                                    variant='destructive'
                                                    onClick={deleteVaultMutationTrigger}
                                                >
                                                    Confirm
                                                </Button2>
                                            )
                                        }
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
