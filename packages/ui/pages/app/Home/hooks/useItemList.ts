import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getVaultItems } from 'lib/api/vault';
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
        isFavorite: itemData.isFavorite,
        tags: itemData.tags ? itemData.tags : [],
        icon: `https://cool-rose-moth.faviconkit.com/${decryptData(itemData.website, iek)}/256`,
    };
};

const getCuratedItemList = (itemList, searchFilter) => {
    if (!itemList) return [];

    const vaultItemList = Object.entries(itemList ?? []);
    const filteredVaultList = vaultItemList.filter(([id, itemData]) => {
        return searchFilter.toLowerCase() === ''
            ? true
            : itemData.username.toLowerCase().includes(searchFilter) ||
                  itemData.website.toLowerCase().includes(searchFilter) ||
                  itemData.title.toLowerCase().includes(searchFilter);
    });

    const sortedVaultList = [...filteredVaultList].sort(
        (a, b) => b[1].isFavorite - a[1].isFavorite,
    );

    return sortedVaultList;
};

const useItemList = (searchFilter, vaultId?, tagId?) => {
    // const queryClient = useQueryClient();

    const itemDataListView = useQuery({
        queryKey: ['vaults', vaultId, 'items'],
        queryFn: async () => {
            const data = await getVaultItems(vaultId);
            console.log('useQuery.vaultId+data', vaultId, data);
            const keyWrappingKeyPair = getKeyWrappingKeyPair();
            const itemDataListDecrypted = data.map((vaultItem) => {
                // queryClient.setQueryData(['vaults', vaultId, 'items', vaultItem.id], vaultItem);
                return decryptedItemData(vaultItem, keyWrappingKeyPair);
            });
            console.log('useQuery.itemDataListDecrypted', itemDataListDecrypted);
            return itemDataListDecrypted;
        },
        refetchOnWindowFocus: false,
        staleTime: 300000,
        enabled: !!vaultId,
    });

    const curatedItemList = getCuratedItemList(itemDataListView.data, searchFilter);

    return { itemList: curatedItemList };
};

export default useItemList;
