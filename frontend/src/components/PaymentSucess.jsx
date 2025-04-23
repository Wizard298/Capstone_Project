import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { JOB_API_END_POINT } from "@/utils/constant";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const jobId = query.get("jobId");

  useEffect(() => {
    const markJobAsApplied = async () => {
      try {
        const res = await axios.post(`${JOB_API_END_POINT}/success`, { jobId }, { withCredentials: true });
        if (res.data.success) {
          toast.success("Payment successful and post marked as purchased!");
        } else {
          toast.error("Something went wrong while applying to the job.");
        }
      } catch (err) {
        console.log(err);
        toast.error("Server error.");
      }
    };

    if (jobId) {
      markJobAsApplied();
    } else {
      toast.error("No post ID found in query.");
    }
  }, [jobId]);

  return (
    <div className="h-screen flex flex-col justify-center items-center text-white bg-[#1e1e1e]">
      <h1 className="text-4xl font-bold mb-4 text-green-400">🎉 Payment Successful!</h1>
      <p className="text-lg">Thank you for your purchase. The gig has been purchased successfully.</p>
      <button
        className="mt-6 px-4 py-2 bg-purple-600 rounded hover:bg-purple-700"
        onClick={() => navigate("/")}
      >
        Go to Home
      </button>
    </div>
  );
};

export default PaymentSuccess;
