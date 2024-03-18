import React from 'react'
import { FaCheckCircle } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Success = () => {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const trxId = searchParams.get('trxId');

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-green-500 text-6xl mb-4">
        <FaCheckCircle />
      </div>
      <div className="text-2xl font-semibold mb-2">Success Payment</div>
      <div className="text-lg mb-4">Transaction ID: {trxId}</div>
      <Link to="/dashboard" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Go to Dashboard
      </Link>
    </div>
  );
}

export default Success
