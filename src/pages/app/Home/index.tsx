import React, { useEffect, useState } from 'react';

import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

import AddVaultItemPopup from './AddVaultItemPopup';
import AddVaultPopup from './AddVaultPopup';
import DeleteVaultPopup from './DeleteVaultPopup';
import EditVaultPopup from './EditVaultPopup';
import NavigationPanel from './NavigationPanel';
import Navbar from '../../../components/layout/Navbar';
import SideNavbar from '../../../components/layout/SideNavbar';
import { getVaults, getVaultItems } from '../../../data/vault';
import { getKeyWrappingKeyPair, decryptData } from '../../../utils/security';
import { useTokenExpiration } from '../../../utils/tokenTools';
import './index.css';

interface Vault {
    id?: string;
    vaultId?: string;
    name?: string;
    description?: string;
}

interface VaultList {
    [key: string]: Vault;
}

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

const AppHome = () => {
    useTokenExpiration();

    const [defaultVault, setDefaultVault] = useState<string | null>(null);
    const [selectedVault, setSelectedVault] = useState<string | null>(null);
    const [vaultListView, setVaultListView] = useState<VaultList | null>(null);
    const queryClient = useQueryClient();

    const getVaultListView = (data) => {
        if (data) {
            const newState = {};
            let defaultId = null;
            for (let i = 0; i < data.length; i += 1) {
                newState[data[i].id] = data[i];
                if (data[i].isDefault) {
                    defaultId = data[i].id;
                }
            }
            return { vaultList: newState, defaultId: defaultId };
        } else {
            return { vaultList: null, defaultId: null };
        }
    };

    const setVaultDefaults = (vaultListDataRaw, selectedVault = null) => {
        const { vaultList, defaultId } = getVaultListView(vaultListDataRaw);
        setVaultListView(vaultList);
        setDefaultVault(defaultId);
        if (selectedVault === null) {
            setSelectedVault(defaultId);
        }
    };

    // Fetch list of vaults
    const vaultListRaw = useQuery({
        queryKey: ['vaults'],
        queryFn: async () => {
            const data = await getVaults();
            data.map((vaultData) => {
                queryClient.setQueryData(['vaults', vaultData.id], vaultData);
            });
            return data;
        },
        refetchOnWindowFocus: false,
        staleTime: 300000,
    });

    useEffect(() => {
        if (vaultListRaw.data) {
            setVaultDefaults(vaultListRaw.data, selectedVault);
        }
    }, [vaultListRaw.dataUpdatedAt]);

    // Fetch raw vault item list
    useQueries({
        queries: (vaultListRaw?.data || []).map(({ id }) => {
            return {
                queryKey: ['vaults', id, 'items'],
                queryFn: async () => {
                    const data = await getVaultItems(id);
                    const keyWrappingKeyPair = getKeyWrappingKeyPair();
                    data.map((vaultItem) => {
                        queryClient.setQueryData(['vaults', id, 'items', vaultItem.id], vaultItem);
                        return decryptedItemData(vaultItem, keyWrappingKeyPair);
                    });
                    return data;
                },
                refetchOnWindowFocus: false,
                staleTime: 300000,
                enabled: !!vaultListRaw.data && !!id,
            };
        }),
    });

    const [openEditVaultPopup, setOpenEditVault] = useState(false);
    const [openAddVaultPopup, setOpenAddVault] = useState(false);
    const [openDeleteVaultPopup, setOpenDeleteVault] = useState(false);
    const [openAddVaultItemPopup, setOpenAddVaultItem] = useState(false);

    return (
        <div className='flex h-screen w-screen flex-col items-stretch justify-start'>
            <Navbar navbarType='app' />
            <div className='flex h-full flex-row items-stretch border-t' id='app-screen'>
                <SideNavbar />
                <div
                    className='flex flex-1 flex-row items-stretch overflow-hidden'
                    id='apphome-inner'
                >
                    <Toaster
                        position='bottom-right'
                        reverseOrder={false}
                        toastOptions={{
                            duration: 5000,
                            style: {
                                background: '#000000',
                                color: '#fff',
                                border: '1px solid #1F2937',
                            },
                        }}
                    />

                    <AddVaultItemPopup
                        open={openAddVaultItemPopup}
                        setOpen={setOpenAddVaultItem}
                        selectedVault={selectedVault}
                    />
                    <EditVaultPopup
                        open={openEditVaultPopup}
                        setOpen={setOpenEditVault}
                        selectedVault={selectedVault}
                    />
                    <AddVaultPopup
                        open={openAddVaultPopup}
                        setOpen={setOpenAddVault}
                        setSelectedVault={setSelectedVault}
                    />
                    <DeleteVaultPopup
                        open={openDeleteVaultPopup}
                        setOpen={setOpenDeleteVault}
                        selectedVault={selectedVault}
                        defaultVault={defaultVault}
                        setSelectedVault={setSelectedVault}
                    />
                    <NavigationPanel
                        vaultListView={vaultListView}
                        selectedVault={selectedVault}
                        setSelectedVault={setSelectedVault}
                        setOpenEditVault={setOpenEditVault}
                        setOpenAddVault={setOpenAddVault}
                        setOpenDeleteVault={setOpenDeleteVault}
                        setOpenAddVaultItem={setOpenAddVaultItem}
                    />
                    <Outlet context={[selectedVault, vaultListView]} />
                </div>
            </div>
        </div>
    );
};

export default AppHome;
