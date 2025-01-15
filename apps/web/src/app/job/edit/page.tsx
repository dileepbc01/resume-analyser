"use client"
import JobDetails from '@/components/EditJobDetails';
import {  useSearchParams } from 'next/navigation';
import React from 'react'

const Page = () => {
    const params = useSearchParams() 
    const job_id = params.get('job_id')
    if(!job_id){
        return <>404</> //TODO:
    }
  return (
    <>
    <JobDetails job_id={job_id}/>
    </>
  )
}

export default Page;