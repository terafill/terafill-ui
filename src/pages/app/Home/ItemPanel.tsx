import { useState, useEffect } from 'react';

import { TrashIcon, Pencil2Icon, UpdateIcon, CheckCircledIcon } from '@radix-ui/react-icons';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useParams, useNavigate, useLocation, useOutletContext } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { Button2 } from '../../../components/form/Button';
import { Input } from '../../../components/form/Input';
import {
    getVaultItem,
    createVaultItem,
    deleteVaultItem,
    updateVaultItem,
} from '../../../data/item';
import { getKeyWrappingKeyPair, decryptData } from '../../../utils/security';

const decryptedItemData = (itemData, keyWrappingKeyPair) => {
    const iek = keyWrappingKeyPair.private.decrypt(itemData.encryptedEncryptionKey);
    return {
        id: itemData.id,
        title: decryptData(itemData.title, iek),
        website: decryptData(itemData.website, iek),
        username: decryptData(itemData.username, iek),
        password: decryptData(itemData.password, iek),
        iek: iek,
        icon: `https://cool-rose-moth.faviconkit.com/${decryptData(itemData.website, iek)}/256`,
    };
};

const ItemPanel = () => {
    const { id } = useParams();
    const [itemFormDisabled, setItemFormDisability] = useState(true);
    // const [shareButtonVisible, setShareButtonVisible] = useState(true);
    const [showPassword, setPasswordVisibility] = useState(false);
    const [itemUpdating, setItemUpdating] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const [selectedVault] = useOutletContext<[string]>();

    const queryClient = useQueryClient();

    const itemDataRaw = useQuery({
        queryKey: ['vaults', selectedVault, 'items', id],
        queryFn: () =>
            getVaultItem({
                vaultId: selectedVault,
                id: id,
            }),
        suspense: true,
    });

    // let initDataEncrypted = {
    //   id: itemDataRaw?.data?.id ?? '',
    //   title: itemDataRaw?.data?.title ?? '',
    //   website: itemDataRaw?.data?.website ?? '',
    //   username: itemDataRaw?.data?.username ?? '',
    //   password: itemDataRaw?.data?.password ?? '',
    //   encryptedEncryptionKey: itemDataRaw?.data?.encryptedEncryptionKey ?? '',
    // }

    const [itemDataView, setItemDataView] = useState<VaultItem | null>(null);

    const upsertItem = async (id) => {
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
                        iek: iek,
                    },
                    {
                        onError: (error) => {
                            toast.error(error);
                        },
                        onSuccess: () => {
                            toast.success('Item created!');
                            queryClient.invalidateQueries({
                                queries: [
                                    {
                                        queryKey: ['vaults', selectedVault, 'items'],
                                    },
                                ],
                            });
                        },
                    },
                );
            } else {
                await updateItemData.mutateAsync(
                    {
                        vaultId: selectedVault,
                        id: id,
                        title: itemDataView.title,
                        website: itemDataView.website,
                        password: itemDataView.password,
                        username: itemDataView.username,
                        iek: itemDataView.iek,
                    },
                    {
                        onError: (error) => {
                            toast.error(error);
                        },
                        onSuccess: () => {
                            // toast.success('Item updated!');
                            setUpdateSuccess(true);
                            setTimeout(() => {
                                setEditMode(false);
                                setUpdateSuccess(false);
                            }, 3000);
                            queryClient.invalidateQueries({
                                queries: [
                                    // change selectedVault to itemDataView.vaultId
                                    {
                                        queryKey: ['vaults', selectedVault, 'items'],
                                    },
                                ],
                            });
                        },
                    },
                );
            }
            setItemUpdating(false);
        }
        setItemFormDisability(!itemFormDisabled);
    };

    const deleteItemMutation = async () => {
        await deleteItemData.mutateAsync(
            {
                vaultId: selectedVault,
                id: id,
            },
            {
                onError: (error) => {
                    toast.error(error);
                    navigate(-1);
                },
                onSuccess: () => {
                    toast.success('Item deleted!');
                    queryClient.invalidateQueries({
                        queries: [
                            // change selectedVault to itemDataView.vaultId
                            { queryKey: ['vaults', selectedVault, 'items'] },
                        ],
                    });
                    navigate(-1);
                },
            },
        );
    };

    useEffect(() => {
        if (itemDataRaw.isSuccess && itemDataRaw.data) {
            const keyWrappingKeyPair = getKeyWrappingKeyPair();
            const itemData = decryptedItemData(itemDataRaw.data, keyWrappingKeyPair);
            setItemDataView(itemData);
        }
    }, [itemDataRaw.dataUpdatedAt, location]);

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
            // setShareButtonVisible(false);
        } else {
            setItemFormDisability(true);
            // setShareButtonVisible(true);
        }
    }, [location]);

    const updateItemData = useMutation({
        mutationFn: updateVaultItem,
    });

    const createItemData = useMutation({
        mutationFn: createVaultItem,
    });

    const deleteItemData = useMutation({
        mutationFn: deleteVaultItem,
    });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className='relative z-[0] flex h-full flex-1 flex-col items-center justify-center self-stretch overflow-hidden bg-gray-950 px-[16px] py-[32px]'
            id='right-panel'
        >
            <div className='absolute right-[24px] top-[24px] flex flex-row gap-3 self-end'>
                {
                    // Cancel button
                    editMode && !updateSuccess && (
                        <Button2
                            disabled={itemUpdating}
                            variant='ghost'
                            onClick={() => {
                                setItemFormDisability(true);
                                setEditMode(false);
                                if (id === 'new') {
                                    navigate(-1);
                                }
                            }}
                        >
                            Cancel
                        </Button2>
                    )
                }
                {
                    // Edit button
                    !editMode && (
                        <Button2
                            variant='secondary'
                            size='icon'
                            onClick={() => {
                                setEditMode(true);
                                setItemFormDisability(false);
                            }}
                        >
                            <Pencil2Icon className='h-6 w-6' />
                        </Button2>
                    )
                }
                {
                    //Save-Saving-Success button
                    editMode &&
                        (itemUpdating ? (
                            <Button2 variant='ghost'>
                                <UpdateIcon className='mr-2 h-6 w-6 animate-spin' />
                                {'saving'}
                            </Button2>
                        ) : updateSuccess ? (
                            <Button2 variant='secondary' className='font-semibold text-green-600'>
                                <CheckCircledIcon className='mr-2 h-6 w-6 text-green-600' />
                                Success
                            </Button2>
                        ) : (
                            <Button2 variant='ghost' onClick={() => upsertItem(id)}>
                                Save
                            </Button2>
                        ))
                }

                {
                    // Delete button
                    !editMode && !itemUpdating && id != 'new' && (
                        <Button2 variant='secondary' size='icon' onClick={deleteItemMutation}>
                            <TrashIcon className='h-6 w-6 text-red-500' />
                        </Button2>
                    )
                }
            </div>
            <div className='grid grid-cols-2 grid-rows-4 items-center justify-center justify-items-center gap-4'>
                <div className='flex-1 self-stretch' id='iconframe'>
                    <img
                        className='h-[88px] w-[88px] overflow-hidden object-cover'
                        alt=''
                        src={itemDataView?.icon ?? null}
                    />
                </div>
                <input
                    className={`rounded-3xs relative box-border flex  w-8/12 flex-1 flex-row items-center justify-center self-stretch overflow-hidden rounded-lg bg-[transparent] px-[7px] py-0.5 text-5xl font-medium ${
                        itemFormDisabled ? '' : 'border-2 border-blue-100 bg-blue-50 bg-opacity-40'
                    }`}
                    value={itemDataView?.title ?? ''}
                    // placeholder='title'
                    onChange={(e) => {
                        setItemDataView({ ...itemDataView, title: e.target.value });
                    }}
                    disabled={itemFormDisabled}
                />
                <label className='text-left font-medium text-gray-400'>Username</label>
                <Input
                    animationKey={itemFormDisabled}
                    className={`flex w-8/12 overflow-hidden text-lg ${
                        itemFormDisabled ? '' : 'border-1 border-gray-300 bg-gray-700 bg-opacity-40'
                    }`}
                    type='text'
                    value={itemDataView?.username ?? ''}
                    // placeholder='Username'
                    onChange={(e) => {
                        setItemDataView({ ...itemDataView, username: e.target.value });
                    }}
                    disabled={itemFormDisabled}
                />
                <label className='text-left font-medium text-gray-400'>Password</label>
                <div className='relative box-border flex w-8/12 flex-1 flex-row items-stretch justify-items-stretch'>
                    <Input
                        animationKey={itemFormDisabled}
                        className={`flex w-full overflow-hidden text-lg ${
                            itemFormDisabled
                                ? ''
                                : 'border-1 border-gray-300 bg-gray-700 bg-opacity-40'
                        }`}
                        type={showPassword ? 'text' : 'password'}
                        value={itemDataView?.password ?? ''}
                        placeholder='Password'
                        onChange={(e) => {
                            setItemDataView({ ...itemDataView, password: e.target.value });
                        }}
                        disabled={itemFormDisabled}
                    />
                    <button
                        className='absolute inset-y-0 right-[10px] text-gray-500 hover:text-gray-800'
                        onClick={() => setPasswordVisibility(!showPassword)}
                    >
                        {showPassword ? (
                            <AiFillEyeInvisible className='h-5 w-5' aria-hidden='true' />
                        ) : (
                            <AiFillEye className='h-5 w-5' aria-hidden='true' />
                        )}
                    </button>
                </div>

                <label className='text-left font-medium text-gray-400'>Website</label>
                <Input
                    animationKey={itemFormDisabled}
                    className={`box-border flex w-8/12 overflow-hidden text-lg ${
                        itemFormDisabled
                            ? ''
                            : ' border-1 border-gray-300 bg-gray-700 bg-opacity-40'
                    } `}
                    type='text'
                    value={itemDataView?.website ?? ''}
                    // placeholder='Website'
                    onChange={(e) => {
                        setItemDataView({ ...itemDataView, website: e.target.value });
                    }}
                    disabled={itemFormDisabled}
                />
            </div>
        </motion.div>
    );
};

export default ItemPanel;
