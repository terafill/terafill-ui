import { FC } from 'react';

import { cn } from '../../utils/basic';

interface Props {
    variant: string;
    className?: string;
}

const Logo: FC<Props> = ({ variant, className }) => {
    if (variant == 'mini') {
        return <img src='/logos/internal/logo_mini.png' className={cn('h-24 w-24', className)} />;
    } else if (variant == 'full') {
        return <img className='h-[88px]' alt='' src='/logos/internal/logo_full.png' />;
    }
};

export default Logo;
