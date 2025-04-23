import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  { name: "AI Artist", color: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20" },
  { name: "Logo Design", color: "bg-green-500/10 text-green-500 hover:bg-green-500/20" },
  { name: "Wordpress", color: "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20" },
  { name: "Voice Over", color: "bg-pink-500/10 text-pink-500 hover:bg-pink-500/20" },
  { name: "Programming & Tech", color: "bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20" },
  { name: "Photo Editor", color: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20" },
  { name: "Content Writer", color: "bg-red-500/10 text-red-500 hover:bg-red-500/20" },
  { name: "Digital Marketing", color: "bg-teal-500/10 text-teal-500 hover:bg-teal-500/20" },
  { name: "SEO Expert", color: "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20" },
  { name: "Social Media Manager", color: "bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20" },
  { name: "Web Developer", color: "bg-violet-500/10 text-violet-500 hover:bg-violet-500/20" },
  { name: "UI/UX Designer", color: "bg-fuchsia-500/10 text-fuchsia-500 hover:bg-fuchsia-500/20" },
  { name: "Illustration", color: "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20" },
  { name: "Translation", color: "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20" },
];

const CategoryCarousel = () => {
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    navigate(`/browse?search=${encodeURIComponent(query)}`);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl font-bold text-white mb-2">Explore Services</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Explore freelancers in the most in-demand categories in the industry
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <Carousel
          className="w-full max-w-7xl mx-auto"
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
          }}
        >
          <CarouselContent className="-ml-2 py-4">
            {categories.map((category, index) => (
              <CarouselItem
                key={index}
                className="pl-2 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Button
                    onClick={() => searchJobHandler(category.name)}
                    className={`w-full rounded-full px-6 py-5 text-sm font-medium transition-all duration-300 ${category.color} backdrop-blur-sm border border-white/10 shadow-sm hover:shadow-md whitespace-nowrap`}
                  >
                    {category.name}
                  </Button>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-6 flex justify-center gap-4">
            <CarouselPrevious className="relative left-0 top-0 translate-y-0 bg-gray-800/50 hover:bg-gray-700/50 border-gray-700 text-white hover:text-white" />
            <CarouselNext className="relative left-0 top-0 translate-y-0 bg-gray-800/50 hover:bg-gray-700/50 border-gray-700 text-white hover:text-white" />
          </div>
        </Carousel>
      </motion.div>
    </div>
  );
};

export default CategoryCarousel;



// import React from "react";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "./ui/carousel";
// import { Button } from "./ui/button";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setSearchedQuery } from "@/redux/jobSlice";
// import { motion } from "framer-motion";

// const categories = [
//   {
//     name: "AI Artist",
//     color: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
//   },
//   {
//     name: "Logo Design",
//     color: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
//   },
//   {
//     name: "Wordpress",
//     color: "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20",
//   },
//   {
//     name: "Voice Over",
//     color: "bg-pink-500/10 text-pink-500 hover:bg-pink-500/20",
//   },
//   {
//     name: "Programming & Tech",
//     color: "bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20",
//   },
//   {
//     name: "Photo Editor",
//     color: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
//   },
//   {
//     name: "Content Writer",
//     color: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
//   },
//   {
//     name: "Digital Marketing",
//     color: "bg-teal-500/10 text-teal-500 hover:bg-teal-500/20",
//   },
//   {
//     name: "SEO Expert",
//     color: "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20",
//   },
//   {
//     name: "Social Media Manager",
//     color: "bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20",
//   },
//   {
//     name: "Web Developer",
//     color: "bg-violet-500/10 text-violet-500 hover:bg-violet-500/20",
//   },
//   {
//     name: "UI/UX Designer",
//     color: "bg-fuchsia-500/10 text-fuchsia-500 hover:bg-fuchsia-500/20",
//   },
//   {
//     name: "Illustration",
//     color: "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20",
//   },
//   {
//     name: "Translation",
//     color: "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20",
//   },
// ];

// const CategoryCarousel = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const searchJobHandler = (query) => {
//     dispatch(setSearchedQuery(query));
//     navigate("/browse");
//   };

//   return (
//     <div className="py-12 px-4 sm:px-6 lg:px-8">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="text-center mb-10"
//       >
//         <h2 className="text-3xl font-bold text-white mb-2">
//           Explore Services
//         </h2>
//         <p className="text-gray-400 max-w-2xl mx-auto">
//           Explore freelancers in the most in-demand categories in the industry
//         </p>
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.3, duration: 0.6 }}
//       >
//         <Carousel
//           className="w-full max-w-7xl mx-auto"
//           opts={{
//             align: "start",
//             loop: true,
//             dragFree: true,
//           }}
//         >
//           <CarouselContent className="-ml-2 py-4">
//             {categories.map((category, index) => (
//               <CarouselItem
//                 key={index}
//                 className="pl-2 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
//               >
//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   transition={{ type: "spring", stiffness: 400, damping: 10 }}
//                 >
//                   <Button
//                     onClick={() => searchJobHandler(category.name)}
//                     className={`w-full rounded-full px-6 py-5 text-sm font-medium transition-all duration-300 ${category.color} backdrop-blur-sm border border-white/10 shadow-sm hover:shadow-md whitespace-nowrap`}
//                   >
//                     {category.name}
//                   </Button>
//                 </motion.div>
//               </CarouselItem>
//             ))}
//           </CarouselContent>

//           <div className="mt-6 flex justify-center gap-4">
//             <CarouselPrevious className="relative left-0 top-0 translate-y-0 bg-gray-800/50 hover:bg-gray-700/50 border-gray-700 text-white hover:text-white" />
//             <CarouselNext className="relative left-0 top-0 translate-y-0 bg-gray-800/50 hover:bg-gray-700/50 border-gray-700 text-white hover:text-white" />
//           </div>
//         </Carousel>
//       </motion.div>
//     </div>
//   );
// };

// export default CategoryCarousel;

