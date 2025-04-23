import React, { useState, useEffect } from "react";
import axios from "axios";
import LatestJobCards from "./LatestJobCards";
import { JOB_API_END_POINT } from "@/utils/constant";
import "./home.css";

const LatestJobs = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setAllJobs(res.data.jobs); // ✅ use res.data.jobs not res.data.job
        }
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="relative z-10 max-w-7xl mx-auto my-20 px-12 " id="jobsCard">
      <div
        className=" rounded-3xl border border-[#2e2e2e] shadow-[0_0_40px_rgba(0,255,255,0.05)] px-8 py-14 transition-all duration-500 hover:shadow-[0_0_60px_rgba(0,255,255,0.1)]"
        style={{
          background: `radial-gradient(circle at 20% 20%, rgba(255, 0, 255, 0.1), transparent),
                 radial-gradient(circle at 80% 80%, rgba(0, 255, 255, 0.1), transparent),
                 #121212`,
        }}
      >
        <h1 className="text-4xl font-extrabold text-white text-center mb-8 tracking-wide">
          <span className="bg-gradient-to-r from-[#00f5d4] to-[#9a7cff] text-transparent bg-clip-text drop-shadow-lg">
            Explore Popular
          </span>{" "}
          Freelancers
          <p style={{ fontSize: "21px" }}>
            Explore freelancers with your convenient requirements
          </p>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loading ? (
            <span className="text-gray-400 text-center col-span-full">
              Loading...
            </span>
          ) : allJobs.length <= 0 ? (
            <span className="text-gray-400 text-center col-span-full">
              No Freelancers Available
            </span>
          ) : (
            allJobs.map((job) => <LatestJobCards key={job._id} job={job} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestJobs;
