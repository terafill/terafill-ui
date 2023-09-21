import { useState } from 'react';

import { TrashIcon, Pencil2Icon, UpdateIcon, CheckCircledIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';

import { Badge } from 'components/form/Badge';
import { Button2 } from 'components/form/Button';
import { Input } from 'components/form/Input';

import useDeleteItem from './hooks/useDeleteItem';
import useItem from './hooks/useItem';
import useUpdateItem from './hooks/useUpdateItem';

const ItemPanel = () => {
    const { id, groupId: selectedVault } = useParams();
    const params = useParams();
    console.log('params', params);
    const [itemFormDisabled, setItemFormDisability] = useState(true);
    const [showPassword, setPasswordVisibility] = useState(false);
    const [itemUpdating, setItemUpdating] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const navigate = useNavigate();

    // Fetch item data
    const { itemDataView, setItemDataView } = useItem(selectedVault, id);

    console.log('ItemPanel.itemDataView', itemDataView);

    // Delete item
    const { deleteItemMutation } = useDeleteItem({
        selectedVault: selectedVault,
        id: id,
        onSuccess: () => {
            navigate(-1);
            toast.success('Item deleted!');
        },
        onError: (error) => {
            navigate(-1);
            toast.error(error);
        },
    });

    // Update item
    const { updateItem } = useUpdateItem({
        selectedVault: selectedVault,
        itemDataView: itemDataView,
        onSuccess: () => {
            setUpdateSuccess(true);
            setTimeout(() => {
                setEditMode(false);
                setUpdateSuccess(false);
            }, 3000);
        },
        onError: (error) => {
            navigate(-1);
            toast.error(error);
        },
    });

    // Modifying update item action
    const updateItemMutation = async (id) => {
        if (!itemFormDisabled) {
            setItemUpdating(true);

            await updateItem(id);

            setItemUpdating(false);
        }
        setItemFormDisability(!itemFormDisabled);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className='dotted-bg relative z-[0] flex h-full flex-1 flex-col items-center justify-center self-stretch bg-gray-950 px-[16px] py-[32px]'
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
                            <Button2 variant='ghost' onClick={() => updateItemMutation(id)}>
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
            <div className='mt-12 grid grid-cols-2 items-start justify-center justify-items-center space-y-20 overflow-y-auto'>
                <div className='mb-4 flex items-center justify-center self-stretch' id='iconframe'>
                    <img
                        className='h-[88px] w-[88px] overflow-hidden rounded-md border-2 border-gray-900 object-cover'
                        alt=''
                        src={itemDataView?.icon ?? null}
                    />
                </div>
                <input
                    className={`rounded-3xs relative mb-4 flex w-8/12 items-center justify-center self-stretch rounded-lg bg-[transparent] px-[7px] py-0.5 text-5xl font-medium ${
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

                {/* <label className='text-left font-medium text-gray-400'>Tags</label>
                <div
                    animationKey={itemFormDisabled}
                    className={`box-border block w-8/12 gap-2 rounded-sm border-2 p-2 text-lg ${
                        itemFormDisabled
                            ? ''
                            : ' border-1 border-gray-300 bg-gray-700 bg-opacity-40'
                    } `}
                >
                    {[
                        'Prod',
                        'Dev',
                        'Staging',
                        'Secure',
                        'Finance',
                        'Work',
                        'Personal',
                        'Family',
                    ].map((bname) => (
                        <Badge
                            key={bname}
                            className='m-2 h-min text-gray-400'
                            variant={'outline'}
                            badgeColor='indigo'
                        >
                            {bname}
                        </Badge>
                    ))}
                </div> */}
            </div>
        </motion.div>
    );
};

export default ItemPanel;
