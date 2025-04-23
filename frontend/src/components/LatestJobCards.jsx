import React from "react";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="group p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-[#2a2a2a] cursor-pointer backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-[#7f5fff] hover:shadow-[0_8px_40px_rgba(127,95,255,0.15)]"
    >
      <div className="flex justify-center items-center">
        <img src={job?.image} alt={job?.title} />
      </div>
      <br />
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
            {job?.name?.charAt(0) || "J"}
          </div>
          <h1
            style={{ fontSize: "1.65rem" }}
            className="text-2xl font-bold text-white group-hover:text-[#9a7cff] transition-colors duration-300"
          >
            {job?.name}
          </h1>
          <div className="flex items-center gap-1 mt-1"></div>
        </div>
        <div style={{ display: "flex", gap: "3px" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <p style={{ fontSize: "1rem" }} className="text-xs text-gray-400">
            {job?.location}
          </p>
        </div>
      </div>

      <div className="mt-4 mb-6">
        <h2 className="font-extrabold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-[#00f5d4] to-[#00bbf9] mb-2">
          {job?.title}
        </h2>
        <p className="text-sm text-gray-300 line-clamp-3 leading-relaxed">
          {job?.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="px-3 py-1 text-xs font-bold rounded-full bg-[#1a1a1a] text-[#F83002] border border-[#F83002]/40 shadow-inner shadow-[#F83002]/10 transition-all duration-300 group-hover:border-[#F83002]/60 group-hover:shadow-[#F83002]/30">
          {job?.category}
        </span>
        <span className="px-3 py-1 text-xs font-bold rounded-full bg-[#1a1a1a] text-[#7209b7] border border-[#7209b7]/30 shadow-inner shadow-[#7209b7]/10 transition-all duration-300 group-hover:border-[#7209b7]/50 group-hover:shadow-[#7209b7]/30">
          ₹{job?.price}
        </span>
        <span className="px-3 py-1 text-xs font-bold rounded-full bg-[#1a1a1a] text-[#F83002] border border-[#F83002]/40 shadow-inner shadow-[#F83002]/10 transition-all duration-300 group-hover:border-[#F83002]/60 group-hover:shadow-[#F83002]/30">
          {job?.experience}yr Experience
        </span>
        <span className="px-3 py-1 text-xs font-bold rounded-full bg-[#1a1a1a] text-[#00bbf9] border border-[#00bbf9]/30 shadow-inner shadow-[#00bbf9]/10 transition-all duration-300 group-hover:border-[#00bbf9]/50 group-hover:shadow-[#00bbf9]/30">
          {job?.days || "Full-time"} days required
        </span>
      </div>
    </div>
  );
};

export default LatestJobCards;

// import React from "react";
// import { Badge } from "./ui/badge";
// import { useNavigate } from "react-router-dom";

// const LatestJobCards = ({ job }) => {
//   const navigate = useNavigate();
//   console.log("days: ", job);
//   return (
//     <div
//       onClick={() => navigate(`/description/${job._id}`)}
//       className="group p-5 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] bg-[#0f0f0f]/70 border border-[#2a2a2a] cursor-pointer backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-[#5f5fff]"
//     >
//       <div>
//         <h1 style={{fontSize: "1.65rem"}} className="font-semibold text-white group-hover:text-[#9a7cff] transition-colors duration-200">
//           {job?.name}
//         </h1>
//         <p className="text-xs text-gray-400">{job?.location}</p>
//       </div>

//       <div className="mt-3">
//         <h2 className="font-extrabold text-2xl text-[#00f5d4] mb-1">
//           {job?.title}
//         </h2>
//         <p className="text-sm text-gray-300 line-clamp-3">{job?.description}</p>
//       </div>

//       <div className="flex flex-wrap items-center gap-2 mt-4">
//         <span className="px-3 py-1 text-sm font-bold rounded-full bg-[#1a1a1a] text-blue-400 border border-blue-800 shadow-inner shadow-blue-900">
//           Deadline- {job?.days} days
//         </span>
//         <span className="px-3 py-1 text-sm font-bold rounded-full bg-[#1a1a1a] text-[#F83002] border border-[#F83002]/40 shadow-inner shadow-[#F83002]/20">
//           {job?.category}
//         </span>
//         <span className="px-3 py-1 text-sm font-bold rounded-full bg-[#1a1a1a] text-[#7209b7] border border-[#7209b7]/30 shadow-inner shadow-[#7209b7]/20">
//           ₹{job?.price} Per/Hr
//         </span>
//       </div>
//     </div>
//   );
// };

// export default LatestJobCards;
