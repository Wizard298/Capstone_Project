// PaymentSuccess.js
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { JOB_API_END_POINT, PAYMENT_API_END_POINT } from '@/utils/constant';
import { Button } from './ui/button';
import { CheckCircle } from 'lucide-react';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const jobId = queryParams.get('jobId');

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        await axios.post(`${PAYMENT_API_END_POINT}/confirm-payment`,
          { jobId },
          { withCredentials: true }
        );
      } catch (error) {
        console.error('Error confirming payment:', error);
      }
    };

    if (jobId) {
      confirmPayment();
    }
  }, [jobId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your payment. Your job application has been submitted successfully.
        </p>
        <Button
          onClick={() => navigate('/')}
          className="bg-purple-600 hover:bg-purple-700"
        >
          View My Jobs
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccess;