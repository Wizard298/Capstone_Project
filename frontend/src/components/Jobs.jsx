import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "./shared/Footer";
import { Frown, Search, Filter, ArrowRight } from "lucide-react";
import { JOB_API_END_POINT } from "@/utils/constant";

const Jobs = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [filterJobs, setFilterJobs] = useState([]);
  const [searchedQuery, setSearchedQuery] = useState("");
  const [selectedFilterValue, setSelectedFilterValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setAllJobs(res.data.jobs);
          setFilterJobs(res.data.jobs);
        }
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter when search or filter value changes
  useEffect(() => {
    let filtered = allJobs;

    if (searchedQuery) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.name.toLowerCase().includes(searchedQuery.toLowerCase())
        //   job.category.toLowerCase().includes(searchedQuery.toLowerCase())
      );
    }

    if (selectedFilterValue) {
      filtered = filtered.filter(
        (job) =>
          job.location === selectedFilterValue ||
          job.category === selectedFilterValue ||
          isPriceMatch(job.price, selectedFilterValue)
      );
    }

    setFilterJobs(filtered);
  }, [searchedQuery, selectedFilterValue, allJobs]);

  const isPriceMatch = (price, filterLabel) => {
    if (!price || typeof price !== "number") return false;
    if (filterLabel === "₹0 to ₹399") return price <= 399;
    if (filterLabel === "₹400 to ₹999") return price >= 400 && price <= 999;
    if (filterLabel === "₹1000 to ₹1999") return price >= 1000 && price <= 1999;
    return false;
  };

  return (
    <div>
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900" style={{ color: "white" }}>
              Browse Gigs
            </h1>
            <p className="text-gray-600 mt-1" style={{ color: "white" }}>
              {filterJobs.length} {filterJobs.length === 1 ? "gig" : "gigs"}{" "}
              available
            </p>
          </div>

          {/* Search bar */}
          <input
            type="text"
            value={searchedQuery}
            onChange={(e) => setSearchedQuery(e.target.value)}
            placeholder="Search gigs..."
            className="px-4 py-2 border border-gray-300 rounded-md md:w-1/3"
          />

          {/* Mobile filter toggle */}
          <button onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-700 hover:bg-gray-50 md:hidden">
            <Filter size={18} />
            <span>Filters</span>
          </button>
        </div>


        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters */}
          <aside className={`hidden lg:block w-full lg:w-80 flex-shrink-0`}>
            <FilterCard onFilterChange={(val) => setSelectedFilterValue(val)}/>
          </aside>

          {/* Mobile Filters */}
          {mobileFiltersOpen && (
            <div className="lg:hidden mb-6 w-full">
              <FilterCard onFilterChange={(val) => setSelectedFilterValue(val)}/>
              <button onClick={() => setMobileFiltersOpen(false)} className="mt-4 w-full py-2 bg-purple-600 text-white rounded-lg flex items-center justify-center gap-2">
                Apply Filters <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* Gigs List */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : filterJobs.length <= 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-lg shadow-sm"
              >
                <Frown size={48} className="text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No gigs found
                </h3>
                <p className="text-gray-600 max-w-md">
                  {searchedQuery ? (
                    <>No gigs match your search for "{searchedQuery}"</>
                  ) : (
                    <>
                      There are currently no available gigs. Check back later!
                    </>
                  )}
                </p>
                <Search size={24} className="mt-4 text-gray-400" />
              </motion.div>
            ) : (
              <AnimatePresence>
                <div className="space-y-6">
                  {filterJobs.map((job) => (
                    <motion.div
                      key={job._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Job job={job} />
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Jobs;

// import React, { useEffect, useState } from 'react'
// import Navbar from './shared/Navbar'
// import FilterCard from './FilterCard'
// import Job from './Job';
// import { useSelector } from 'react-redux';
// import { motion } from 'framer-motion';
// import Footer from './shared/Footer';

// // const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

// const Jobs = () => {
//     const { allJobs, searchedQuery } = useSelector(store => store.job);
//     const [filterJobs, setFilterJobs] = useState(allJobs);

//     useEffect(() => {
//         if (searchedQuery) {
//             const filteredJobs = allJobs.filter((job) => {
//                 return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
//                     job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
//                     job.location.toLowerCase().includes(searchedQuery.toLowerCase())
//             })
//             setFilterJobs(filteredJobs)
//         }
//         else {
//             setFilterJobs(allJobs)
//         }
//     }, [allJobs, searchedQuery]);

//     return (
//         <div>
//             <Navbar />
//             <div className='max-w-7xl mx-auto mt-5'>
//                 <div className='flex gap-5'>
//                     <div className='w-20%'>
//                         <FilterCard />
//                     </div>
//                     {
//                         filterJobs.length <= 0 ? <span>Job not found</span> : (
//                             <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
//                                 <div className='grid grid-cols-3 gap-4'>
//                                     {
//                                         filterJobs.map((job) => (
//                                             <motion.div
//                                                 initial={{ opacity: 0, x: 100 }}
//                                                 animate={{ opacity: 1, x: 0 }}
//                                                 exit={{ opacity: 0, x: -100 }}
//                                                 transition={{ duration: 0.3 }}
//                                                 key={job?._id}>
//                                                 <Job job={job} />
//                                             </motion.div>
//                                         ))
//                                     }
//                                 </div>
//                             </div>
//                         )
//                     }
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     )
// }

// export default Jobs
