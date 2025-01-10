import { useAuth } from '@/hooks/useAuth';
import { Briefcase, Moon, LogOut, User } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Button } from '../ui/button';

function AppLayout({children}:{children: React.ReactNode}) {
    const [activeTab, setActiveTab] = useState('overview');
    const {logoutMutation}=useAuth()


function handleLogout() {
    logoutMutation.mutate();
    }

    function handleNavigation(_path:string) {
    // console.log('Navigating to:', path);
    }

    const NavItem = ({ icon: Icon, label, tabName, onClick }: { icon: React.ComponentType<{ className?: string }>, label: string, tabName: string, onClick?: () => void }) => (
    <TooltipProvider>
        <Tooltip>
        <TooltipTrigger>
            <li
            className={`cursor-pointer hover:bg-gray-100 rounded-md p-3 flex items-center justify-center ${
                activeTab === tabName ? 'bg-gray-100' : ''
            }`}
            onClick={onClick || (() => setActiveTab(tabName))}
            >
            <Icon className='h-5 w-5 text-gray-600' />
            </li>
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
        </Tooltip>
    </TooltipProvider>
    );
  return (
    <>
  <div className='flex h-screen'>
      {/* Sidebar */}
      <div className='bg-white border-r w-16 flex flex-col'>
        <div className='p-4 border-b flex justify-center'>
          <Image src={'/app-logo.png'} width={30} height={30} alt='app-logo' />
        </div>

        <div className='flex-1 flex flex-col justify-between'>
          <nav className='p-4'>
            <ul className='space-y-2'>
              <NavItem
                icon={Briefcase}
                label='Jobs'
                tabName='jobs'
                onClick={() => handleNavigation('/jobs')}
              />
            </ul>
          </nav>

          <div className='p-4 border-t space-y-2'>
            <NavItem
              onClick={() => {
                //
              }}
              icon={Moon}
              label='Change Theme'
              tabName='theme'
            />
            <NavItem
              icon={LogOut}
              label='Logout'
              tabName='logout'
              onClick={handleLogout}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 flex flex-col bg-gray-50'>
        {/* Top Header with Profile */}
        <div className='bg-white border-b px-6 py-3'>
          <div className='flex justify-end'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant='ghost' size='icon' className='h-9 w-9'>
                    <User className='h-5 w-5' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Profile</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className='p-6 flex-1'>
        {children}
</div>

       
      </div>
      
    </div>
    </>
  )
}

export default AppLayout