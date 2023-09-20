import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateVaultItem } from 'lib/api/item';

const useUpdateItem = ({ selectedVault, id, itemDataView, onSuccess, onError }) => {
    const queryClient = useQueryClient();

    const updateItemData = useMutation({
        mutationFn: updateVaultItem,
    });
    const updateItem = async (id) => {
        await updateItemData.mutateAsync(
            {
                vaultId: selectedVault,
                id: id,
                title: itemDataView.title,
                website: itemDataView.website,
                password: itemDataView.password,
                username: itemDataView.username,
                iek: itemDataView.iek,
            },
            {
                onError: (error) => {
                    if (onError) onError(error);
                },
                onSuccess: () => {
                    if (onSuccess) onSuccess();
                    queryClient.invalidateQueries({
                        queries: [
                            // change selectedVault to itemDataView.vaultId
                            {
                                queryKey: ['vaults', selectedVault, 'items'],
                            },
                        ],
                    });
                },
            },
        );
    };

    return { updateItem };
};

export default useUpdateItem;
