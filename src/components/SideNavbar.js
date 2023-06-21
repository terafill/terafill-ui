import { Fragment, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

import { Dialog, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  ShieldCheckIcon,
  UserIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '/app/home', icon: HomeIcon, comingSoon: false },
  { name: 'Profile', href: '/app/profile', icon: UserIcon, comingSoon: false },
  { name: 'Security', href: '/app/security', icon: ShieldCheckIcon, comingSoon: true },
  { name: 'Sharing', href: '/app/sharing', icon: UsersIcon, comingSoon: true },
  { name: 'Dashboard', href: '/app/dashboard', icon: ChartPieIcon, comingSoon: true },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SideNavbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate();

  return (
    <>
      <div className="h-full w-24 flex flex-0 justify-center bg-gray-900">
        <ul role="list" className="flex flex-col flex-1 p-4 justify-around items-center">
          {navigation.map((item) => (
            <NavLink to={item.href} disabled={true} className={item.comingSoon?'pointer-events-none':''}>
            {({ isActive, isPending })=>(
                <li
                key={item.name}
                className="cursor-pointer flex flex-1 p-2 h-24 w-24"
              >
                <div
                  className={classNames(
                    isActive
                      ? 'flex flex-col flex-1 justify-around items-center bg-gray-800 text-white'
                      : 'flex flex-col flex-1 justify-around items-center text-gray-400 hover:text-white hover:bg-gray-800',
                    'group rounded-md text-sm font-semibold'
                  )}
                >
                  <item.icon className="flex flex-0 h-8 w-8" />
                  <p className="flex">{item.name}</p>
                  {item.comingSoon&&<p className="text-xs bg-black p-1 rounded-full">coming soon</p>}
                </div>
              </li>
            )}
            </NavLink>
          ))}
        </ul>
      </div>
    </>
  )
}
