import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MoreHorizontal, Edit2, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";

const AdminJobsTable = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [filterJobs, setFilterJobs] = useState([]);
  const [searchJobByText, setSearchJobByText] = useState("");
  // const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  // const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();


  const handleDelete = async (jobId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this post?"
      );
      if (!confirmDelete) return;
  
      await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, {
        withCredentials: true,
      });
  
      setAllJobs((prev) => prev.filter((job) => job._id !== jobId));
      toast.success("Post deleted successfully!");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setAllJobs((prev) => prev.filter((job) => job._id !== jobId));
        toast.warning("Post was already deleted.");
      } else {
        console.error("Delete error:", error);
        toast.error("Failed to delete post.");
      }
    }
  };

  useEffect(() => {
    const fetchAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setAllJobs(res.data.jobs);
          setFilterJobs(res.data.jobs);
        }
      } catch (error) {
        console.error("Failed to fetch admin posts", error);
      }
    };
  
    fetchAdminJobs();
  }, []);
  

  useEffect(() => {
    const filtered = allJobs.filter((job) => {
      if (!searchJobByText) return true;
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filtered);
  }, [allJobs, searchJobByText]);
  

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="p-6"
      style={{ marginBottom: "370px" }}
    >
      <div className="bg-[#111111] backdrop-blur-xl rounded-xl border border-[#2a2a2a] shadow-[0_0_60px_rgba(0,255,255,0.25)]">
        <table className="w-full text-sm text-left text-white font-mono">
          <caption className="text-lg font-bold tracking-wide py-5 text-center text-cyan-300 animate-pulse">
            🌌 Your Epic Freelancing Posts Created By You
          </caption>
          <thead className="bg-[#1c1c1c]">
            <tr>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3"> Description</th>
              <th className="px-6 py-3"> Category</th>
              <th className="px-6 py-3">📆 Date</th>
              <th className="px-6 py-3 text-right">🎛 Action</th>
            </tr>
          </thead>
          <tbody>
            {filterJobs?.map((job, idx) => (
              <motion.tr
                key={job._id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="hover:bg-[#252525] transition-all duration-300"
              >
                <td className="px-6 py-4">{job?.title}</td>
                <td className="px-6 py-4">{job?.description}</td>
                <td className="px-6 py-4">{job?.category}</td>
                <td className="px-6 py-4">{job?.createdAt.split("T")[0]}</td>
                <td className="px-6 py-4 text-right">
                  <div className="relative group inline-block">
                    <MoreHorizontal className="cursor-pointer transition-transform duration-300 group-hover:rotate-90 group-hover:text-cyan-400" />
                    <div className="absolute hidden group-hover:flex flex-col gap-2 bg-[#222222] text-white p-3 rounded-lg shadow-xl border border-[#444] w-40 right-0 top-6 z-10 animate-fade-in">
                      <div
                        onClick={() => navigate(`/admin/jobs/edit/${job._id}`)}
                        className="flex items-center gap-2 cursor-pointer hover:text-cyan-300"
                      >
                        {/* <Eye className="w-4" /> */}
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() => handleDelete(job._id)}
                        className="flex items-center gap-2 cursor-pointer hover:text-red-400"
                      >
                        <Trash2 className="w-4" />
                        <span>Delete</span>
                      </div>
                    </div>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default AdminJobsTable;
