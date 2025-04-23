import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT, PAYMENT_API_END_POINT } from "@/utils/constant";
import { useSelector } from "react-redux";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import {Star, Clock, CheckCircle, MapPin, Calendar, Briefcase, DollarSign} from "lucide-react";
// import { loadStripe } from '@stripe/stripe-js';
import { toast } from "sonner";

const JobDescription = () => {
  const [loading, setLoading] = useState(false);
  const [singleJob, setSingleJob] = useState(null);
  const [seller, setSeller] = useState(null);
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied = singleJob?.checkPayment === true;
    // singleJob?.applications?.some(
    //   (application) => application.applicant === user?._id
    // ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const params = useParams();
  const jobId = params.id;

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setSingleJob(res.data.job);
          setSeller(res.data.job.createdBy); // Assuming the job has creator info
          setIsApplied(
            res.data.job.checkPayment === true
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, user?._id]);


  const handlePayment = async () => {
    if (!user) {
      return toast.warning("Please log in to continue.");
    }
  
    setLoading(true);
    try {
      const res = await axios.post(
        `${PAYMENT_API_END_POINT}/create-checkout-session`,
        { job: singleJob },
        { withCredentials: true }
      );
  
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      toast.error("Payment failed.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto my-8 px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        {/* <div className="text-sm text-gray-400 mb-4">
          <span>Freelance Services</span> &gt; <span>AI Services</span> &gt; <span>Prompt Engineering</span>
        </div> */}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="bg-[#1e1e1e] rounded-xl p-6 shadow-lg border border-[#2e2e2e]">
              <h1 className="text-3xl font-bold text-white mb-2">
                {singleJob?.title}
              </h1>

              {/* Seller Info */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                  {singleJob?.name?.charAt(0) || "J"}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-white">
                      {singleJob?.name || "John Smith"}
                    </h3>
                    <span className="text-gray-400 text-sm">
                      {singleJob?.email || "john@gmail.com"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= 4
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-500"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">
                      3.6 (5 reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Gig Gallery Placeholder */}
              <div className="bg-[#2a2a2a] rounded-lg h-64 mb-6 flex items-center justify-center text-gray-400">
                {/* [Gig Images/Video Gallery] */}
                <img src={singleJob?.image} alt={singleJob?.title} />
              </div>

              {/* About This Gig */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-4 border-b border-[#3a3a3a] pb-2">
                  About This Gig
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  {singleJob?.description ||
                    "I will create effective ChatGPT prompts tailored to your specific needs..."}
                </p>
              </div>

              {/* About Seller */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-4 border-b border-[#3a3a3a] pb-2">
                  About Seller
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-purple-400 mt-0.5" />
                    <div>
                      <h3 className="text-gray-400 text-sm">Category</h3>
                      <p className="text-white">
                        {singleJob?.category || "AI Prompt Engineering"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-purple-400 mt-0.5" />
                    <div>
                      <h3 className="text-gray-400 text-sm">Location</h3>
                      <p className="text-white">
                        {singleJob?.location || "Remote"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-purple-400 mt-0.5" />
                    <div>
                      <h3 className="text-gray-400 text-sm">Delivery Time</h3>
                      <p className="text-white">
                        {singleJob?.days || "3"} days
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    {/* <DollarSign className="w-5 h-5 text-purple-400 mt-0.5" /> */}
                    <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5" />
                    <div>
                      <h3 className="text-gray-400 text-sm">Price</h3>
                      <p className="text-white">₹{singleJob?.price || "299"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5" />
                    <div>
                      <h3 className="text-gray-400 text-sm">Revisions</h3>
                      <p className="text-white">3 included</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-purple-400 mt-0.5" />
                    <div>
                      <h3 className="text-gray-400 text-sm">Posted</h3>
                      <p className="text-white">
                        {singleJob?.createdAt?.split("T")[0] || "2023-10-15"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews Section */}
              <div>
                <h2 className="text-xl font-bold text-white mb-4 border-b border-[#3a3a3a] pb-2">
                  Reviews
                </h2>
                <div className="space-y-4">
                  <div className="bg-[#2a2a2a] p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-600"></div>
                        <div>
                          <h4 className="font-medium text-white">
                            Prem Gautam
                          </h4>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className="w-4 h-4 text-yellow-400 fill-yellow-400"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">2 days ago</span>
                    </div>
                    <p className="mt-3 text-gray-300">"nicely done!"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div
              style={{ top: "5.1rem" }}
              className="bg-[#1e1e1e] rounded-xl p-6 shadow-lg border border-[#2e2e2e] sticky top-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Basic Package</h3>
                <span className="text-2xl font-bold text-purple-400">
                  ₹{singleJob?.price || "299"}
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">
                    {singleJob?.days || "3"} days delivery
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">3 revisions given</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">
                    {singleJob?.category || "3"}
                  </span>
                </div>
              </div>

              <Button
                onClick={handlePayment}
                disabled={isApplied || loading}
                className={`w-full py-4 text-lg font-bold rounded-lg transition-all ${
                  isApplied
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/20"
                }`}
              >
                {/* {isApplied ? "Paid" : `Continue ₹${singleJob?.price || 200}`} */}
                {loading ? "Processing..." : 
                 isApplied ? "Paid" : `Continue ₹${singleJob?.price || 200}`}
              </Button>

              <div className="mt-4 flex items-center justify-center gap-2">
                <button className="text-gray-400 hover:text-white transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Contact Seller */}
            <div className="bg-[#1e1e1e] rounded-xl p-6 shadow-lg border border-[#2e2e2e] mt-4">
              <h3 className="text-lg font-bold text-white mb-4">
                Contact Seller
              </h3>
              <textarea
                className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg p-3 text-gray-300 mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows="4"
                placeholder="Type your message here..."
              ></textarea>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default JobDescription;
