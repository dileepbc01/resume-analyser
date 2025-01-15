import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '../ui/badge';


const Applications = () => {

    const candidates = [
        {
          name: "Mike Fong",
          title: "Controller",
          matchPercentage: 0,
          currentJobTitle: "Controller",
          location: "San Leandro, United States",
          appliedDate: "12/26/2024"
        },
        {
          name: "Chinmai C R C R",
          title: "Full Stack Engineer",
          matchPercentage: 66,
          currentJobTitle: "Full Stack Engineer",
          location: "Bengaluru, India",
          appliedDate: "12/26/2024"
        }
      ];
  return (
   <>
   
   <div className="px-6 py-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead>Resume Match</TableHead>
              <TableHead>Current Job Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Applied Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {candidates.map((candidate) => (
              <TableRow key={candidate.name}>

                <TableCell>
                  <div>
                    <div className="font-medium">{candidate.name}</div>
                    <div className="text-sm text-gray-500">{candidate.title}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={candidate.matchPercentage === 0 ? "destructive" : "secondary"}
                    className="font-normal"
                  >
                    {candidate.matchPercentage === 0 ?
                      'Not a match - 0%' :
                      `Good match - ${candidate.matchPercentage}%`}
                  </Badge>
                </TableCell>
                <TableCell>{candidate.currentJobTitle}</TableCell>
                <TableCell>{candidate.location}</TableCell>
                <TableCell>{candidate.appliedDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
   </>
  )
}

export default Applications