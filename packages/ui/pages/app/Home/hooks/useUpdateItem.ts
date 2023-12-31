import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateVaultItem } from 'lib/api/item';

const useUpdateItem = ({ selectedVault, itemDataView, onSuccess, onError }) => {
    const queryClient = useQueryClient();

    const updateItemData = useMutation({
        mutationFn: updateVaultItem,
    });
    const updateItem = async (id, itemData = {}) => {
        let vars = {
            ...itemData,
            itemData: {
                ...itemData,
            },
        };
        if (itemDataView) {
            vars = {
                vaultId: selectedVault,
                id: id,
                itemData: {
                    ...itemData,
                    title: itemDataView.title,
                    website: itemDataView.website,
                    password: itemDataView.password,
                    username: itemDataView.username,
                    iek: itemDataView.iek,
                    isFavorite: itemDataView.isFavorite,
                    tags: itemDataView.tags,
                    customItemFields: itemDataView.customItemFields,
                },
            };
        }
        await updateItemData.mutateAsync(vars, {
            onError: (error) => {
                if (onError) onError(error);
            },
            onSuccess: () => {
                if (onSuccess) onSuccess(itemData);
                queryClient.invalidateQueries({
                    queries: [
                        // change selectedVault to itemDataView.vaultId
                        {
                            queryKey: ['vaults', selectedVault, 'items'],
                        },
                    ],
                });
            },
        });
    };

    return { updateItem };
};

export default useUpdateItem;
