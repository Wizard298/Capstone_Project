import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="bg-[#181818] p-6 rounded-lg shadow-xl hover:shadow-[0_0_50px_10px_rgba(194,104,255,0.35)] 
        border border-[#2a1f35] transition-all duration-500"
        style={{ marginBottom: "470px", paddingBottom:"50px" } }
        >
            <h2 className="text-3xl font-bold text-center text-[#00ffc8] mb-6">Recent Applicants</h2>
            <Table className="text-white">
                <TableCaption className="text-[#aaa] text-sm mt-4">A list of your recent applicants</TableCaption>
                <TableHeader>
                    <TableRow className="bg-[#1c1c1c] hover:bg-[#333] transition-colors duration-300">
                        <TableHead className="text-[#00ffc8]">Full Name</TableHead>
                        <TableHead className="text-[#00ffc8]">Email</TableHead>
                        <TableHead className="text-[#00ffc8]">Contact</TableHead>
                        <TableHead className="text-[#00ffc8]">Resume</TableHead>
                        <TableHead className="text-[#00ffc8]">Date</TableHead>
                        <TableHead className="text-[#00ffc8] text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((item) => (
                            <TableRow key={item._id} className="bg-[#212121] hover:bg-[#2b2b2b] transition-colors duration-300">
                                <TableCell className="py-4 px-3">{item?.applicant?.fullname}</TableCell>
                                <TableCell className="py-4 px-3">{item?.applicant?.email}</TableCell>
                                <TableCell className="py-4 px-3">{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell className="py-4 px-3">
                                    {
                                        item.applicant?.profile?.resume ?
                                            <a
                                                className="text-[#00ffc8] underline hover:text-white"
                                                href={item?.applicant?.profile?.resume}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {item?.applicant?.profile?.resumeOriginalName}
                                            </a> :
                                            <span className="text-[#888]">NA</span>
                                    }
                                </TableCell>
                                <TableCell className="py-4 px-3">{item?.applicant.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="py-4 px-3 text-right">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="text-[#00ffc8] hover:text-white transition duration-200 cursor-pointer" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-40 bg-[#1a1a1a] text-white border border-[#00ffc8] shadow-xl rounded-md">
                                            {
                                                shortlistingStatus.map((status, index) => (
                                                    <div
                                                        onClick={() => statusHandler(status, item?._id)}
                                                        key={index}
                                                        className='cursor-pointer hover:bg-[#00ffc8] hover:text-black px-4 py-2 rounded-md transition-colors duration-200 text-sm'
                                                    >
                                                        {status}
                                                    </div>
                                                ))
                                            }
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable;
