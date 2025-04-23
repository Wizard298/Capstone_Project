import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import Navbar from "../shared/Navbar";
import { Eye, EyeOff, MailCheck } from "lucide-react";
import { USER_API_END_POINT } from "@/utils/constant";

function ResetPassword() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
    const navigate = useNavigate();

    // const isStrongPassword = (password) => {
    //     const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    //     return strongPasswordRegex.test(password);
    // };

    const handleSubmit = (e) => {
        e.preventDefault();

        // if (!isStrongPassword(password)) {
        //     toast.error("❌ Weak Password! Must contains 1 uppercase, 1 lowercase, 1 number & 1 special character!", {
        //         toastId: "weak-password"
        //     });
        //     return; 
        // }

        if(password !== confirmPassword){
          toast.warning("⚠️ Passwords do not match!", {
            toastId: "password-not-matching-forgot"
          }); 
        }
        else{
            setLoading(true);
            axios.post(`${USER_API_END_POINT}/reset`, { email, password})
            .then((result) => {
                if(result.data.message === "email"){
                  toast.info("📧 Email does not exists!", {
                    toastId: "email-not-exists-forgot"
                  });
                }
                else if(result.data.message === "same"){
                  toast.info("📧 Password is same for the existing email!", {
                    toastId: "password-same-forgot"
                  });
                }
                else if(result.data.message === "password"){
                    toast.success(" Password Updated!! Redirecting to Login Page!", {
                        toastId: "password-updated"
                    });
                    setTimeout(() => {
                        navigate('/login');
                    }, 2500);
                }
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
        }
    }

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
                        🔑 Reset Password
                    </h1>
                    
                    <p className="text-gray-400 text-sm mb-6 text-center">
                        Enter your email to create a new password
                    </p>

                    <div className="mb-4">
                        <label className="block text-sm text-gray-300 mb-2">Email</label>
                        <input 
                            type="email" 
                            name="loginEmail" 
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="patel@gmail.com"
                            className="w-full bg-[#1a1a1a] text-white border border-[#2c2c2c] focus:border-cyan-400 focus:ring-cyan-500/30 rounded-lg px-4 py-2 shadow-inner"
                            required
                        />
                    </div>

                    <div className="mb-4 relative">
                        <label className="block text-sm text-gray-300 mb-2">New Password</label>
                        <input 
                            type={passwordVisible ? "text" : "password"} 
                            name="signUpPassword" 
                            placeholder="••••••••"
                            minLength="8" 
                            maxLength="20"
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                            className="w-full bg-[#1a1a1a] text-white border border-[#2c2c2c] focus:border-cyan-400 focus:ring-cyan-500/30 rounded-lg px-4 py-2 shadow-inner pr-10"
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-9 text-gray-400 hover:text-cyan-400"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                            {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        <p className="text-xs text-gray-500 mt-1">
                            Must contain: uppercase, lowercase, number, special character
                        </p>
                    </div>

                    <div className="mb-6 relative">
                        <label className="block text-sm text-gray-300 mb-2">Confirm Password</label>
                        <input 
                            type={passwordConfirmVisible ? "text" : "password"}
                            placeholder="••••••••"
                            minLength="8" 
                            maxLength="20"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            autoComplete="new-password"
                            className="w-full bg-[#1a1a1a] text-white border border-[#2c2c2c] focus:border-cyan-400 focus:ring-cyan-500/30 rounded-lg px-4 py-2 shadow-inner pr-10"
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-9 text-gray-400 hover:text-cyan-400"
                            onClick={() => setPasswordConfirmVisible(!passwordConfirmVisible)}
                        >
                            {passwordConfirmVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-cyan-400 to-pink-400 text-black font-bold py-2 px-4 rounded-lg hover:scale-[1.03] transition-all duration-300 shadow-md shadow-cyan-400/30 flex justify-center items-center"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </>
                        ) : (
                            "Reset Password"
                        )}
                    </button>

                    <p className="text-sm text-center mt-4 text-gray-400">
                        Remembered your password?{" "}
                        <Link to="/login" className="text-cyan-400 hover:underline">
                            Log In
                        </Link>
                    </p>
                </motion.form>
            </div>
        </div>
    );
}

export default ResetPassword;