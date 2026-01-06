import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/Constants";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);

  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });

    if (res.data.isPremium) {
      setIsUserPremium(true);
    }
  };

  useEffect(() => {
    const fetchPremiumStatus = async () => {
      await verifyPremiumUser();
    };
    fetchPremiumStatus();
  }, []);

  const handleBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      {
        membershipType: type,
      },
      { withCredentials: true }
    );

    const { amount, keyId, currency, notes, orderId } = order.data;

    const options = {
      key: keyId,
      amount,
      currency,
      name: "Dev Tinder",
      description: "Connect to other developers",
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
      handler: verifyPremiumUser,
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return isUserPremium ? (
    <div>You are already a premium user</div>
  ) : (
    <div className="min-h-screen from-base-200 to-base-300 flex items-center justify-center p-4">
      <div className="flex flex-col lg:flex-row gap-6 justify-center items-stretch max-w-5xl w-full">
        {/* Silver Membership Card */}
        <div className="card bg-gradient-to-br from-slate-50 to-slate-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col w-full lg:w-80">
          <div className="card-body text-center py-6 px-4 flex flex-col">
            <h1 className="text-2xl font-bold text-slate-800 mb-1">
              🌟 Silver Membership
            </h1>
            <div className="badge badge-secondary mb-3 justify-center">3 Months</div>
            <ul className="text-left text-black text-sm space-y-2 my-4 flex-grow">
              <li className="flex items-center gap-2">
                <span className="badge badge-secondary badge-sm">✓</span>
                <span>Chat with other people</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="badge badge-secondary badge-sm">✓</span>
                <span>100 connection requests/day</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="badge badge-secondary badge-sm">✓</span>
                <span>Blue verification tick</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="badge badge-secondary badge-sm">✓</span>
                <span>Priority support</span>
              </li>
            </ul>
            <button 
              className="btn btn-secondary btn-md w-full font-bold"
              onClick={() => handleBuyClick("silver")}
            >
              Buy Silver
            </button>
          </div>
        </div>

        {/* OR Divider */}
        <div className="flex lg:flex-col items-center justify-center">
          <div className="hidden lg:block w-0.5 h-48 bg-gradient-to-b from-secondary to-primary"></div>
          <div className="lg:hidden h-0.5 w-24 bg-gradient-to-r from-secondary to-primary"></div>
          <span className="mx-3 lg:mx-0 lg:my-2 text-sm font-bold text-slate-600 bg-base-200 px-3 py-1 rounded-full">
            OR
          </span>
          <div className="hidden lg:block w-0.5 h-48 bg-gradient-to-t from-secondary to-primary"></div>
          <div className="lg:hidden h-0.5 w-24 bg-gradient-to-l from-secondary to-primary"></div>
        </div>

        {/* Gold Membership Card */}
        <div className="card bg-gradient-to-br from-amber-50 to-amber-100 shadow-2xl hover:shadow-3xl transition-shadow duration-300 ring-2 ring-primary flex flex-col w-full lg:w-80">
          <div className="card-body text-center py-6 px-4 flex flex-col">
            <h1 className="text-2xl font-bold text-amber-900 mb-1">
              👑 Gold Membership
            </h1>
            <div className="badge badge-primary mb-3 justify-center">6 Months</div>
            <ul className="text-left text-black text-sm space-y-2 my-4 flex-grow">
              <li className="flex items-center gap-2">
                <span className="badge badge-primary badge-sm">✓</span>
                <span>Chat with other people</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="badge badge-primary badge-sm">✓</span>
                <span>Unlimited requests/day</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="badge badge-primary badge-sm">✓</span>
                <span>Gold verification tick</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="badge badge-primary badge-sm">✓</span>
                <span>24/7 premium support</span>
              </li>
            </ul>
            <button 
              className="btn btn-primary btn-md w-full font-bold"
              onClick={() => handleBuyClick("gold")}
            >
              Buy Gold
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
