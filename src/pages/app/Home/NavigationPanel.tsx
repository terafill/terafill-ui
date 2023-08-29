import React, { useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';
import { Suspense } from 'react';
import { motion } from 'framer-motion';

import VaultSelectionMenu from './VaultSelectionMenu';
import VaultSettingsMenu from './VaultSettingsMenu';
import { Button2 } from '../../../components/form/Button';
import { Input } from '../../../components/form/Input';
import { getKeyWrappingKeyPair, decryptData } from '../../../utils/security';

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

const NavigationPanel = ({
    vaultListView,
    selectedVault,
    setSelectedVault,
    setOpenEditVault,
    setOpenAddVault,
    setOpenDeleteVault,
    setOpenAddVaultItem,
}) => {
    const [search, setSearch] = useState('');
    const [itemDataListView, setItemDataListView] = useState(null);

    const queryClient = useQueryClient();
    const queryState = queryClient.getQueryState(['vaults', selectedVault, 'items']);

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

    return (
        <div
            className='relative z-[1] flex w-3/12 shrink-0 grow-0 flex-col items-center justify-start border-r'
            id='navigation-panel'
        >
            <div className='flex w-full items-center justify-around gap-2 px-2' id='vault-bar'>
                {/*<p className="text-md">Vault</p>*/}
                <VaultSelectionMenu
                    vaultListView={vaultListView}
                    selectedVault={selectedVault}
                    setSelectedVault={setSelectedVault}
                />
                <VaultSettingsMenu
                    vaultListView={vaultListView}
                    selectedVault={selectedVault}
                    setOpenEditVault={setOpenEditVault}
                    setOpenAddVault={setOpenAddVault}
                    setOpenDeleteVault={setOpenDeleteVault}
                />
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
                {Object.entries(itemDataListView ?? [])
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
                                // <motion.span
                                //     key={itemData.id}
                                //     variants={{
                                //         hidden: { opacity: 0 },
                                //         show: { opacity: 1 },
                                //     }}
                                // >
                                <NavLink
                                    to={`${itemData.id}`}
                                    key={itemData.id}
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'mb-1 mt-1 rounded-lg bg-gray-800 px-[16px]'
                                            : 'mb-1 mt-1 rounded-lg px-[16px] hover:bg-gray-800'
                                    }
                                >
                                    <button className='flex cursor-pointer flex-row items-center justify-start overflow-hidden rounded-lg [border:none]'>
                                        <img
                                            className='relative h-[40px] w-[40px] shrink-0 overflow-hidden object-cover'
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
                                    </button>
                                </NavLink>
                                // </motion.span>
                            ),
                    )}
            </motion.div>
            <Button2
                variant={'secondary'}
                onClick={() => setOpenAddVaultItem(true)}
                className='absolute bottom-[1.2rem] right-[1.2rem] z-[100] h-[3rem] w-[3rem]'
                size='icon'
            >
                <img className='h-[1.5rem] w-[1.5rem]' src='/icons/plus.svg' />
            </Button2>
        </div>
    );
};

export default NavigationPanel;
