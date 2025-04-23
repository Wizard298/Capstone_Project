import React from "react";
import { Button } from "./ui/button";
import { Bookmark, Clock, MapPin, DollarSign, Briefcase, Calendar } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(192, 132, 252, 0.2)"
      }}
      className="relative p-6 rounded-2xl bg-gradient-to-br from-[#1e1e2f] to-[#2d2d42] border border-purple-900/50 hover:border-pink-500/50 transition-all duration-300 ease-in-out overflow-hidden group"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-pink-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock size={14} className="text-gray-400" />
          <p className="text-xs text-gray-300">
            {daysAgoFunction(job?.createdAt) === 0
              ? "Posted today"
              : `${daysAgoFunction(job?.createdAt)} days ago`}
          </p>
        </div>
        <Button
          variant="ghost"
          className="rounded-full text-white hover:bg-pink-600/20 hover:text-pink-400 transition-colors"
          size="icon"
        >
          <Bookmark size={18} className="transition-transform group-hover:scale-110" />
        </Button>
      </div>

      <div className="flex justify-center items-center">
        <img src={job?.image} alt={job?.title} />
      </div>

      <div className="flex items-center gap-4 my-6">
        <div className="p-1 border-2 border-purple-700 rounded-full group-hover:border-pink-500 transition-colors">
          {/* <Avatar className="w-14 h-14">
            <AvatarImage src={job?.image} alt={job?.name} />
          </Avatar> */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
            {job?.name?.charAt(0) || "J"}
          </div>
        </div>
        <div>
          <h1 className="font-semibold text-white text-lg group-hover:text-pink-200 transition-colors">
            {job?.name}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <MapPin size={14} className="text-gray-400" />
            <p className="text-sm text-gray-300">{job?.location}</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h1 className="font-bold text-2xl text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
          {job?.title}
        </h1>
        <p className="text-sm text-gray-300 mt-3 line-clamp-3 leading-relaxed">
          {job?.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-2 bg-purple-900/30 border border-purple-700/50 px-3 py-1 rounded-full group-hover:border-pink-500/50 transition-colors">
          <Briefcase size={14} className="text-purple-300" />
          <span className="text-xs text-purple-200">{job?.experience}+ years</span>
        </div>
        
        <div className="flex items-center gap-2 bg-pink-900/30 border border-pink-700/50 px-3 py-1 rounded-full group-hover:border-purple-500/50 transition-colors">
          <Calendar size={14} className="text-pink-300" />
          <span className="text-xs text-pink-200">{job?.days} days</span>
        </div>
        
        <div className="flex items-center gap-2 bg-blue-900/30 border border-blue-700/50 px-3 py-1 rounded-full">
          <DollarSign size={14} className="text-blue-300" />
          <span className="text-xs text-blue-200">₹{job?.price}/hr</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          className="flex-1 border border-gray-700 text-white hover:bg-white hover:text-black transition-all duration-300 hover:shadow-lg hover:shadow-white/10"
          variant="outline"
        >
          View Details
        </Button>
        {/* <Button 
          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-pink-600/30"
        >
          Apply Now
        </Button> */}
      </div>
    </motion.div>
  );
};

export default Job;


// import React from "react";
// import { Button } from "./ui/button";
// import { Bookmark } from "lucide-react";
// import { Avatar, AvatarImage } from "./ui/avatar";
// import { Badge } from "./ui/badge";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// const Job = ({ job }) => {
//   const navigate = useNavigate();
//   // const jobId = "lsekdhjgdsnfvsdkjf";

//   const daysAgoFunction = (mongodbTime) => {
//     const createdAt = new Date(mongodbTime);
//     const currentTime = new Date();
//     const timeDifference = currentTime - createdAt;
//     return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.95 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.4 }}
//       whileHover={{ scale: 1.02 }}
//       className="p-6 rounded-2xl shadow-xl bg-[#1e1e2f] border border-purple-800 hover:border-pink-500 backdrop-blur-md transition-all duration-300 ease-in-out"
//     >
//       <div className="flex items-center justify-between">
//         <p className="text-xs text-gray-400 tracking-wide">
//           {daysAgoFunction(job?.createdAt) === 0
//             ? "Today"
//             : `${daysAgoFunction(job?.createdAt)} days ago`}
//         </p>
//         <Button
//           variant="ghost"
//           className="rounded-full text-white hover:bg-pink-600/20"
//           size="icon"
//         >
//           <Bookmark size={18} />
//         </Button>
//       </div>

//       <div className="flex items-center gap-3 my-4">
//         <div className="p-2 border border-purple-700 rounded-full">
//           <Avatar className="w-12 h-12">
//             <AvatarImage src={job?.company?.logo} />
//           </Avatar>
//         </div>
//         <div>
//           <h1 className="font-semibold text-white text-lg">
//             {job?.company?.name}
//           </h1>
//           <p className="text-xs text-gray-400">India</p>
//         </div>
//       </div>

//       <div className="mb-4">
//         <h1 className="font-bold text-xl text-pink-400">{job?.title}</h1>
//         <p className="text-sm text-gray-300 mt-1 line-clamp-3">
//           {job?.description}
//         </p>
//       </div>

//       <div className="flex flex-wrap items-center gap-2 mt-4">
//         <Badge
//           className="text-purple-400 bg-purple-900/20 border border-purple-700 rounded-xl text-xs font-semibold"
//           variant="outline"
//         >
//           Deadline- {job?.position} days
//         </Badge>
//         <Badge
//           className="text-pink-500 bg-pink-900/20 border border-pink-600 rounded-xl text-xs font-semibold"
//           variant="outline"
//         >
//           {job?.jobType}
//         </Badge>
//         <Badge
//           className="text-blue-400 bg-blue-900/20 border border-blue-700 rounded-xl text-xs font-semibold"
//           variant="outline"
//         >
//           {job?.salary} Per/Hr
//         </Badge>
//       </div>

//       <div className="flex gap-4 mt-6">
//         <Button
//           onClick={() => navigate(`/description/${job?._id}`)}
//           className="border border-gray-700 text-white hover:bg-white hover:text-black transition-all duration-300"
//           variant="outline"
//         >
//           View Details
//         </Button>
//         <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-pink-600/30">
//           Save for Later
//         </Button>
//       </div>
//     </motion.div>
//   );
// };

// export default Job;
