import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Loader2, MailCheck } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../shared/Navbar";
import { USER_API_END_POINT } from "@/utils/constant";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_END_POINT}/forgot-password`, { email });
      
      if (res.data.success) {
        setEmailSent(true);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white font-['Orbitron']">
      <Navbar />

      <div className="flex items-center justify-center px-4">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full sm:w-[480px] bg-[#111111]/80 backdrop-blur-md border border-[#2c2c2c] shadow-[0_0_50px_#00f0ff33] rounded-2xl p-8 mt-10"
        >
          <h1 className="text-2xl text-center font-bold mb-6 text-cyan-400 drop-shadow-[0_0_5px_#00f0ff]">
            {emailSent ? "📩 Check Your Email" : "🔑 Forgot Password"}
          </h1>

          {emailSent ? (
            <div className="text-center">
              <MailCheck className="w-16 h-16 mx-auto mb-4 text-cyan-400" />
              <p className="text-gray-300 mb-6">
                We've sent a password reset link to <span className="text-cyan-400">{email}</span>. 
                Please check your inbox and follow the instructions.
              </p>
              <p className="text-sm text-gray-400 mb-4">
                Didn't receive the email? Check your spam folder or try resending.
              </p>
              <Button
                type="button"
                onClick={() => setEmailSent(false)}
                className="w-full bg-gradient-to-r from-cyan-400 to-pink-400 text-black font-bold hover:scale-[1.03] transition-all duration-300 shadow-md shadow-cyan-400/30"
              >
                Resend Email
              </Button>
            </div>
          ) : (
            <>
              <p className="text-gray-400 text-sm mb-6 text-center">
                Enter your email address and we'll send you a link to reset your password.
              </p>

              <div className="mb-6">
                <Label className="text-sm text-gray-300">Email Address</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="bg-[#1a1a1a] text-white border border-[#2c2c2c] focus:border-cyan-400 focus:ring-cyan-500/30 shadow-inner"
                  required
                />
              </div>

              {loading ? (
                <Button className="w-full my-3 bg-gradient-to-r from-cyan-400 to-pink-400 text-black font-bold shadow-lg shadow-cyan-500/20">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full my-3 bg-gradient-to-r from-cyan-400 to-pink-400 text-black font-bold hover:scale-[1.03] transition-all duration-300 shadow-md shadow-cyan-400/30"
                >
                  Send Reset Link
                </Button>
              )}

              <p className="text-sm text-center mt-4 text-gray-400">
                Remember your password?{" "}
                <Link to="/login" className="text-cyan-400 hover:underline">
                  Login here
                </Link>
              </p>
            </>
          )}
        </motion.form>
      </div>
    </div>
  );
};

export default ForgotPassword;