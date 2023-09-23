import { useState } from 'react';

import { MinusCircleIcon } from '@heroicons/react/20/solid';
import {
    TrashIcon,
    Pencil2Icon,
    UpdateIcon,
    CheckCircledIcon,
    // PlusIcon,
    // CaretSortIcon,
    // CheckIcon,
} from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
// import { cn } from 'lib/utils/basic';
import { toast } from 'react-hot-toast';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

// import { Badge } from 'components/form/Badge';
import { Button2 } from 'components/form/Button';
import { Input } from 'components/form/Input';
import { ScrollArea } from 'ui/components/ui/scrollarea';
// import {
//     Command,
//     CommandEmpty,
//     CommandGroup,
//     CommandInput,
//     CommandItem,
//     CommandSeparator,
// } from 'ui/components/ui/command';
// import { Popover, PopoverContent, PopoverTrigger } from 'ui/components/ui/popover';

import useDeleteItem from './hooks/useDeleteItem';
import useItem from './hooks/useItem';
import useUpdateItem from './hooks/useUpdateItem';

// import { Button2 } from '@/components/ui/button';
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

    const [openLabelsMenu, setOpenLabelsMenu] = useState(false);
    const [value, setValue] = useState('');

    const [labelSearch, setLabelSearch] = useState('');

    return (
        <motion.div
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            // exit={{ opacity: 0 }}
            // transition={{ duration: 0.5 }}
            className='dotted-bg relative z-[0] flex h-full flex-1 flex-col items-center justify-center self-stretch overflow-y-auto bg-gray-950 py-[32px]'
            id='right-panel'
        >
            <div className='fixed right-[24px] top-[24px] flex flex-row gap-3 self-end'>
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
            {/* <ScrollArea type='always'> */}
            <div className='mt-12 grid grid-cols-2 items-center justify-center justify-items-center space-y-20'>
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
                <Popover
                    open={openLabelsMenu}
                    onOpenChange={(e) => {
                        if (!itemFormDisabled) setOpenLabelsMenu(e);
                    }}
                >
                    <PopoverTrigger asChild>
                        <div
                            animationKey={itemFormDisabled}
                            className={`block min-h-[40px] w-8/12 gap-2 rounded-sm border-0 p-2 text-lg ${
                                itemFormDisabled
                                    ? ''
                                    : ' border-1 border-gray-300 bg-gray-700 bg-opacity-40'
                            } `}
                        >
                            {itemDataView?.tags?.map((bname) => (
                                <Badge
                                    key={bname}
                                    className='m-2 h-min text-gray-400'
                                    variant={'outline'}
                                    badgeColor='indigo'
                                    editable={!itemFormDisabled}
                                    onClick={(e) => {
                                        setItemDataView({
                                            ...itemDataView,
                                            tags: itemDataView.tags.filter(label=> label!==labelSearch),
                                        });
                                        e.stopPropagation();
                                    }}
                                >
                                    {bname}
                                </Badge>
                            ))}
                        </div>
                    </PopoverTrigger>
                    {!itemFormDisabled && (
                        <PopoverContent align='start' className='w-[200px] p-0'>
                            <Command
                                onValueChange={(e) => {
                                    console.log('value changed to: ', e);
                                }}
                                filter={(value, search) => {
                                    console.log(value, search);
                                    if (
                                        value.includes(search) ||
                                        value.includes('create new label')
                                    )
                                        return 1;
                                    return 0;
                                }}
                            >
                                <CommandInput
                                    placeholder='Search label...'
                                    className='h-9'
                                    value={labelSearch}
                                    onValueChange={setLabelSearch}
                                />
                                <CommandEmpty>No label found.</CommandEmpty>
                                <CommandGroup>
                                    {itemDataView?.tags?.map((label) => (
                                        <CommandItem
                                            key={label}
                                            onSelect={(currentValue) => {
                                                setValue(
                                                    currentValue === value ? '' : currentValue,
                                                );
                                                // setOpenLabelsMenu(false);
                                            }}
                                        >
                                            {label}
                                            <CheckIcon
                                                className={cn(
                                                    'ml-auto h-4 w-4',
                                                    value === label ? 'opacity-100' : 'opacity-0',
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                                <CommandSeparator />
                                <CommandGroup>
                                    <CommandItem
                                        onSelect={() => {
                                            setItemDataView({
                                                ...itemDataView,
                                                tags: [...itemDataView.tags, labelSearch],
                                            });
                                        }}
                                    >
                                        Create new label
                                    </CommandItem>
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    )}
                </Popover> */}
            </div>
            <div
                className={`mt-12 grid ${
                    itemFormDisabled ? 'grid-cols-2' : 'grid-cols-3'
                } items-center justify-center justify-items-center space-y-20`}
            >
                {itemDataView?.customItemFields?.map((fieldData) => {
                    if (fieldData?.action !== 'DELETE') {
                        return (
                            <>
                                <Input
                                    animationKey={itemFormDisabled}
                                    className={`box-border flex w-8/12 overflow-hidden text-lg ${
                                        itemFormDisabled
                                            ? ''
                                            : ' border-1 border-gray-300 bg-gray-700 bg-opacity-40'
                                    } `}
                                    type='text'
                                    value={fieldData.fieldName ?? ''}
                                    placeholder='Enter field name'
                                    onChange={(e) => {
                                        setItemDataView((prevState) => ({
                                            ...prevState,
                                            customItemFields: [
                                                ...prevState.customItemFields.filter(
                                                    (nfieldData) => nfieldData.id !== fieldData.id,
                                                ),
                                                {
                                                    ...prevState.customItemFields.filter(
                                                        (nfieldData) =>
                                                            nfieldData.id === fieldData.id,
                                                    )[0],
                                                    fieldName: e.target.value,
                                                    action: fieldData.action
                                                        ? fieldData.action
                                                        : 'UPDATE',
                                                },
                                            ],
                                        }));
                                    }}
                                    disabled={itemFormDisabled}
                                />
                                <Input
                                    animationKey={itemFormDisabled}
                                    className={`box-border flex w-8/12 overflow-hidden text-lg ${
                                        itemFormDisabled
                                            ? ''
                                            : ' border-1 border-gray-300 bg-gray-700 bg-opacity-40'
                                    } `}
                                    type='text'
                                    value={fieldData.fieldValue ?? ''}
                                    placeholder='Enter field value'
                                    onChange={(e) => {
                                        setItemDataView((prevState) => ({
                                            ...prevState,
                                            customItemFields: [
                                                ...prevState.customItemFields.filter(
                                                    (nfieldData) => nfieldData.id !== fieldData.id,
                                                ),
                                                {
                                                    ...prevState.customItemFields.filter(
                                                        (nfieldData) =>
                                                            nfieldData.id === fieldData.id,
                                                    )[0],
                                                    fieldValue: e.target.value,
                                                    action: fieldData.action
                                                        ? fieldData.action
                                                        : 'UPDATE',
                                                },
                                            ],
                                        }));
                                    }}
                                    disabled={itemFormDisabled}
                                />
                                {!itemFormDisabled && (
                                    <MinusCircleIcon
                                        width={30}
                                        height={30}
                                        onClick={() => {
                                            setItemDataView((prevState) => ({
                                                ...prevState,
                                                customItemFields: [
                                                    ...prevState.customItemFields.filter(
                                                        (nfieldData) =>
                                                            nfieldData.id !== fieldData.id,
                                                    ),
                                                    {
                                                        ...prevState.customItemFields.filter(
                                                            (nfieldData) =>
                                                                nfieldData.id === fieldData.id,
                                                        )[0],
                                                        action: 'DELETE',
                                                    },
                                                ],
                                            }));
                                        }}
                                    />
                                )}
                            </>
                        );
                    }
                })}
            </div>
            {!itemFormDisabled && (
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
                                    action: 'CREATE',
                                },
                            ],
                        }));
                    }}
                    variant='outline'
                >
                    Add custom field
                </Button2>
            )}
            {/* </ScrollArea> */}
        </motion.div>
    );
};

export default ItemPanel;
