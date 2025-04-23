import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (query.trim() !== "") {
      navigate(`/browse?search=${encodeURIComponent(query)}`);
    } else {
      navigate("/browse");
    }
  };

  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10 pt-11">
        <h1 className="typewriter-heading">
          <span className="line line-1">
            FREELANCIFY — Find the perfect freelancer services for your
            business.
          </span>
          <br />
          <span className="line line-2">One Platform. Two Powerhouses.</span>
        </h1>
        <motion.div
          className="w-full min-h-[15vh] flex justify-center items-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="relative w-full max-w-xl">
            <div className="absolute -inset-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 blur-sm rounded-xl z-0 animate-pulse" />
            <div className="relative z-10 bg-[#1a1a1a] border border-neutral-700 rounded-xl flex items-center justify-between gap-3 px-4 py-2">
              <div className="flex items-center gap-3 w-full">
                <Search className="text-pink-400 shrink-0" size={20} />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search any services with location, category, name, etc..."
                  className="bg-transparent outline-none text-white placeholder:text-gray-400 w-full"
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#ec4899",
                  boxShadow: "0px 0px 12px #ec4899",
                }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={searchJobHandler}
                className="bg-pink-600 text-white px-4 py-1.5 rounded-lg font-semibold"
              >
                Search
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;



// import React, { useState } from "react";
// import { Button } from "./ui/button";
// import { Search } from "lucide-react";
// import { useDispatch } from "react-redux";
// import { setSearchedQuery } from "@/redux/jobSlice";
// import { useNavigate } from "react-router-dom";
// import "./home.css";
// import { motion } from "framer-motion";

// const HeroSection = () => {
//   const [query, setQuery] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const searchJobHandler = () => {
//     dispatch(setSearchedQuery(query));
//     navigate("/browse");
//   };

//   return (
//     <div className="text-center">
//       <div className="flex flex-col gap-5 my-10 pt-11">
//         <h1 className="typewriter-heading">
//           <span className="line line-1">
//             FREELANCIFY — Find the perfect freelancer services for your
//             business.
//           </span>
//           <br />
//           <span className="line line-2">One Platform. Two Powerhouses.</span>
//         </h1>{" "}
//         <motion.div
//           className="w-full min-h-[15vh] flex justify-center items-center px-4"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//         >
//           <div className="relative w-full max-w-xl">
//             {/* Glow Border */}
//             <div className="absolute -inset-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 blur-sm rounded-xl z-0 animate-pulse" />

//             <div className="relative z-10 bg-[#1a1a1a] border border-neutral-700 rounded-xl flex items-center justify-between gap-3 shadow-[0_0_20px_rgba(255,255,255,0.05)] backdrop-blur-md transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] px-4 py-2">
//               <div className="flex items-center gap-3 w-full">
//                 <Search className="text-pink-400 shrink-0" size={20} />
//                 <input
//                   type="text"
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   placeholder="Search for any services..."
//                   className="bg-transparent outline-none text-white placeholder:text-gray-400 w-full text-base font-medium tracking-wide"
//                 />
//               </div>

//               {/* Good Button */}
//               <motion.button
//                 whileTap={{ scale: 0.9 }}
//                 whileHover={{
//                   scale: 1.05,
//                   backgroundColor: "#ec4899",
//                   boxShadow: "0px 0px 12px #ec4899",
//                 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//                 onClick={searchJobHandler}
//                 className="bg-pink-600 text-white px-4 py-1.5 rounded-lg font-semibold shadow-md hover:shadow-pink-500/50 transition-all duration-300"
//               >
//                 Search
//               </motion.button>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;
