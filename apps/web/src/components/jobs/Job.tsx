import { JobResponse } from '@/types/routes/job'
import React from 'react'



const Job: React.FC<{job:JobResponse}> = ({ job }) => {
  return (
    <div className='divide-y'>
      <div className='grid grid-cols-5 hover:bg-gray-50'>
        <div className='p-4'>
          <div className='flex items-center gap-3'>
            <input
              type='checkbox'
              className='rounded border-gray-300'
            />
            <span className='text-sm'>{job.role}</span>
          </div>
        </div>
        <div className='p-4 text-sm'>{job.location}</div>
        <div className='p-4 text-sm'>{job.company}</div>
        <div className='p-4'>
          <div className='flex gap-2 text-sm'>
            <span className='bg-blue-50 text-blue-700 px-2 py-1 rounded'>
              {0} New
            </span>
            <span className='bg-purple-50 text-purple-700 px-2 py-1 rounded'>
              {0} Interview
            </span>
            <span className='bg-green-50 text-green-700 px-2 py-1 rounded'>
              {0} Qualified
            </span>
          </div>
        </div>
        <div className='p-4 text-sm text-gray-600'>{job.createdAt} days ago</div>
      </div>
    </div>
  )
}

export default Job