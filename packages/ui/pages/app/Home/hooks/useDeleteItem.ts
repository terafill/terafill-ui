import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteVaultItem } from 'lib/api/item';

const useDeleteItem = ({ selectedVault, id, onSuccess, onError }) => {
    const queryClient = useQueryClient();

    const deleteItemData = useMutation({
        mutationFn: deleteVaultItem,
    });
    const deleteItemMutation = async () => {
        await deleteItemData.mutateAsync(
            {
                vaultId: selectedVault,
                id: id,
            },
            {
                onError: (error) => {
                    if (onError) onError(error);
                },
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queries: [
                            // change selectedVault to itemDataView.vaultId
                            { queryKey: ['vaults', selectedVault, 'items'] },
                            { queryKey: ['vaults', selectedVault] },
                        ],
                    });
                    if (onSuccess) onSuccess();
                },
            },
        );
    };

    return { deleteItemMutation };
};

export default useDeleteItem;
