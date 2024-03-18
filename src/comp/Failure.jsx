import React from 'react'
import { FaTimesCircle } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Failure = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const trxId = searchParams.get('trxId');

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-red-500 text-6xl mb-4">
        <FaTimesCircle />
      </div>
      <div className="text-2xl font-semibold mb-2">Failure Payment</div>
      <div className="text-lg mb-4">Transaction ID: {trxId}</div>
      <Link to="/purchase" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Try again
      </Link>
    </div>
  );
}

export default Failure
