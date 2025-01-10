import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Jobs: React.FC = () => {
    return (
        <>
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
        </>
    );
};

export default Jobs;