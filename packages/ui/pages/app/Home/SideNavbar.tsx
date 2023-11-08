import { useEffect, useState } from 'react';

import { QuestionMarkCircleIcon, TagIcon } from '@heroicons/react/24/outline';
import * as Collapsible from '@radix-ui/react-collapsible';
import {
    CubeIcon,
    TriangleRightIcon,
    TriangleDownIcon,
    DoubleArrowLeftIcon,
    // DoubleArrowRightIcon,
    AvatarIcon,
    DotsHorizontalIcon,
} from '@radix-ui/react-icons';
import * as Tabs from '@radix-ui/react-tabs';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { useNavigate, useParams } from 'react-router-dom';

import { openSidePanelAtom, selectedVaultAtom } from 'ui/pages/app/Home/store';
import VaultSettingsMenu from 'ui/pages/app/Home/VaultSettingsMenu';

import useTagList from './hooks/useTagList';
import useVaultList from './hooks/useVaultList';

export default function SideNavbar() {
    const [selectedVault, setSelectedVault] = useAtom(selectedVaultAtom);

    const [openVaultsMenu, setOpenVaultsMenu] = useState(true);
    const [openTagsMenu, setOpenTagsMenu] = useState(true);
    const [openSidePanel, setOpenSidePanel] = useAtom(openSidePanelAtom);

    const vaultList = useVaultList();
    const tagList = useTagList();

    const navigate = useNavigate();
    const { vaultId, tagId } = useParams();

    const selectedGroup = vaultId ? vaultId : tagId;

    const setupItemsView = ({ groupId, groupType }) => {
        console.log(groupId, groupType);
        if (groupType === 'vault') {
            // setSelectedVault(vaultId);
            navigate(`/app/home/vault/${groupId}`);
        } else if (groupType === 'tag') {
            navigate(`/app/home/tag/${groupId}`);
        }
    };

    // const [selectedGroup, setSelectedGroup] = useState(vaultId ? vaultId : tagId);

    // useEffect(() => {
    //     if (vaultId) {
    //         navigate(`/app/home/vault/${vaultId}`);
    //     } else {
    //         navigate(`/app/home/tag/${tagId}`);
    //     }
    // }, []);

    return (
        <Collapsible.Root
            className='group flex h-[100%]'
            open={openSidePanel}
            onOpenChange={setOpenSidePanel}
        >
            <Collapsible.Content>
                <motion.div
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0.2 }}
                    transition={{ duration: 0.2 }}
                    className='flex h-[100%] w-[100%] flex-col justify-start gap-10 border-r-2 p-4'
                    id='side-panel'
                >
                    <h1 className='flex items-center justify-between gap-2 text-gray-200'>
                        <AvatarIcon className='h-6 w-6' />
                        Harshit Saini
                        <Collapsible.Trigger>
                            <DoubleArrowLeftIcon className='ml-2 h-7 w-7 rounded-sm  p-1  opacity-0 transition-opacity hover:bg-gray-800 group-hover:opacity-100' />
                        </Collapsible.Trigger>
                    </h1>
                    <Tabs.Root
                        value={vaultId ? vaultId : null}
                        orientation='vertical'
                        className='flex flex-col gap-8'
                        onValueChange={(groupId) =>
                            setupItemsView({ groupId: groupId, groupType: 'vault' })
                        }
                    >
                        <Tabs.List aria-label='navbar tabs' className='flex flex-col gap-8'>
                            <Collapsible.Root
                                open={openVaultsMenu}
                                onOpenChange={setOpenVaultsMenu}
                            >
                                <div className='flex flex-col gap-2' id='vaults-section'>
                                    <Collapsible.Trigger>
                                        <h1 className='flex items-center gap-1 rounded-sm px-2 py-1 text-gray-400 hover:bg-slate-800 hover:text-white'>
                                            <CubeIcon className='h-4 w-4' />
                                            Vaults
                                            {openVaultsMenu ? (
                                                <TriangleDownIcon />
                                            ) : (
                                                <TriangleRightIcon />
                                            )}
                                        </h1>
                                    </Collapsible.Trigger>
                                    <Collapsible.Content>
                                        {vaultList?.data ? (
                                            <div className='ml-2 flex flex-col items-start gap-1 border-l-2 pl-2'>
                                                {vaultList.data.map((vault) => (
                                                    <Tabs.Trigger
                                                        key={vault.id}
                                                        value={vault.id}
                                                        className={`group/vault flex w-[100%] items-center justify-between rounded-sm px-2 py-1 text-left outline-none hover:bg-slate-800 hover:text-white
                                        ${selectedGroup === vault.id ? 'bg-slate-800 ' : ''}
                                        `}
                                                    >
                                                        {vault.name}
                                                        {/* <DotsHorizontalIcon className='h-5 w-5 rounded-sm p-1 opacity-0 group-hover/vault:opacity-100' /> */}
                                                        <VaultSettingsMenu vaultId={vault.id} />
                                                    </Tabs.Trigger>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className='ml-2 flex flex-col items-start gap-1 border-l-2 pl-2'>
                                                No vaults found
                                            </div>
                                        )}
                                    </Collapsible.Content>
                                </div>
                            </Collapsible.Root>
                        </Tabs.List>
                    </Tabs.Root>
                    <Tabs.Root
                        // defaultValue={null}
                        value={tagId ? tagId : null}
                        orientation='vertical'
                        className='flex flex-col gap-8'
                        onValueChange={(tagId) =>
                            setupItemsView({ groupId: tagId, groupType: 'tag' })
                        }
                    >
                        <Tabs.List aria-label='navbar tabs' className='flex flex-col gap-8'>
                            <Collapsible.Root open={openTagsMenu} onOpenChange={setOpenTagsMenu}>
                                <div className='flex flex-col gap-2' id='tags-section'>
                                    <Collapsible.Trigger>
                                        <h1 className='flex items-center gap-1 rounded-sm px-2 py-1 text-gray-400 hover:bg-slate-800 hover:text-white'>
                                            <TagIcon className='h-4 w-4' />
                                            Tags
                                            {openTagsMenu ? (
                                                <TriangleDownIcon />
                                            ) : (
                                                <TriangleRightIcon />
                                            )}
                                        </h1>
                                    </Collapsible.Trigger>
                                    <Collapsible.Content>
                                        <div className='ml-2 flex flex-col items-start gap-1 border-l-2 pl-2'>
                                            {tagList?.data?.map((tag) => (
                                                <Tabs.Trigger
                                                    key={tag}
                                                    value={tag}
                                                    className={`group/tag flex w-[100%] items-center justify-between rounded-sm px-2 py-1 text-left outline-none hover:bg-slate-800 hover:text-white
                                    ${selectedGroup === tag ? 'bg-slate-800 ' : ''}
                                    `}
                                                >
                                                    {tag}
                                                    <DotsHorizontalIcon className='h-5 w-5 rounded-sm p-1 opacity-0 group-hover/tag:opacity-100' />
                                                </Tabs.Trigger>
                                            ))}
                                        </div>
                                    </Collapsible.Content>
                                </div>
                            </Collapsible.Root>
                        </Tabs.List>
                    </Tabs.Root>
                    {/* <button onClick={()=>{$crisp.push(["do", "chat:show"]);console.log("Toggled!")}}>show support</button> */}
                    {/* <button onClick={()=>{$crisp.push(["do", "chat:hide"]);console.log("Toggled!")}}>hide support</button> */}
                    <button
                        onClick={() => {
                            $crisp.push(['do', 'chat:toggle']);
                            console.log('Toggled!');
                        }}
                        className='flex items-center gap-1 rounded-sm px-2 py-1 text-gray-400 hover:bg-slate-800 hover:text-white'
                    >
                        <QuestionMarkCircleIcon className='h-4 w-4' />
                        Support
                    </button>
                </motion.div>
            </Collapsible.Content>
        </Collapsible.Root>
    );
}
