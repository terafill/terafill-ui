import { useState } from 'react';

import { HamburgerMenuIcon, StarFilledIcon } from '@radix-ui/react-icons';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { motion } from 'framer-motion';
import { useAtom, useSetAtom } from 'jotai';
import { toast } from 'react-hot-toast';
import { useParams, NavLink, useNavigate } from 'react-router-dom';

import { Button2 } from 'components/form/Button';
import { Input } from 'components/form/Input';

import useItemList from './hooks/useItemList';
import useUpdateItem from './hooks/useUpdateItem';
import { addVaultItemPopupOpenAtom, openSidePanelAtom } from './store';

const NavigationPanel = () => {
    const { vaultId, tagId } = useParams();

    const [search, setSearch] = useState('');
    const { itemList } = useItemList(search, vaultId, tagId);

    const [selectedItem, setSelectedItem] = useState(null);

    const setAddVaultItemPopupOpen = useSetAtom(addVaultItemPopupOpenAtom);

    const navigate = useNavigate();

    const [openSidePanel, setOpenSidePanel] = useAtom(openSidePanelAtom);

    // Update item
    const { updateItem } = useUpdateItem({
        selectedVault: vaultId,
        itemDataView: null,
        onSuccess: (itemData) => {
            if (itemData.isFavorite)
                toast.success('Item added to favourites');
            else{
                toast.success('Item removed favourites');
            }
        },
        onError: (error) => {
            navigate(-1);
            toast.error(error);
        },
    });

    return (
        <div
            className='relative z-[1] flex w-3/12 shrink-0 grow-0 flex-col items-center justify-start border-r'
            id='navigation-panel'
        >
            {/* <div className='flex w-full items-center justify-around gap-2 px-2' id='vault-bar'>
                <VaultSelectionMenu vaultListView={vaultListView} />
                <VaultSettingsMenu vaultListView={vaultListView} />
            </div> */}
            <div className='flex flex-row items-center justify-around gap-2 self-stretch px-2 py-2'>
                <div>
                    {!openSidePanel ? (
                        <HamburgerMenuIcon
                            onClick={() => setOpenSidePanel(true)}
                            className='h-7 w-7 rounded-sm p-1 hover:bg-gray-800'
                        />
                    ) : (
                        ''
                    )}
                </div>
                <Input
                    className='w-[100%] overflow-hidden'
                    type='text'
                    placeholder=' 🔎 Quick Search'
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                />
            </div>
            <RadioGroup.Root
                defaultValue={selectedItem}
                onValueChange={(e) => {
                    setSelectedItem(e);
                    navigate(`item/${e}`);
                }}
                className='flex self-stretch px-2'
                id='item-list'
            >
                <motion.div
                    // variants={{
                    //     hidden: { opacity: 0 },
                    //     show: {
                    //         opacity: 1,
                    //         transition: { staggerChildren: 0.5 },
                    //     },
                    // }}
                    // initial='hidden'
                    // animate='show'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className='z-[1] flex flex-1 flex-col items-center justify-start self-stretch overflow-y-auto bg-gray-950 py-2'
                    id='item-list'
                >
                    {itemList.map(
                        ([id, itemData]) =>
                            id != 'new' && (
                                <NavLink
                                    to={`item/${itemData.id}`}
                                    key={itemData.id}
                                    className={({ isActive }) => {
                                        const classes =
                                            'mb-1 mt-1 flex self-stretch rounded-lg px-[16px] outline-none [border:none]';
                                        return isActive
                                            ? `${classes} bg-gray-800`
                                            : `${classes} hover:bg-gray-800`;
                                    }}
                                >
                                    <RadioGroup.Item
                                        className='block w-full self-stretch outline-none'
                                        key={itemData.id}
                                        value={itemData.id}
                                        id={itemData.id}
                                    >
                                        <div
                                            className='flex cursor-pointer flex-row items-center justify-start self-stretch overflow-hidden rounded-lg outline-none [border:none]'
                                            htmlFor={itemData.id}
                                        >
                                            <img
                                                className='relative h-[40px] w-[40px] shrink-0 overflow-hidden rounded-sm object-cover'
                                                alt=''
                                                src={itemData.icon}
                                            />
                                            <div className='flex flex-grow flex-col px-[8px] py-[8px] text-left'>
                                                <label className='relative line-clamp-2 shrink-0 cursor-pointer overflow-hidden truncate text-lg font-semibold tracking-[0.03em] text-gray-300'>
                                                    {itemData.title}
                                                </label>
                                                <label className='relative line-clamp-2 shrink-0 cursor-pointer overflow-hidden truncate text-sm tracking-[0.03em] text-gray-400'>
                                                    {itemData.username}
                                                </label>
                                            </div>
                                            <StarFilledIcon
                                                onClick={async () => {
                                                    const updatedItemData = {
                                                        ...itemData,
                                                        isFavorite: !itemData.isFavorite
                                                    }
                                                    await updateItem(id, updatedItemData);
                                                }}
                                                className={`h-6 w-6 ${
                                                    itemData?.isFavorite
                                                        ? 'text-yellow-500'
                                                        : 'text-gray-700'
                                                }`}
                                            />
                                        </div>
                                    </RadioGroup.Item>
                                </NavLink>
                            ),
                    )}
                </motion.div>
            </RadioGroup.Root>
            <Button2
                variant={'secondary'}
                onClick={() => setAddVaultItemPopupOpen(true)}
                className='absolute bottom-[1.2rem] right-[1.2rem] z-[100] h-[3rem] w-[3rem]'
                size='icon'
            >
                <img className='h-[1.5rem] w-[1.5rem]' src='/icons/plus.svg' />
            </Button2>
        </div>
    );
};

export default NavigationPanel;
