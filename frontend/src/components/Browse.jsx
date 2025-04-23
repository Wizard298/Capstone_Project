import React, { useState, useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { JOB_API_END_POINT } from "@/utils/constant";
import Footer from "./shared/Footer";
import { motion } from "framer-motion";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Browse = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // Get query from URL on mount
  useEffect(() => {
    const queryFromURL = new URLSearchParams(location.search).get("search") || "";
    setSearchTerm(queryFromURL);
  }, [location.search]);

  // Fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setAllJobs(res.data.jobs);
        }
      } catch (error) {
        console.error(
          "Error fetching jobs:",
          error.response?.data?.message || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs on searchTerm or allJobs change
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredJobs(allJobs);
    } else {
      const filtered = allJobs.filter((job) =>
        `${job.title} ${job.description} ${job.location} ${job.name} ${job.category}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setFilteredJobs(filtered);
    }
  }, [searchTerm, allJobs]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    navigate(`/browse?search=${encodeURIComponent(value)}`);
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white font-sans text-sm">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-6xl mx-auto mt-12 px-4"
      >
        {/* Search Input */}
        <div className="mb-10">
          <input
            type="text"
            placeholder="Search jobs by title, category, location..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-3 rounded-lg bg-[#1a1a1a] border border-[#333] focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-500"
          />
        </div>

        {loading ? (
          <h1 className="text-center text-cyan-300 text-xl">Loading...</h1>
        ) : filteredJobs.length <= 0 ? (
          <h1 className="text-xl sm:text-2xl font-bold text-center text-cyan-300 mb-6 tracking-wide">
            🔍 No Gigs Found ({filteredJobs.length})
          </h1>
        ) : (
          <>
            <h1 className="text-xl sm:text-2xl font-bold text-center text-cyan-300 mb-6 tracking-wide">
              🔍 Gigs Found ({filteredJobs.length})
            </h1>
            <div className="bg-[#121212] border border-[#2a2a2a] backdrop-blur-md rounded-2xl shadow-[0_0_50px_rgba(0,255,255,0.05)] p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredJobs.map((job, idx) => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-[#1a1a1a] p-4 rounded-xl border border-[#2d2d2d] hover:border-cyan-400 shadow-md hover:shadow-[0_0_30px_rgba(0,255,255,0.1)] transition-transform hover:-translate-y-1"
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}
      </motion.div>

      <Footer />
    </div>
  );
};

export default Browse;




// import React, { useState, useEffect } from "react";
// import Navbar from "./shared/Navbar";
// import Job from "./Job";
// import { JOB_API_END_POINT } from "@/utils/constant";
// import Footer from "./shared/Footer";
// import { motion } from "framer-motion";
// import axios from "axios";

// const Browse = () => {
//   const [allJobs, setAllJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const res = await axios.get(`${JOB_API_END_POINT}/get`, {
//           withCredentials: true,
//         });
//         if (res.data.success) {
//           setAllJobs(res.data.jobs);
//         }
//       } catch (error) {
//         console.error(
//           "Error fetching jobs:",
//           error.response?.data?.message || error.message
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobs();
//   }, []);

//   return (
//     <div className="bg-[#0a0a0a] min-h-screen text-white font-sans text-sm">
//       <Navbar />

//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, ease: "easeOut" }}
//         className="max-w-6xl mx-auto my-12 px-4"
//         style={{ marginBottom: "290px" }}
//       >
//         {allJobs.length <= 0 ? (
//           <h1 className="text-xl sm:text-2xl font-bold text-center text-cyan-300 mb-6 tracking-wide">
//             🔍 No Gigs Found ({allJobs.length})
//           </h1>
//         ) : (
//           <>
//             <h1 className="text-xl sm:text-2xl font-bold text-center text-cyan-300 mb-6 tracking-wide">
//               🔍 Gigs Found ({allJobs.length})
//             </h1>
//             <div className="bg-[#121212] border border-[#2a2a2a] backdrop-blur-md rounded-2xl shadow-[0_0_50px_rgba(0,255,255,0.05)] p-6">
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//                 {allJobs.map((job, idx) => (
//                   <motion.div
//                     key={job._id}
//                     initial={{ opacity: 0, scale: 0.95 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: idx * 0.05 }}
//                     className="bg-[#1a1a1a] p-4 rounded-xl border border-[#2d2d2d] hover:border-cyan-400 shadow-md hover:shadow-[0_0_30px_rgba(0,255,255,0.1)] transition-transform hover:-translate-y-1"
//                   >
//                     <Job job={job} />
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </>
//           // })
//         )}
//       </motion.div>

//       <Footer />
//     </div>
//   );
// };

// export default Browse;
