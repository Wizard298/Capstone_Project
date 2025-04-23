import { useNavigate } from "react-router-dom";

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center text-white bg-[#1e1e1e]">
      <h1 className="text-4xl font-bold mb-4 text-red-400">❌ Payment Cancelled</h1>
      <p className="text-lg">Your payment was cancelled. You can try again anytime.</p>
      <button
        className="mt-6 px-4 py-2 bg-purple-600 rounded hover:bg-purple-700"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
};

export default PaymentCancel;
