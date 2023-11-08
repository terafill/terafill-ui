import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { getVaults } from 'lib/api/vault';

import { selectedVaultAtom } from '../store';

const useVaultList = () => {
    const queryClient = useQueryClient();
    const [selectedVault, setSelectedVault] = useAtom(selectedVaultAtom);

    const vaultListRaw = useQuery({
        queryKey: ['vaults'],
        queryFn: async () => {
            const data = await getVaults();
            data.map((vaultData) => {
                queryClient.setQueryData(['vaults', vaultData.id], vaultData);
            });
            if (!selectedVault) {
                setSelectedVault(data[0].id);
            }
            return data;
        },
        refetchOnWindowFocus: false,
        staleTime: 300000,
    });

    return vaultListRaw;
};

export default useVaultList;
