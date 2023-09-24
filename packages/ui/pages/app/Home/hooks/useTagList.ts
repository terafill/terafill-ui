import { useQuery } from '@tanstack/react-query';
import { getTagList } from 'lib/api/item';

const useTagList = () => {
    const vaultListRaw = useQuery({
        queryKey: ['tags'],
        queryFn: async () => {
            return await getTagList();
        },
        refetchOnWindowFocus: false,
        staleTime: 300000,
    });

    return vaultListRaw;
};

export default useTagList;
