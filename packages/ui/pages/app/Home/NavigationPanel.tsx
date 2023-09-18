import { useEffect, useState, Fragment } from 'react';

import * as RadioGroup from '@radix-ui/react-radio-group';
import { useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useAtomValue, useSetAtom } from 'jotai';
import { getKeyWrappingKeyPair, decryptData } from 'lib/utils/security';
import { NavLink, useNavigate } from 'react-router-dom';

import { Button2 } from 'components/form/Button';
import { Input } from 'components/form/Input';

import { addVaultItemPopupOpenAtom, selectedVaultAtom } from './store';
import VaultSelectionMenu from './VaultSelectionMenu';
import VaultSettingsMenu from './VaultSettingsMenu';

// interface VaultItem {
//     vaultId: string;
//     id?: string;
//     iek?: string;
//     title?: string;
//     website?: string;
//     password?: string;
//     username?: string;
// }

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

const NavigationPanel = ({ vaultListView }) => {
    const [search, setSearch] = useState('');
    const [itemDataListView, setItemDataListView] = useState(null);

    const selectedVault = useAtomValue(selectedVaultAtom);

    const queryClient = useQueryClient();
    const queryState = queryClient.getQueryState(['vaults', selectedVault, 'items']);

    const setAddVaultItemPopupOpen = useSetAtom(addVaultItemPopupOpenAtom);

    useEffect(() => {
        const itemListRaw = queryClient.getQueryData(['vaults', selectedVault, 'items']);
        if (itemListRaw) {
            const keyWrappingKeyPair = getKeyWrappingKeyPair();
            const itemDataListDecrypted = itemListRaw.map((itemData) =>
                decryptedItemData(itemData, keyWrappingKeyPair),
            );
            setItemDataListView(itemDataListDecrypted);
        }
    }, [selectedVault, queryState]);

    const vaultItemList = Object.entries(itemDataListView ?? []);
    const filteredVaultList = vaultItemList.filter(([id, itemData]) => {
        return search.toLowerCase() === ''
            ? true
            : itemData.username.toLowerCase().includes(search) ||
                  itemData.website.toLowerCase().includes(search) ||
                  itemData.title.toLowerCase().includes(search);
    });

    const [selectedVaultItem, setSelectedVaultItem] = useState(
        vaultItemList.length > 0 ? vaultItemList[0] : null,
    );

    const items = [{ name: 'Item 1' }, { name: 'Item 2' }, { name: 'Item 3' }, { name: 'Item 4' }];

    const navigate = useNavigate();
    return (
        <div
            className='relative z-[1] flex w-3/12 shrink-0 grow-0 flex-col items-center justify-start border-r'
            id='navigation-panel'
        >
            <div className='flex w-full items-center justify-around gap-2 px-2' id='vault-bar'>
                <VaultSelectionMenu vaultListView={vaultListView} />
                <VaultSettingsMenu vaultListView={vaultListView} />
            </div>
            <div className='mx-2 mb-2 flex self-stretch'>
                <Input
                    className='w-full overflow-hidden'
                    type='text'
                    placeholder=' 🔎 Quick Search'
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                />
            </div>
            <RadioGroup.Root
                defaultValue={selectedVaultItem}
                onValueChange={(e) => {
                    setSelectedVaultItem(e);
                    navigate(`/app/home/${e}`);
                }}
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
                    className='z-[1] flex flex-1 flex-col items-center justify-start self-stretch overflow-y-auto bg-gray-950 px-2 py-2'
                    id='item-list'
                >
                    {filteredVaultList.map(
                        ([id, itemData]) =>
                            id != 'new' && (
                                <NavLink
                                    to={`${itemData.id}`}
                                    key={itemData.id}
                                    className={({ isActive }) => {
                                        const classes =
                                            'mb-1 mt-1 rounded-lg px-[16px] outline-none [border:none]';
                                        return isActive
                                            ? `${classes} bg-gray-800`
                                            : `${classes} hover:bg-gray-800`;
                                    }}
                                >
                                    <RadioGroup.Item
                                        className=' outline-none'
                                        key={itemData.id}
                                        value={itemData.id}
                                        id={itemData.id}
                                    >
                                        <div
                                            className='flex cursor-pointer flex-row items-center justify-start overflow-hidden rounded-lg outline-none [border:none]'
                                            htmlFor={itemData.id}
                                        >
                                            <img
                                                className='relative h-[40px] w-[40px] shrink-0 overflow-hidden object-cover rounded-sm'
                                                alt=''
                                                src={itemData.icon}
                                            />
                                            <div className='flex flex-col px-[8px] py-[8px] text-left'>
                                                <label className='relative line-clamp-2 h-[23px] w-[230px] shrink-0 cursor-pointer overflow-hidden truncate text-xl font-bold tracking-[0.03em] text-gray-100'>
                                                    {itemData.title}
                                                </label>
                                                <label className='relative line-clamp-2 h-[23px] w-[230px] shrink-0 cursor-pointer overflow-hidden truncate text-base tracking-[0.03em] text-gray-300'>
                                                    {itemData.username}
                                                </label>
                                            </div>
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
