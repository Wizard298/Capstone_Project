import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2, User, Mail, Phone, Lock, Briefcase, GraduationCap, Image } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const [isHovered, setIsHovered] = useState(false);
  const [filePreview, setFilePreview] = useState(null);

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message, {
          position: "top-center",
          duration: 2000,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-center",
        duration: 2000,
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen">
        <form
          onSubmit={submitHandler}
          className={`w-full max-w-lg p-8 bg-gray-900/80 backdrop-blur-sm border border-gray-700 shadow-2xl rounded-3xl transition-all duration-500 ${
            isHovered ? "shadow-indigo-500/20 hover:scale-[1.01]" : ""
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500 mb-2">
              Create Your Account
            </h1>
            <p className="text-gray-400">Join our community today</p>
          </div>

          <div className="space-y-5">
            {/* Full Name */}
            <div className="group">
              <Label className="text-sm font-medium text-gray-300 group-focus-within:text-indigo-400 transition-colors duration-200 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </Label>
              <Input
                type="text"
                value={input.fullname}
                name="fullname"
                onChange={changeEventHandler}
                placeholder="John Doe"
                required
                className="mt-1 w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 group-hover:border-gray-600"
              />
            </div>

            {/* Email */}
            <div className="group">
              <Label className="text-sm font-medium text-gray-300 group-focus-within:text-indigo-400 transition-colors duration-200 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="johndoe@example.com"
                required
                className="mt-1 w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 group-hover:border-gray-600"
              />
            </div>

            {/* Phone Number */}
            <div className="group">
              <Label className="text-sm font-medium text-gray-300 group-focus-within:text-indigo-400 transition-colors duration-200 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </Label>
              <Input
                type="tel"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={changeEventHandler}
                placeholder="1234567890"
                required
                className="mt-1 w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 group-hover:border-gray-600"
              />
            </div>

            {/* Password */}
            <div className="group">
              <Label className="text-sm font-medium text-gray-300 group-focus-within:text-indigo-400 transition-colors duration-200 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <Input
                type="new-password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="••••••••"
                required
                minLength="6"
                className="mt-1 w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 group-hover:border-gray-600"
              />
            </div>

            {/* Role Selection */}
            <div className="group">
              <Label className="text-sm font-medium text-gray-300 mb-2 block">
                Select Your Role
              </Label>
              <RadioGroup className="grid grid-cols-2 gap-4">
                <div>
                  <Input
                    id="student-role"
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                    required
                    className="hidden peer"
                  />
                  <Label
                    htmlFor="student-role"
                    className="flex flex-col items-center justify-center p-4 border border-gray-700 rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 peer-checked:border-indigo-500 peer-checked:bg-indigo-500/10 peer-checked:text-indigo-400 transition-all duration-200"
                  >
                    <GraduationCap className="w-6 h-6 mb-2" />
                    <span>Student</span>
                  </Label>
                </div>
                <div>
                  <Input
                    id="recruiter-role"
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    required
                    className="hidden peer"
                  />
                  <Label
                    htmlFor="recruiter-role"
                    className="flex flex-col items-center justify-center p-4 border border-gray-700 rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 peer-checked:border-indigo-500 peer-checked:bg-indigo-500/10 peer-checked:text-indigo-400 transition-all duration-200"
                  >
                    <Briefcase className="w-6 h-6 mb-2" />
                    <span>Seller</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Profile Picture */}
            <div className="group">
              <Label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Image className="w-4 h-4" />
                Profile Picture (Optional)
              </Label>
              <div className="mt-2 flex items-center gap-4">
                {filePreview ? (
                  <div className="relative">
                    <img
                      src={filePreview}
                      alt="Preview"
                      className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFilePreview(null);
                        setInput({ ...input, file: "" });
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-500">
                    <User className="w-6 h-6" />
                  </div>
                )}
                <div className="flex-1">
                  <Label
                    htmlFor="file-upload"
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer transition-colors duration-200 flex items-center justify-center"
                  >
                    Choose File
                    <Input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={changeFileHandler}
                      className="hidden"
                    />
                  </Label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              {loading ? (
                <Button
                  disabled
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center"
                >
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Creating Account...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20"
                >
                  Sign Up
                </Button>
              )}
            </div>

            {/* Login Link */}
            <div className="text-center pt-4">
              <span className="text-sm text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-200"
                >
                  Login here
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;


// Prvious One

// import React, { useEffect, useState } from "react";
// import Navbar from "../shared/Navbar";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import { RadioGroup } from "../ui/radio-group";
// import { Button } from "../ui/button";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { USER_API_END_POINT } from "@/utils/constant";
// import { toast } from "sonner";
// import { useDispatch, useSelector } from "react-redux";
// import { setLoading } from "@/redux/authSlice";
// import { Loader2 } from "lucide-react";

// const Signup = () => {
//   const [input, setInput] = useState({
//     fullname: "",
//     email: "",
//     phoneNumber: "",
//     password: "",
//     role: "",
//     file: "",
//   });

//   const { loading, user } = useSelector((store) => store.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const changeFileHandler = (e) => {
//     setInput({ ...input, file: e.target.files?.[0] });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(); // formdata object
//     formData.append("fullname", input.fullname);
//     formData.append("email", input.email);
//     formData.append("phoneNumber", input.phoneNumber);
//     formData.append("password", input.password);
//     formData.append("role", input.role);
//     if (input.file) {
//       formData.append("file", input.file);
//     }

//     try {
//       dispatch(setLoading(true));
//       const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         navigate("/login");
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.message);
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       navigate("/");
//     }
//   }, [user, navigate]);

//   return (
//     <>
//       <Navbar />
//       <div className="flex items-center justify-center min-h-screen">
//         <form
//           onSubmit={submitHandler}
//           className="w-full max-w-lg p-10 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-2xl rounded-3xl transform transition-all duration-700 hover:scale-110 hover:shadow-2xl hover:rotate-2"
//         >
//           <h1 className="text-6xl font-extrabold text-center text-indigo-400 mb-8 animate__animated animate__fadeInUp">
//             Join the Future, Sign Up!
//           </h1>

//           <div className="mb-6">
//             <Label className="text-lg font-semibold text-indigo-300">
//               Full Name
//             </Label>
//             <Input
//               type="text"
//               value={input.fullname}
//               name="fullname"
//               onChange={changeEventHandler}
//               placeholder="John Doe"
//               className="w-full p-4 mt-2 bg-gray-700 border-2 border-transparent rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-500 transform hover:scale-105"
//             />
//           </div>

//           <div className="mb-6">
//             <Label className="text-lg font-semibold text-indigo-300">
//               Email
//             </Label>
//             <Input
//               type="email"
//               value={input.email}
//               name="email"
//               onChange={changeEventHandler}
//               placeholder="johndoe@gmail.com"
//               className="w-full p-4 mt-2 bg-gray-700 border-2 border-transparent rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-500 transform hover:scale-105"
//             />
//           </div>

//           <div className="mb-6">
//             <Label className="text-lg font-semibold text-indigo-300">
//               Phone Number
//             </Label>
//             <Input
//               type="text"
//               value={input.phoneNumber}
//               name="phoneNumber"
//               onChange={changeEventHandler}
//               placeholder="8080808080"
//               className="w-full p-4 mt-2 bg-gray-700 border-2 border-transparent rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-500 transform hover:scale-105"
//             />
//           </div>

//           <div className="mb-6">
//             <Label className="text-lg font-semibold text-indigo-300">
//               Password
//             </Label>
//             <Input
//               type="password"
//               value={input.password}
//               name="password"
//               onChange={changeEventHandler}
//               placeholder="********"
//               className="w-full p-4 mt-2 bg-gray-700 border-2 border-transparent rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-500 transform hover:scale-105"
//             />
//           </div>

//           <div className="mb-6 flex justify-between items-center">
//             <RadioGroup className="flex items-center gap-6 text-indigo-300">
//               <div className="flex items-center space-x-3">
//                 <Input
//                   type="radio"
//                   name="role"
//                   value="student"
//                   checked={input.role === "student"}
//                   onChange={changeEventHandler}
//                   className="cursor-pointer"
//                 />
//                 <Label htmlFor="r1">Student</Label>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <Input
//                   type="radio"
//                   name="role"
//                   value="recruiter"
//                   checked={input.role === "recruiter"}
//                   onChange={changeEventHandler}
//                   className="cursor-pointer"
//                 />
//                 <Label htmlFor="r2">Recruiter</Label>
//               </div>
//             </RadioGroup>

//             <div className="flex items-center gap-4">
//               <Label className="text-lg font-semibold text-indigo-300">
//                 Profile
//               </Label>
//               <Input
//                 accept="image/*"
//                 type="file"
//                 onChange={changeFileHandler}
//                 className="bg-gray-700 text-white rounded-lg p-4 cursor-pointer transition-all duration-500 transform hover:scale-105"
//               />
//             </div>
//           </div>

//           {loading ? (
//             <Button className="w-full py-3 mt-5 bg-indigo-500 hover:bg-indigo-600 transition-all flex justify-center items-center text-lg font-semibold hover:scale-110">
//               <Loader2 className="mr-2 animate-spin" />
//               Please Wait...
//             </Button>
//           ) : (
//             <Button
//               type="submit"
//               className="w-full py-3 mt-5 bg-indigo-500 hover:bg-indigo-600 transition-all text-lg font-semibold hover:scale-110"
//             >
//               Sign Up
//             </Button>
//           )}

//           <div className="mt-6 text-center">
//             <span className="text-sm text-indigo-200">
//               Already have an account?{" "}
//               <Link
//                 to="/login"
//                 className="text-indigo-400 hover:text-indigo-600"
//               >
//                 Login
//               </Link>
//             </span>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Signup;
