import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getVaultItems, getTagItems } from 'lib/api/vault';
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
        customItemFields: itemData.customItemFields
            ? itemData.customItemFields.map((fieldData) => {
                  if (fieldData.isTag) return fieldData;
                  return {
                      ...fieldData,
                      fieldName: decryptData(fieldData.fieldName, iek),
                      fieldValue: decryptData(fieldData.fieldValue, iek),
                  };
              })
            : [],
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
        queryKey: [vaultId ? 'vaults' : 'tags', vaultId ? vaultId : tagId, 'items'],
        queryFn: async () => {
            let data = [];
            if (vaultId) data = await getVaultItems(vaultId);
            else data = await getTagItems(tagId);
            const keyWrappingKeyPair = getKeyWrappingKeyPair();
            const itemDataListDecrypted = data.map((item) => {
                // queryClient.setQueryData(['vaults', vaultId, 'items', vaultItem.id], vaultItem);
                return decryptedItemData(item, keyWrappingKeyPair);
            });
            console.log('useQuery.itemDataListDecrypted', itemDataListDecrypted);
            return itemDataListDecrypted;
        },
        refetchOnWindowFocus: false,
        staleTime: 300000,
        enabled: !!(vaultId||tagId),
    });

    const curatedItemList = getCuratedItemList(itemDataListView.data, searchFilter);

    return { itemList: curatedItemList };
};

export default useItemList;
