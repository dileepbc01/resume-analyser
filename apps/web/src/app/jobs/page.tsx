'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { User, Briefcase, Moon, LogOut } from 'lucide-react';
import Image from 'next/image';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  function handleLogout() {
    console.log('Logout clicked');
  }

  function handleNavigation(path) {
    console.log('Navigating to:', path);
  }

  const NavItem = ({ icon: Icon, label, tabName, onClick }) => (
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

        {/* Content Area */}
        <div className='p-6 flex-1'>
          <Card>
            <CardHeader className='border-b'>
              <div className='flex justify-between items-center'>
                <div className='space-y-1'>
                  <CardTitle>Jobs List</CardTitle>
                  <p className='text-sm text-gray-500'>
                    Manage your job postings and applications
                  </p>
                </div>
                <Button>Add New Job</Button>
              </div>
            </CardHeader>
            <CardContent className='p-0'>
              <div className='w-full'>
                <div className='border-b'>
                  <div className='grid grid-cols-5 bg-gray-50'>
                    <div className='p-4 text-sm font-medium text-gray-600'>
                      Job Title
                    </div>
                    <div className='p-4 text-sm font-medium text-gray-600'>
                      Location
                    </div>
                    <div className='p-4 text-sm font-medium text-gray-600'>
                      Candidates
                    </div>
                    <div className='p-4 text-sm font-medium text-gray-600'>
                      Posted
                    </div>
                    <div className='p-4 text-sm font-medium text-gray-600'>
                      Status
                    </div>
                  </div>
                </div>
                <div className='divide-y'>
                  <div className='grid grid-cols-5 hover:bg-gray-50'>
                    <div className='p-4'>
                      <div className='flex items-center gap-3'>
                        <input
                          type='checkbox'
                          className='rounded border-gray-300'
                        />
                        <span className='text-sm'>Full Stack Developer</span>
                      </div>
                    </div>
                    <div className='p-4 text-sm'>Chicago, USA</div>
                    <div className='p-4'>
                      <div className='flex gap-2 text-sm'>
                        <span className='bg-blue-50 text-blue-700 px-2 py-1 rounded'>
                          2 New
                        </span>
                        <span className='bg-purple-50 text-purple-700 px-2 py-1 rounded'>
                          1 Interview
                        </span>
                        <span className='bg-green-50 text-green-700 px-2 py-1 rounded'>
                          0 Qualified
                        </span>
                      </div>
                    </div>
                    <div className='p-4 text-sm text-gray-600'>13 days ago</div>
                    <div className='p-4'>
                      <span className='bg-green-50 text-green-700 px-2 py-1 rounded text-sm'>
                        Published
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
