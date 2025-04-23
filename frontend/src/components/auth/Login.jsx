import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2, User, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } 
    catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } 
    finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen text-white font-['Orbitron']">
      <Navbar />

      <div className="flex items-center justify-center px-4">
        <motion.form
          onSubmit={submitHandler}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full sm:w-[480px] bg-[#111111]/80 backdrop-blur-md border border-[#2c2c2c] shadow-[0_0_50px_#00f0ff33] rounded-2xl p-8 mt-10"
        >
          <h1 className="text-2xl text-center font-bold mb-6 text-cyan-400 drop-shadow-[0_0_5px_#00f0ff] animate-pulse">
            🔐 Welcome Back
          </h1>

          <div className="mb-4">
            <Label className="text-sm text-gray-300">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="patel@gmail.com"
              className="bg-[#1a1a1a] text-white border border-[#2c2c2c] focus:border-cyan-400 focus:ring-cyan-500/30 shadow-inner"
              required
            />
          </div>

          <div>
            <Label className="text-sm text-gray-300">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="••••••"
              className="bg-[#1a1a1a] text-white border border-[#2c2c2c] focus:border-cyan-400 focus:ring-cyan-500/30 shadow-inner"
              required
            />
          </div>

          <Link to="/reset">Forget Password?</Link>
          <br />

          {/* <div className="my-5 flex justify-around text-sm text-gray-300">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="student"
                checked={input.role === "student"}
                onChange={changeEventHandler}
                className="accent-cyan-400"
              />
              Student
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === "recruiter"}
                onChange={changeEventHandler}
                className="accent-pink-400"
              />
              Recruiter
            </label>
          </div> */}
          {/* Role Selection */}
          <div className="mb-8 mt-7">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="radio"
                  name="role"
                  id="student-role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="hidden peer"
                  required
                />
                <label
                  htmlFor="student-role"
                  className="flex flex-col items-center justify-center p-4 border border-[#00f0ff]/30 bg-[#0a0a0a] rounded-lg cursor-pointer transition-all duration-300 peer-checked:border-[#00f0ff] peer-checked:bg-[#00f0ff]/10 peer-checked:text-[#00f0ff] hover:border-[#00f0ff]/60"
                >
                  <User className="w-6 h-6 mb-2" />
                  <span className="text-sm font-medium">STUDENT</span>
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  name="role"
                  id="recruiter-role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="hidden peer"
                  required
                />
                <label
                  htmlFor="recruiter-role"
                  className="flex flex-col items-center justify-center p-4 border border-[#ff2079]/30 bg-[#0a0a0a] rounded-lg cursor-pointer transition-all duration-300 peer-checked:border-[#ff2079] peer-checked:bg-[#ff2079]/10 peer-checked:text-[#ff2079] hover:border-[#ff2079]/60"
                >
                  <Rocket className="w-6 h-6 mb-2" />
                  <span className="text-sm font-medium">SELLER</span>
                </label>
              </div>
            </div>
          </div>

          {loading ? (
            <Button className="w-full my-3 bg-gradient-to-r from-cyan-400 to-pink-400 text-black font-bold shadow-lg shadow-cyan-500/20">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-3 bg-gradient-to-r from-cyan-400 to-pink-400 text-black font-bold hover:scale-[1.03] transition-all duration-300 shadow-md shadow-cyan-400/30"
            >
              Login
            </Button>
          )}

          <p className="text-sm text-center mt-4 text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-cyan-400 hover:underline">
              Sign up here
            </Link>
          </p>
        </motion.form>
      </div>
    </div>
  );
};

export default Login;
