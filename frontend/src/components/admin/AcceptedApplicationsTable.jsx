import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { JOB_API_END_POINT } from "@/utils/constant";
import { motion } from "framer-motion";

const PaidJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchPaidJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/checkPosts`, {
          withCredentials: true,
        });

        if (res.data.success) {
          setJobs(res.data.jobs);
        }
      } catch (err) {
        console.error("Error fetching paid jobs:", err);
      }
    };

    fetchPaidJobs();
  }, []);

  return (
    <>
      <Navbar />
      <div className="px-4 py-8 text-white max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8 text-purple-400 border-b border-purple-700 pb-2"
        >
          ✅ Paid Gigs - Completed Payments
        </motion.h1>

        {jobs.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-400 text-center py-10"
          >
            No paid gigs found.
          </motion.p>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#1a1a1a] rounded-xl shadow-lg overflow-hidden border border-gray-800"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-[#222222]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                      Gig Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                      Seller Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                      Details
                    </th>
                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                      Purchased By
                    </th> */}
                  </tr>
                </thead>
                <tbody className="bg-[#1f1f1f] divide-y divide-gray-800">
                  {jobs.map((job, index) => (
                    <motion.tr
                      key={job._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-[#252525] transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-blue-300">
                          {job.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-xs">
                        <div className="text-sm text-gray-300 line-clamp-2">
                          {job.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-sm font-semibold text-green-400 bg-green-900/30 rounded-full">
                          ₹{job.price}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-300">
                          <div className="font-medium">{job.name}</div>
                          <div className="text-gray-400">{job.location}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-400">
                          <div>Exp: {job.experience} yrs</div>
                          <div>Days: {job.days}</div>
                          <div>Category: {job.category || "N/A"}</div>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default PaidJobs;
