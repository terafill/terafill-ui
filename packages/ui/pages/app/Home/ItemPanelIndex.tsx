import { SquaresPlusIcon } from '@heroicons/react/20/solid';
import { useOutletContext } from 'react-router-dom';


import { Button2 } from 'components/form/Button';

const ItemPanelIndex = () => {
    const [selectedVault, vaultListView, setOpenAddVaultItem] = useOutletContext();

    return (
        <div className='dotted-bg h-1/1 z-[0] flex flex-1 flex-col items-center justify-center self-stretch overflow-hidden px-[16px] py-[32px]'>
            {/* <h1>Good Morning!</h1> */}
            <Button2
                variant={'secondary'}
                onClick={() => setOpenAddVaultItem(true)}
                size='lg'
                className='h-12 px-12 rounded-lg gap-4'
            >
                <SquaresPlusIcon className='h-6 w-6'/>
                Add new item
            </Button2>
        </div>
    );
};

export default ItemPanelIndex;
