import React from 'react';

import TopBar from './TopBar';
import ActionBar from './ActionBar';
import Applications from './Applications';




function JobApplications({ job_id }: { job_id: string }) {


  return (
    <div className="bg-white">
     
    <TopBar job_id={job_id}/>
    <ActionBar/>
    <Applications/>

    </div>
  );
}

export default JobApplications;