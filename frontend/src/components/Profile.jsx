import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const isResume = !!user?.profile?.resume;

  return (
    <div className="min-h-screen text-white font-[Poppins]">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Card */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-pink-500/20 hover:border-pink-500/30 mb-8">
          <div className="p-8 animate-fadeIn">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="flex items-start gap-6">
                <Avatar className="h-32 w-32 ring-2 ring-pink-500 shadow-lg transition-all duration-300 hover:scale-105 hover:ring-pink-300">
                  <AvatarImage
                    src={user?.profile?.avatar || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"}
                    alt="profile"
                    className="object-cover"
                  />
                </Avatar>
                <div className="space-y-2">
                  <h1 className="font-bold text-3xl text-white tracking-tight bg-gradient-to-r from-pink-300 to-pink-500 bg-clip-text text-transparent">
                    {user?.fullname}
                  </h1>
                  <p className="text-gray-300 max-w-lg">
                    {user?.profile?.bio || "No bio available. Add a short introduction about yourself."}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setOpen(true)}
                className="border border-gray-600 bg-pink-600/20 hover:bg-pink-600/30 hover:text-white hover:border-pink-400 transition-all duration-300 shadow-md hover:shadow-pink-500/30"
              >
                <Pen className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
            </div>

            <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-200">
                  <Mail className="text-pink-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400">Email</p>
                    <span className="text-white">{user?.email}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-200">
                  <Contact className="text-pink-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400">Phone</p>
                    <span className="text-white">{user?.phoneNumber || "Not provided"}</span>
                  </div>
                </div>
              </div>

              {/* <div>
                <h2 className="text-lg font-semibold mb-3 text-white flex items-center gap-2">
                  <span className="bg-pink-500 w-2 h-2 rounded-full"></span>
                  Skills
                </h2>
                <div className="flex flex-wrap items-center gap-2">
                  {user?.profile?.skills?.length ? (
                    user.profile.skills.map((item, index) => (
                      <Badge
                        key={index}
                        className="bg-pink-500/20 border border-pink-500/50 text-pink-300 rounded-full px-4 py-1 shadow-sm hover:scale-105 hover:bg-pink-500/30 transition-all duration-200"
                      >
                        {item}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-gray-400 italic">No skills added yet</span>
                  )}
                </div>
              </div> */}
            </div>

            {/* <div className="mt-6 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
              <Label className="text-md font-bold text-white flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                Resume
              </Label>
              {isResume ? (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={user?.profile?.resume}
                  className="inline-block mt-2 px-4 py-2 bg-blue-600/20 border border-blue-500/50 rounded-lg text-blue-300 hover:text-white hover:bg-blue-600/30 hover:border-blue-400 transition-colors duration-200"
                >
                  {user?.profile?.resumeOriginalName || "View Resume"}
                </a>
              ) : (
                <div className="mt-2 text-gray-400 italic">No resume uploaded</div>
              )}
            </div> */}
          </div>
        </div>

        {/* Applied Jobs Section */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-blue-500/20 hover:border-blue-500/30">
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-2xl bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
                Applied Jobs
              </h2>
              <div className="text-sm text-gray-400">
                {user?.appliedJobs?.length || 0} applications
              </div>
            </div>
            <AppliedJobTable />
          </div>
        </div>
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;


// Previous one
// import React, { useState } from "react";
// import Navbar from "./shared/Navbar";
// import { Avatar, AvatarImage } from "./ui/avatar";
// import { Button } from "./ui/button";
// import { Contact, Mail, Pen } from "lucide-react";
// import { Badge } from "./ui/badge";
// import { Label } from "./ui/label";
// import AppliedJobTable from "./AppliedJobTable";
// import UpdateProfileDialog from "./UpdateProfileDialog";
// import { useSelector } from "react-redux";
// import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

// const isResume = true;

// const Profile = () => {
//   useGetAppliedJobs();
//   const [open, setOpen] = useState(false);
//   const { user } = useSelector((store) => store.auth);

//   return (
//     <div className="min-h-screen text-white font-[Poppins]">
//       <Navbar />

//       <div className="max-w-4xl mx-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl my-10 p-8 animate-fadeIn">
//         <div className="flex justify-between items-start">
//           <div className="flex items-center gap-6">
//             <Avatar className="h-28 w-28 ring-2 ring-pink-500 shadow-lg transition-all duration-300 hover:scale-105">
//               <AvatarImage
//                 src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
//                 alt="profile"
//               />
//             </Avatar>
//             <div>
//               <h1 className="font-semibold text-2xl text-white tracking-wide">
//                 {user?.fullname}
//               </h1>
//               <p className="text-gray-300">
//                 {user?.profile?.bio || "No bio available"}
//               </p>
//             </div>
//           </div>
//           <Button
//             onClick={() => setOpen(true)}
//             className="border border-gray-600 hover:bg-white/10 hover:text-pink-400 transition-all duration-300"
//           >
//             <Pen className="mr-2 h-4 w-4" /> Edit
//           </Button>
//         </div>

//         <div className="my-6 space-y-4 text-sm md:text-base">
//           <div className="flex items-center gap-3">
//             <Mail className="text-pink-400" />
//             <span>{user?.email}</span>
//           </div>
//           <div className="flex items-center gap-3">
//             <Contact className="text-pink-400" />
//             <span>{user?.phoneNumber}</span>
//           </div>
//         </div>

//         <div className="my-6">
//           <h1 className="text-lg font-semibold mb-2 text-white">Skills</h1>
//           <div className="flex flex-wrap items-center gap-2">
//             {user?.profile?.skills?.length !== 0 ? (
//               user?.profile?.skills.map((item, index) => (
//                 <Badge
//                   key={index}
//                   className="bg-pink-500/20 border border-pink-500 text-pink-300 rounded-full px-4 py-1 shadow-sm hover:scale-105 transition-transform"
//                 >
//                   {item}
//                 </Badge>
//               ))
//             ) : (
//               <span className="text-gray-400">NA</span>
//             )}
//           </div>
//         </div>

//         <div className="mt-6">
//           <Label className="text-md font-bold text-white">Resume</Label>
//           {isResume ? (
//             <a
//               target="_blank"
//               rel="noopener noreferrer"
//               href={user?.profile?.resume}
//               className="text-blue-400 hover:underline transition-colors duration-200 block mt-1"
//             >
//               {user?.profile?.resumeOriginalName}
//             </a>
//           ) : (
//             <span className="text-gray-400">NA</span>
//           )}
//         </div>
//       </div>

//       <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-6 text-white">
//         <h1 className="font-bold text-xl mb-4">Applied Jobs</h1>
//         <AppliedJobTable />
//       </div>

//       <UpdateProfileDialog open={open} setOpen={setOpen} />
//     </div>
//   );
// };

// export default Profile;
