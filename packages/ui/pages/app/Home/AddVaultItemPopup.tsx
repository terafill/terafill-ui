import { useEffect, useState, useRef, Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import { SquaresPlusIcon, MinusCircleIcon } from '@heroicons/react/20/solid';
import { UpdateIcon, CheckCircledIcon } from '@radix-ui/react-icons';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useAtom, useAtomValue } from 'jotai';
import { createVaultItem } from 'lib/api/item';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { Button2 } from 'components/form/Button';
import { Input } from 'components/form/Input';
import { ScrollArea } from 'ui/components/ui/scrollarea';

import { addVaultItemPopupOpenAtom, selectedVaultAtom } from './store';

export default function AddVaultItemPopup() {
    const selectedVault = useAtomValue(selectedVaultAtom);

    const initData = {
        vaultId: '',
        username: '',
        website: '',
        password: '',
        title: '',
        customItemFields: [],
    };

    const [open, setOpen] = useAtom(addVaultItemPopupOpenAtom);

    const [itemDataView, setItemDataView] = useState<VaultItem>(initData);
    const createItemData = useMutation({
        mutationFn: createVaultItem,
    });

    useEffect(() => {
        if (open) {
            setItemDataView(initData);
            createItemData.reset();
        }
    }, [open]);

    const cancelButtonRef = useRef(null);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const addVaultItemMutation = async () => {
        const iek = uuidv4();
        const itemData = {
            title: itemDataView.title,
            website: itemDataView.website,
            password: itemDataView.password,
            username: itemDataView.username,
            iek: iek,
            customItemFields: itemDataView.customItemFields,
        }
        await createItemData.mutateAsync(
            {
                vaultId: selectedVault,
                itemData: itemData
            },
            {
                onError: (error: unknown) => {
                    if (error instanceof Error) {
                        toast.error(error.message);
                    } else {
                        // Handle other cases if necessary, or use a default error message
                        toast.error('An error occurred');
                    }
                },
                onSuccess: (data) => {
                    toast.success('Item created!');
                    queryClient.invalidateQueries(['vaults', selectedVault, 'items']);
                    navigate(`/app/home/vault/${selectedVault}/item/${data.id}`);
                },
            },
        );
        setOpen(false);
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
                    <div className='fixed inset-0 bg-black bg-opacity-75 transition-opacity' />
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
                            <Dialog.Panel className='relative flex w-1/4 transform flex-col items-center justify-center gap-6 overflow-hidden rounded-lg border bg-black p-4 text-left shadow-2xl transition-all'>
                                <div className='flex flex-col gap-8' id='popup-body'>
                                    <Dialog.Title
                                        as='h3'
                                        className='w-full text-base font-semibold leading-6 text-gray-200'
                                    >
                                        <div className='flex flex-row items-center justify-center gap-2'>
                                            <SquaresPlusIcon className='h-10 w-10' />
                                            Add new item
                                        </div>
                                    </Dialog.Title>
                                    <ScrollArea type='always'>
                                        <div className='flex max-h-96 flex-col items-center gap-6 px-4 text-center'>
                                            <div className='relative w-full'>
                                                {/* <label
                                            htmlFor='title'
                                            className='absolute -top-3 left-1 inline-block rounded bg-white px-1 text-sm font-medium text-gray-700'
                                        >
                                            Title
                                        </label> */}
                                                <Input
                                                    type='text'
                                                    name='title'
                                                    id='title'
                                                    className='shadow-smsm:text-sm w-full sm:leading-6'
                                                    placeholder='Enter title'
                                                    value={itemDataView.title}
                                                    onChange={(e) => {
                                                        setItemDataView((prevState) => ({
                                                            ...prevState,
                                                            title: e.target.value,
                                                        }));
                                                    }}
                                                    required
                                                    title='Please enter title'
                                                />
                                            </div>
                                            <div className='relative w-full'>
                                                {/* <label
                                            htmlFor='username'
                                            className='absolute -top-3 left-1 inline-block rounded bg-white px-1 text-sm font-medium text-gray-700'
                                        >
                                            Username
                                        </label> */}
                                                <Input
                                                    type='text'
                                                    name='username'
                                                    id='username'
                                                    className='w-full shadow-sm sm:text-sm sm:leading-6'
                                                    placeholder='Enter username'
                                                    value={itemDataView.username}
                                                    onChange={(e) => {
                                                        setItemDataView((prevState) => ({
                                                            ...prevState,
                                                            username: e.target.value,
                                                        }));
                                                    }}
                                                    required
                                                    title='Please enter username'
                                                />
                                            </div>
                                            <div className='relative w-full'>
                                                {/* <label
                                            htmlFor='password'
                                            className='absolute -top-3 left-1 inline-block rounded bg-white px-1 text-sm font-medium text-gray-700'
                                        >
                                            Password
                                        </label> */}
                                                <Input
                                                    type='password'
                                                    name='password'
                                                    id='password'
                                                    className='w-full shadow-sm sm:text-sm sm:leading-6'
                                                    placeholder='Enter password'
                                                    value={itemDataView.password}
                                                    onChange={(e) => {
                                                        setItemDataView((prevState) => ({
                                                            ...prevState,
                                                            password: e.target.value,
                                                        }));
                                                    }}
                                                    required
                                                    title='Please enter password'
                                                />
                                            </div>
                                            <div className='relative w-full'>
                                                {/* <label
                                            htmlFor='website'
                                            className='absolute -top-3 left-1 inline-block rounded bg-white px-1 text-sm font-medium text-gray-700'
                                        >
                                            Website
                                        </label> */}
                                                <Input
                                                    type='text'
                                                    name='website'
                                                    id='website'
                                                    className='w-full shadow-sm sm:text-sm sm:leading-6'
                                                    placeholder='Enter website'
                                                    value={itemDataView.website}
                                                    onChange={(e) => {
                                                        setItemDataView((prevState) => ({
                                                            ...prevState,
                                                            website: e.target.value,
                                                        }));
                                                    }}
                                                    required
                                                    title='Please enter website'
                                                />
                                            </div>
                                            {itemDataView.customItemFields.map((fieldData) => (
                                                <div
                                                    key={fieldData.name}
                                                    className='relative flex w-full flex-row items-center justify-center gap-2'
                                                >
                                                    <Input
                                                        type='text'
                                                        name={fieldData.name + 'name'}
                                                        id={fieldData.name + 'value'}
                                                        className='w-full shadow-sm sm:text-sm sm:leading-6'
                                                        placeholder='Enter field name'
                                                        value={fieldData.name}
                                                        onChange={(e) => {
                                                            setItemDataView((prevState) => ({
                                                                ...prevState,
                                                                customItemFields: [
                                                                    ...prevState.customItemFields.filter(
                                                                        (nfieldData) =>
                                                                            nfieldData.id !==
                                                                            fieldData.id,
                                                                    ),
                                                                    {
                                                                        ...prevState.customItemFields.filter(
                                                                            (nfieldData) =>
                                                                                nfieldData.id ===
                                                                                fieldData.id,
                                                                        )[0],
                                                                        fieldName: e.target.value,
                                                                    },
                                                                ],
                                                            }));
                                                        }}
                                                        required
                                                        title='Enter field name'
                                                    />
                                                    <Input
                                                        type='text'
                                                        name={fieldData.id + 'value'}
                                                        id={fieldData.id + 'value'}
                                                        className='w-full shadow-sm sm:text-sm sm:leading-6'
                                                        placeholder='Enter field value'
                                                        value={fieldData.value}
                                                        onChange={(e) => {
                                                            setItemDataView((prevState) => ({
                                                                ...prevState,
                                                                customItemFields: [
                                                                    ...prevState.customItemFields.filter(
                                                                        (nfieldData) =>
                                                                            nfieldData.id !==
                                                                            fieldData.id,
                                                                    ),
                                                                    {
                                                                        ...prevState.customItemFields.filter(
                                                                            (nfieldData) =>
                                                                                nfieldData.id ===
                                                                                fieldData.id,
                                                                        )[0],
                                                                        fieldValue: e.target.value,
                                                                    },
                                                                ],
                                                            }));
                                                        }}
                                                        required
                                                        title='Please field value'
                                                    />
                                                    <MinusCircleIcon
                                                        width={50}
                                                        height={50}
                                                        onClick={() => {
                                                            setItemDataView((prevState) => ({
                                                                ...prevState,
                                                                customItemFields: [
                                                                    ...prevState.customItemFields.filter(
                                                                        (nfieldData) =>
                                                                            nfieldData.id !==
                                                                            fieldData.id,
                                                                    ),
                                                                ],
                                                            }));
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                            <Button2
                                                onClick={() => {
                                                    setItemDataView((prevState) => ({
                                                        ...prevState,
                                                        customItemFields: [
                                                            ...prevState.customItemFields,
                                                            {
                                                                fieldName: '',
                                                                fieldValue: '',
                                                                isTag: false,
                                                                id: uuidv4(),
                                                            },
                                                        ],
                                                    }));
                                                }}
                                                variant='outline'
                                            >
                                                Add custom field
                                            </Button2>
                                        </div>
                                    </ScrollArea>
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
                                        createItemData.isLoading ? (
                                            <Button2 variant='default' disabled>
                                                <UpdateIcon className='mr-2 h-6 w-6 animate-spin' />
                                                {'Creating'}
                                            </Button2>
                                        ) : createItemData.isSuccess ? (
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
                                                onClick={addVaultItemMutation}
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
