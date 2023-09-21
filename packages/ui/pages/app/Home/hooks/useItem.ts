import { useState, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { getVaultItem } from 'lib/api/item';
import { getKeyWrappingKeyPair, decryptData } from 'lib/utils/security';


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

const useItem = (selectedVault, id) => {
    const itemDataRaw = useQuery({
        queryKey: ['vaults', selectedVault, 'items', id],
        queryFn: () =>
            getVaultItem({
                vaultId: selectedVault,
                id: id,
            }),
        suspense: true,
    });

    const [itemDataView, setItemDataView] = useState<VaultItem | null>(null);

    useEffect(() => {
        if (itemDataRaw.isSuccess && itemDataRaw.data) {
            const keyWrappingKeyPair = getKeyWrappingKeyPair();
            const itemData = decryptedItemData(itemDataRaw.data, keyWrappingKeyPair);
            setItemDataView(itemData);
        }
    }, [itemDataRaw.dataUpdatedAt, location]);

    return {
        itemDataView,
        setItemDataView,
    };

    // let initDataEncrypted = {
    //   id: itemDataRaw?.data?.id ?? '',
    //   title: itemDataRaw?.data?.title ?? '',
    //   website: itemDataRaw?.data?.website ?? '',
    //   username: itemDataRaw?.data?.username ?? '',
    //   password: itemDataRaw?.data?.password ?? '',
    //   encryptedEncryptionKey: itemDataRaw?.data?.encryptedEncryptionKey ?? '',
    // }
};

export default useItem;
